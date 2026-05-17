#!/usr/bin/env python3
"""
BIM-Buch Bildgenerator
Erzeugt konsistente Illustrationen für das Buch "BIM von Grund auf"
via OpenAI DALL-E 3.

Verwendung:
  python3 generate.py --type isometric --desc "Schichtaufbau Außenwand mit U-Wert-Beschriftung" --name "kap06_wandaufbau"
  python3 generate.py --type diagram --desc "Heizkreislauf Schema mit Vor- und Rücklauf" --name "kap10_heizkreis"
  python3 generate.py --type section --desc "Flachdachaufbau Kastanienallee 7" --name "kap05_flachdach"
"""

import argparse
import json
import os
import sys
import urllib.request
from pathlib import Path
from datetime import datetime

# Pfad zum Repo-Root (zwei Ebenen über diesem Skript)
REPO_ROOT = Path(__file__).parent.parent.parent
STYLE_CONFIG = Path(__file__).parent / "style_config.json"


def load_env():
    """Lädt .env aus dem Repo-Root."""
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


def build_prompt(description: str, img_type: str, config: dict) -> str:
    """Baut den vollständigen DALL-E Prompt aus Basis-Style + Typ-Variant + Beschreibung."""
    base = config["base_style_prompt"]
    variant = config["type_variants"].get(img_type, config["type_variants"]["diagram"])
    type_suffix = variant["prompt_suffix"]

    # Farbpalette als Hinweis
    palette = config["color_palette"]
    color_hint = (
        f"Color palette: primary blue {palette['primary']}, "
        f"structural gray {palette['structural']}, "
        f"accent amber {palette['accent']}, "
        f"white background {palette['background']}."
    )

    prompt = f"{base}\n\n{type_suffix}\n\n{color_hint}\n\nSubject: {description}"
    return prompt


def get_image_size(img_type: str, config: dict) -> str:
    variant = config["type_variants"].get(img_type, config["type_variants"]["diagram"])
    return os.environ.get("OPENAI_IMAGE_SIZE", variant.get("size", "1792x1024"))


def generate_image(prompt: str, size: str, api_key: str, model: str) -> str:
    """Ruft die OpenAI Images API auf und gibt die Bild-URL zurück."""
    import urllib.request
    import json

    payload = json.dumps({
        "model": model,
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": "standard",
        "style": "natural"
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return result["data"][0]["url"]


def download_image(url: str, output_path: Path):
    """Lädt das Bild von der URL herunter und speichert es."""
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(data)


def save_prompt_log(output_path: Path, prompt: str, description: str, img_type: str):
    """Speichert den verwendeten Prompt als .prompt.txt neben dem Bild, für Reproduzierbarkeit."""
    log_path = output_path.with_suffix(".prompt.txt")
    with open(log_path, "w") as f:
        f.write(f"Generiert: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"Typ: {img_type}\n")
        f.write(f"Beschreibung: {description}\n")
        f.write(f"\n--- Vollständiger Prompt ---\n\n")
        f.write(prompt)
    return log_path


def main():
    parser = argparse.ArgumentParser(
        description="Erzeugt Buchillustrationen für 'BIM von Grund auf' via DALL-E 3"
    )
    parser.add_argument(
        "--type", "-t",
        choices=["isometric", "diagram", "section", "floorplan", "comparison", "infographic"],
        default="diagram",
        help="Illustrationstyp (Standard: diagram)"
    )
    parser.add_argument(
        "--desc", "-d",
        required=True,
        help="Beschreibung des Bildinhalts auf Deutsch"
    )
    parser.add_argument(
        "--name", "-n",
        required=True,
        help="Dateiname ohne Endung (z.B. 'kap06_wandaufbau')"
    )
    parser.add_argument(
        "--output-dir", "-o",
        default=None,
        help="Ausgabeverzeichnis (Standard: assets/illustrations/ im Repo)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Zeigt nur den generierten Prompt, ohne API-Aufruf"
    )
    args = parser.parse_args()

    # .env laden
    load_env()

    # Style-Config laden
    config = load_style_config()

    # Prompt bauen
    prompt = build_prompt(args.desc, args.type, config)

    if args.dry_run:
        print("=" * 60)
        print("DRY RUN – Kein API-Aufruf")
        print("=" * 60)
        print(f"Typ:          {args.type}")
        print(f"Größe:        {get_image_size(args.type, config)}")
        print(f"Beschreibung: {args.desc}")
        print(f"Dateiname:    {args.name}.png")
        print()
        print("--- Vollständiger Prompt ---")
        print(prompt)
        return

    # API Key prüfen
    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key or api_key.startswith("sk-..."):
        print("FEHLER: OPENAI_API_KEY nicht gesetzt.")
        print("Bitte .env aus .env.example erstellen und den API-Key eintragen.")
        sys.exit(1)

    model = os.environ.get("OPENAI_IMAGE_MODEL", "dall-e-3")
    size = get_image_size(args.type, config)

    # Ausgabepfad
    if args.output_dir:
        output_dir = Path(args.output_dir)
    else:
        output_dir = REPO_ROOT / "assets" / "illustrations"
    output_path = output_dir / f"{args.name}.png"

    print(f"Generiere: {args.desc}")
    print(f"Typ: {args.type} | Größe: {size} | Modell: {model}")
    print(f"Ausgabe: {output_path.relative_to(REPO_ROOT)}")
    print()

    # Bild generieren
    print("API-Aufruf läuft...")
    try:
        image_url = generate_image(prompt, size, api_key, model)
    except Exception as e:
        print(f"FEHLER bei API-Aufruf: {e}")
        sys.exit(1)

    # Bild herunterladen
    print("Lade Bild herunter...")
    download_image(image_url, output_path)

    # Prompt-Log speichern
    log_path = save_prompt_log(output_path, prompt, args.desc, args.type)

    print()
    print(f"✓ Bild gespeichert:  {output_path.relative_to(REPO_ROOT)}")
    print(f"✓ Prompt gespeichert: {log_path.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
