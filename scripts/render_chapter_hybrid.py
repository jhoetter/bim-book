#!/usr/bin/env python3
"""Render a low-cost chapter explainer from existing images, text and local TTS.

Default mode is deliberately cheap: no video-generation API call. It creates a
scene plan, animates the chapter's existing images with ffmpeg, narrates with
macOS `say`, and embeds the rendered MP4 at the top of the chapter.

Optional Gemini planning can be enabled with --plan-with-gemini. Veo is not
called here; scenes that would benefit from generative video are marked as
`veo_candidate` in the plan and can later be generated selectively.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import shutil
import subprocess
import sys
import textwrap
import time
import wave
from pathlib import Path
from typing import Any

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:  # pragma: no cover - optional local dependency
    Image = None
    ImageDraw = None
    ImageFont = None

from generate_chapter_video import (
    BASE_URL,
    ROOT,
    VIDEO_END,
    VIDEO_START,
    VideoGenerationError,
    download_video,
    extract_image_paths,
    extract_video_uri,
    extract_title,
    inject_video,
    load_dotenv,
    poll_generation,
    read_chapter,
    request_json,
    require_key,
    start_generation,
    strip_markdown,
)


DEFAULT_PLANNER_MODEL = "gemini-2.5-flash-lite"
DEFAULT_REVIEW_MODEL = "gemini-2.5-flash"
DEFAULT_TTS_MODEL = "gemini-3.1-flash-tts-preview"
DEFAULT_GEMINI_TTS_VOICE = "Charon"
DEFAULT_VEO_MODEL = "veo-3.1-fast-generate-preview"
DEFAULT_TTS_VOICE = "Anna"
WIDTH = 1920
HEIGHT = 1080
FPS = 30
DEFAULT_REVIEW_MAX_BYTES = 18_000_000


def run(cmd: list[str], *, quiet: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        check=True,
        text=True,
        stdout=subprocess.DEVNULL if quiet else subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def parse_json_text(text: str) -> dict[str, Any]:
    clean = text.strip()
    if clean.startswith("```"):
        clean = re.sub(r"^```(?:json)?\s*", "", clean)
        clean = re.sub(r"\s*```$", "", clean)
    return json.loads(clean)


def ensure_tool(name: str) -> str:
    path = shutil.which(name)
    if not path:
        raise VideoGenerationError(f"`{name}` fehlt. Bitte installieren oder PATH prüfen.")
    return path


def ffmpeg_has_filter(name: str) -> bool:
    try:
        result = run(["ffmpeg", "-hide_banner", "-filters"], quiet=False)
    except subprocess.CalledProcessError:
        return False
    return re.search(rf"\b{name}\b", result.stdout) is not None


def chapter_number(slug: str) -> str | None:
    match = re.match(r"^(\d{2})-", slug)
    return match.group(1) if match else None


def cover_for_slug(slug: str) -> Path | None:
    num = chapter_number(slug)
    if not num:
        return None
    path = ROOT / "assets" / "covers" / f"cover-ch{num}.png"
    return path if path.exists() else None


def split_sections(markdown: str) -> list[dict[str, str]]:
    matches = list(re.finditer(r"^##\s+(.+)$", markdown, re.MULTILINE))
    sections: list[dict[str, str]] = []
    for idx, match in enumerate(matches):
        title = match.group(1).strip()
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(markdown)
        body = markdown[start:end].strip()
        if title.lower().startswith(("zusammenfassung", "verwandte kapitel")):
            continue
        sections.append({"title": title, "body": body})
    return sections


def remove_video_block(markdown: str) -> str:
    return re.sub(
        rf"\n?{re.escape(VIDEO_START)}[\s\S]*?{re.escape(VIDEO_END)}\n?",
        "\n",
        markdown,
    )


def chapter_intro(markdown: str) -> str:
    clean = remove_video_block(markdown)
    match = re.search(
        r"^#\s+.+\n\n(?:\*[^\n]+\*\n\n)?---\n\n([\s\S]*?)\n\n---",
        clean,
        re.MULTILINE,
    )
    return match.group(1).strip() if match else ""


def first_sentences(text: str, max_words: int = 34) -> str:
    clean = strip_markdown(text)
    clean = re.sub(r"\s+", " ", clean).strip()
    sentences = re.split(r"(?<=[.!?])\s+", clean)
    selected = " ".join(s for s in sentences[:2] if s).strip()
    words = selected.split()
    if len(words) > max_words:
        selected = " ".join(words[:max_words]).rstrip(",;:") + "."
    return selected


def section_image(section_body: str, chapter_path: Path, fallback_images: list[Path], idx: int) -> Path | None:
    images = extract_image_paths(section_body, chapter_path, 1)
    if images:
        return images[0]
    if fallback_images:
        return fallback_images[min(idx, len(fallback_images) - 1)]
    return None


def wrap_label(text: str, width: int = 36, max_lines: int = 2) -> list[str]:
    lines = textwrap.wrap(text, width=width, break_long_words=False, replace_whitespace=True)
    if not lines:
        return [text[:width]]
    if len(lines) <= max_lines:
        return lines
    clipped = lines[:max_lines]
    clipped[-1] = clipped[-1].rstrip(".,;:") + " ..."
    return clipped


def estimate_duration(narration: str) -> float:
    words = max(1, len(narration.split()))
    return max(7.0, min(18.0, words / 2.35 + 1.5))


def veo_score(title: str, body: str) -> tuple[int, str]:
    title_text = title.lower()
    body_text = body.lower()
    title_terms = {
        "wärmebrücke": "Wärmestrom und kalte Oberflächen wären als bewegte Simulation stark.",
        "lastabtragung": "Kräftefluss lässt sich animiert besser verstehen.",
        "lüftung": "Luftströme und Kanalführung profitieren von Bewegung.",
        "heizkreis": "Flüsse, Ventile und Regelung sind als Animation anschaulicher.",
        "ifc": "Datenbeziehungen könnten als räumlicher Graph animiert werden.",
        "prozess": "Workflow-Zustände und Übergaben lassen sich filmisch gut zeigen.",
        "scan-to-bim": "Punktwolke zu Modell ist ein guter Generativclip-Kandidat.",
        "feuchte": "Diffusion und Tauwasser funktionieren als Bewegungssequenz besser.",
    }
    for term, reason in title_terms.items():
        if term in title_text:
            return 85, reason
    if any(term in title_text for term in ["schema", "workflow", "ström", "simulation"]):
        return 70, "Abstrakte Abläufe könnten als kurzer Bewegungsclip klarer werden."
    if len(re.findall(r"\b(bewegt|ström|verlauf|übergang|prozess|simulation)\w*", body_text)) >= 2:
        return 55, "Ein Generativclip wäre denkbar, aber nicht zwingend."
    return 25, "Bestehendes Bild plus Zoom/Callout reicht wahrscheinlich."


def heuristic_plan(chapter_path: Path, markdown: str, target_minutes: float, max_scenes: int) -> dict[str, Any]:
    markdown = remove_video_block(markdown)
    slug = chapter_path.stem
    title = extract_title(markdown, slug)
    images = extract_image_paths(markdown, chapter_path, 20)
    cover = cover_for_slug(slug)
    sections = split_sections(markdown)
    if max_scenes > 0:
        sections = sections[:max_scenes]

    scenes: list[dict[str, Any]] = []
    opener_image = cover or (images[0] if images else None)
    opener_narration = first_sentences(chapter_intro(markdown), max_words=42)
    if not opener_narration:
        opener_narration = (
            re.sub(r"^Kapitel\s+\d+\s+[–-]\s+", "", title)
            + ". In diesem Kapitel bauen wir die Begriffe Schritt für Schritt visuell auf."
        )
    scenes.append(
        {
            "id": "s00",
            "kind": "title",
            "title": title,
            "section": "Auftakt",
            "narration": opener_narration,
            "transcript_source": "chapter_intro",
            "image": str(opener_image.relative_to(ROOT)) if opener_image else None,
            "duration": estimate_duration(opener_narration),
            "motion": "slow_zoom_in",
            "veo": {"recommended": False, "score": 10, "reason": "Titelbild genügt."},
        }
    )

    for idx, section in enumerate(sections, start=1):
        narration = first_sentences(section["body"])
        if not narration:
            narration = f"Dieser Abschnitt erklärt {section['title']} im Zusammenhang des Gebäudemodells."
        image = section_image(section["body"], chapter_path, images, idx - 1)
        score, reason = veo_score(section["title"], section["body"])
        scenes.append(
            {
                "id": f"s{idx:02d}",
                "kind": "image",
                "title": section["title"],
                "section": section["title"],
                "narration": narration,
                "transcript_source": "chapter_section_excerpt",
                "image": str(image.relative_to(ROOT)) if image else None,
                "duration": estimate_duration(narration),
                "motion": "slow_zoom_in",
                "veo": {
                    "recommended": score >= 70,
                    "score": score,
                    "reason": reason,
                    "prompt": make_veo_candidate_prompt(title, section["title"], narration),
                },
            }
        )

    total_duration = sum(float(scene["duration"]) for scene in scenes)
    if target_minutes > 0 and total_duration > target_minutes * 60:
        scale = (target_minutes * 60) / total_duration
        for scene in scenes:
            scene["duration"] = max(5.0, round(float(scene["duration"]) * scale, 2))

    return {
        "chapter": {"slug": slug, "title": title},
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "strategy": "hybrid-local-render",
        "renderer": {"width": WIDTH, "height": HEIGHT, "fps": FPS, "tts": "macos-say"},
        "cost_model": {
            "local_render_usd": 0,
            "veo_candidates_are_not_generated_by_this_script": True,
        },
        "scenes": scenes,
    }


def make_veo_candidate_prompt(chapter_title: str, section_title: str, narration: str) -> str:
    return (
        f"8-second German educational BIM explainer clip for '{chapter_title}', section '{section_title}'. "
        f"Visualize the core idea with clean architectural diagrams, motion arrows and short German labels. "
        f"Native narration: \"{narration}\""
    )


def gemini_plan(chapter_path: Path, markdown: str, target_minutes: float, max_scenes: int, model: str) -> dict[str, Any]:
    api_key = require_key()
    title = extract_title(markdown, chapter_path.stem)
    image_paths = extract_image_paths(markdown, chapter_path, 20)
    image_list = "\n".join(f"- {path.relative_to(ROOT)}" for path in image_paths) or "- none"
    base = heuristic_plan(chapter_path, markdown, target_minutes, max_scenes)
    prompt = f"""You are planning a low-cost German educational video for an architecture/BIM textbook.

