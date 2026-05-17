#!/bin/bash
# Generate cover images for all missing chapters (ch04–ch24)
set -e
cd "$(dirname "$0")/../.."

G="python3 skills/imagegen/generate.py --type cover"

$G --name "cover-ch04" --desc \
"Panoramic structural diagram showing force flow through a 4-story building skeleton, spanning the full image width. Isometric side view: slender concrete columns and beams in structural gray (#6B7280) with diagonal hatching. Large bold amber arrows (#F59E0B) pointing downward through the structure — axial loads, shear forces — converging at foundation level. At the base, spread footings in solid gray anchor the system. The frame fills the full width. Clean white background. No text. No labels."

$G --name "cover-ch05" --desc \
"Vertical architectural cross-section through the complete building envelope spanning the full image width — from foundation to flat roof. Zones from left to right across the full width: strip foundation and basement wall in structural gray with diagonal hatching; ground floor slab in gray; load-bearing wall with masonry in amber (#F59E0B) coursing; floor structure with joists; exterior insulation in thermal blue (#93C5FD) zigzag; flat roof build-up with membrane layers in near-black. Each zone fills the full image height, separated by clean cut lines. Bold, large-scale. White background. No text. No labels."

$G --name "cover-ch06" --desc \
"Wide cross-section through an insulated exterior wall showing the heat-flow concept, spanning the full image width on white background. Three zones: left — interior concrete wall in structural gray (#6B7280) with diagonal hatching; center — thick thermal insulation block in thermal blue (#93C5FD) with dense zigzag pattern, dominating the composition; right — exterior render in near-white. Multiple horizontal amber arrows (#F59E0B) cross the full width from left to right, thinning as they pass through the insulation — visualizing U-value heat attenuation. Arrows are bold and large. No text. No labels. No numbers."

$G --name "cover-ch07" --desc \
"Vertical cross-section through a basement wall and floor showing moisture protection layers, spanning the full image width on white background. From left: exterior ground soil shown as a fine dot pattern in warm gray; waterproofing membrane as a bold continuous black line hugging the outer wall face; drainage mat as a grid of amber (#F59E0B) diamond shapes; structural concrete wall in structural gray (#6B7280) with diagonal hatching; interior floor slab in gray. Small blue arrows (#93C5FD) at the left show water pressure pressing against the wall. The section fills the full height and width. No text. No labels."

$G --name "cover-ch08" --desc \
"Panoramic cross-section through a multi-layer party wall and floor assembly showing acoustic insulation, on white background. Left and right rooms separated by a wall with three clearly differentiated layers: outer concrete leaf in structural gray (#6B7280), acoustic insulation core as a thick amber (#F59E0B) resilient layer with a compressed wave pattern, inner concrete leaf in gray. Concentric semicircular sound-wave arcs emanate from the left side, visibly diminishing as they pass through the layers — shown as fine near-black curves. Floor decoupling strips at the base in amber. Bold, wide composition. No text. No labels."

$G --name "cover-ch09" --desc \
"Architectural floor plan of one building story showing fire compartments on white background, spanning the full image width. Heavy near-black walls divide the floor into 3–4 distinct fire compartments. Fire barriers marked as bold amber (#F59E0B) thick lines at compartment boundaries. Fire doors shown as quarter-circle arcs in amber at key openings. Escape route paths shown as dashed near-black arrows flowing toward stairwells. Stairwell cores filled with structural gray (#6B7280) hatching. The plan fills the full width. Bold, clear geometry. No text. No labels. No room names."

$G --name "cover-ch10" --desc \
"Schematic of a building heating system spanning the full image width on white background. Heat source (boiler unit) on the far left as a bold rectangular symbol in structural gray (#6B7280). From it, a Vorlauf supply pipe in amber (#F59E0B) runs the full width to three vertical risers feeding radiator symbols on each floor. Return Rücklauf pipe runs parallel in thermal blue (#93C5FD) back to the boiler. Pipe junctions marked with filled circles. Pump symbols as circles with arrow on each riser. The piping network is bold and fills the full width. No text. No labels."

$G --name "cover-ch11" --desc \
"Isometric cut-away view of a building floor showing the supply and exhaust air ventilation duct network, spanning the full image width on white background. Large round supply ducts in thermal blue (#93C5FD) branch from a central AHU unit across the full ceiling width. Exhaust ducts in structural gray (#6B7280) return parallel. Diffuser outlets shown as rectangular grilles at regular intervals. Bold directional arrows in amber (#F59E0B) show airflow direction. The duct network fills the composition corner to corner. No text. No labels."

$G --name "cover-ch12" --desc \
"Schematic of a building's sanitary and drainage system spanning the full image width on white background. Vertical stacks run from top to bottom: cold water in thin thermal blue (#93C5FD) lines, hot water in thin amber (#F59E0B) lines, and drainage as bold near-black pipes with larger diameter. Horizontal branches connect to fixture symbols (sink, toilet, bathtub) on each floor level. Fall arrows on drainage pipes show gradient. The system spans two to three floors vertically and fills the full width. Bold, clear line weights. No text. No labels."

$G --name "cover-ch13" --desc \
"Schematic of a building electrical distribution system spanning the full image width on white background. Main switchboard on the far left as a bold rectangular cabinet in structural gray (#6B7280). Thick amber (#F59E0B) busbars run horizontally to sub-distribution panels at each floor level. From sub-panels, fine near-black circuit lines branch out to socket, light, and sensor symbols across the floor. A separate automation network shown as thin blue (#93C5FD) dashed lines connecting sensors and actuators. Bold, hierarchical branching fills the full width. No text. No labels."

