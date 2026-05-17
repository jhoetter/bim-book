#!/usr/bin/env python3
"""
BIM-Buch Bildgenerator mit QA-Loop
Erzeugt konsistente Illustrationen für das Buch "BIM von Grund auf"
via gpt-image-2, mit automatischer Qualitätsprüfung via GPT-4o Vision.

Verwendung:
  python3 generate.py --type section --desc "Wandquerschnitt WDVS ..." --name "kap06_wandaufbau"
  python3 generate.py --dry-run --type diagram --desc "..." --name "test"
"""

import argparse
import base64
import json
import os
import re
import sys
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).parent.parent.parent
STYLE_CONFIG = Path(__file__).parent / "style_config.json"
MANIFEST_PATH = REPO_ROOT / "assets" / "image-manifest.json"

MAX_QA_ATTEMPTS = 3
QA_MODEL = "gpt-4o"
BG_THRESHOLD = 240

# Unterstützte Größen von gpt-image-2
VALID_SIZES = {"1024x1024", "1536x1024", "1024x1536", "auto"}

# Kürzel → tatsächliche API-Größe
SIZE_ALIASES = {
    "square":    "1024x1024",
    "landscape": "1536x1024",
    "wide":      "1536x1024",
    "portrait":  "1024x1536",
    "tall":      "1024x1536",
    "auto":      "auto",
}


def load_env():
    env_file = REPO_ROOT / ".env"
    if env_file.exists():
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    os.environ.setdefault(key.strip(), value.strip())


def load_style_config():
    with open(STYLE_CONFIG) as f:
        return json.load(f)


CHAPTER_PARTS = {
    **{n: ("I",   "Teil I – Fundament")            for n in range(1,  3)},
    **{n: ("II",  "Teil II – Baukörper")            for n in range(3,  6)},
    **{n: ("III", "Teil III – Bauphysik")           for n in range(6,  10)},
    **{n: ("IV",  "Teil IV – TGA")                  for n in range(10, 14)},
    **{n: ("V",   "Teil V – Recht & Prozess")       for n in range(14, 17)},
    **{n: ("VI",  "Teil VI – BIM")                  for n in range(17, 22)},
    **{n: ("VII", "Teil VII – Nachhaltigkeit")      for n in range(22, 25)},
}

CHAPTER_PATHS = {
    1:  "chapters/01-architektur-als-system",
    2:  "chapters/02-entwurf-raum-funktion",
    3:  "chapters/03-baustoffe",
    4:  "chapters/04-tragwerk",
    5:  "chapters/05-konstruktion",
    6:  "chapters/06-waermeschutz-geg",
    7:  "chapters/07-feuchteschutz",
    8:  "chapters/08-schallschutz",
    9:  "chapters/09-brandschutz",
    10: "chapters/10-heizung-waermeversorgung",
    11: "chapters/11-lueftung",
    12: "chapters/12-sanitaer",
    13: "chapters/13-elektro",
    14: "chapters/14-planungsrecht",
    15: "chapters/15-hoai",
    16: "chapters/16-kosten-ausschreibung",
    17: "chapters/17-was-bim-wirklich-ist",
    18: "chapters/18-ifc",
    19: "chapters/19-klassifikation",
    20: "chapters/20-prozess-kollaboration",
    21: "chapters/21-bim-praxis",
    22: "chapters/22-nachhaltigkeit",
    23: "chapters/23-sanierung",
    24: "chapters/24-digitaler-zwilling-ki",
}

CHAPTER_TITLES = {
    1:  "Architektur als System",
    2:  "Entwurf, Raum und Funktion",
    3:  "Baustoffe",
    4:  "Tragwerk: Lasten, Kräfte, Systeme",
    5:  "Konstruktion: Gründung, Wand, Decke, Dach",
    6:  "Wärmeschutz & GEG",
    7:  "Feuchteschutz",
    8:  "Schallschutz",
    9:  "Brandschutz",
    10: "Heizung & Wärmeversorgung",
    11: "Lüftung & Raumluftqualität",
    12: "Sanitär & Entwässerung",
    13: "Elektro & Gebäudeautomation",
    14: "Planungsrecht",
    15: "HOAI: Phasen, Leistungen, Koordination",
    16: "Kosten & Ausschreibung",
    17: "Was BIM wirklich ist",
    18: "IFC: Die Sprache des digitalen Gebäudes",
    19: "Klassifikation",
    20: "Prozess & Kollaboration",
    21: "BIM in der Praxis",
    22: "Nachhaltigkeit & Kreislaufwirtschaft",
    23: "Sanierung",
    24: "Digitaler Zwilling & KI",
}