Return strict JSON only. Keep the existing schema exactly:
{json.dumps(base, ensure_ascii=False, indent=2)}

Improve scene titles, image choices, motion choices and veo recommendations.
Rules:
- The main video is rendered locally from existing images; do not require generated video for every scene.
- Mark veo.recommended true only when an 8-second generative snippet would add major learning value.
- Do not change narration. The narration is locked to chapter excerpts and must stay verbatim.
- Use only these available images:
{image_list}

Chapter markdown:
{markdown[:10000]}
"""
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.3,
        },
    }
    response = request_json(
        "POST",
        f"{BASE_URL}/models/{model}:generateContent",
        api_key,
        payload,
        timeout=120,
    )
    try:
        text = response["candidates"][0]["content"]["parts"][0]["text"]
        plan = json.loads(text)
    except (KeyError, IndexError, TypeError, json.JSONDecodeError) as exc:
        raise VideoGenerationError("Gemini-Planung lieferte kein gültiges JSON:\n" + json.dumps(response, indent=2)) from exc
    return lock_transcript_to_base(normalize_plan(plan, chapter_path), base)


def lock_transcript_to_base(plan: dict[str, Any], base: dict[str, Any]) -> dict[str, Any]:
    base_by_id = {scene.get("id"): scene for scene in base.get("scenes", [])}
    for scene in plan.get("scenes", []):
        base_scene = base_by_id.get(scene.get("id"))
        if not base_scene:
            continue
        scene["narration"] = base_scene.get("narration", scene.get("narration", ""))
        scene["transcript_source"] = base_scene.get("transcript_source", "chapter_section_excerpt")
        scene["duration"] = estimate_duration(scene["narration"])
    return plan


def normalize_plan(plan: dict[str, Any], chapter_path: Path) -> dict[str, Any]:
    slug = chapter_path.stem
    plan.setdefault("chapter", {})
    plan["chapter"].setdefault("slug", slug)
    plan["chapter"].setdefault("title", extract_title(chapter_path.read_text(encoding="utf-8"), slug))
    plan.setdefault("scenes", [])
    for idx, scene in enumerate(plan["scenes"]):
        scene.setdefault("id", f"s{idx:02d}")
        scene.setdefault("kind", "image")
        scene.setdefault("title", scene.get("section", f"Szene {idx + 1}"))
        scene.setdefault("section", scene["title"])
        scene.setdefault("narration", scene["title"])
        scene.setdefault("duration", estimate_duration(scene["narration"]))
        scene.setdefault("motion", "slow_zoom_in")
        scene.setdefault("veo", {"recommended": False, "score": 0, "reason": ""})
    return plan


def ffmpeg_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'").replace("%", "\\%")


def fontfile() -> str | None:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return candidate
    return None


def load_card_font(size: int) -> Any:
    if ImageFont is None:
        return None
    font_path = fontfile()
    if font_path:
        try:
            return ImageFont.truetype(font_path, size)
        except OSError:
            pass
    return ImageFont.load_default()


def card_wrap(draw: Any, text: str, font: Any, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if bbox[2] - bbox[0] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def create_scene_card(scene: dict[str, Any], slug: str) -> Path:
    if Image is None or ImageDraw is None:
        raise VideoGenerationError("Pillow fehlt; Szenenkarten können nicht erzeugt werden.")

    card_dir = ROOT / "assets" / "videos" / "cards"
    card_dir.mkdir(parents=True, exist_ok=True)
    card_path = card_dir / f"{slug}-{scene.get('id', 'scene')}.png"

    img = Image.new("RGB", (WIDTH, HEIGHT), "#f7f7f4")
    draw = ImageDraw.Draw(img)
    title_font = load_card_font(58)
    meta_font = load_card_font(28)
    body_font = load_card_font(38)

    accent = "#2f5f8f"
    accent_2 = "#d69b2d"
    accent_3 = "#7aa66a"
    text = "#1d1d1b"
    muted = "#656565"
    line = "#d7d7d0"
    draw.rectangle((0, 0, WIDTH, 22), fill=accent)
    draw.rectangle((120, 150, WIDTH - 120, HEIGHT - 150), outline=line, width=2)

    section = str(scene.get("section") or scene.get("title") or "")
    title = str(scene.get("title") or section)
    narration = str(scene.get("narration") or "")

    draw.text((160, 190), section, font=meta_font, fill=muted)
    y = 250
    for line_text in card_wrap(draw, title, title_font, WIDTH - 320)[:2]:
        draw.text((160, y), line_text, font=title_font, fill=text)
        y += 74

    y += 40
    for line_text in card_wrap(draw, narration, body_font, WIDTH - 360)[:6]:
        draw.text((190, y), line_text, font=body_font, fill=text)
        y += 56

    if "Buchaufbau" in title or "Buchaufbau" in section:
        labels = ["System", "Entwurf", "Konstruktion", "BIM"]
        x = 190
        y = HEIGHT - 280
        for idx, label in enumerate(labels):
            color = [accent, accent_2, accent_3, "#8c8c8c"][idx]
            draw.rounded_rectangle((x, y, x + 260, y + 78), radius=18, fill=color)
            draw.text((x + 28, y + 22), label, font=meta_font, fill="white")
            if idx < len(labels) - 1:
                draw.line((x + 275, y + 39, x + 335, y + 39), fill=muted, width=4)
                draw.polygon([(x + 335, y + 39), (x + 318, y + 29), (x + 318, y + 49)], fill=muted)
            x += 350
    elif "IFC" in title or "IFC" in section:
        nodes = [("IfcProject", 230, HEIGHT - 320), ("IfcBuilding", 610, HEIGHT - 250), ("IfcElement", 1010, HEIGHT - 320), ("PropertySets", 1390, HEIGHT - 250)]
        for label, x, y in nodes:
            draw.ellipse((x, y, x + 190, y + 190), outline=accent, width=5, fill="#ffffff")
            draw.text((x + 24, y + 78), label, font=meta_font, fill=text)
        for (_, x1, y1), (_, x2, y2) in zip(nodes, nodes[1:]):
            draw.line((x1 + 190, y1 + 95, x2, y2 + 95), fill=muted, width=4)
    else:
        draw.line((190, HEIGHT - 245, WIDTH - 190, HEIGHT - 245), fill=line, width=4)
        for idx, color in enumerate([accent, accent_2, accent_3]):
            x = 260 + idx * 500
            draw.rounded_rectangle((x, HEIGHT - 320, x + 280, HEIGHT - 170), radius=22, outline=color, width=6)
            draw.line((x + 55, HEIGHT - 245, x + 225, HEIGHT - 245), fill=color, width=5)
    img.save(card_path)
    return card_path


def is_scene_card(path: str | None) -> bool:
    return bool(path and "/cards/" in path)


def ffprobe_duration(path: Path) -> float:
    result = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        quiet=False,
    )
    return float(result.stdout.strip())


def write_wave(path: Path, pcm: bytes, channels: int = 1, rate: int = 24000, sample_width: int = 2) -> None:
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm)


def synthesize_gemini_tts(text: str, wav_path: Path, model: str, voice: str) -> None:
    api_key = require_key()
    prompt = (
        "Read this German educational narration in a calm, precise, natural documentary voice. "
        "Keep the wording exact. Do not add extra words. Speak clearly with short pauses at punctuation.\n\n"
        + text
    )
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice,
                    }
                }
            },
        },
    }
    response = request_json(
        "POST",
        f"{BASE_URL}/models/{model}:generateContent",
        api_key,
        payload,
        timeout=120,
    )
    try:
        inline = response["candidates"][0]["content"]["parts"][0]["inlineData"]
        audio_data = base64.b64decode(inline["data"])
    except (KeyError, IndexError, TypeError, ValueError) as exc:
        raise VideoGenerationError("Gemini-TTS lieferte kein Audio:\n" + json.dumps(response, indent=2)) from exc
    write_wave(wav_path, audio_data)


def resolve_tts_provider(provider: str) -> str:
    if provider != "auto":
        return provider
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if api_key and api_key not in {"...", "YOUR_GEMINI_API_KEY"}:
        return "gemini"
    return "local"


def make_audio(
    scene: dict[str, Any],
    path: Path,
    provider: str,
    local_voice: str,
    gemini_model: str,
    gemini_voice: str,
) -> float:
    duration = float(scene.get("duration") or estimate_duration(scene["narration"]))
    provider = resolve_tts_provider(provider)
    if provider == "silent":
        run(
            [
                "ffmpeg",
                "-y",
                "-f",
                "lavfi",
                "-i",
                "anullsrc=channel_layout=stereo:sample_rate=44100",
                "-t",
                f"{duration:.2f}",
                "-c:a",
                "aac",
                str(path),
            ],
            quiet=True,
        )
        return duration

    if provider == "gemini":
        wav = path.with_suffix(".wav")
        synthesize_gemini_tts(scene["narration"], wav, gemini_model, gemini_voice)
        run(["ffmpeg", "-y", "-i", str(wav), "-ar", "44100", "-ac", "2", "-c:a", "aac", str(path)], quiet=True)
        return ffprobe_duration(path) + 0.35

    if not shutil.which("say"):
        return make_audio(scene, path, "silent", local_voice, gemini_model, gemini_voice)

    aiff = path.with_suffix(".aiff")
    try:
        run(["say", "-v", local_voice, "-o", str(aiff), scene["narration"]], quiet=True)
    except subprocess.CalledProcessError:
        run(["say", "-o", str(aiff), scene["narration"]], quiet=True)
    run(["ffmpeg", "-y", "-i", str(aiff), "-ar", "44100", "-ac", "2", "-c:a", "aac", str(path)], quiet=True)
    return max(duration, ffprobe_duration(path) + 0.7)


def image_for_scene(scene: dict[str, Any], fallback: Path | None) -> Path:
    image = scene.get("image")
    if image:
        candidate = ROOT / str(image)
        if candidate.exists():
            return candidate
    if fallback and fallback.exists():
        return fallback
    raise VideoGenerationError(f"Keine Bilddatei für Szene {scene.get('id')}: {scene.get('title')}")


def video_for_scene(scene: dict[str, Any]) -> Path | None:
    raw = scene.get("video")
    if not raw:
        return None
    candidate = ROOT / str(raw)
    return candidate if candidate.exists() else None


def zoom_expr(motion: str, frames: int, mode: str) -> str:
    if mode == "still" or motion == "still":
        return "1"
    denom = max(frames - 1, 1)
    if motion == "slow_zoom_out":
        return f"1.015-0.015*on/{denom}"
    return f"1+0.015*on/{denom}"


def pan_expr(motion: str, mode: str) -> tuple[str, str]:
    if mode == "still" or motion == "still":
        return ("iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)")
    if motion == "pan_right":
        return ("iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)")
    if motion == "pan_left":
        return ("iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)")
    return ("iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)")


def render_scene(
    scene: dict[str, Any],
    image: Path,
    audio: Path,
    output: Path,
    duration: float,
    motion_mode: str,
    image_fit: str,
) -> None:
    frames = max(1, int(duration * FPS))
    motion = str(scene.get("motion", "slow_zoom_in"))
    x_expr, y_expr = pan_expr(motion, motion_mode)
    z_expr = zoom_expr(motion, frames, motion_mode)

    if image_fit == "contain":
        filters = [
            f"scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease",
            f"pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=white",
            f"zoompan=z='{z_expr}':x='{x_expr}':y='{y_expr}':d={frames}:s={WIDTH}x{HEIGHT}:fps={FPS}",
            "format=yuv420p",
        ]
    else:
        filters = [
            f"scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=increase",
            f"crop={WIDTH}:{HEIGHT}",
            f"zoompan=z='{z_expr}':x='{x_expr}':y='{y_expr}':d={frames}:s={WIDTH}x{HEIGHT}:fps={FPS}",
            "format=yuv420p",
        ]
    if ffmpeg_has_filter("drawtext"):
        title_lines = wrap_label(str(scene.get("title", "")))
        section = str(scene.get("section", scene.get("title", "")))
        font = fontfile()
        font_part = f"fontfile='{ffmpeg_text(font)}':" if font else ""
        filters.extend(
            [
                "drawbox=x=0:y=h-300:w=w:h=300:color=black@0.58:t=fill",
                f"drawtext={font_part}text='{ffmpeg_text(section)}':x=80:y=h-242:fontsize=30:fontcolor=white@0.78",
            ]
        )
        for idx, line in enumerate(title_lines):
            filters.append(
                f"drawtext={font_part}text='{ffmpeg_text(line)}':x=80:y=h-{190 - idx * 52}:fontsize=46:fontcolor=white"
            )
        filters.append(
            f"drawtext={font_part}text='{ffmpeg_text(scene.get('id', ''))}':x=w-170:y=h-92:fontsize=26:fontcolor=white@0.65"
        )
    vf = ",".join(filters)

    run(
        [
            "ffmpeg",
            "-y",
            "-loop",
            "1",
            "-i",
            str(image),
            "-i",
            str(audio),
            "-t",
            f"{duration:.2f}",
            "-vf",
            vf,
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-shortest",
            str(output),
        ],
        quiet=True,
    )


def render_video_scene(video: Path, audio: Path, output: Path, duration: float, image_fit: str) -> None:
    if image_fit == "contain":
        vf = f"scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=white,format=yuv420p"
    else:
        vf = f"scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=increase,crop={WIDTH}:{HEIGHT},format=yuv420p"
    run(
        [
            "ffmpeg",
            "-y",
            "-stream_loop",
            "-1",
            "-i",
            str(video),
            "-i",
            str(audio),
            "-t",
            f"{duration:.2f}",
            "-vf",
            vf,
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-shortest",
            str(output),
        ],
        quiet=True,
    )


def veo_prompt_for_scene(scene: dict[str, Any], chapter_title: str) -> str:
    existing = scene.get("veo", {}).get("prompt")
    if existing:
        prompt = str(existing)
    else:
        prompt = make_veo_candidate_prompt(chapter_title, str(scene.get("title", "")), str(scene.get("narration", "")))
    narration = visual_concept_text(str(scene.get("narration", "")).strip())
    prompt = strip_veo_narration(sanitize_veo_text(prompt))
    return f"""{prompt}

