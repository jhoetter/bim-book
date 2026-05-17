# Kapitel 15 – HOAI: Phasen, Leistungen, Koordination

*Teil V – Recht & Prozess · ~20 Seiten*

---

Die HOAI – Honorarordnung für Architekten und Ingenieure – ist kein Gebührenverzeichnis. Sie ist eine Beschreibung, welche Leistungen ein Architekt erbringt und in welcher Reihenfolge. Wer die HOAI kennt, versteht, wie ein Bauprojekt strukturiert ist und wer wann welche Verantwortung trägt.

## Was die HOAI ist – und was nicht

Die HOAI 2021 (gültig seit dem 1.1.2021, nach dem EuGH-Urteil 2019 ohne verbindliche Mindest- und Höchstsätze) regelt:

- **Leistungsbilder**: Was genau macht ein Architekt in jeder Phase?
- **Honorarberechnung**: Wie errechnet sich das Honorar aus anrechenbaren Kosten und Honorarzone?
- **Besondere Leistungen**: Was geht über das Grundhonorar hinaus?

Die HOAI gilt nur für Planungsleistungen in Deutschland. Bauleistungen der ausführenden Firmen unterliegen der VOB/B (Vergabe- und Vertragsordnung für Bauleistungen).

## Die 9 Leistungsphasen

![HOAI Leistungsphasen LP 1–9 als Zeitstrahl mit Honoraranteilen](/assets/illustrations/kap15_hoai_phasen.png)

Die neun Leistungsphasen decken den gesamten Planungs- und Bauprozess ab – von der ersten Idee bis zur Mängeldokumentation nach Gewährleistungsablauf.

| LP | Bezeichnung | Honoraranteil | Ergebnis |
|---|---|---|---|
| 1 | Grundlagenermittlung | 2 % | Bedarfsprogramm |
| 2 | Vorplanung | 7 % | Vorentwurf, Kostenschätzung |
| 3 | Entwurfsplanung | 15 % | Entwurf, Kostenberechnung |
| 4 | Genehmigungsplanung | 3 % | Bauantrag |
| 5 | Ausführungsplanung | 25 % | Werkpläne M 1:50/1:20 |
| 6 | Vorbereitung der Vergabe | 10 % | Leistungsverzeichnis |
| 7 | Mitwirkung bei der Vergabe | 4 % | Vergabeempfehlung |
| 8 | Objektüberwachung | 32 % | Bauleitung, Abnahme |
| 9 | Objektbetreuung | 2 % | Mängeldokumentation |

LP 5 (Ausführungsplanung) und LP 8 (Bauleitung) tragen zusammen 57 % des Honorars – weil sie den größten Arbeitsaufwand bedeuten.

### LP 1–2: Klären, bevor entworfen wird

In LP 1 klärt der Architekt die Grundlagen: Was will der Bauherr? Was erlaubt der Bebauungsplan? Was kostet es grob? Das Ergebnis ist ein Raum- und Funktionsprogramm.

LP 2 (Vorplanung) liefert den ersten belastbaren Entwurf: Grundrisse, Ansichten, Schnitte im Maßstab 1:200, sowie eine Kostenschätzung nach DIN 276 auf Basis von Kennwerten (€/m² BGF).

### LP 3–4: Entwurf und Baurecht

Die Entwurfsplanung (LP 3) vertieft den Vorentwurf bis zur Entwurfsreife: Grundrisse 1:100, alle Fassaden, konstruktive Konzepte, Kostenberechnung mit Gewerkestruktur.

LP 4 bereitet den Bauantrag vor. Die Genehmigungsplanung unterscheidet sich von der Entwurfsplanung: Hier geht es nicht darum, was schön ist, sondern was die Baubehörde braucht – normgerechte Darstellungen, Berechnungen (Abstandsflächen, GRZ, GFZ), Nachweise.

### LP 5: Das Herzstück der Planungsleistung

Die Ausführungsplanung ist das größte Honorarpaket aus gutem Grund. Hier entstehen alle zeichnerischen Unterlagen, die Handwerker auf der Baustelle brauchen: Werkpläne 1:50, Detailpläne 1:20 und 1:5, Ausführungsdetails für Anschlüsse, Türen, Treppen, Fassaden.

!!! note "LP 5 in der Praxis"
    In deutschen Büros wird LP 5 häufig zeitlich gestreckt oder parallel zur Baustelle fertiggestellt. Das ist riskant: Ausführungsdetails, die erst während des Baus gezeichnet werden, können nicht mehr koordiniert werden. Fehler in der Ausführungsplanung kosten auf der Baustelle ein Vielfaches.

### LP 8: Bauleitung

Die Objektüberwachung ist die arbeitsintensivste und haftungsrechtlich sensibelste Phase. Der Architekt prüft, ob die ausführenden Firmen plankonform bauen, koordiniert Nachunternehmer, nimmt Leistungen ab und dokumentiert Mängel.

Die Bauleitung ist keine Aufsicht – der Architekt ist nicht ständig auf der Baustelle. Er schuldet eine **baubegleitende Kontrolle** der wesentlichen Bauphasen.

## Honorarberechnung (vereinfacht)

Das Honorar errechnet sich aus:

1. **Anrechenbare Kosten** (Kostengruppen 300 + 400 nach DIN 276)
2. **Honorarzone** (I–V, abhängig von Schwierigkeitsgrad)
3. **Leistungsanteil** (% je Leistungsphase laut HOAI-Anlage)

Beispiel: Wohngebäude, anrechenbare Kosten 2 Mio. €, Honorarzone III (Mitte) → Grundhonorar ca. 170.000 €. Wird LP 5 vollständig erbracht: 25 % davon = ca. 42.500 € für die Ausführungsplanung allein.

<calc-hoai></calc-hoai>

---

!!! tip "BIM-Brücke"
    BIM verändert die Gewichtung der Leistungsphasen: Mehr Aufwand in LP 2–3 (Modellaufbau) reduziert den Aufwand in LP 5 (Zeichnungsableitung aus dem Modell) und LP 8 (weniger Koordinationskonflikte). Der **BIM-Abwicklungsplan (BAP)** definiert für jede Leistungsphase den erforderlichen LOD (Level of Detail), die Abgabeformate und die Verantwortlichkeiten. `IfcTask` und `IfcWorkSchedule` können Leistungsphasen und Terminpläne im Modell abbilden.