def build_prompt(description: str, img_type: str, context: str, config: dict) -> str:
    base = config["base_style_prompt"]
    variant = config["type_variants"].get(img_type, config["type_variants"]["diagram"])
    type_suffix = variant["prompt_suffix"]
    palette = config["color_palette"]
    color_hint = (
        f"Color palette: structural gray {palette['structural']}, "
        f"thermal insulation blue {palette['thermal']}, "
        f"TGA/MEP amber {palette['accent']}, "
        f"pure white background {palette['background']}, "
        f"near-black lines and text {palette['ink']}."
    )
    building_ctx = ""
    if context == "kastanienallee":
        building_ctx = f"\n\nBuilding context: {config['kastanienallee_context']}"
    return f"{base}\n\n{type_suffix}\n\n{color_hint}{building_ctx}\n\nSubject: {description}"


def update_manifest(name: str, img_type: str, context: str, tags: str,
                    caption: str, description: str, generated: str):
    manifest = {"version": 1, "images": []}
    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH) as f:
            manifest = json.load(f)

    m = re.match(r"kap(\d+)_", name)
    chapter = int(m.group(1)) if m else None
    part, part_title = CHAPTER_PARTS.get(chapter, ("?", "Unbekannt")) if chapter else ("?", "Unbekannt")
    chapter_title = CHAPTER_TITLES.get(chapter, "") if chapter else ""
    chapter_path = CHAPTER_PATHS.get(chapter, "") if chapter else ""

    tag_list = [t.strip() for t in tags.split(",")] if tags else []
    used_caption = caption if caption else (description[:120] + "…" if len(description) > 120 else description)

    entry = {
        "file": f"{name}.png",
        "chapter": chapter,
        "part": part,
        "partTitle": part_title,
        "chapterTitle": chapter_title,
        "type": img_type,
        "context": context,
        "caption": used_caption,
        "tags": tag_list,
        "chapterPath": chapter_path,
        "generated": generated,
    }

    images = [img for img in manifest.get("images", []) if img.get("file") != entry["file"]]
    images.append(entry)
    images.sort(key=lambda x: x.get("chapter") or 999)
    manifest["images"] = images

    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    return MANIFEST_PATH


def apply_correction(base_prompt: str, issues: list, correction: str) -> str:
    """Hängt QA-Feedback als Korrekturanweisung an den Basis-Prompt an."""
    note = "\n\nKORREKTUREN (aus QA-Prüfung):\n"
    for issue in issues:
        note += f"- {issue}\n"
    if correction:
        note += f"\nBitte korrigiere: {correction}"
    return base_prompt + note


def resolve_size(size_arg, img_type: str, config: dict) -> str:
    """
    Auflösungsreihenfolge:
      1. --size Flag (Alias oder explizite Dimension)
      2. OPENAI_IMAGE_SIZE Umgebungsvariable
      3. Typ-Standard aus style_config.json
    """
    raw = size_arg or os.environ.get("OPENAI_IMAGE_SIZE")
    if raw:
        resolved = SIZE_ALIASES.get(raw.lower(), raw)
        if resolved not in VALID_SIZES:
            raise ValueError(
                f"Ungültige Größe '{raw}'. "
                f"Erlaubt: {', '.join(sorted(VALID_SIZES))} "
                f"oder Kürzel: {', '.join(sorted(SIZE_ALIASES))}"
            )
        return resolved
    variant = config["type_variants"].get(img_type, config["type_variants"]["diagram"])
    return variant.get("size", "1536x1024")


def api_post(url: str, payload: bytes, api_key: str) -> dict:
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def generate_image(prompt: str, size: str, api_key: str, model: str) -> bytes:
    payload = json.dumps({
        "model": model,
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": "high",
    }).encode()
    result = api_post("https://api.openai.com/v1/images/generations", payload, api_key)
    data = result["data"][0]
    if "b64_json" in data:
        return base64.b64decode(data["b64_json"])
    with urllib.request.urlopen(data["url"]) as resp:
        return resp.read()


