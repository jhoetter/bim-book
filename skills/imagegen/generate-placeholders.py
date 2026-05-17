#!/usr/bin/env python3
"""
Findet alle <!-- IMAGE --> Platzhalter in den Kapitel-Markdown-Dateien
und ruft generate.py für noch nicht vorhandene Bilder auf.

Verwendung:
  python3 skills/imagegen/generate-placeholders.py              # fehlende Bilder generieren
  python3 skills/imagegen/generate-placeholders.py --dry-run    # nur auflisten
  python3 skills/imagegen/generate-placeholders.py --all        # alle (auch vorhandene) neu
  python3 skills/imagegen/generate-placeholders.py --chapter 06 # nur ein Kapitel
  python3 skills/imagegen/generate-placeholders.py --skip-qa    # schneller, ohne QA-Loop
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
CHAPTERS_DIR = REPO_ROOT / "docs" / "chapters"
ILLUSTRATIONS_DIR = REPO_ROOT / "assets" / "illustrations"
GENERATE_PY = Path(__file__).parent / "generate.py"

IMAGE_BLOCK_RE = re.compile(
    r"<!-- IMAGE\n([\s\S]*?)-->\n!\[([^\]]*)\]\(([^)]*)\)",
)


def parse_attrs(body: str) -> dict[str, str]:
    attrs: dict[str, str] = {}
    for line in body.strip().splitlines():
        colon = line.find(":")
        if colon == -1:
            continue
        key = line[:colon].strip()
        value = line[colon + 1:].strip()
        if key and value:
            attrs[key] = value
    return attrs


def find_placeholders(chapter_filter):
    # chapter_filter: str | None
    placeholders = []
    md_files = sorted(CHAPTERS_DIR.glob("*.md"))

    for md_file in md_files:
        if chapter_filter and chapter_filter not in md_file.name:
            continue
        text = md_file.read_text(encoding="utf-8")
        for m in IMAGE_BLOCK_RE.finditer(text):
            body, alt, path = m.group(1), m.group(2), m.group(3)
            attrs = parse_attrs(body)
            if not attrs.get("name"):
                print(f"  WARNUNG: Platzhalter ohne 'name' in {md_file.name} — übersprungen")
                continue
            placeholders.append({
                "chapter_file": md_file.name,
                "name":    attrs.get("name", ""),
                "type":    attrs.get("type", "diagram"),
                "size":    attrs.get("size", ""),
                "desc":    attrs.get("desc", ""),
                "caption": attrs.get("caption", ""),
                "tags":    attrs.get("tags", ""),
                "alt":     alt,
                "path":    path,
            })
    return placeholders


def image_exists(name: str) -> bool:
    return (ILLUSTRATIONS_DIR / f"{name}.png").exists()


def generate(p: dict, skip_qa: bool, dry_run: bool) -> bool:
    cmd = [
        sys.executable, str(GENERATE_PY),
        "--name", p["name"],
        "--desc", p["desc"],
        "--type", p["type"],
    ]
    if p["size"]:
        cmd += ["--size", p["size"]]
    if p["caption"]:
        cmd += ["--caption", p["caption"]]
    if p["tags"]:
        cmd += ["--tags", p["tags"]]
    if skip_qa:
        cmd.append("--skip-qa")

    if dry_run:
        print(f"  → würde ausführen: {' '.join(cmd)}")
        return True

    result = subprocess.run(cmd, cwd=REPO_ROOT)
    return result.returncode == 0


def main():
    parser = argparse.ArgumentParser(description="Batch-Generierung aller IMAGE-Platzhalter")
    parser.add_argument("--dry-run", action="store_true", help="Nur auflisten, nicht generieren")
    parser.add_argument("--all", action="store_true", help="Auch bereits vorhandene Bilder neu generieren")
    parser.add_argument("--chapter", default=None, metavar="NN", help="Nur Dateien die 'NN' im Namen haben")
    parser.add_argument("--skip-qa", action="store_true", help="QA-Loop in generate.py überspringen")
    args = parser.parse_args()

    placeholders = find_placeholders(args.chapter)

    if not placeholders:
        print("Keine IMAGE-Platzhalter gefunden.")
        return

    pending = [p for p in placeholders if args.all or not image_exists(p["name"])]
    existing = [p for p in placeholders if not args.all and image_exists(p["name"])]

    print(f"Platzhalter gefunden: {len(placeholders)} gesamt, {len(pending)} ausstehend, {len(existing)} bereits vorhanden\n")

    if existing:
        print("Bereits vorhanden (übersprungen):")
        for p in existing:
            print(f"  ✓ {p['name']}.png  [{p['chapter_file']}]")
        print()

    if not pending:
        print("Nichts zu tun.")
        return

    if args.dry_run:
        print("DRY RUN — folgende Bilder würden generiert:\n")

    ok = 0
    fail = 0
    for i, p in enumerate(pending, 1):
        label = f"[{i}/{len(pending)}] {p['name']}  ({p['type']}, {p['chapter_file']})"
        print(label)
        if not p["desc"]:
            print("  FEHLER: Kein 'desc' angegeben — übersprungen")
            fail += 1
            continue

        success = generate(p, skip_qa=args.skip_qa, dry_run=args.dry_run)
        if success:
            ok += 1
        else:
            fail += 1
        print()

    print("─" * 50)
    if args.dry_run:
        print(f"DRY RUN: {len(pending)} Bilder würden generiert")
    else:
        print(f"Fertig: {ok} erfolgreich, {fail} fehlgeschlagen")


if __name__ == "__main__":
    main()
