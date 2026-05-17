# Kapitel 10 – Heizung & Wärmeversorgung

*Teil IV – TGA · ~20 Seiten*

---

Wärme ist der größte Einzelposten im Energiebedarf eines Wohngebäudes. Wie sie erzeugt, verteilt und abgegeben wird, bestimmt Betriebskosten, CO₂-Bilanz – und die Schachtgrößen im Grundriss.

## 10.1 Wärmeerzeuger im Vergleich

Die Wahl des Wärmeerzeugers ist eine der folgenreichsten Planungsentscheidungen: Sie bindet das Gebäude für 20–30 Jahre, beeinflusst die Energiezertifizierung und bestimmt, ob die 65-%-Erneuerbare-Pflicht des GEG 2024 erfüllt wird.

| System | Wirkungsgrad / COP | Primärenergiefaktor | CO₂ (g/kWh_th) | Investition |
|--------|--------------------|---------------------|----------------|-------------|
| Fernwärme (regenerativ) | – | 0,0–0,3 | 0–80 | gering |
| Wärmepumpe Luft/Wasser | COP 3–4 | 0,5[^1] | 50–200 | hoch |
| Wärmepumpe Sole/Wasser | COP 4–5 | 0,4 | 40–150 | sehr hoch |
| Gas-Brennwert | 97–104 % | 1,1 | ~200 | mittel |
| Holzpellets | 90–95 % | 0,2 | ~25 | hoch |

[^1]: Primärenergiefaktor Strom: 2,4 × Systemeffizienz COP 3,5 ≈ 0,69 → gerundet 0,7 nach GEG Anlage 4

**Für die Kastanienallee 7 wurde Fernwärme gewählt.** In der Lage (städtisch, Bayern) ist das Fernwärmenetz aus Kraft-Wärme-Kopplung gespeist und gilt nach GEG als „überwiegend erneuerbar". Vorteile: kein Heizraum, kein Schornstein, geringer Wartungsaufwand, sofortige GEG-Konformität.

---

## 10.2 Die Fernwärmeanlage im Detail

Das Fernwärmenetz liefert Heizwasser mit **70 °C Vorlauf (VL)** und erwartet **50 °C Rücklauf (RL)**. Im Keller des Gebäudes befindet sich die **Übergabestation** – das Herzstück der Anlage.

![Hydraulisches Schema Fernwärme](../assets/illustrations/kap10_heizkreis_schema.png)
*Abb. 10.1: Hydraulisches Schema der Fernwärmeanlage Kastanienallee 7 mit Übergabestation, Verteilerbalken und drei Fußbodenheizkreisen.*

### Komponenten der Übergabestation

**Wärmetauscher (Plattenwärmetauscher)**
Trennt hydraulisch das Primärnetz (Fernwärmeversorger) vom Sekundärnetz (Gebäude). Hygienisch notwendig, da Fernwärmewasser oft Inhibitoren enthält. Übertragungsleistung: typisch 80–150 kW für ein Mehrfamilienhaus dieser Größe.

**Regelventil**
Steuert die Wärmemenge in Abhängigkeit von der Außentemperatur (witterungsgeführte Regelung). Bei 0 °C Außentemperatur ist mehr Wärme nötig als bei +10 °C.

**Wärmemengenzähler**
Misst die abgenommene Wärmeenergie für die Abrechnung mit dem Fernwärmeversorger. Geeichtes Messgerät, muss alle 5 Jahre geeicht werden.

### Wärmeverteilung: der Verteilerbalken

Von der Übergabestation führen gedämmte Steigleitungen zum **Verteilerbalken** im Keller. Dieser verteilt die Wärme auf drei unabhängige Heizkreise:

| Heizkreis | Fläche (ca.) | Volumenstrom | Vorlauftemperatur |
|-----------|-------------|--------------|-------------------|
| FBH Erdgeschoss | 360 m² | 0,8 m³/h | 35 °C |
| FBH Obergeschoss 1 | 360 m² | 0,8 m³/h | 35 °C |
| FBH Obergeschoss 2 | 360 m² | 0,8 m³/h | 35 °C |