Critical constraints:
- Generate an 8-second visual explainer clip for a German architecture/BIM learning video.
- The final hybrid film will mute this clip and use separate narration.
- Visual concept to support: "{narration}"
- Do not render any readable text, words, letters, labels, subtitles, UI captions, names, numbers or paragraph blocks.
- Prefer wordless diagrams, architectural process visuals, arrows, highlighted layers and clean transitions.
- Do not show irrelevant generic presentation slides or title cards.
- Do not depict real people, celebrities, authors, named theorists, portraits or likenesses.
- Keep camera stable; no handheld wobble, no fast pans."""


def sanitize_veo_text(text: str) -> str:
    replacements = {
        "Frank Duffy": "ein Architekturtheoretiker",
        "Stewart Brand": "ein Architekturautor",
        "Duffy": "ein Architekturtheoretiker",
        "Brand": "ein Architekturautor",
    }
    out = text
    for old, new in replacements.items():
        out = out.replace(old, new)
    return out


def strip_veo_narration(text: str) -> str:
    text = re.sub(r'\s*Native narration:\s*"[^"]*"', "", text)
    text = re.sub(r'\s*Native narration:\s*.*$', "", text, flags=re.MULTILINE)
    return text.strip()


def visual_concept_text(text: str) -> str:
    text = sanitize_veo_text(text)
    sentences = re.split(r"(?<=[.!?])\s+", text)
    filtered = [
        sentence
        for sentence in sentences
        if not re.search(r"Architekturtheoretiker|Architekturautor|bekannt", sentence, re.IGNORECASE)
    ]
    out = " ".join(filtered).strip()
    return out or "Der zentrale Fachinhalt soll als ruhige Architektur- und BIM-Diagrammanimation sichtbar werden."


def should_generate_veo(scene: dict[str, Any], fill_cards: bool) -> bool:
    if scene.get("veo", {}).get("recommended"):
        return True
    if fill_cards and is_scene_card(scene.get("image")):
        return True
    return False


def reference_images_for_veo(scene: dict[str, Any]) -> list[Path]:
    image = scene.get("image")
    if not image or is_scene_card(str(image)):
        return []
    candidate = ROOT / str(image)
    if candidate.exists() and candidate.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
        return [candidate]
    return []


def fill_veo_scenes(
    plan: dict[str, Any],
    model: str,
    max_scenes: int,
    duration: int,
    poll_interval: int,
    timeout: int,
    force: bool,
    fill_cards: bool,
    use_reference_images: bool,
) -> None:
    api_key = require_key()
    slug = str(plan.get("chapter", {}).get("slug", "chapter"))
    chapter_title = str(plan.get("chapter", {}).get("title", slug))
    veo_dir = ROOT / "assets" / "videos" / "veo"
    veo_dir.mkdir(parents=True, exist_ok=True)

    generated = 0
    for scene in plan.get("scenes", []):
        if max_scenes >= 0 and generated >= max_scenes:
            break
        if not force and scene.get("video") and (ROOT / str(scene["video"])).exists():
            continue
        if not should_generate_veo(scene, fill_cards):
            continue

        scene_id = str(scene.get("id", f"scene-{generated + 1}"))
        output_path = veo_dir / f"{slug}-{scene_id}.mp4"
        prompt_path = veo_dir / f"{slug}-{scene_id}.prompt.txt"
        operation_path = veo_dir / f"{slug}-{scene_id}.operation.json"

        if output_path.exists() and not force:
            scene["video"] = str(output_path.relative_to(ROOT))
            scene["visual_source"] = "veo"
            generated += 1
            continue

        prompt = veo_prompt_for_scene(scene, chapter_title)
        prompt_path.write_text(prompt, encoding="utf-8")
        refs = reference_images_for_veo(scene) if use_reference_images else []
        print(f"Generiere Veo-Szene {scene_id}: {scene.get('title')}")
        if refs:
            for ref in refs:
                print(f"  Referenzbild: {ref.relative_to(ROOT)}")
        operation_name = start_generation(
            api_key=api_key,
            model=model,
            prompt=prompt,
            images=refs,
            duration=duration,
            aspect_ratio="16:9",
            resolution="720p",
        )
        operation_response = poll_generation(api_key, operation_name, poll_interval, timeout)
        operation_path.write_text(json.dumps(operation_response, ensure_ascii=False, indent=2), encoding="utf-8")
        video_uri = extract_video_uri(operation_response)
        download_video(api_key, video_uri, output_path)
        scene["video"] = str(output_path.relative_to(ROOT))
        scene["visual_source"] = "veo"
        scene.setdefault("veo", {})
        scene["veo"]["generated"] = True
        scene["veo"]["model"] = model
        scene["veo"]["duration"] = duration
        generated += 1


def render_plan(
    plan: dict[str, Any],
    output_path: Path,
    work_dir: Path,
    tts_provider: str,
    local_voice: str,
    gemini_tts_model: str,
    gemini_tts_voice: str,
    motion_mode: str,
    image_fit: str,
) -> None:
    ensure_tool("ffmpeg")
    ensure_tool("ffprobe")
    work_dir.mkdir(parents=True, exist_ok=True)
    fallback = cover_for_slug(plan["chapter"]["slug"])
    clips: list[Path] = []
    for idx, scene in enumerate(plan["scenes"]):
        print(f"Rendere Szene {idx + 1}/{len(plan['scenes'])}: {scene.get('title')}")
        audio = work_dir / f"{idx:02d}.m4a"
        duration = make_audio(scene, audio, tts_provider, local_voice, gemini_tts_model, gemini_tts_voice)
        scene["duration"] = round(duration, 2)
        clip = work_dir / f"{idx:02d}.mp4"
        scene_video = video_for_scene(scene)
        if scene_video:
            render_video_scene(scene_video, audio, clip, duration, image_fit)
        else:
            image = image_for_scene(scene, fallback)
            render_scene(scene, image, audio, clip, duration, motion_mode, image_fit)
        clips.append(clip)

    concat_file = work_dir / "concat.txt"
    concat_file.write_text("".join(f"file '{clip}'\n" for clip in clips), encoding="utf-8")
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(concat_file),
            "-c",
            "copy",
            str(output_path),
        ],
        quiet=True,
    )


def srt_time(seconds: float) -> str:
    millis = int(round(seconds * 1000))
    hours, rem = divmod(millis, 3_600_000)
    minutes, rem = divmod(rem, 60_000)
    secs, ms = divmod(rem, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{ms:03d}"


def write_transcripts(plan: dict[str, Any], output_path: Path) -> None:
    txt_path = output_path.with_suffix(".transcript.txt")
    srt_path = output_path.with_suffix(".srt")
    txt_lines = [
        plan.get("chapter", {}).get("title", ""),
        "",
        "Exact rendered narration by scene:",
        "",
    ]
    srt_blocks: list[str] = []
    cursor = 0.0
    for idx, scene in enumerate(plan.get("scenes", []), start=1):
        duration = float(scene.get("duration", 0))
        start = cursor
        end = cursor + duration
        narration = str(scene.get("narration", "")).strip()
        txt_lines.append(f"{scene.get('id', f's{idx:02d}')} | {scene.get('title', '')}")
        txt_lines.append(narration)
        txt_lines.append("")
        srt_blocks.append(
            f"{idx}\n{srt_time(start)} --> {srt_time(end)}\n{narration}\n"
        )
        cursor = end
    txt_path.write_text("\n".join(txt_lines), encoding="utf-8")
    srt_path.write_text("\n".join(srt_blocks), encoding="utf-8")


def prepare_review_video(video_path: Path, work_dir: Path, max_bytes: int) -> Path:
    if video_path.stat().st_size <= max_bytes:
        return video_path

    ensure_tool("ffmpeg")
    work_dir.mkdir(parents=True, exist_ok=True)
    review_path = work_dir / f"{video_path.stem}.review.mp4"
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(video_path),
            "-vf",
            "scale=960:-2",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "31",
            "-c:a",
            "aac",
            "-b:a",
            "64k",
            str(review_path),
        ],
        quiet=True,
    )
    return review_path


def review_video_with_gemini(
    plan: dict[str, Any],
    video_path: Path,
    review_path: Path,
    model: str,
    max_bytes: int,
    work_dir: Path,
) -> dict[str, Any]:
    api_key = require_key()
    review_video = prepare_review_video(video_path, work_dir, max_bytes)
    video_bytes = review_video.read_bytes()
    if len(video_bytes) > max_bytes:
        raise VideoGenerationError(
            f"Review-Video ist mit {len(video_bytes)} Bytes zu groß für Inline-Review. "
            "Erhöhe --review-max-bytes oder komprimiere stärker."
        )

    transcript_path = video_path.with_suffix(".transcript.txt")
    transcript = transcript_path.read_text(encoding="utf-8") if transcript_path.exists() else ""
    prompt = f"""You are a strict QA reviewer for a German educational architecture/BIM video.

