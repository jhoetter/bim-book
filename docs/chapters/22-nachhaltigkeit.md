# Kapitel 22 – Nachhaltigkeit & Kreislaufwirtschaft

*Teil VII – Nachhaltigkeit · ~20 Seiten*

---

Ein Gebäude verursacht CO₂ auf zwei Arten: beim Bauen und im Betrieb. Jahrzehntelang stand der Betrieb im Fokus – Dämmung, Heizung, EnEV, GEG. Inzwischen wissen wir, dass die **graue Energie** im Material selbst – Beton, Stahl, Ziegel – einen immer größeren Anteil am gesamten Lebenszyklus ausmacht. Nachhaltigkeit im Bauwesen beginnt vor dem Spatenstich.

## Zwei Arten von CO₂

**Operational Carbon** ist das CO₂, das ein Gebäude im Betrieb verursacht: Heizung, Kühlung, Warmwasser, Strom. Durch Dämmung und erneuerbare Energien ist dieser Wert in Neubauten stark gesunken.

**Embodied Carbon** ist das CO₂, das bei Herstellung, Transport, Einbau und Entsorgung der Baumaterialien entsteht. Es fällt einmalig an – bevor das Gebäude auch nur einen Tag genutzt wird. Bei sehr gut gedämmten Gebäuden (Passivhausstandard) übersteigt das Embodied Carbon heute den Betriebsanteil über die gesamte Lebensdauer.

!!! note "Klimaziel Gebäude"
    Der Gebäudesektor verursacht in Deutschland ca. 30 % der Treibhausgasemissionen. Bis 2045 soll er klimaneutral sein. Das erfordert nicht nur effizientere Gebäude, sondern auch emissionsärmere Baustoffe und massive Sanierungsraten im Bestand.

## Lebenszyklusanalyse (LCA)

Die Lebenszyklusanalyse (Life Cycle Assessment, LCA) quantifiziert Umweltauswirkungen über den gesamten Lebenszyklus eines Produkts oder Gebäudes. Normiert durch ISO 14040/14044 und für Gebäude durch EN 15978.

Die Lebenszyklusphasen nach EN 15978:

| Modul | Phase | Inhalt |
|---|---|---|
| A1–A3 | Produktstadium | Rohstoff, Transport, Herstellung |
| A4–A5 | Errichtung | Transport zur Baustelle, Einbau |
| B1–B7 | Nutzungsphase | Betrieb, Wartung, Instandsetzung |
| C1–C4 | Entsorgung | Rückbau, Transport, Deponie |
| D | Gutschriften | Recyclingpotenzial, Energierückgewinnung |

Für den Vergleich von Baustoffen sind A1–A3 entscheidend – das ist der Wert auf der **EPD** (Environmental Product Declaration).

## Baustoffe im Vergleich: Beton, Holz, Stahl

![LCA-Vergleich: CO₂-Äquivalent von Beton, Holz und Stahl pro Funktionseinheit](/assets/illustrations/kap22_lca_baustoffe.png)

Der Vergleich zeigt den **Global Warming Potential (GWP)** der drei wichtigsten Tragwerksmaterialien in kg CO₂-Äquivalent pro funktionaler Einheit (hier: 1 m² Decke mit gleicher Tragfähigkeit):

**Stahlbeton** liegt bei ca. 200–280 kg CO₂-Äq./m² Decke. Der Haupttreiber ist Zementklinker (ca. 800 kg CO₂/t Zement). Betonstahl trägt ebenfalls bei, ist aber gut recycelbar.

**Holz (Brettsperrholz/CLT)** liegt bei ca. 20–60 kg CO₂-Äq./m² – oder sogar im negativen Bereich, wenn die biogene CO₂-Speicherung angerechnet wird. Holz bindet während des Wachstums CO₂; dieses Kohlendioxid ist im Bauteil gespeichert, solange es nicht verbrennt.

**Stahl** hat das höchste Produktions-GWP (ca. 2,0 kg CO₂/kg Stahl für Primärstahl, 0,5 kg/kg für Elektrostahl aus Schrott). Stahl ist jedoch zu nahezu 100 % recycelbar – Modul D entlastet die Bilanz erheblich.

!!! tip "Vorsicht bei einfachen Vergleichen"
    Der GWP allein entscheidet nicht. Holz hat Trocknungsanforderungen, Brandschutzauflagen und eine kürzere Lebensdauer bei Außenexposition. Stahl und Beton haben robustere Langzeiteigenschaften. Eine faire LCA vergleicht immer gleiche Funktionalität über gleiche Nutzungsdauer.

## EPDs: Der Umwelt-Steckbrief

**Environmental Product Declarations (EPDs)** sind normierte, geprüfte Umweltnachweise für Bauprodukte (ISO 21930, EN 15804). Sie enthalten GWP, Primärenergiebedarf, Wassernutzung und weitere Indikatoren – für eine definierte Menge und Nutzungsdauer.

EPDs sind in Deutschland über das Institut Bauen und Umwelt (IBU) öffentlich zugänglich. Viele Zertifizierungssysteme (DGNB, LEED) verlangen EPDs für bestimmte Materialgruppen.

## Zertifizierungssysteme

| System | Herkunft | Bewertungsmethode |
|---|---|---|
| **DGNB** | Deutschland | Lebenszyklusbasiert, holistisch |
| **LEED** | USA | Punktbasiert, weit verbreitet international |
| **BREEAM** | UK | Ältestes System, sehr verbreitet in Europa |

Das **DGNB-System** (Deutsche Gesellschaft für Nachhaltiges Bauen) ist am konsequentesten auf LCA ausgerichtet und damit besonders relevant für deutsche Projekte. Es bewertet sechs Qualitäten: ökologisch, ökonomisch, soziokulturell, technisch, Prozess und Standort.

## Kreislaufwirtschaft: Bauen auf Wiederverwendung

Kreislaufwirtschaft (Circular Economy) im Bauwesen bedeutet: Bauteile werden nicht abgebrochen und deponiert, sondern demontiert und wiederverwendet.

**Design for Disassembly (DfD)**: Verbindungen sind lösbar statt verklebt. Schrauben statt Schweißen. Trockenestrich statt Nassestrich.

**Urban Mining**: Gebäudebestand als Rohstofflager. Allein die deutschen Bestands-Bürogebäude enthalten mehrere Millionen Tonnen wiederverwendbaren Stahl.

Der **Materialpass** dokumentiert für jedes Bauteil: Material, Menge, Hersteller, Einbaudatum und Rückbaubarkeit. Er ist die Grundlage für zukünftige Wiederverwendung.

---

!!! tip "BIM-Brücke"
    Der digitale Materialpass wird über `IfcMaterialProperties` und benutzerdefinierte Property Sets im BIM-Modell verankert. LCA-Softwaretools (OneClick LCA, SimaPro, Tally) importieren Materialdaten und Mengen direkt aus IFC-Modellen und berechnen daraus Ökobilanzen. Die DGNB-Dokumentation lässt sich für mehrere Kriterien aus BIM-Daten ableiten – GWP-Berechnung, Mengenermittlung, Materialnachweis. Das BIM-Modell wird damit zum Nachhaltigkeitsinstrument vom ersten Entwurfstag an.