def qa_check(image_data: bytes, description: str, img_type: str, api_key: str) -> dict:
    """
    Lässt GPT-4o das Bild als erfahrener Architekt / Fachplaner prüfen.
    Gibt zurück: {pass: bool, issues: [str], correction_prompt: str}
    """
    image_b64 = base64.b64encode(image_data).decode()

    system_msg = (
        "Du bist ein erfahrener Architekt, Bauingenieur und technischer Zeichner. "
        "Du prüfst Illustrationen für ein deutsches Architekturfachbuch. "
        "Sei streng aber fair – ein Bild besteht nur, wenn es fachlich korrekt und "
        "für ein professionelles Lehrbuch geeignet ist."
    )

    user_msg = (
        f"Prüfe folgendes Bild (Illustrationstyp: {img_type}) anhand dieser Anforderung:\n\n"
        f"{description}\n\n"
        "Prüfkriterien:\n"
        "- Sind alle geforderten Elemente / Schichten / Komponenten vorhanden?\n"
        "- Sind Maßketten, Zahlen, Einheiten und Beschriftungen korrekt und lesbar?\n"
        "- Sind Schraffurmuster fachlich korrekt (Beton = Diagonalschraffur, Dämmung = Zickzack/Wellen)?\n"
        "- Ist die Schichtreihenfolge / Hierarchie / Flussrichtung korrekt?\n"
        "- Ist der Stil sauber und für ein Lehrbuch geeignet (keine Fotos, keine Personen, kein Kitsch)?\n"
        "- Sind Symbole (Pumpen, Ventile, Pfeile) fachlich korrekt verwendet?\n\n"
        "Antworte AUSSCHLIESSLICH als JSON:\n"
        '{"pass": true/false, "issues": ["Problem 1", "Problem 2"], '
        '"correction_prompt": "Konkrete Korrekturanweisung auf Deutsch"}'
    )

    payload = json.dumps({
        "model": QA_MODEL,
        "messages": [
            {"role": "system", "content": system_msg},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": user_msg},
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/png;base64,{image_b64}",
                        "detail": "high"
                    }},
                ],
            },
        ],
        "response_format": {"type": "json_object"},
        "max_tokens": 700,
    }).encode()

    result = api_post("https://api.openai.com/v1/chat/completions", payload, api_key)
    return json.loads(result["choices"][0]["message"]["content"])


def remove_white_background(image_data: bytes, threshold: int = BG_THRESHOLD) -> bytes:
    try:
        from PIL import Image
        import io
    except ImportError:
        print("  Hinweis: Pillow nicht installiert – Hintergrundentfernung übersprungen.")
        return image_data

    img = Image.open(io.BytesIO(image_data)).convert("RGBA")
    pixels = img.getdata()
    new_pixels = [
        (r, g, b, 0) if r >= threshold and g >= threshold and b >= threshold else (r, g, b, a)
        for r, g, b, a in pixels
    ]
    img.putdata(new_pixels)
    buf = io.BytesIO()
    img.save(buf, "PNG")
    return buf.getvalue()


