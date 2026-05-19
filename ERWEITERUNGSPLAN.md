# Erweiterungsplan: „BIM von Grund auf"

> Tracker für identifizierte Lücken, Literatur und geplante Ergänzungen der Buchstruktur.
> Stand: Mai 2026 · wird laufend gepflegt

---

## Status-Legende

| Symbol | Bedeutung |
|--------|-----------|
| 🔴 | Fehlend – kein Kapitel, keine Erwähnung |
| 🟡 | Angesprochen – aber zu knapp / zu oberflächlich |
| 🟢 | Geplant – bereits in Gliederung, nur noch schreiben |
| ✅ | Erledigt |
| ➕ | Neues Kapitel vorgeschlagen |
| ✏️ | Ergänzung in bestehendem Kapitel |

---

## Block A: Entwurfs- und Planungsprozess

> Das Buch erklärt *was* gebaut wird – aber noch zu wenig *wie* der Planungsprozess von der ersten Idee bis zur Übergabe funktioniert. Diese Lücke betrifft Architekten und BIM-Entwickler gleichermaßen.

| # | Thema | Status | Einordnung |
|---|-------|--------|------------|
| A1 | **Entwurfsprozess:** Konzeptphase → Vorentwurf → Entwurf → Ausführungsplanung als Trichter; Entwurfsmethoden (Analogie, Typus, Parametrik); Wettbewerb vs. direkter Auftrag | 🔴 | ➕ Neues Kap. 2a **oder** ✏️ Erweiterung Kap. 2 |
| A2 | **Genehmigungsverfahren im Detail:** Bauantrag-Zusammenstellung, Prüfschritte der Baubehörde, Vorbescheid, vereinfachtes vs. vollständiges Verfahren, Fristen, Auflagen, Widerspruch | 🟡 | ✏️ Kap. 14 (+6–8 S.) |
| A3 | **Bauprojektmanagement & Terminplanung:** Projektstrukturplan, Balkenprogramm (Gantt), kritischer Pfad, Phasenübergänge, Claim Management; Unterschied Architekten-Koordination vs. externer Projektsteuerung | 🔴 | ➕ Neues Kap. 16 |
| A4 | **Ausschreibung & Vergabe im Detail:** LV aufstellen (Mengen, Leitfabrikat, Nebenangebot), STLB-Bau live, Bieteranfragen, Submissionsöffnung, Wertung (Preis + Qualität), Vergabeprotokoll | 🟡 | ✏️ Kap. 16 (+5–8 S.) |
| A5 | **Bauausführung & Bauleitung:** Bauanlaufbesprechung, Bautagebuch, Abnahme (förmlich / konkludent), Mängelrüge, Gewährleistungslauf, Kostenkontrolle auf der Baustelle, ÖBA vs. Objektüberwachung | 🔴 | ➕ Neues Kap. 16a **oder** Teil von Kap. 15 erweitern |
| A6 | **Dokumentation & Übergabe:** Revisions-/Bestandspläne, Wartungsverträge, Bedienungsanleitungen (Gebäude-Logbuch), BIM-Übergabe an FM (COBie, CAFM), Abrechnung nach VOB | 🔴 | ✏️ Ende Kap. 20 **oder** ➕ Kap. 21a |

---

## Block B: Projektarten

> Das Leitbeispiel Kastanienallee 7 ist ein klassischer MFH-Neubau. Das Buch muss aber erklären, dass es viele andere Projekttypen gibt – mit jeweils eigenen Regeln, Restriktionen und BIM-Implikationen. Rund 60 % des deutschen Bauvolumens entfällt auf den Bestand.

### B1 – Neubautypen

