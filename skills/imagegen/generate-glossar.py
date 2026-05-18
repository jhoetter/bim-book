#!/usr/bin/env python3
"""
Glossar-Bildgenerator via gpt-image-1
Erzeugt kleine quadratische Thumbnails (1024x1024) für jeden Glossar-Eintrag.
Gespeichert in assets/glossar/{id}.png

Verwendung:
  python3 skills/imagegen/generate-glossar.py              # alle fehlenden Bilder
  python3 skills/imagegen/generate-glossar.py --id tga     # einzelner Eintrag
  python3 skills/imagegen/generate-glossar.py --dry-run    # Prompts ausgeben ohne API-Aufruf
"""

import argparse
import base64
import json
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
OUT_DIR = REPO_ROOT / "assets" / "glossar"

STYLE_PREFIX = (
    "Minimalist technical icon for an architectural textbook glossary. "
    "Pure white background (#FFFFFF). Clean flat design, no photorealism, no people. "
    "Precise thin lines, geometric shapes. Color palette: structural gray #6B7280, "
    "thermal blue #93C5FD, TGA amber #F59E0B, near-black #111827 for outlines. "
    "Square composition, subject centered, generous whitespace. No text, no labels. "
    "Style: technical illustration similar to a textbook icon."
)

# Prompt für jeden Glossar-Eintrag
PROMPTS: dict[str, str] = {
    "armierungsputz": (
        "Cross-section detail of an exterior wall surface: thin layer of gray reinforcement plaster "
        "with embedded white glass-fiber mesh (grid pattern visible), on top of blue insulation board. "
        "Zoomed-in layered view, left-to-right horizontal slice."
    ),
    "bap": (
        "A structured project document icon: clean A4 sheet with organized rows of colored bars "
        "(blue, amber, gray) representing a project plan or matrix. Small building outline in corner."
    ),
    "bcf": (
        "3D building model outline with a speech-bubble annotation marker pinned to a wall, "
        "showing a comment icon. Blue accent color for the pin. Clean isometric style."
    ),
    "bim": (
        "A simplified 3D building model (four-story block) with data connection lines radiating "
        "outward to small document/database icons. Blue lines, gray building, amber data nodes."
    ),
    "dampfbremse": (
        "Wall cross-section showing layers: interior plaster, then a highlighted semi-transparent "
        "amber/orange membrane layer labeled with moisture arrows blocked/slowed. Blue insulation behind."
    ),
    "dampfsperre": (
        "Wall cross-section with a solid dark barrier layer stopping moisture arrows completely. "
        "Thick amber/dark barrier between interior and insulation. Droplet symbol with X mark."
    ),
    "dvgw": (
        "Simple icon of a gas pipe and water pipe crossing, with a small official document/certificate "
        "badge overlay. Gray pipes, blue water pipe, amber gas pipe."
    ),
    "embodied-carbon": (
        "Isometric view of building materials stack (concrete blocks, steel beams, insulation) "
        "with CO2 molecules floating above. Gray materials, blue/amber accents, CO2 in dark gray."
    ),
    "epd": (
        "Environmental product declaration: a clean certificate/label icon showing a leaf symbol "
        "and eco-rating bars. Green vegetation color, clean document format."
    ),
    "eurocode": (
        "Stack of norm books/documents (EN standards) with structural beam cross-section icon "
        "overlaid. Gray and blue tones, organized grid of documents."
    ),
    "fbh": (
        "Top-down view of floor heating pipe serpentine layout beneath floor surface. "
        "Blue pipes (cold) and red/amber pipes (warm) in meandering pattern on gray floor plan."
    ),
    "geg": (
        "German building with energy rating badge (A+ to G scale) overlaid. "
        "Blue/green for good rating highlighted. Clean building silhouette, flat style."
    ),
    "gfz": (
        "Urban site plan bird's-eye view showing a plot with a building footprint and stacked "
        "floor plates indicating multiple stories. GFZ concept: building area vs. site area ratio."
    ),
    "glaser-verfahren": (
        "Wall cross-section with temperature gradient curve and dew point line. "
        "Blue zone for below-dew-point condensation risk area. Graph-like visualization inside wall layers."
    ),
    "grz": (
        "Bird's-eye site plan showing a rectangular plot with building footprint shaded in gray, "
        "surrounding garden/green area unshaded. Clear ratio visualization."
    ),
    "hoai": (
        "Nine sequential phase circles (LP1–LP9) connected by a timeline arrow. "
        "Each phase circle in alternating blue/amber/gray. Clean process flow visualization."
    ),
    "hydraulischer-abgleich": (
        "Heating circuit schematic: manifold distributing to multiple radiator/floor heating loops, "
        "each with a balance valve symbol. Even flow distribution indicated by equal arrow sizes."
    ),
    "ifc": (
        "Open box/container with colorful building objects (wall, door, window) emerging as "
        "structured data. Blue and gray, with small open-lock icon indicating open standard."
    ),
    "innenputz": (
        "Wall cross-section detail: thin interior plaster layer (light gray, fine texture) "
        "on concrete wall. Zoomed, precise material layers view."
    ),
    "kwl": (
        "Mechanical ventilation unit with heat exchanger: two airflow arrows crossing through "
        "a central heat recovery core. Fresh air blue arrow in, stale air gray arrow out. "
        "Warm/cold exchange indicated."
    ),
    "lastfall": (
        "Structural beam diagram with multiple load arrows pointing downward (varying sizes) "
        "and support reaction arrows upward. Load combination concept shown geometrically."
    ),
    "lod": (
        "Four building element representations progressing from abstract box (LOD 100) to "
        "detailed component (LOD 400): bounding box → simple shape → detailed shape → "
        "precise element. Left-to-right progression."
    ),
    "mineralwolle": (
        "Zoomed cross-section of mineral wool insulation: irregular fiber network texture "
        "in light blue/white, with air pockets. Resembles cotton-like structure. "
        "Small lambda symbol indicating thermal conductivity."
    ),
    "mbo": (
        "Map of Germany outline with sixteen federal state regions highlighted differently, "
        "representing state-specific building codes derived from a common model law."
    ),
    "primärenergiefaktor": (
        "Energy chain diagram: primary energy source (sun/gas) → energy conversion → "
        "end energy → useful energy. Factor fp shown as multiplier between stages. "
        "Sankey-style flow, amber/blue colors."
    ),
    "r-wert": (
        "Wall layer with thermal resistance visualization: thickness 'd' arrow and "
        "heat flow arrow q being resisted. R = d/λ concept. Layer with high R shown "
        "blocking heat flow (orange arrows slowing down)."
    ),
    "rei": (
        "Fire protection rating symbol: three letters R, E, I in boxes with a flame icon "
        "and 60-minute timer. Gray/amber/red fire protection color scheme."
    ),
    "schallschutz-rw": (
        "Sound transmission diagram: sound waves (blue) hitting a wall cross-section, "
        "reduced waves on other side. dB value reduction shown by arrow size decrease."
    ),
    "schichtenmodell": (
        "Exploded isometric building layer model: four separated layers of a compact apartment "
        "building, showing structural frame in gray, building envelope in thermal blue, technical "
        "building systems as amber pipes and cables, and interior fit-out as light partitions. "
        "Layered systems concept, clean centered composition."
    ),
    "step": (
        "File format icon: .ifc file with structured data tree emanating from it. "
        "STEP data format represented as clean code/table lines inside document icon."
    ),
    "tga": (
        "Building cutaway showing interior mechanical systems: horizontal pipes (blue for water, "
        "amber for heating), vertical duct (gray), electrical cable runs. "
        "Clean isometric cross-section of building services."
    ),
    "transmissionswärmeverlust": (
        "Building envelope with heat flow arrows escaping through walls, roof, and windows. "
        "Arrows sized proportionally (largest through windows). Orange/amber heat arrows on blue building."
    ),
    "u-wert": (
        "Wall cross-section with U-value concept: multiple material layers (concrete gray, "
        "insulation blue, plaster light) with heat flow arrow Q and U value notation. "
        "Rsi and Rse indicated at surfaces."
    ),
    "vob": (
        "Construction contract document icon: A4 sheet with structured clauses (Part A, B, C), "
        "handshake symbol overlay for contract, construction site outline in background."
    ),
    "wdvs": (
        "Exploded wall assembly: concrete base (gray), adhesive layer, blue insulation boards "
        "(with fibers texture), reinforcement mesh layer, white exterior plaster. "
        "Left-to-right layered view with thin dimension lines."
    ),
    "wärmebrücke": (
        "Wall corner cross-section showing temperature gradient: warm interior (amber glow) "
        "and cold exterior, with a visible cold spot at the corner indicating thermal bridging. "
        "Isotherm lines visible, cold area highlighted in blue."
    ),
    "wlg": (
        "Thermal conductivity comparison chart: three insulation material blocks side by side "
        "labeled WLG 030, 035, 040, with lambda value scale and heat flow arrow sizes "
        "proportional to conductivity. Blue tones."
    ),
    "abstandsflaeche": (
        "Site plan with a building footprint and translucent setback zones around the walls, "
        "dimension arrows showing required clear distance to plot boundaries. "
    ),
    "aia": (
        "Client requirements document icon connected to a BIM model, checklist rows flowing into "
        "a small building data model. "
    ),
    "api": (
        "Two software modules represented as clean boxes exchanging structured data packets "
        "through a connector bridge. "
    ),
    "aussenwand": (
        "Layered exterior wall cross-section with structural core, blue insulation, plaster "
        "layers, window opening edge, and exterior/interior sides. "
    ),
    "baustoffklasse": (
        "Material sample tiles arranged by fire reaction, with a small flame icon and protection "
        "shield, no readable text. "
    ),
    "bebauungsplan": (
        "Simplified zoning map excerpt with plot boundary, buildable area, setback lines, height "
        "marker, and legend-like geometric symbols without text. "
    ),
    "bestandsaufnahme": (
        "Existing building facade with measurement tools, camera symbol, checklist, and "
        "highlighted inspected components. "
    ),
    "beton": (
        "Concrete cube sample with aggregate texture, compression arrows pressing from top and "
        "bottom, structural gray palette. "
    ),
    "cde": (
        "Cloud-like project data hub connected to documents, BIM model, issue marker, and "
        "approval status symbols. "
    ),
    "daemmstoff": (
        "Three insulation material blocks with porous fiber, foam cells, and rigid board "
        "textures, heat arrows reduced through them. "
    ),
    "datenqualitaet": (
        "BIM data table with validation checkmarks and one highlighted warning cell connected to "
        "a small building model. "
    ),
    "dgnb": (
        "Sustainable building certification badge concept with circular evaluation segments "
        "around a compact building and leaf symbol. "
    ),
    "diffusion": (
        "Wall layer cross-section with tiny vapor particles gradually passing through porous "
        "material, arrows fading across layers. "
    ),
    "din-276": (
        "Cost structure tree diagram with stacked building cost blocks and numbered group-like "
        "levels without readable text. "
    ),
    "din-277": (
        "Floor plan area diagram with colored zones for different area categories and dimension "
        "brackets, no text. "
    ),
    "digitaler-zwilling": (
        "Physical building silhouette mirrored with a digital wireframe twin, sensor dots and "
        "live data lines between them. "
    ),
    "entwaesserung": (
        "Building plumbing drainage diagram with sloped pipes, vertical stack, roof drain, and "
        "wastewater arrows. "
    ),
    "fernwaerme": (
        "District heating network pipe entering a building basement heat exchanger, amber warm "
        "supply and blue return lines. "
    ),
    "feuerwiderstandsklasse": (
        "Wall and slab element between flame and protected room, clock icon indicating duration, "
        "shield outlines. "
    ),
    "flachdach": (
        "Flat roof section build-up with waterproofing membrane, insulation, slight slope arrow, "
        "roof drain and parapet edge. "
    ),
    "flankenuebertragung": (
        "Two rooms separated by wall with sound waves traveling around through floor and side "
        "wall paths, indirect arrows highlighted. "
    ),
    "gebaeudeautomation": (
        "Building cutaway with connected sensors, controller node, lighting, shading and HVAC "
        "icons linked by thin data lines. "
    ),
    "gebaeudeklasse": (
        "Series of building silhouettes increasing in height with one highlighted class and fire "
        "safety shield, no text. "
    ),
    "georeferenzierung": (
        "BIM model placed on a map grid with coordinate axes, location pin, and global reference "
        "marker. "
    ),
    "gewerk": (
        "Construction coordination icon with separate discipline tool symbols arranged around a "
        "building core. "
    ),
    "glas": (
        "Window glazing panel with layered panes, spacer, sunlight rays and thermal arrows, "
        "clean technical cross-section. "
    ),
    "holz": (
        "Timber beam and cross-laminated wood panel sample with visible layered grain, "
        "structural arrows, clean flat style. "
    ),
    "ids": (
        "Validation rules document connected to BIM elements, required property slots checked "
        "against model objects. "
    ),
    "ifcopenshell": (
        "Open toolbox beside an IFC-like model cube, code brackets and small building elements "
        "being processed. "
    ),
    "informationsstatus": (
        "Document workflow lane with several status gates, model file moving through review and "
        "approval checkpoints. "
    ),
    "iso-19650": (
        "International standard document stack connected to a project information workflow and "
        "BIM model hub. "
    ),
    "klassifikation": (
        "Building objects sorted into a hierarchical taxonomy tree with colored category "
        "branches and small component icons. "
    ),
    "kollisionspruefung": (
        "Two building services elements intersecting in a model, highlighted clash marker and "
        "magnifying glass inspection symbol. "
    ),
    "kostengruppe": (
        "Stacked cost blocks forming a hierarchy next to a simplified building, with calculator "
        "and grouping brackets. "
    ),
    "kreislaufwirtschaft": (
        "Circular arrows around reusable building components, material blocks returning into a "
        "new building element. "
    ),
    "lca": (
        "Lifecycle loop diagram around a building: material production, construction, operation, "
        "reuse, with carbon balance icon. "
    ),
    "legionellen": (
        "Domestic hot water pipe with temperature gauge and microscopic bacteria symbols blocked "
        "by a hygiene shield. "
    ),
    "leistungsphase": (
        "Sequential planning phase timeline with nine abstract steps, architecture documents "
        "becoming construction output. "
    ),
    "leistungsverzeichnis": (
        "Bill of quantities document with rows, quantity columns, material icons and "
        "construction package symbol. "
    ),
    "luftschall": (
        "Sound waves traveling through air from a speaker toward a wall, partially reduced on "
        "the other side. "
    ),
    "materialpass": (
        "Building material inventory passport icon with component blocks, QR-like tag, and reuse "
        "arrows. "
    ),
    "mauerwerk": (
        "Brick wall section with staggered bond pattern, mortar joints and load arrows "
        "distributed through masonry. "
    ),
    "mvd": (
        "Large IFC model filtered through a funnel into a smaller purpose-specific model view, "
        "clean diagram. "
    ),
    "photovoltaik": (
        "Roof-mounted solar panels on flat roof with sun rays and electrical cable path to "
        "inverter symbol. "
    ),
    "properties": (
        "BIM object with attached property table fields and small key-value tags floating beside "
        "a wall element. "
    ),
    "propertysets": (
        "Several grouped property cards bundled around a BIM element, connected as organized "
        "sets. "
    ),
    "punktwolke": (
        "Building facade represented by thousands of blue-gray scan points, with laser scanner "
        "tripod icon. "
    ),
    "raumakustik": (
        "Interior room with sound rays reflecting and being absorbed by ceiling and wall panels. "
    ),
    "rettungsweg": (
        "Floor plan with highlighted escape path arrows leading from rooms to stair core and "
        "exterior exit. "
    ),
    "rlt-anlage": (
        "Air handling unit with filters, fan, heat exchanger and duct branches supplying a "
        "building floor. "
    ),
    "rueckbau": (
        "Building components being carefully disassembled into sorted material stacks with reuse "
        "arrows. "
    ),
    "scan-to-bim": (
        "Laser scanner capturing an existing building, point cloud transforming into a clean BIM "
        "model. "
    ),
    "sensorik": (
        "Network of small sensors inside a building sending data points to a central dashboard "
        "node. "
    ),
    "stahlbeton": (
        "Concrete beam cross-section with embedded steel rebars, compression and tension arrows, "
        "clean technical detail. "
    ),
    "steigschacht": (
        "Vertical service shaft through multiple floors with water, ventilation and electrical "
        "runs grouped inside. "
    ),
    "tauwasser": (
        "Wall section with temperature gradient and small condensation droplets appearing in a "
        "cold layer. "
    ),
    "trittschall": (
        "Footstep impact on floor slab with vibration waves traveling through the floor "
        "structure to room below. "
    ),
    "vorlauf-ruecklauf": (
        "Heating loop with amber supply pipe and blue return pipe circulating through radiator "
        "or floor heating manifold. "
    ),
    "waermeerzeuger": (
        "Compact heat generation unit connected to heating distribution, with flame, heat pump "
        "and network source symbols abstracted. "
    ),
    "waermepumpe": (
        "Heat pump unit extracting blue ambient heat and delivering amber heat to a building "
        "heating loop. "
    ),
    "gaeb": (
        "Construction tender data exchange icon with bill of quantities document flowing between "
        "planner and contractor systems. "
    ),
    "5d-bim": (
        "BIM model connected to quantity bars and cost calculator, showing model-to-cost "
        "relationship. "
    ),
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


def generate_image(term_id: str, api_key: str, dry_run: bool = False) -> bool:
    out_path = OUT_DIR / f"{term_id}.png"
    if out_path.exists():
        print(f"  [skip] {term_id} — bereits vorhanden")
        return True

    prompt_body = PROMPTS.get(term_id)
    if not prompt_body:
        print(f"  [skip] {term_id} — kein Prompt definiert")
        return False

    full_prompt = f"{STYLE_PREFIX}\n\n{prompt_body}"

    if dry_run:
        print(f"\n--- {term_id} ---")
        print(full_prompt[:300] + "...")
        return True

    print(f"  Generiere {term_id}...", end=" ", flush=True)

    payload = json.dumps({
        "model": "gpt-image-1",
        "prompt": full_prompt,
        "n": 1,
        "size": "1024x1024",
        "quality": "medium",
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"FEHLER {e.code}: {body[:200]}")
        return False

    img_data = data["data"][0].get("b64_json") or data["data"][0].get("url")
    if not img_data:
        print("FEHLER: Keine Bilddaten in Response")
        return False

    if data["data"][0].get("b64_json"):
        img_bytes = base64.b64decode(img_data)
    else:
        # URL-Response: herunterladen
        with urllib.request.urlopen(img_data) as r:
            img_bytes = r.read()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(img_bytes)
    print(f"OK → assets/glossar/{term_id}.png")
    return True


def main():
    parser = argparse.ArgumentParser(description="Glossar-Bildgenerator (gpt-image-1)")
    parser.add_argument("--id", help="Nur diesen Term-ID generieren")
    parser.add_argument("--dry-run", action="store_true", help="Prompts ausgeben ohne API-Aufruf")
    parser.add_argument("--force", action="store_true", help="Bereits vorhandene Bilder überschreiben")
    args = parser.parse_args()

    load_env()
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key and not args.dry_run:
        print("FEHLER: OPENAI_API_KEY nicht gesetzt (.env oder Umgebungsvariable)")
        sys.exit(1)

    if args.force:
        # Lösche vorhandene Bilder für Re-Generierung
        for f in OUT_DIR.glob("*.png"):
            if args.id is None or f.stem == args.id:
                f.unlink()

    terms = [args.id] if args.id else list(PROMPTS.keys())
    print(f"Generiere {len(terms)} Glossar-Bilder via gpt-image-1...")

    success = 0
    for term_id in terms:
        if generate_image(term_id, api_key or "", dry_run=args.dry_run):
            success += 1
        # Rate-Limit: kurze Pause zwischen Requests
        if not args.dry_run and success > 0:
            time.sleep(1)

    print(f"\nFertig: {success}/{len(terms)} Bilder generiert → assets/glossar/")


if __name__ == "__main__":
    main()
