#!/usr/bin/env python3
"""Generate a short native-audio Veo clip for a chapter and embed it in markdown.

The script intentionally keeps the first prototype small: one 4/6/8 second
chapter opener. Veo can extend generated clips later; this gives us a stable
chapter integration point first.
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://generativelanguage.googleapis.com/v1beta"
DEFAULT_MODEL = "veo-3.1-generate-preview"
VIDEO_START = "<!-- CHAPTER_VIDEO:start -->"
VIDEO_END = "<!-- CHAPTER_VIDEO:end -->"


class VideoGenerationError(RuntimeError):
    pass


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def require_key() -> str:
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key or api_key in {"...", "YOUR_GEMINI_API_KEY"}:
        raise VideoGenerationError(
            "GEMINI_API_KEY fehlt. Trage den Key in .env ein oder exportiere ihn in der Shell."
        )
    return api_key


def slug_from_chapter(path: Path) -> str:
    return path.stem


def read_chapter(chapter_arg: str) -> Path:
    path = Path(chapter_arg)
    if not path.suffix:
        path = ROOT / "docs" / "chapters" / f"{chapter_arg}.md"
    elif not path.is_absolute():
        path = ROOT / path
    if not path.exists():
        raise VideoGenerationError(f"Kapitel nicht gefunden: {path}")
    return path


def extract_title(markdown: str, fallback: str) -> str:
    match = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
    return match.group(1).strip() if match else fallback


def strip_markdown(markdown: str) -> str:
    text = re.sub(r"<!-- IMAGE[\s\S]*?-->\s*!\[[^\]]*\]\([^)]+\)", " ", markdown)
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"!!!\s+\w+(?:\s+\"[^\"]*\")?", " ", text)
    text = re.sub(r"::([^:]+)::", r"\1", text)
    text = re.sub(r"\^\^[\w-]+\^\^", " Formel ", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[#*_`>|-]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_headings(markdown: str, limit: int = 5) -> list[str]:
    headings = []
    for match in re.finditer(r"^##\s+(.+)$", markdown, re.MULTILINE):
        title = match.group(1).strip()
        if title and not title.lower().startswith("zusammenfassung"):
            headings.append(title)
        if len(headings) >= limit:
            break
    return headings


def extract_image_paths(markdown: str, chapter_path: Path, limit: int) -> list[Path]:
    paths: list[Path] = []
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", markdown):
        raw = match.group(1).strip()
        if raw.startswith(("http://", "https://", "/")):
            candidate = ROOT / raw.lstrip("/")
        elif raw.startswith("../assets/"):
            candidate = ROOT / raw.removeprefix("../")
        else:
            candidate = (chapter_path.parent / raw).resolve()
        if candidate.exists() and candidate.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
            paths.append(candidate)
        if len(paths) >= limit:
            break
    return paths


def make_voiceover(title: str, headings: list[str]) -> str:
    compact_title = re.sub(r"^Kapitel\s+\d+\s+[–-]\s+", "", title).strip()
    concepts = ", ".join(h.split(":")[0].strip() for h in headings[:3])
    if concepts:
        return f"{compact_title}: {concepts} werden als visuelles Gebäudesystem verständlich."
    return f"{compact_title}: die wichtigsten Zusammenhänge werden als visuelles Gebäudesystem verständlich."


def make_prompt(markdown: str, chapter_path: Path, image_paths: list[Path]) -> str:
    title = extract_title(markdown, chapter_path.stem)
    headings = extract_headings(markdown)
    summary = strip_markdown(markdown)
    summary = summary[:1800]
    voiceover = make_voiceover(title, headings)
    visual_refs = ", ".join(path.stem for path in image_paths) if image_paths else "no reference images"

    return f"""Create an 8-second German educational YouTube-style explainer video for a BIM/architecture textbook chapter.

Chapter title: {title}
Core chapter material: {summary}
Key sections: {", ".join(headings) if headings else "derive from chapter material"}
Reference images provided: {visual_refs}

Visual direction:
- clean architectural education style, 16:9, technical but warm
- show building-section diagrams, plan overlays, arrows, labels and simple motion
- if reference images are provided, preserve their conceptual look and turn them into an animated explanation
- do not invent brand logos or unrelated people
- keep text overlays short and in German