| # | Thema | Status | Einordnung |
|---|-------|--------|------------|
| B1.1 | **Einfamilienhaus / Doppelhaus** (Vergleichsgebäude Holzrahmenbau – bereits in README erwähnt) | 🟡 | ✏️ Kap. 1 oder Kap. 4 (Tragsysteme) als Vergleichskasten |
| B1.2 | **Gewerbebau:** renditegetrieben, kurze Planungszeiträume, Mieterkonfiguration, Stahlbau-Dominanz | 🔴 | ✏️ Kap. 1 (Gebäude als System) kurzer Überblick + ggf. Vergleichsgebäude |
| B1.3 | **Sonderbauten:** Schulen, Krankenhäuser, Kulturbauten – eigene SBO, komplexe Nutzerprozesse, BIM-Anforderungen oft höher | 🔴 | ✏️ Kap. 14 (Planungsrecht) Kasten: Sonderbauordnungen |
| B1.4 | **Modulbau / Serielles Bauen:** Typen-Wiederholung, Werksplanung, BIM-Relevanz besonders hoch | 🔴 | ✏️ Kap. 24 (Zukunft) Abschnitt |

### B2 – Bestandsmaßnahmen (Kernlücke)

> Die Begriffe werden oft verwechselt – eine klare Systematik fehlt im Buch komplett.

| Begriff | Bedeutung | Baugenehmigung | GEG-Relevanz | Status |
|---------|-----------|---------------|--------------|--------|
| **Renovierung** | Kosmetisch: Tapete, Farbe, Böden | Nein | Nein | 🔴 |
| **Reparatur / Instandhaltung** | Substanz erhalten, keine Veränderung | Nein | Nein | 🔴 |
| **Instandsetzung** | Substanz nach Schaden wiederherstellen | Meist nein | Bauteilweise (§ 48 GEG) | 🔴 |
| **Modernisierung** | Gebrauchswert erhöhen, §§ 555b–f BGB | Teils | Ja (§ 47ff GEG) | 🔴 |
| **Energetische Sanierung** | BEG-Förderung, iSFP, Effizienzhaus-Stufen | Teils | Zentral | 🟡 (nur in Kap. 23) |
| **Umbau** | Nutzungsänderung, Zusammenlegung | Ja (oft) | Ja | 🔴 |
| **Anbau / Aufstockung** | Erweiterung am Bestand | Ja | §§ 31/32 GEG | 🔴 |
| **Abbruch / Rückbau** | Schadstoffgutachten, Kreislaufwirtschaft | Abbruchgenehmigung | – | 🔴 |

**Einordnung:** ✏️ Kap. 24 deutlich erweitern (+15 S.) **und/oder** ➕ neues Kap. 25 „Projektarten: Neubau, Bestand, Hybrid"

| # | Ergänzungsthema Bestand | Status | Einordnung |
|---|------------------------|--------|------------|
| B2.1 | Begriffssystematik: Renovierung / Sanierung / Umbau / Abriss klar abgrenzen | 🔴 | ✏️ Kap. 23 Einstieg |
| B2.2 | Baualtersphasen und typische Konstruktionen (Gründerzeit, 50er, 70er, 90er) | 🟢 | ✏️ Kap. 23 (bereits geplant) |
| B2.3 | Scan-to-BIM: Punktwolke → IFC-Modell, LOD im Bestand | 🟡 | ✏️ Kap. 23 BIM-Brücke |
| B2.4 | Mietrecht-Schnittstelle: §§ 555b–f BGB bei Modernisierung | 🔴 | ✏️ Kap. 14 oder Kap. 23 Kasten |
| B2.5 | iSFP (individueller Sanierungsfahrplan) als BIM-Use-Case | 🔴 | ✏️ Kap. 6 (GEG) oder Kap. 23 |
| B2.6 | Serielle Sanierung: Fassadenmodule, Digitalisierung Bestand | 🔴 | ✏️ Kap. 24 (Zukunft) |

### B3 – Weitere Projekttypen

| # | Thema | Status | Einordnung |
|---|-------|--------|------------|
| B3.1 | **Denkmalpflege:** Denkmalschutzgesetze (Länder), Untere Denkmalbehörde, Reversibilität, §§ 7i/10f EStG, Scan-to-BIM als Methode | 🟡 | ✏️ Kap. 23 Abschnitt „Sonderfall Denkmal" (+6 S.) |
| B3.2 | **Innenarchitektur / Interiorplanung:** HOAI Anlage 11, Mieteinbauten, Brandschutz Innenausbau, kurze Planungszyklen | 🔴 | ✏️ Kap. 15 Kasten |
| B3.3 | **Außenanlagen / Freianlagen:** HOAI Anlage 11a, Versiegelung, Retentionsflächen, GrünordnungsPlan | 🔴 | ✏️ Kap. 14 oder Kap. 22 (Nachhaltigkeit) |
| B3.4 | **Stadtplanung / B-Plan-Aufstellung:** §§ 8–10 BauGB, FNP → B-Plan, Bebauungsstudien, städtebauliche Verträge | 🔴 | ✏️ Kap. 14 Kasten „Übergeordnete Planungsebenen" |