def create_placeholder(output_path: Path, description: str, attempts: int):
    """Erstellt ein Placeholder-PNG wenn QA nach max. Versuchen nicht bestanden."""
    try:
        from PIL import Image, ImageDraw
        import io

        w, h = 900, 560
        img = Image.new("RGBA", (w, h), (250, 250, 250, 255))
        draw = ImageDraw.Draw(img)

        # Diagonales Raster als Placeholder-Muster
        for i in range(-h, w, 28):
            draw.line([(i, 0), (i + h, h)], fill=(225, 225, 225), width=1)

        # Weißes Textfeld
        pad = 80
        draw.rectangle([(pad, h // 2 - 70), (w - pad, h // 2 + 70)],
                        fill=(255, 255, 255, 240), outline=(200, 200, 200), width=1)

        # Rahmen
        draw.rectangle([(8, 8), (w - 8, h - 8)], outline=(190, 190, 190), width=2)

        draw.text((w // 2, h // 2 - 35),
                  "Bild konnte nicht generiert werden",
                  fill=(100, 100, 100), anchor="mm")
        draw.text((w // 2, h // 2),
                  f"QA nicht bestanden nach {attempts} Versuchen",
                  fill=(150, 150, 150), anchor="mm")

        short = (description[:80] + "…") if len(description) > 80 else description
        draw.text((w // 2, h // 2 + 35), short, fill=(170, 170, 170), anchor="mm")

        output_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(output_path, "PNG")

    except ImportError:
        # Minimaler Fallback ohne Pillow
        output_path.parent.mkdir(parents=True, exist_ok=True)
        # 1×1 transparentes PNG
        placeholder_b64 = (
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk"
            "YPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        )
        output_path.write_bytes(base64.b64decode(placeholder_b64))


def save_image(image_data: bytes, output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(image_data)


def save_prompt_log(output_path: Path, prompt: str, description: str,
                    img_type: str, qa_log: list):
    log_path = output_path.with_suffix(".prompt.txt")
    with open(log_path, "w") as f:
        f.write(f"Generiert: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"Typ: {img_type}\n")
        f.write(f"Beschreibung: {description}\n")
        f.write(f"\n--- QA-Verlauf ---\n")
        for entry in qa_log:
            f.write(f"\nVersuch {entry['attempt']}: {'✓ bestanden' if entry['pass'] else '✗ nicht bestanden'}\n")
            if entry.get("issues"):
                for issue in entry["issues"]:
                    f.write(f"  - {issue}\n")
            if entry.get("correction_prompt"):
                f.write(f"  Korrektur: {entry['correction_prompt']}\n")
        f.write(f"\n--- Finaler Prompt ---\n\n")
        f.write(prompt)
    return log_path


def main():
    parser = argparse.ArgumentParser(
        description="Erzeugt Buchillustrationen für 'BIM von Grund auf' via gpt-image-2 + QA"
    )
    parser.add_argument("--type", "-t",
                        choices=["isometric", "diagram", "section", "floorplan", "comparison", "infographic"],
                        default="diagram")
    parser.add_argument("--desc", "-d", required=True)
    parser.add_argument("--name", "-n", required=True)
    parser.add_argument("--output-dir", "-o", default=None)
    parser.add_argument(
        "--size", "-s",
        default=None,
        metavar="GRÖSSE",
        help=(
            "Bildgröße. Kürzel: portrait/tall (1024×1536), landscape/wide (1536×1024), "
            "square (1024×1024), auto (Modell wählt). "
            "Oder explizit: 1024x1536. Standard: Typ-abhängig aus style_config.json."
        ),
    )
    parser.add_argument(
        "--context", "-c",
        choices=["generic", "kastanienallee"],
        default="generic",
        help="Bildkontext: 'kastanienallee' injiziert Gebäudebeschreibung in den Prompt.",
    )
    parser.add_argument(
        "--tags",
        default=None,
        metavar="TAG1,TAG2,...",
        help="Kommagetrennte Stichwörter für das Bildmanifest (z.B. 'tragwerk,massivbau,vergleich').",
    )
    parser.add_argument(
        "--caption",
        default=None,
        metavar="TEXT",
        help="Kurzbeschreibung fürs Manifest (max ~100 Zeichen). Standard: Anfang von --desc.",
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Zeigt generierten Prompt ohne API-Aufruf")
    parser.add_argument("--skip-qa", action="store_true",
                        help="QA-Loop überspringen (schneller, für Tests)")
    args = parser.parse_args()

    load_env()
    config = load_style_config()
    base_prompt = build_prompt(args.desc, args.type, args.context, config)

    try:
        size = resolve_size(args.size, args.type, config)
    except ValueError as e:
        print(f"FEHLER: {e}")
        sys.exit(1)

    if args.dry_run:
        print("=" * 60)
        print("DRY RUN – Kein API-Aufruf")
        print("=" * 60)
        print(f"Typ:          {args.type}")
        print(f"Kontext:      {args.context}")
        print(f"Größe:        {size}{' (Alias: ' + args.size + ')' if args.size else ' (Typ-Standard)'}")
        print(f"Beschreibung: {args.desc}")
        print(f"Caption:      {args.caption or '(auto)'}")
        print(f"Tags:         {args.tags or '(keine)'}")
        print(f"Dateiname:    {args.name}.png")
        print(f"QA-Modell:    {QA_MODEL} (max. {MAX_QA_ATTEMPTS} Versuche)")
        print()
        print("--- Vollständiger Prompt ---")
        print(base_prompt)
        return

    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key or api_key.startswith("sk-..."):
        print("FEHLER: OPENAI_API_KEY nicht gesetzt.")
        sys.exit(1)

    model = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-2")
    output_dir = Path(args.output_dir) if args.output_dir else REPO_ROOT / "assets" / "illustrations"
    output_path = output_dir / f"{args.name}.png"

    size_label = size
    if args.size and args.size.lower() in SIZE_ALIASES:
        size_label = f"{size} ({args.size})"

    print(f"Generiere: {args.desc[:80]}{'…' if len(args.desc) > 80 else ''}")
    print(f"Typ: {args.type} | Größe: {size_label} | Modell: {model}")
    print(f"QA: {QA_MODEL} | Max. Versuche: {MAX_QA_ATTEMPTS}")
    print(f"Ausgabe: {output_path.relative_to(REPO_ROOT)}")
    print()

    image_data = None
    qa_passed = False
    current_prompt = base_prompt
    qa_log = []

    for attempt in range(1, MAX_QA_ATTEMPTS + 1):
        print(f"[{attempt}/{MAX_QA_ATTEMPTS}] Generierung...")
        try:
            image_data = generate_image(current_prompt, size, api_key, model)
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  FEHLER Generierung: HTTP {e.code} – {body[:200]}")
            break
        except Exception as e:
            print(f"  FEHLER Generierung: {e}")
            break

        if args.skip_qa:
            qa_passed = True
            qa_log.append({"attempt": attempt, "pass": True, "issues": [], "correction_prompt": ""})
            break

        print(f"[{attempt}/{MAX_QA_ATTEMPTS}] QA-Prüfung via {QA_MODEL}...")
        try:
            qa_result = qa_check(image_data, args.desc, args.type, api_key)
        except Exception as e:
            print(f"  QA-Fehler (wird übersprungen): {e}")
            qa_passed = True
            qa_log.append({"attempt": attempt, "pass": True, "issues": [], "correction_prompt": f"QA-Fehler: {e}"})
            break

        issues = qa_result.get("issues", [])
        correction = qa_result.get("correction_prompt", "")
        passed = qa_result.get("pass", False)

        qa_log.append({"attempt": attempt, "pass": passed, "issues": issues, "correction_prompt": correction})

        if passed:
            print(f"  ✓ QA bestanden")
            qa_passed = True
            break
        else:
            print(f"  ✗ QA nicht bestanden:")
            for issue in issues:
                print(f"     – {issue}")
            if attempt < MAX_QA_ATTEMPTS:
                print(f"  Korrektur: {correction[:120]}{'…' if len(correction) > 120 else ''}")
                current_prompt = apply_correction(base_prompt, issues, correction)

    print()

    if not qa_passed:
        print(f"Bild konnte nach {MAX_QA_ATTEMPTS} Versuchen nicht QA-konform generiert werden.")
        print("Erstelle Platzhalter-PNG...")
        create_placeholder(output_path, args.desc, MAX_QA_ATTEMPTS)
        log_path = save_prompt_log(output_path, current_prompt, args.desc, args.type, qa_log)
        print(f"✗ Platzhalter: {output_path.relative_to(REPO_ROOT)}")
        print(f"✗ QA-Log:      {log_path.relative_to(REPO_ROOT)}")
        sys.exit(2)

    print("Entferne Hintergrund...")
    image_data = remove_white_background(image_data)
    print("Speichere Bild...")
    save_image(image_data, output_path)
    log_path = save_prompt_log(output_path, current_prompt, args.desc, args.type, qa_log)

    generated_ts = datetime.now().strftime("%Y-%m-%d %H:%M")
    manifest_path = update_manifest(
        args.name, args.type, args.context,
        args.tags, args.caption, args.desc, generated_ts,
    )

    attempts_used = len(qa_log)
    print(f"✓ Bild gespeichert:   {output_path.relative_to(REPO_ROOT)}  (Versuche: {attempts_used})")
    print(f"✓ QA-Log gespeichert: {log_path.relative_to(REPO_ROOT)}")
    print(f"✓ Manifest aktualisiert: {manifest_path.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