Native audio:
- generate clear German narration, no music louder than the voice
- narrator says exactly: "{voiceover}"
- add subtle UI-like sound cues only if they support the explanation

The result should feel like the first 8 seconds of a high-quality German YouTube explainer for this chapter."""


def image_payload(path: Path) -> dict[str, Any]:
    mime_type = mimetypes.guess_type(path.name)[0] or "image/png"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return {
        "image": {"inlineData": {"mimeType": mime_type, "data": data}},
        "referenceType": "asset",
    }


def request_json(
    method: str,
    url: str,
    api_key: str,
    payload: dict[str, Any] | None = None,
    timeout: int = 60,
) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="replace")
        raise VideoGenerationError(f"Gemini API Fehler {exc.code}: {details}") from exc
    except urllib.error.URLError as exc:
        raise VideoGenerationError(f"Gemini API nicht erreichbar: {exc}") from exc


def start_generation(
    api_key: str,
    model: str,
    prompt: str,
    images: list[Path],
    duration: int,
    aspect_ratio: str,
    resolution: str,
) -> str:
    instance: dict[str, Any] = {"prompt": prompt}
    if images:
        instance["referenceImages"] = [image_payload(path) for path in images]

    payload: dict[str, Any] = {
        "instances": [instance],
        "parameters": {
            "aspectRatio": aspect_ratio,
            "durationSeconds": duration,
            "resolution": resolution,
        },
    }
    response = request_json(
        "POST",
        f"{BASE_URL}/models/{model}:predictLongRunning",
        api_key,
        payload,
        timeout=120,
    )
    operation_name = response.get("name")
    if not operation_name:
        raise VideoGenerationError(f"Keine Operation in API-Antwort: {json.dumps(response, indent=2)}")
    return operation_name


def poll_generation(api_key: str, operation_name: str, interval: int, timeout: int) -> dict[str, Any]:
    deadline = time.time() + timeout
    while time.time() < deadline:
        response = request_json("GET", f"{BASE_URL}/{operation_name}", api_key, timeout=60)
        if response.get("done"):
            if "error" in response:
                raise VideoGenerationError(
                    f"Veo-Generierung fehlgeschlagen: {json.dumps(response['error'], ensure_ascii=False)}"
                )
            return response
        print("Warte auf Veo-Generierung ...")
        time.sleep(interval)
    raise VideoGenerationError(f"Timeout nach {timeout} Sekunden: {operation_name}")


def extract_video_uri(operation_response: dict[str, Any]) -> str:
    try:
        return operation_response["response"]["generateVideoResponse"]["generatedSamples"][0]["video"]["uri"]
    except (KeyError, IndexError, TypeError) as exc:
        raise VideoGenerationError(
            "Konnte Video-URI nicht aus Operation-Antwort lesen:\n"
            + json.dumps(operation_response, indent=2, ensure_ascii=False)
        ) from exc


def download_video(api_key: str, uri: str, output_path: Path) -> None:
    request = urllib.request.Request(uri, headers={"x-goog-api-key": api_key})
    try:
        with urllib.request.urlopen(request, timeout=300) as response:
            output_path.write_bytes(response.read())
    except urllib.error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="replace")
        raise VideoGenerationError(f"Video-Download fehlgeschlagen {exc.code}: {details}") from exc


def video_block(video_src: str, title: str) -> str:
    return f"""{VIDEO_START}
<figure class="chapter-video">
  <video controls preload="metadata" playsinline src="{video_src}"></video>
  <figcaption>KI-generierter Kapitelclip: {title}</figcaption>