---

## Block C: Weitere Lücken (kleinere Ergänzungen)

| # | Thema | Status | Einordnung |
|---|-------|--------|------------|
| C1 | **Barrierefreiheit als Entwurfsprozess** (nicht nur als Norm): universelles Design, Rollstuhl vs. Rollator vs. Kinderwagen – Anforderungen im Vergleich | 🟡 | ✏️ Kap. 2 |
| C2 | **Flächenberechnungen im Detail:** DIN 277 (BGF, NGF, NUF), gif-Methode für Wohnfläche (WoFlV), Unterschied für Vermietung vs. Planung | 🔴 | ✏️ Kap. 2 |
| C3 | **Kostenentwicklung im Planungsprozess:** DIN 276 Stufen (Kostenschätzung → -berechnung → -anschlag → -feststellung), Kostentreiber erkennen | 🟡 | ✏️ Kap. 16 |
| C4 | **Bauphysik Sommer:** Sommerlicher Wärmeschutz DIN 4108-2, Sonnenschutzplanung, Nachtauskühlung – Klimawandel-Relevanz wächst | 🟡 | ✏️ Kap. 6 |
| C5 | **Feuerwehr & Rettungswege im Detail:** Feuerwehrzufahrt, Aufstellfläche, Anleiterstellen, Hydrantenabstand – oft unterschätzt | 🔴 | ✏️ Kap. 9 (Brandschutz) |
| C6 | **Barrierefreies Parken & Stellplatznachweis** im Bebauungsplan | 🔴 | ✏️ Kap. 14 |

---

## Literatur & Quellen für die Erweiterungen

### Prozess & Projektmanagement (Block A)

| Titel | Autor | Verlag | Relevanz | Vorhanden? |
|-------|-------|--------|----------|------------|
| **Bau-Projekt-Management** | Kochendörfer / Liebchen / Viering | Springer Vieweg | ⭐⭐⭐⭐⭐ Standardwerk Projektsteuerung | ✅ `13_Projektmanagement` |
| **Bauobjektüberwachung** | Würfele / Bielefeld / Gralla | Springer Vieweg | ⭐⭐⭐⭐ Bauüberwachung & ÖBA | ✅ `13_Projektmanagement` |
| **HOAI 2021 verstehen und richtig anwenden** | Siemon / Averhaus | Springer Vieweg | ⭐⭐⭐⭐ LP-Kommentar + Praxisbeispiele | ✅ `06_Recht-und-Vertraege` |
| **Projektmanagement im Hochbau** | Eschenbruch | Springer | ⭐⭐⭐⭐ Praxisnah, Terminplanung | ❌ |
| **Basics Bauleitung** | Bielefeld | Birkhäuser Basics | ⭐⭐⭐ Kompakteinstieg Bauausführung | ❌ (Perlego) |
| **VOB kompakt** | Ingenstau / Korbion | Werner | ⭐⭐⭐ Vertragsrecht Bauausführung | ❌ |

### Bestandsmaßnahmen & Projektarten (Block B)

| Titel | Autor | Verlag | Relevanz | Vorhanden? |
|-------|-------|--------|----------|------------|
| **Bausanierung** | Stahr (Hrsg.) | Vieweg | ⭐⭐⭐⭐⭐ Bestandsmaßnahmen, Bauschäden | ✅ `05_Sanierung` |
| **Denkmal und Energie** | div. | Detail | ⭐⭐⭐⭐ Energetische Sanierung Denkmal | ✅ `05_Sanierung` |
| **Altbaumodernisierung** | Lohse / Lauser | Fraunhofer IRB | ⭐⭐⭐⭐ Baualtersphasen + Baukonstruktion Bestand | ❌ |
| **Energetische Sanierung** | Hegner | Bundesinstitut für Bau | ⭐⭐⭐⭐ GEG Bestand, iSFP-Methodik | ❌ |
| **Scan-to-BIM – Grundlagen** | Arayici | Emerald | ⭐⭐⭐ Punktwolke → IFC | ❌ |
| **Wohnungsbau im Bestand** | Bölling / Lanz | Birkhäuser | ⭐⭐⭐ Umbau, Aufstockung, Nachverdichtung | ❌ (Perlego) |

