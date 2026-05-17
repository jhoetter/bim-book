#!/usr/bin/env python3
"""
Generiert und aktualisiert Bildbeschreibungen für den BIM-Buch-Agenten.

Verwendung:
  python3 skills/imagedesc/describe.py               # Neue Bilder beschreiben
  python3 skills/imagedesc/describe.py --all         # Alle Bilder neu beschreiben
  python3 skills/imagedesc/describe.py kap01_*       # Bestimmte Bilder
"""
import argparse
import base64
import json
import os
import re
import sys
from datetime import date
from pathlib import Path

try:
    import anthropic
except ImportError:
    print("Fehlt: pip install anthropic")
    sys.exit(1)

REPO_ROOT = Path(__file__).parent.parent.parent
ILLUSTRATIONS_DIR = REPO_ROOT / "assets" / "illustrations"
MANIFEST_PATH = ILLUSTRATIONS_DIR / "manifest.json"
DOCS_DIR = REPO_ROOT / "docs"

DESCRIPTION_PROMPT = """\
Du siehst eine technische Abbildung aus dem deutschen Fachbuch "BIM von Grund auf" über Architektur und Building Information Modeling.

Erstelle eine präzise, textuelle Beschreibung dieser Abbildung für einen KI-Agenten, der das Buch durchsucht.

Die Beschreibung soll:
1. Den Bildtyp nennen (Grundriss, Querschnitt, Schema, Diagramm, etc.)
2. Alle beschrifteten Elemente und Maße aufzählen
3. Die farbliche Kodierung erklären (grau=Tragwerk, blau=Dämmung, amber=TGA etc.)
4. Die Kernaussage des Bildes in 1-2 Sätzen zusammenfassen
5. Auf Deutsch verfasst sein
6. Max. 250 Wörter

Antworte nur mit der Beschreibung, ohne Einleitung oder Erklärung."""

KEYWORDS_PROMPT = """\
Extrahiere 8-12 prägnante Stichwörter auf Deutsch aus dieser Abbildungsbeschreibung.
Gib sie als kommagetrennte Liste zurück, ohne Nummerierung.

Beschreibung:
{description}"""


def load_manifest() -> dict:
    if MANIFEST_PATH.exists():
        return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    return {
        "_info": "Bildbeschreibungen für den BIM-Buch-Agenten. Aktualisieren: python3 skills/imagedesc/describe.py",
        "_updated": str(date.today()),
        "images": {},
    }


def save_manifest(manifest: dict) -> None:
    manifest["_updated"] = str(date.today())
    MANIFEST_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Manifest gespeichert: {MANIFEST_PATH}")


def parse_chapter_from_filename(name: str) -> tuple[str, str]:
    """Returns (chapter_id, chapter_title) from image filename like 'kap01_...'"""
    from server_chapters import CHAPTER_MAP  # lazy import
    match = re.match(r"kap(\d+)_", name)
    if match:
        num = int(match.group(1))
        return CHAPTER_MAP.get(num, (f"{num:02d}-unknown", f"Kapitel {num}"))
    return ("", "")


# Inline chapter map to avoid importing server code
CHAPTER_MAP: dict[int, tuple[str, str]] = {
    1:  ("01-architektur-als-system",      "Architektur als System"),
    2:  ("02-entwurf-raum-funktion",       "Entwurf, Raum und Funktion"),
    3:  ("03-baustoffe",                   "Baustoffe"),
    4:  ("04-tragwerk",                    "Tragwerk: Lasten, Kräfte, Systeme"),
    5:  ("05-konstruktion",                "Konstruktion: Gründung, Wand, Decke, Dach"),
    6:  ("06-waermeschutz-geg",            "Wärmeschutz & GEG"),
    7:  ("07-feuchteschutz",               "Feuchteschutz"),
    8:  ("08-schallschutz",                "Schallschutz"),
    9:  ("09-brandschutz",                 "Brandschutz"),
    10: ("10-heizung-waermeversorgung",    "Heizung & Wärmeversorgung"),
    11: ("11-lueftung",                    "Lüftung & Raumluftqualität"),
    12: ("12-sanitaer",                    "Sanitär & Entwässerung"),
    13: ("13-elektro",                     "Elektro & Gebäudeautomation"),
    14: ("14-planungsrecht",               "Planungsrecht"),
    15: ("15-hoai",                        "HOAI: Phasen, Leistungen, Koordination"),
    16: ("16-kosten-ausschreibung",        "Kosten & Ausschreibung"),
    17: ("17-was-bim-wirklich-ist",        "Was BIM wirklich ist"),
    18: ("18-ifc",                         "IFC: Die Sprache des digitalen Gebäudes"),
    19: ("19-klassifikation",              "Klassifikation"),
    20: ("20-prozess-kollaboration",       "Prozess & Kollaboration"),
    21: ("21-bim-praxis",                  "BIM in der Praxis"),
    22: ("22-nachhaltigkeit",              "Nachhaltigkeit & Kreislaufwirtschaft"),
    23: ("23-sanierung",                   "Sanierung"),
}