</figure>
{VIDEO_END}"""


def inject_video(chapter_path: Path, video_src: str) -> None:
    markdown = chapter_path.read_text(encoding="utf-8")
    title = extract_title(markdown, chapter_path.stem)
    block = video_block(video_src, title)
    markdown = re.sub(
        rf"\n?{re.escape(VIDEO_START)}[\s\S]*?{re.escape(VIDEO_END)}\n?",
        "\n",
        markdown,
    )
    markdown = re.sub(r"\n{4,}", "\n\n\n", markdown)

    delimiter_matches = list(re.finditer(r"^---\s*$", markdown, re.MULTILINE))
    if len(delimiter_matches) >= 2:
        insert_at = delimiter_matches[1].end()
        before = markdown[:insert_at].rstrip()
        after = markdown[insert_at:].lstrip()
        updated = before + "\n\n" + block + "\n\n" + after
    else:
        h1 = re.search(r"^#\s+.+$", markdown, re.MULTILINE)
        insert_at = h1.end() if h1 else 0
        before = markdown[:insert_at].rstrip()
        after = markdown[insert_at:].lstrip()
        updated = before + "\n\n" + block + "\n\n" + after

    chapter_path.write_text(updated, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a short Veo chapter video and embed it at the top of the chapter."
    )
    parser.add_argument("chapter", help="Chapter slug or markdown path, e.g. 06-waermeschutz-geg")
    parser.add_argument("--model", default=os.environ.get("GEMINI_VIDEO_MODEL", DEFAULT_MODEL))
    parser.add_argument("--duration", type=int, choices=[4, 6, 8], default=8)
    parser.add_argument("--aspect-ratio", choices=["16:9", "9:16"], default="16:9")
    parser.add_argument("--resolution", choices=["720p", "1080p", "4k"], default="720p")
    parser.add_argument("--image-limit", type=int, default=3, help="Number of chapter images to pass as Veo references.")
    parser.add_argument("--no-images", action="store_true", help="Do not pass chapter images as Veo references.")
    parser.add_argument("--no-inject", action="store_true", help="Generate only, do not modify the markdown chapter.")
    parser.add_argument("--dry-run", action="store_true", help="Write the Veo prompt and exit without calling Gemini.")
    parser.add_argument("--poll-interval", type=int, default=10)
    parser.add_argument("--timeout", type=int, default=600)
    return parser.parse_args()


def main() -> int:
    load_dotenv(ROOT / ".env")
    args = parse_args()

    try:
        chapter_path = read_chapter(args.chapter)
        markdown = chapter_path.read_text(encoding="utf-8")
        slug = slug_from_chapter(chapter_path)
        title = extract_title(markdown, slug)
        output_dir = ROOT / "assets" / "videos"
        output_dir.mkdir(parents=True, exist_ok=True)
        output_path = output_dir / f"{slug}.mp4"
        prompt_path = output_dir / f"{slug}.prompt.txt"
        operation_path = output_dir / f"{slug}.operation.json"

        images = [] if args.no_images else extract_image_paths(markdown, chapter_path, args.image_limit)
        prompt = make_prompt(markdown, chapter_path, images)
        prompt_path.write_text(prompt, encoding="utf-8")

        print(f"Kapitel: {title}")
        print(f"Prompt: {prompt_path.relative_to(ROOT)}")
        if images:
            print("Referenzbilder:")
            for path in images:
                print(f"  - {path.relative_to(ROOT)}")
        else:
            print("Referenzbilder: keine")

        if args.dry_run:
            print("Dry run: keine API-Anfrage gesendet.")
            return 0

        api_key = require_key()
        print(f"Starte Veo-Generierung mit {args.model} ...")
        operation_name = start_generation(
            api_key=api_key,
            model=args.model,
            prompt=prompt,
            images=images,
            duration=args.duration,
            aspect_ratio=args.aspect_ratio,
            resolution=args.resolution,
        )
        print(f"Operation: {operation_name}")
        operation_response = poll_generation(api_key, operation_name, args.poll_interval, args.timeout)
        operation_path.write_text(json.dumps(operation_response, indent=2, ensure_ascii=False), encoding="utf-8")

        video_uri = extract_video_uri(operation_response)
        print(f"Lade Video herunter: {output_path.relative_to(ROOT)}")
        download_video(api_key, video_uri, output_path)

        if not args.no_inject:
            inject_video(chapter_path, f"/assets/videos/{output_path.name}")
            print(f"Kapitel aktualisiert: {chapter_path.relative_to(ROOT)}")

        print("Fertig.")
        return 0
    except VideoGenerationError as exc:
        print(f"Fehler: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