Evaluate the attached rendered MP4 against this scene plan and exact transcript.
Focus on issues the learner can see or hear:
- image framing: no important diagram text or content should be cropped
- motion stability: no wobbling, jitter, breathing, distracting zoom, or arbitrary pan
- focus relevance: if a zoom exists, it must point to the concept being spoken about
- audio/video alignment: the displayed visual must match the spoken scene
- transcript integrity: spoken content should match the provided exact rendered transcript
- learning value: identify scenes that should be replaced or augmented by an 8-second Veo snippet

Return strict JSON only with this schema:
{{
  "pass": true,
  "overall_score": 0,
  "scores": {{
    "framing": 0,
    "motion_stability": 0,
    "focus_relevance": 0,
    "audio_visual_alignment": 0,
    "transcript_integrity": 0,
    "learning_value": 0
  }},
  "critical_issues": ["short issue"],
  "scene_reviews": [
    {{
      "scene_id": "s00",
      "time_range": "00:00-00:10",
      "score": 0,
      "issues": ["short issue"],
      "suggested_motion": "still",
      "suggested_image_fit": "contain",
      "suggested_focus": "full",
      "use_veo": false,
      "veo_reason": "",
      "veo_prompt": ""
    }}
  ],
  "auto_fix_recommendation": {{
    "motion": "still",
    "image_fit": "contain",
    "reason": "short reason"
  }}
}}