### Entwurf & Stadtplanung

| Titel | Autor | Verlag | Relevanz | Vorhanden? |
|-------|-------|--------|----------|------------|
| **Grundrissatlas Wohnungsbau** | Schneider / Heckmann | Birkhäuser | ⭐⭐⭐⭐ Entwurfsmethodik + Wohnungstypen | ❌ (nicht auf Perlego) |
| **Sun, Wind & Light** | Brown / DeKay | Wiley | ⭐⭐⭐ Klimatisches Entwerfen | ❌ |
| **Städtebauliches Entwerfen** | Baumgartner | Springer | ⭐⭐⭐ B-Plan-Prozess, Quartiersentwicklung | ❌ |

### Verfügbar in Bibliothek (bereits vorhanden, nur noch nutzen)

| Datei | Relevanz für Lücken |
|-------|---------------------|
| `06_Recht-und-Vertraege/VOB im Bild.pdf` | Block A: Ausschreibung, Bauausführung |
| `06_Recht-und-Vertraege/Basics Ausschreibung.pdf` | Block A: LV-Erstellung |
| `06_Recht-und-Vertraege/HOAI 2021 verstehen – Siemon.pdf` | Block A: LP-Leistungsbilder, Honorar ✅ NEU |
| `07_Bauausfuehrung/Baustelleneinrichtung.pdf` | Block A: Bauausführung |
| `13_Projektmanagement/Bau-Projekt-Management – Kochendörfer.pdf` | Block A: Projektmanagement ✅ NEU |
| `13_Projektmanagement/Bauobjektüberwachung – Würfele.pdf` | Block A: ÖBA, Bauleitung ✅ NEU |
| `05_Sanierung-und-Denkmalpflege/Bausanierung (Stahr).pdf` | Block B: Bestandsmaßnahmen |
| `05_Sanierung-und-Denkmalpflege/Denkmal und Energie.pdf` | Block B: Denkmalpflege |
| `09_Digital-und-BIM/Grundlagen BIM-Arbeitsmethode.pdf` | Block A: BIM-Prozess ✅ NEU |
| `09_Digital-und-BIM/Agile Digitalisierung im Baubetrieb.pdf` | Block A/C: Digitaler Wandel ✅ NEU |
| `10_Bauphysik/Praxisbeispiele Bauphysik – Willems.pdf` | Block C: Bauphysik-Vertiefung ✅ NEU |
| `11_Tragwerkslehre/Grundlagen Tragwerksplanung – Jahnke.pdf` | Block B: Tragwerk Bestand ✅ NEU |
| `12_Normen-und-Gesetze/GEG 2024.pdf` | Block B: Energetische Sanierung |
| `12_Normen-und-Gesetze/MBO.pdf` | Block B: Genehmigungsverfahren |

---

## Erweiterungsplan: Konkrete Maßnahmen

### Option 1 – Konservativ: nur bestehende Kapitel erweitern

Kein neues Kapitel, aber gezielte Erweiterungen. Buchstruktur bleibt bei 24 Kapiteln.