def extract_figure_info(chapter_id: str, image_name: str) -> tuple[str, str]:
    """Parse markdown files to find figure number and caption for an image."""
    if not chapter_id:
        return ("", "")

    for md_file in DOCS_DIR.rglob("*.md"):
        text = md_file.read_text(encoding="utf-8", errors="ignore")
        # Match: ![alt](../assets/illustrations/NAME.png)\n*caption*
        pattern = rf"!\[[^\]]*\]\([^)]*{re.escape(image_name)}\.png\)\s*\n\*([^*]+)\*"
        m = re.search(pattern, text)
        if m:
            caption_raw = m.group(1).strip()
            # Extract figure number: "Abb. 1.1: text" or "Abb. 1.1 text"
            fig_match = re.match(r"(Abb\.\s*[\d.]+)[:\s]+(.+)", caption_raw)
            if fig_match:
                return (fig_match.group(1).strip(), fig_match.group(2).strip())
            return ("", caption_raw)
    return ("", "")


def describe_image(client: anthropic.Anthropic, image_path: Path) -> dict:
    """Call Claude Vision to describe an image."""
    image_data = base64.standard_b64encode(image_path.read_bytes()).decode("utf-8")

    # Determine media type
    suffix = image_path.suffix.lower()
    media_type = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg"}.get(suffix[1:], "image/png")

    print(f"  → Claude Vision beschreibt {image_path.name}…")
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=600,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": media_type, "data": image_data}},
                {"type": "text", "text": DESCRIPTION_PROMPT},
            ],
        }],
    )
    description = response.content[0].text.strip()

    # Extract keywords
    kw_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=150,
        messages=[{
            "role": "user",
            "content": KEYWORDS_PROMPT.format(description=description),
        }],
    )
    keywords = [k.strip() for k in kw_response.content[0].text.strip().split(",") if k.strip()]

    return {"description": description, "keywords": keywords}


def process_image(client: anthropic.Anthropic, manifest: dict, png_path: Path, force: bool = False) -> bool:
    """Process a single image. Returns True if updated."""
    name = png_path.stem  # e.g. kap01_schichtenmodell

    existing = manifest["images"].get(name, {})
    if existing.get("described_by") == "vision" and not force:
        print(f"  Übersprungen (schon beschrieben): {name}")
        return False

    print(f"Verarbeite: {name}")

    # Determine chapter
    kap_match = re.match(r"kap(\d+)_", name)
    chapter_id, chapter_title = "", ""
    if kap_match:
        num = int(kap_match.group(1))
        chapter_id, chapter_title = CHAPTER_MAP.get(num, ("", ""))

    # Extract figure info from markdown
    figure_num, caption = extract_figure_info(chapter_id, name)

    # Get AI description
    vision_result = describe_image(client, png_path)

    entry = {
        "file": png_path.name,
        "chapter_id": chapter_id,
        "chapter_title": chapter_title,
        "figure_num": existing.get("figure_num", figure_num),
        "caption": existing.get("caption", caption),
        "type": existing.get("type", ""),
        "description": vision_result["description"],
        "keywords": vision_result["keywords"],
        "described_by": "vision",
    }

    manifest["images"][name] = entry
    print(f"  ✓ Beschrieben: {name}")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Bildbeschreibungen generieren")
    parser.add_argument("patterns", nargs="*", help="Dateinamen-Muster (optional)")
    parser.add_argument("--all", action="store_true", help="Alle Bilder neu beschreiben")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        # Try loading from .env
        env_file = REPO_ROOT / ".env"
        if env_file.exists():
            for line in env_file.read_text().splitlines():
                if line.startswith("ANTHROPIC_API_KEY="):
                    api_key = line.split("=", 1)[1].strip()
                    break
    if not api_key:
        print("Fehler: ANTHROPIC_API_KEY nicht gesetzt")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)
    manifest = load_manifest()

    # Find images to process
    all_pngs = sorted(ILLUSTRATIONS_DIR.glob("*.png"))
    if args.patterns:
        filtered = []
        for pat in args.patterns:
            filtered.extend(p for p in all_pngs if p.stem.startswith(pat.replace("*", "")))
        all_pngs = filtered

    updated = 0
    for png in all_pngs:
        if process_image(client, manifest, png, force=args.all):
            updated += 1
            save_manifest(manifest)  # Save after each image in case of interruption

    print(f"\n{updated} Bilder aktualisiert.")
    if updated == 0:
        print("Alle Bilder sind aktuell. --all für Neugeneration.")


if __name__ == "__main__":
    main()