$G --name "cover-ch14" --desc \
"Architectural site plan on white background spanning the full image width. An urban block showing three to four building footprints as solid near-black outlines with structural gray (#6B7280) hatching inside. Setback lines shown as dashed amber (#F59E0B) lines parallel to plot boundaries. The Baugrenze building envelope limit shown as bold amber dashed rectangle. Street lines in near-black framing the block. The plot and its regulatory constraints fill the full image width. Clean top-down view. No text. No labels. No street names."

$G --name "cover-ch15" --desc \
"Horizontal process timeline spanning the full image width on white background. Nine equally-spaced vertical bands represent HOAI planning phases LP1 through LP9, alternating between structural gray (#6B7280) and near-white fills with fine vertical dividers. A single bold amber (#F59E0B) horizontal arrow flows left to right through all bands, growing slightly in thickness — representing the increasing depth of planning work. Each band has a different geometric density of fine line hatching to suggest workload. The bands fill the full image height and width. No text. No numbers. No phase labels."

$G --name "cover-ch16" --desc \
"Abstract cost breakdown diagram spanning the full image width on white background. A wide horizontal bar at center is subdivided into segments of varying widths representing DIN 276 cost groups — foundations, shell, fit-out, TGA, outdoor. Segments use alternating fills: structural gray (#6B7280) hatching, thermal blue (#93C5FD) solid, amber (#F59E0B) solid, near-black outline only. Above each segment, a vertical bar of proportional height shows the segment cost weight — taller bars for larger cost groups. The overall composition is a bold data visualization. No text. No numbers. No labels."

$G --name "cover-ch17" --desc \
"Isometric view of a 3D building model shown as overlapping transparent layers on white background, spanning the full image width. Three model layers float apart in exploded view: architectural model as white thin lines with room outlines; structural model in structural gray (#6B7280) solid columns and beams; MEP model as amber (#F59E0B) thin pipes and ducts. Thin blue (#93C5FD) connection lines link identical elements across layers — representing model federation and data linkage. The exploded stack fills the full width. Bold, clean isometric line work. No text. No labels."

$G --name "cover-ch18" --desc \
"Abstract hierarchical tree structure spanning the full image width on white background, representing an IFC data schema. A single root node at top center connects downward to 3 child nodes, each branching to 3–4 further children, filling the full width at the bottom. Nodes are bold circles in alternating colors: root in near-black, second level in structural gray (#6B7280), third level in thermal blue (#93C5FD), leaf level in amber (#F59E0B). Connection lines are fine near-black. The tree is perfectly symmetric and architectural in proportion — fills the full image width from root to leaves. No text. No class names. No labels."

$G --name "cover-ch19" --desc \
"A systematic classification matrix spanning the full image width on white background. A large grid of building element symbols — wall, column, beam, slab, door, window, pipe, duct, cable — arranged in rows and columns with bold near-black outlines. Each symbol cell is uniquely colored or hatched: structural elements in gray (#6B7280), TGA elements in amber (#F59E0B), envelope elements in thermal blue (#93C5FD). A bold near-black grid overlay organizes the symbols. The matrix fills the full width with 4–5 columns and 3–4 rows of large symbols. No text. No codes. No labels."

$G --name "cover-ch20" --desc \
"Abstract collaboration network diagram spanning the full image width on white background. Five to seven large circular nodes representing project roles arranged across the width — not labeled, just differentiated by size and color: near-black, structural gray (#6B7280), amber (#F59E0B), thermal blue (#93C5FD). Bold connection lines of varying thickness link the nodes, with arrowheads showing data exchange direction. A central larger node (CDE/common platform) in amber connects to all others. Fine secondary lines show indirect connections. The network fills the full width with visual balance. No text. No labels."

$G --name "cover-ch21" --desc \
"Isometric federated BIM model of a 4-story building spanning the full image width on white background. The building is shown as three semi-transparent overlapping models in one combined view: structural skeleton in structural gray (#6B7280) solid; MEP systems as amber (#F59E0B) fine lines for pipes/ducts; interior partitions and facade as near-black thin lines. All three models occupy the same space — showing coordination and clash detection concept. The combined model is bold and fills the full width. No text. No labels. No clash markers."

$G --name "cover-ch22" --desc \
"Panoramic diagram showing a circular material lifecycle across the full image width on white background. A large bold circle drawn in the center with amber (#F59E0B) arrows flowing clockwise: raw material extraction (gray aggregate texture) → construction phase (building outline in structural gray) → use phase (building with occupation suggested by fine lines) → deconstruction (broken outlines) → recycling (material fragments back to aggregate). Each phase occupies one arc segment. Green vegetation (#10B981) fills the center of the circle. Bold, clear cycle. No text. No labels."

$G --name "cover-ch23" --desc \
"Cross-section through a building wall showing renovation retrofit layers on white background, spanning the full image width. Left half: existing old masonry wall in a warm amber (#F59E0B) brick pattern with irregular mortar joints, slightly rough edges. Right half: new retrofit system added to the outside — thermal insulation in thermal blue (#93C5FD) zigzag, thin render coat, new window reveal. A bold vertical cut line separates old from new. At the roof edge, a new parapet detail in structural gray (#6B7280). The contrast between old texture and crisp new layers is the visual centerpiece. No text. No labels."

$G --name "cover-ch24" --desc \
"Panoramic diagram spanning the full image width on white background showing a physical building and its digital twin side by side. Left half: isometric building outline in structural gray (#6B7280) with solid walls and windows — the physical asset. Right half: the same building rendered as a translucent wireframe with fine lines and data nodes glowing in amber (#F59E0B) at sensor locations — the digital twin. Between the two halves: bold amber bidirectional arrows showing data flow. Fine thermal blue (#93C5FD) sensor connection lines run from physical building to digital model. Clean, precise, no decorative elements. No text. No labels."

echo ""
echo "All covers generated successfully."