| Kapitel | Erweiterung | Mehrseiten | Priorität |
|---------|-------------|------------|-----------|
| Kap. 2 | Entwurfsprozess als Trichter (Konzept → Vorentwurf → Entwurf → AP), Flächenberechnung DIN 277 | +8 S. | Hoch |
| Kap. 14 | Genehmigungsverfahren im Detail, Sonderbauordnungen, Stadtplanung-Kasten | +8 S. | Hoch |
| Kap. 15 | Terminplanung (Gantt, krit. Pfad), Projektsteuerung vs. Architektenleistung, Innenarchitektur-Kasten | +6 S. | Mittel |
| Kap. 16 | LV-Aufstellung live, Vergabewertung, Kostenkontrolle Baustelle, Dokumentation | +8 S. | Hoch |
| Kap. 23 | Begriffssystematik Bestandsmaßnahmen, Mietrecht, iSFP, Denkmalpflege, B2.x komplett | +15 S. | Hoch |
| Kap. 9 | Feuerwehr, Rettungswege im Detail | +4 S. | Mittel |
| Kap. 24 | Serielles Bauen, Modulbau, serielle Sanierung | +4 S. | Niedrig |
| **Gesamt** | | **+53 S.** | |

### Option 2 – Strukturell: 3 neue Kapitel → Buch auf 27 Kapitel

Empfohlen wenn diese Themen Tiefe verdienen, die nicht in bestehende Kapitel passt.

| Neues Kapitel | Titel | Einordnung in Buchstruktur | Seiten |
|---------------|-------|---------------------------|--------|
| **Kap. 2a** | Entwurfsprozess: Vom Raumprogramm zur Ausführungsplanung | Teil I nach Kap. 2 | ~20 S. |
| **Kap. 16** | Bauprojektmanagement: Terminplanung, Kostenkontrolle, Bauleitung | Teil V nach Kap. 15 | ~20 S. |
| **Kap. 25** | Projektarten: Neubau, Bestand, Denkmal – Unterschiede systematisch | Teil VII vor Kap. 26 | ~20 S. |

> **Empfehlung:** Option 2 für Kap. 16 (Projektmanagement ist groß genug für ein eigenes Kapitel) + Option 1 für alle übrigen Lücken. Netto: +1 neues Kapitel, ~70 Zusatzseiten → Buch ~580 Seiten.

---

## Priorisierung nach Wirkung

| Priorität | Maßnahme | Wirkung |
|-----------|----------|---------|
| 🔴 P1 | Kap. 23 Bestandsmaßnahmen-Systematik | Schließt die größte inhaltliche Lücke |
| 🔴 P1 | Neues Kap. 16 Projektmanagement | Fehlt komplett, für Praxis-Leser unverzichtbar |
| 🟡 P2 | Kap. 2 Entwurfsprozess-Erweiterung | Stärkt den roten Faden durch das Buch |
| 🟡 P2 | Kap. 14 Genehmigungsverfahren vertiefen | Wichtig für BIM-Software-Entwickler (automatisierbar?) |
| 🟡 P2 | Kap. 16 Ausschreibung & Dokumentation | Schließt den LP-Zyklus |
| 🟢 P3 | B1-Neubautypen als Kästen | Kontext, nicht essenziell |
| 🟢 P3 | C1–C6 Kleinergänzungen | Feinschliff, nach Erstentwurf |

---

## Fortschritt

| Maßnahme | Status | Notizen |
|----------|--------|---------|
| Erweiterungsplan erstellen | ✅ | Dieses Dokument |
| Literatur Block A beschaffen | ✅ | Kochendörfer, Würfele, Siemon HOAI-Kommentar alle vorhanden |
| Literatur Block B (Bestand) | 🟡 | Stahr + Denkmal vorhanden; Altbaumodernisierung + iSFP fehlen noch |
| Literatur Block B (BIM) | ✅ | BIM-Arbeitsmethode + Agile Digitalisierung beschafft |
| Bibliothek einräumen + README aktualisieren | ✅ | 8 Bücher einsortiert, Ordner 13 angelegt |
| Kap. 23 überarbeiten (Bestand-Systematik) | 🔴 | Wenn Kap. 23 geschrieben wird |
| Neues Kap. 16 Projektmanagement | 🔴 | Literatur vorhanden (Kochendörfer + Würfele) |
| Kap. 2 Entwurfsprozess erweitern | 🔴 | Vor oder mit Kap. 2 |
| Kap. 14 Genehmigung vertiefen | 🔴 | Vor oder mit Kap. 14 |
| Kap. 16 Dokumentation/LV erweitern | 🔴 | Vor oder mit Kap. 16 |

---

*Zuletzt aktualisiert: Mai 2026*