Pass only if overall_score >= 8, framing >= 8, motion_stability >= 8, and audio_visual_alignment >= 8.

Scene plan:
{json.dumps(plan, ensure_ascii=False, indent=2)}

Exact rendered transcript:
{transcript}
"""
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": prompt},
                    {
                        "inlineData": {
                            "mimeType": "video/mp4",
                            "data": base64.b64encode(video_bytes).decode("ascii"),
                        }
                    },
                ],
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.1,
        },
    }
    response = request_json(
        "POST",
        f"{BASE_URL}/models/{model}:generateContent",
        api_key,
        payload,
        timeout=240,
    )
    try:
        text = response["candidates"][0]["content"]["parts"][0]["text"]
        review = parse_json_text(text)
    except (KeyError, IndexError, TypeError, json.JSONDecodeError) as exc:
        raise VideoGenerationError("Gemini-Review lieferte kein gültiges JSON:\n" + json.dumps(response, indent=2)) from exc

    review["reviewed_video"] = str(video_path.relative_to(ROOT))
    if review_video != video_path:
        review["review_video_proxy"] = str(review_video.relative_to(ROOT))
    review_path.write_text(json.dumps(review, ensure_ascii=False, indent=2), encoding="utf-8")
    return review


def review_passed(review: dict[str, Any], threshold: float) -> bool:
    scores = review.get("scores", {})
    required = [
        float(review.get("overall_score", 0)),
        float(scores.get("framing", 0)),
        float(scores.get("motion_stability", 0)),
        float(scores.get("audio_visual_alignment", 0)),
    ]
    return bool(review.get("pass")) and min(required) >= threshold


def apply_review_autofix(
    review: dict[str, Any],
    plan: dict[str, Any],
    current_motion: str,
    current_image_fit: str,
) -> tuple[str, str, bool]:
    scores = review.get("scores", {})
    next_motion = current_motion
    next_image_fit = current_image_fit
    changed = False

    if float(scores.get("motion_stability", 10)) < 8 or float(scores.get("focus_relevance", 10)) < 7:
        if next_motion != "still":
            next_motion = "still"
            changed = True

    if float(scores.get("framing", 10)) < 8:
        if next_image_fit != "contain":
            next_image_fit = "contain"
            changed = True

    recommendation = review.get("auto_fix_recommendation", {})
    if recommendation.get("motion") == "still" and next_motion != "still":
        next_motion = "still"
        changed = True
    if recommendation.get("image_fit") == "contain" and next_image_fit != "contain":
        next_image_fit = "contain"
        changed = True

    slug = str(plan.get("chapter", {}).get("slug", "chapter"))
    scenes_by_id = {scene.get("id"): scene for scene in plan.get("scenes", [])}
    for scene_review in review.get("scene_reviews", []):
        scene_id = scene_review.get("scene_id")
        scene = scenes_by_id.get(scene_id)
        if not scene:
            continue
        if scene.get("kind") == "title" or scene.get("id") == "s00":
            continue
        score = float(scene_review.get("score", 10))
        issue_text = " ".join(str(issue).lower() for issue in scene_review.get("issues", []))
        visual_mismatch = any(term in issue_text for term in ["contradict", "irrelevant", "reused", "not ideal", "does not directly"])
        if score < 5 or visual_mismatch:
            card_path = create_scene_card(scene, slug)
            scene["image"] = str(card_path.relative_to(ROOT))
            scene["motion"] = "still"
            scene.setdefault("autofix", {})
            scene["autofix"]["image_replaced_by_card"] = True
            scene["autofix"]["reason"] = scene_review.get("issues", [])
            changed = True
        if scene_review.get("use_veo"):
            scene.setdefault("veo", {})
            scene["veo"]["recommended"] = True
            scene["veo"]["reason"] = scene_review.get("veo_reason", scene["veo"].get("reason", ""))
            scene["veo"]["prompt"] = scene_review.get("veo_prompt", scene["veo"].get("prompt", ""))

    return next_motion, next_image_fit, changed


def summarize_plan(plan: dict[str, Any]) -> None:
    total = sum(float(scene.get("duration", 0)) for scene in plan["scenes"])
    veo = [scene for scene in plan["scenes"] if scene.get("veo", {}).get("recommended")]
    print(f"Szenen: {len(plan['scenes'])}")
    print(f"Lokale Videolänge: {total / 60:.1f} min")
    print(f"Veo-Kandidaten: {len(veo)}")
    for scene in veo:
        print(f"  - {scene.get('id')} {scene.get('title')}: {scene.get('veo', {}).get('reason')}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Render a low-cost hybrid chapter explainer video.")
    parser.add_argument("chapter", help="Chapter slug or markdown path, e.g. 06-waermeschutz-geg")
    parser.add_argument("--target-minutes", type=float, default=3.0)
    parser.add_argument("--max-scenes", type=int, default=8)
    parser.add_argument("--plan-with-gemini", action="store_true")
    parser.add_argument("--planner-model", default=os.environ.get("GEMINI_PLANNER_MODEL", DEFAULT_PLANNER_MODEL))
    parser.add_argument("--plan-only", action="store_true")
    parser.add_argument("--render-only", action="store_true")
    parser.add_argument("--no-inject", action="store_true")
    parser.add_argument("--tts-provider", choices=["auto", "gemini", "local", "silent"], default=os.environ.get("HYBRID_TTS_PROVIDER", "auto"))
    parser.add_argument("--no-tts", action="store_true", help="Deprecated alias for --tts-provider silent.")
    parser.add_argument("--voice", default=os.environ.get("HYBRID_TTS_VOICE", DEFAULT_TTS_VOICE))
    parser.add_argument("--gemini-tts-model", default=os.environ.get("GEMINI_TTS_MODEL", DEFAULT_TTS_MODEL))
    parser.add_argument("--gemini-tts-voice", default=os.environ.get("GEMINI_TTS_VOICE", DEFAULT_GEMINI_TTS_VOICE))
    parser.add_argument("--motion", choices=["still", "gentle"], default="gentle")
    parser.add_argument("--image-fit", choices=["contain", "cover"], default="contain")
    parser.add_argument("--review-with-gemini", action="store_true")
    parser.add_argument("--review-only", action="store_true")
    parser.add_argument("--quality-loop", action="store_true")
    parser.add_argument("--max-quality-passes", type=int, default=2)
    parser.add_argument("--quality-threshold", type=float, default=8.0)
    parser.add_argument("--review-model", default=os.environ.get("GEMINI_REVIEW_MODEL", DEFAULT_REVIEW_MODEL))
    parser.add_argument("--review-max-bytes", type=int, default=DEFAULT_REVIEW_MAX_BYTES)
    parser.add_argument("--fill-veo", action="store_true", help="Generate Veo clips for recommended scenes before rendering.")
    parser.add_argument("--fill-veo-cards", action="store_true", help="Also replace generated fallback cards with Veo clips.")
    parser.add_argument("--veo-model", default=os.environ.get("GEMINI_VIDEO_MODEL", DEFAULT_VEO_MODEL))
    parser.add_argument("--veo-max-scenes", type=int, default=3, help="Maximum Veo clips to generate; use -1 for unlimited.")
    parser.add_argument("--veo-duration", type=int, choices=[4, 6, 8], default=8)
    parser.add_argument("--veo-poll-interval", type=int, default=10)
    parser.add_argument("--veo-timeout", type=int, default=900)
    parser.add_argument("--veo-use-reference-images", action="store_true")
    parser.add_argument("--force-veo", action="store_true")
    parser.add_argument("--keep-work", action="store_true")
    return parser.parse_args()


def main() -> int:
    load_dotenv(ROOT / ".env")
    args = parse_args()
    try:
        chapter_path = read_chapter(args.chapter)
        markdown = chapter_path.read_text(encoding="utf-8")
        slug = chapter_path.stem
        out_dir = ROOT / "assets" / "videos"
        out_dir.mkdir(parents=True, exist_ok=True)
        plan_path = out_dir / f"{slug}.hybrid-plan.json"
        output_path = out_dir / f"{slug}.hybrid.mp4"
        review_path = out_dir / f"{slug}.hybrid-review.json"
        work_dir = out_dir / ".work" / slug

        if args.review_only:
            if not plan_path.exists():
                raise VideoGenerationError(f"Plan fehlt: {plan_path.relative_to(ROOT)}")
            if not output_path.exists():
                raise VideoGenerationError(f"Video fehlt: {output_path.relative_to(ROOT)}")
            plan = json.loads(plan_path.read_text(encoding="utf-8"))
            review = review_video_with_gemini(
                plan,
                output_path,
                review_path,
                args.review_model,
                args.review_max_bytes,
                work_dir,
            )
            print(f"Review: {review_path.relative_to(ROOT)}")
            print(f"Score: {review.get('overall_score')} | Pass: {review.get('pass')}")
            return 0

        if args.render_only:
            if not plan_path.exists():
                raise VideoGenerationError(f"Plan fehlt: {plan_path.relative_to(ROOT)}")
            plan = json.loads(plan_path.read_text(encoding="utf-8"))
        elif args.plan_with_gemini:
            print(f"Plane mit Gemini: {args.planner_model}")
            plan = gemini_plan(chapter_path, markdown, args.target_minutes, args.max_scenes, args.planner_model)
            plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")
        else:
            plan = heuristic_plan(chapter_path, markdown, args.target_minutes, args.max_scenes)
            plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")

        print(f"Plan: {plan_path.relative_to(ROOT)}")
        summarize_plan(plan)

        if args.plan_only:
            print("Plan-only: kein Video gerendert.")
            return 0

        if args.fill_veo or args.fill_veo_cards:
            fill_veo_scenes(
                plan,
                model=args.veo_model,
                max_scenes=args.veo_max_scenes,
                duration=args.veo_duration,
                poll_interval=args.veo_poll_interval,
                timeout=args.veo_timeout,
                force=args.force_veo,
                fill_cards=args.fill_veo_cards,
                use_reference_images=args.veo_use_reference_images,
            )
            plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")

        tts_provider = "silent" if args.no_tts else args.tts_provider
        motion = args.motion
        image_fit = args.image_fit
        passes = max(1, args.max_quality_passes if args.quality_loop else 1)
        last_review: dict[str, Any] | None = None

        for quality_pass in range(1, passes + 1):
            if passes > 1:
                print(f"Qualitätspass {quality_pass}/{passes}: motion={motion}, image_fit={image_fit}")
            render_plan(
                plan,
                output_path,
                work_dir,
                tts_provider,
                args.voice,
                args.gemini_tts_model,
                args.gemini_tts_voice,
                motion,
                image_fit,
            )
            write_transcripts(plan, output_path)
            plan.setdefault("render_settings", {})
            plan["render_settings"].update({"motion": motion, "image_fit": image_fit})
            plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")

            if not (args.review_with_gemini or args.quality_loop):
                break

            last_review = review_video_with_gemini(
                plan,
                output_path,
                review_path,
                args.review_model,
                args.review_max_bytes,
                work_dir,
            )
            print(f"Review: {review_path.relative_to(ROOT)}")
            print(f"Score: {last_review.get('overall_score')} | Pass: {last_review.get('pass')}")
            if review_passed(last_review, args.quality_threshold):
                break
            if quality_pass >= passes:
                break

            motion, image_fit, changed = apply_review_autofix(last_review, plan, motion, image_fit)
            if not changed:
                print("Review fand Probleme, aber keine konservative Auto-Korrektur ist verfügbar.")
                break

        if not args.keep_work:
            shutil.rmtree(work_dir, ignore_errors=True)

        if not args.no_inject:
            inject_video(chapter_path, f"/assets/videos/{output_path.name}")
            print(f"Kapitel aktualisiert: {chapter_path.relative_to(ROOT)}")
        print(f"Video: {output_path.relative_to(ROOT)}")
        return 0
    except (VideoGenerationError, subprocess.CalledProcessError) as exc:
        print(f"Fehler: {exc}", file=sys.stderr)
        if isinstance(exc, subprocess.CalledProcessError) and exc.stderr:
            print(exc.stderr, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