Die Fußbodenheizung (FBH) arbeitet mit deutlich niedrigeren Vorlauftemperaturen (35–45 °C) als klassische Heizkörper (70 °C). Das hat zwei Vorteile: niedrigere Strahlungsverluste im Verteilnetz und optimale Kompatibilität mit Wärmepumpen und Fernwärme.

---

## 10.3 Hydraulischer Abgleich

Jeder Heizkreis hat eine unterschiedliche Rohrlänge, einen anderen Druckverlust und eine andere Heizlast. Ohne Ausgleich erhalten nahe Kreise zu viel Wärme, entfernte zu wenig – klassisches Symptom: im Erdgeschoss zu warm, im zweiten Obergeschoss kalt.

Der **hydraulische Abgleich** stellt für jeden Heizkreis den berechneten Volumenstrom ein:

1. **Berechnung** der Heizlast je Raum nach DIN EN 12831
2. **Ermittlung** des erforderlichen Volumenstroms aus Heizlast und Temperaturspreizung
3. **Einstellung** der Strangregulier- und Thermostatventile
4. **Dokumentation** (seit GEG 2023 Pflicht bei Heizungstausch in Gebäuden ab 6 Wohneinheiten)

!!! note "Warum das wichtig ist"
    Ein nicht abgeglichenes Heizsystem verbraucht 15–20 % mehr Energie als nötig. Die Pumpe arbeitet gegen einen zu hohen Druckabfall, einzelne Räume werden überheizt und durch Fensterlüften wieder abgekühlt. Die Investition in den hydraulischen Abgleich amortisiert sich typisch in 2–4 Jahren.

---

## 10.4 Warmwasserbereitung

Für die Trinkwassererwärmung (TWW) gibt es in der Kastanienallee 7 zwei Optionen:

**Option A: Zentrale TWW-Bereitung**
Ein Pufferspeicher (500–1.000 l) wird über die Übergabestation beheizt und versorgt alle 12 Wohneinheiten. Vorteil: einfache Anlage. Nachteil: lange Zirkulationsleitungen → Legionellenrisiko nach DVGW W 551 → tägliche Aufheizung auf 60 °C nötig.

**Option B: Dezentrale TWW-Bereitung**
Jede Wohnung hat einen eigenen Frischwasserstation oder Kleinspeicher. Vorteil: kein Zirkulationsproblem, individuelle Abrechnung. Nachteil: höherer Investitionsaufwand, mehr Wartungspunkte.

*Für die Kastanienallee 7 wurde Option B gewählt.*

---

!!! tip "BIM-Brücke: MEP-Modell in IFC"
    TGA-Komponenten bilden in IFC den **MEP-Bereich** (Mechanical, Electrical, Plumbing):

    | Bauteil | IFC-Entität |
    |---------|-------------|
    | Wärmetauscher | `IfcHeatExchanger` |
    | Pumpe | `IfcPump` |
    | Rohrleitung | `IfcPipeSegment` |
    | Rohrbogen, T-Stück | `IfcPipeFitting` |
    | Verteiler | `IfcDistributionChamberElement` |
    | Heizkörper / FBH-Kreis | `IfcSpaceHeater` |

    **Kollisionsprüfung** ist der zentrale BIM-Use-Case der TGA-Koordination: Heizungsrohre, Lüftungskanäle und Elektroleitungen kollidieren regelmäßig mit Tragwerk und untereinander. In Navisworks oder Solibri werden diese Konflikte automatisch als **Hard Clashes** (physische Überschneidung) oder **Soft Clashes** (Unterschreitung von Mindestabständen) erkannt und als **BCF-Issues** an die verantwortlichen Fachplaner kommuniziert.

    Die Heizungsplanung liefert außerdem Daten für das **5D-BIM**: Über `IfcQuantitySet` werden Rohrlängen, Dämm­volumina und Komponentenanzahlen direkt aus dem Modell für die Kostenermittlung nach DIN 276 (KG 420 – Wärmeversorgungsanlagen) ausgelesen.
