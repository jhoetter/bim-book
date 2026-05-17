# Kapitel 5 – Konstruktion: Gründung, Wand, Decke, Dach

*Teil II – Baukörper · ~30 Seiten*

---

Ein Gebäude ist ein Stapel von Schichten. Von der Gründung im Erdreich bis zur Dachabdichtung – jede Schicht hat eine Aufgabe, und jede Schicht muss mit der nächsten physikalisch kompatibel sein. Dieses Kapitel zeigt, wie die häufigsten Bauteile konstruiert werden und welche Fehler dabei entstehen.

## Gründung: Das Gebäude im Boden

Die Gründung leitet alle Lasten des Gebäudes in den tragfähigen Baugrund ab. Die Wahl des Gründungstyps hängt vom Baugrundgutachten ab.

**Streifenfundament**: unter jeder tragenden Wand ein Betonfundamentstreifen. Wirtschaftlich für leichte bis mittlere Lasten auf tragfähigem Boden. Mindesttiefe 80 cm unter Gelände (Frostfreiheit).

**Bodenplatte**: eine durchgehende Stahlbetonplatte unter dem gesamten Gebäude. Verteilt Lasten gleichmäßig, eignet sich für weicheren Baugrund, Hanglage oder wenn Kellerabdichtung vereinfacht werden soll.

**Pfahlgründung**: Betonpfähle werden in tragfähige Schichten gerammt oder gebohrt. Notwendig bei sehr weichem Boden (Auffüllungen, organische Schichten) oder bei sehr hohen Lasten.

!!! note "Baugrundgutachten"
    Kein Entwurf ohne Baugrundgutachten. Es liefert Bodenkennwerte (Steifemodul, Scherfestigkeit), empfiehlt den Gründungstyp und gibt Hinweise auf Grundwasser und Radon. Das Gutachten ist eine Planungsgrundlage – kein optionales Extra.

## Außenwandaufbau: Von innen nach außen

Die Außenwand ist thermisch, konstruktiv und schallschutztechnisch das komplexeste Bauteil. Der Aufbau folgt immer dem Prinzip **von innen nach außen zunehmend dampfdurchlässig** – sonst kondensiert Feuchtigkeit in der Konstruktion.

Typischer Aufbau einer WDVS-Außenwand (Wärmedämmverbundsystem):

| Schicht | Material | Dicke |
|---|---|---|
| Innenputz | Kalk-Gips-Putz | 15 mm |
| Mauerwerk | Porenbeton / Ziegel | 240–365 mm |
| Klebemörtel | — | 10 mm |
| Dämmung | EPS / Mineralwolle | 160–200 mm |
| Armierungsschicht | Glasfasergewebe + Mörtel | 5 mm |
| Oberputz | Silikonharzputz | 3 mm |

Das zugehörige Kapitel 6 behandelt die thermischen Anforderungen (U-Wert, GEG) ausführlich. Hier geht es um die konstruktiven Prinzipien.

## Deckenaufbau: Schallschutz und Estrich

Eine Stahlbetondecke allein erfüllt die Schallschutzanforderungen nach DIN 4109 nicht. Der Deckenaufbau enthält immer eine Trittschalldämmung:

**Schwimmender Estrich** (Regelfall im Wohnungsbau):
1. Stahlbetondecke (tragend)
2. Trittschalldämmung (EPS-T oder Mineralwolle-T, 30–40 mm, entkoppelt schwimmend verlegt)
3. PE-Folie als Trennlage
4. Zementestrich (60–80 mm, mit Fußbodenheizung ggf. dicker)
5. Bodenbelag (Parkett, Fliesen, Teppich)

Kritisch: Der Estrich darf an keiner Stelle starr mit der Decke oder den Wänden verbunden sein – sonst ist der Trittschallschutz wirkungslos. Randstreifen an allen Wänden sind Pflicht.

## Flachdach: Warm- und Umkehrdach

Das Flachdach ist das technisch anspruchsvollste Dach – nicht wegen der Neigung (2 % reichen), sondern wegen der Schichtenfolge.

![Flachdach-Aufbau als Warmdach: Schichtenfolge von Stahlbeton bis Kiesschicht](/assets/illustrations/kap05_flachdach_aufbau.png)

### Warmdach (Regelfall)

Die Dämmung liegt über der Abdichtung. Die Abdichtungsebene ist gleichzeitig die Dampfbremse.

Schichtenfolge von unten nach oben:
1. Stahlbetondecke
2. Dampfsperre (bituminös, vollflächig verklebt)
3. Wärmedämmung (PIR/PUR oder EPS, 18–22 cm für Neubau GEG 2024)
4. Abdichtung (zweilagig bituminös oder einlagig Kunststoffbahn)
5. Schutzschicht / Kiesschüttung oder Gründach

**Vorteil**: Abdichtung ist geschützt vor UV und Temperaturschwankungen (→ längere Lebensdauer).

### Umkehrdach

Abdichtung liegt *unter* der Dämmung, direkt auf der Betondecke. Die Dämmung muss wasserbeständig sein (extrudierter Polystyrol-Hartschaum, XPS).

**Anwendung**: Extensives Gründach, begehbare Terrassen. Der Vorteil: Abdichtung ist einfacher zugänglich. Nachteil: Dämmung wird regelmäßig durchfeuchtet (Rechenkorrektur nach DIN 4108 erforderlich).

!!! tip "Häufigster Flachdachfehler"
    Anschlüsse und Durchdringungen (Lichtkuppeln, Entwässerungsrinnen, Attika-Anschlüsse) sind die häufigsten Leckage-Ursachen. Die Abdichtung muss an Aufkantungen mindestens 15 cm hochgeführt werden. Bei Terrassentüren ist die Höhe oft das Hauptproblem zwischen Entwurf und Ausführung.

---

!!! tip "BIM-Brücke"
    `IfcWall`, `IfcSlab` und `IfcRoof` bilden die Haupttragstrukturen in IFC ab. Der `IfcMaterialLayerSet` beschreibt den Schichtaufbau mit Materialname und Dicke je Schicht – Grundlage für automatische U-Wert-Berechnungen und Mengenermittlungen. LOD 200 zeigt Bauteile als Volumen ohne Schichtdetail; LOD 350 enthält alle Schichten mit Materialangabe und ist Voraussetzung für Fachmodell-Koordination (Kollisionsprüfung mit TGA).
