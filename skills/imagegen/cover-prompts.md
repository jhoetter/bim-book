# Cover Image Prompts Reference

Proven prompts for chapter cover images. Re-run with improvements as needed.

## ch01 — Architektur als System
```
Wide panoramic isometric exploded view of a 4-story residential building spanning the full image width.
Three clearly separated horizontal layers floating in space over dark charcoal:
bottom — reinforced concrete skeleton with columns, beams and floor slabs in structural gray (#6B7280) with precise diagonal hatching;
middle — MEP and TGA network spread across the full width as thin glowing amber lines (#F59E0B), pipe junctions, ducts and electrical conduits;
top — interior room layout as delicate thin white line-work, partition walls and door openings.
Slight atmospheric depth between layers. Composition fills the full width and is centered vertically.
No text. No labels.
```

## ch02 — Entwurf, Raum und Funktion
```
A large architectural floor plan spanning nearly the full width of the image, centered vertically on dark charcoal background (#1B2030).
The plan shows a multi-apartment residential floor with walls as solid white-filled rectangles, door openings as quarter-circle arcs in white,
window niches as thin parallel lines. Room circulation paths highlighted as subtle amber (#F59E0B) dotted lines threading through the plan.
Structural column grid marked with amber corner dots at regular intervals.
Surrounding the main plan: fine dark gray construction grid lines extending to the edges, giving a sense of measured space.
Two smaller floor plans flanking left and right at slightly different scales, shown at 30% opacity — suggesting design iteration.
No text. No room labels. No dimensions.
```

## ch03 — Baustoffe
```
A dramatic panoramic cross-section through a building wall detail, spanning the full width of the image on dark charcoal background (#1B2030).
The section reveals four distinct material zones side by side at large scale, each clearly differentiated:
(1) reinforced concrete column — diagonal hatching in structural gray (#6B7280), geometric and precise;
(2) thermal insulation block — dense zigzag wave pattern in glowing thermal blue (#93C5FD), slightly luminous;
(3) brick masonry course — fine horizontal coursing lines with mortar joints in warm amber (#F59E0B), rhythmic;
(4) structural steel I-beam section — clean geometric profile in bright light gray with sharp edges.
All four material zones occupy the full height of the image and are separated by crisp cut lines.
Slight atmospheric gradient at top and bottom edges. No text. No labels. No dimensions.
```

## Tips for new chapters
- Show the chapter's core concept through a single strong composition, not a grid
- Always use at least one accent color: amber (TGA/materials), blue (insulation/technical), gray (structure)
- The visible banner crop shows roughly the CENTER 35% of the image height — put the best content there
- Fill the full width; narrow/centered compositions look weak at 1536px wide
- Current cover workflow uses `skills/imagegen/generate.py --type cover`: generate on a pure white background, then remove the white background to transparency. This lets the same cover work on dark overview cards and light pages.
- Match the established covers with rich architectural detail: building sections, hatching, realistic technical linework, system overlays and material texture. Avoid sparse local-vector diagrams for covers.
