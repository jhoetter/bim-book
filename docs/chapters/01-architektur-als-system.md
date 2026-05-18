# Kapitel 1 – Architektur als System

*Teil I – Fundament*

---

Ein Gebäude wirkt von außen oft selbstverständlich: Wände stehen, Fenster sitzen in der Fassade, Türen führen in Räume, auf dem Dach liegt Technik, die man kaum sieht. Erst wenn eine Leitung an der falschen Stelle liegt, ein Sturz zu niedrig geplant wurde oder ein Lüftungskanal keinen Platz findet, zeigt sich: Architektur ist kein Bild, sondern ein Gefüge aus voneinander abhängigen Entscheidungen. Wer dieses Gefüge versteht, kann Pläne lesen, Modelle prüfen und digitale Werkzeuge sinnvoll einsetzen.

---

<!-- CHAPTER_VIDEO:start -->
<figure class="chapter-video">
  <video controls preload="metadata" playsinline src="/assets/videos/01-architektur-als-system.hybrid.mp4"></video>
  <figcaption>KI-generierter Kapitelclip: Kapitel 1 – Architektur als System</figcaption>
</figure>
<!-- CHAPTER_VIDEO:end -->

!!! ziel "Nach diesem Kapitel können Sie …"
    - ein Gebäude als System aus vier Schichten mit unterschiedlichen Lebensdauern beschreiben
    - an zwei Beispielen erklären, wie Entscheidungen in einer Schicht andere Schichten verändern
    - die Struktur dieses Buchs mit der Logik des Schichtenmodells verbinden

## 1.1 Wie Bauen komplex wurde

Lange Zeit war Bauen in einer Person oder in einer kleinen Werkstatt gebündelt. Der Baumeister kannte Material, Konstruktion, Proportion, Bauablauf und Kosten aus derselben praktischen Erfahrung. Eine mittelalterliche Stadtmauer, ein Fachwerkhaus oder ein Gewölbe waren anspruchsvoll, aber die Zahl der beteiligten Systeme blieb überschaubar: Stein, Holz, Mörtel, Dachdeckung, Feuerstelle, Wasserstelle.

Mit der Industrialisierung änderte sich das grundlegend. Stahl und später Stahlbeton erlaubten größere Spannweiten, höhere Gebäude und offenere Grundrisse. Fensterflächen wurden größer, Fassaden leichter, Tragwerke unabhängiger von massiven Wänden. Gleichzeitig zogen neue Anforderungen in das Gebäude ein: zentrale Heizung, elektrisches Licht, Aufzüge, Lüftung, Sanitär, Brandschutz, Schallschutz, Wärmeschutz und später Gebäudeautomation. Was vorher im Wesentlichen aus Raum, Wand und Dach bestand, wurde zu einem technischen Organismus.

Diese Entwicklung hat die Rolle der Architektur nicht kleiner gemacht, sondern anspruchsvoller. Ein Entwurf ist nicht nur eine räumliche Idee, sondern ein Koordinationsangebot an viele Fachdisziplinen. Tragwerk, Gebäudehülle, Ausbau und Technik müssen zusammenpassen, obwohl sie von unterschiedlichen Büros geplant, zu unterschiedlichen Zeitpunkten entschieden und mit unterschiedlichen Genauigkeiten modelliert werden.

Besonders deutlich wird das an der **Technischen Gebäudeausrüstung** (::TGA::). Sie umfasst Heizung, Lüftung, Sanitär, Elektro und Gebäudeautomation. In heutigen Gebäuden kann sie etwa 40 bis 60 Prozent der Baukosten beeinflussen, wenn man technische Anlagen, Schächte, Installationsflächen, Brandschutzabschottungen und spätere Betriebsfolgen zusammendenkt. Ein Lüftungsgerät braucht nicht nur einen Raum, sondern auch Wartungsflächen, Luftwege, Brandschutzklappen, Stromanschluss, Kondensatabfluss und eine Regelung. Architektur ist damit immer auch Schnittstellenarbeit.

Diese Schnittstellen sind nicht nur technische Kleinigkeiten. Sie verändern Verantwortlichkeiten. Früher konnte ein Baumeister viele Entscheidungen direkt auf der Baustelle zusammenführen. Heute entstehen Entscheidungen verteilt: Architekturbüro, Tragwerksplanung, Fachplanung, Brandschutz, Bauphysik, Bauherr, ausführende Firmen und später der Betreiber arbeiten mit. Je später ein Konflikt sichtbar wird, desto teurer wird seine Korrektur. Aus einer verschobenen Wand wird dann nicht nur eine neue Linie im Grundriss, sondern eine neue Statik, ein anderer Schacht, eine veränderte Fluchtweglänge und eine geänderte Ausschreibung.

Die Konsequenz ist einfach: Bauen braucht eine gemeinsame Sprache. Wer nur in Bauteilen denkt, übersieht die Technik. Wer nur in Datenobjekten denkt, übersieht Material, Montage und Lebensdauer. Dieses Buch beginnt deshalb nicht mit Software, sondern mit einem Systembild des Gebäudes.

<!-- IMAGE
name: kap01_schichtenmodell
type: isometric
size: landscape
desc: Explosionsdarstellung eines kompakten viergeschossigen Mehrfamilienhauses wie Kastanienallee 7, vier farbkodierte Gebäudeschichten vertikal auseinandergezogen: Tragstruktur als graues Stahlbeton-Skelett mit Stützenraster 6 x 6 m und Deckenplatten, Gebäudehülle als blaue Fassade mit Fenstern und Flachdach, TGA als rote und gelbe Leitungs- und Kanalnetze mit Technikzentrale im Keller, Innenausbau als grüne leichte Trennwände, Bodenbeläge und Türen. Jede Schicht mit deutschem Label und Lebensdauer: Tragstruktur 80-200 Jahre, Gebäudehülle 30-50 Jahre, TGA 15-25 Jahre, Innenausbau 5-15 Jahre. Weißer Hintergrund, technisch-clean, klare Linien, keine Personen.
caption: Ein Gebäude als vier Schichten mit unterschiedlichen Lebensdauern
tags: schichtenmodell, systemdenken, kastanienallee7, lebensdauer
-->
![Schichtenmodell eines Gebäudes](../assets/illustrations/kap01_schichtenmodell.png)

!!! kastanienallee "Kastanienallee 7"
    Am Leitbeispiel arbeiten mindestens sieben Planungsbereiche zusammen: Architektur, Tragwerksplanung, Brandschutz, Wärmeschutz, Schallschutz, Heizung/Lüftung/Sanitär und Elektro. Die Grundfläche beträgt ca. 20 m × 18 m = 360 m², darüber liegen 4 Vollgeschosse, Keller und Dachgeschoss. Schon diese einfache Kubatur erzeugt Schnittstellen: Stützenraster, Treppenhaus, Aufzug, Installationsschächte, Fassadenraster, Dachaufbau und Technikräume müssen räumlich zusammenpassen. Digitale Koordination wird deshalb nicht als Zusatz behandelt, sondern als gemeinsame Arbeitsbasis; die Methode folgt in [Kapitel 17](/chapters/17-was-bim-wirklich-ist), das Austauschformat in [Kapitel 18](/chapters/18-ifc).

## 1.2 Das Schichtenmodell

Das **::Schichtenmodell::** beschreibt ein Gebäude nicht als ein einziges Objekt, sondern als mehrere Schichten mit unterschiedlicher Lebensdauer, Verantwortung und Änderbarkeit. Die Grundidee wurde besonders durch Frank Duffy und Stewart Brand bekannt. Brand sprach von "Shearing Layers": Schichten, die sich mit unterschiedlicher Geschwindigkeit verändern und deshalb aneinander reiben können.

Für dieses Buch genügt ein praxisnahes Vier-Schichten-Modell. Es unterscheidet Tragstruktur, Gebäudehülle, ::TGA:: und Innenausbau. Diese Einteilung ist nicht die einzige mögliche, aber sie ist für Planung, Bau und digitale Modellierung robust. Sie zeigt, warum eine frühe Entscheidung später teuer werden kann und warum ein gutes Modell nicht nur Geometrie, sondern auch Systemzugehörigkeit abbildet.

Die vier Schichten unterscheiden sich in drei Punkten: wie lange sie halten, wer sie plant und wie leicht sie verändert werden können. Tragstruktur wird selten ersetzt, Innenausbau häufig. Die Gebäudehülle liegt dazwischen, weil sie konstruktiv dauerhaft sein soll, aber Fenster, Abdichtungen und Oberflächen altern. Die ::TGA:: ist technisch anspruchsvoll und wird im Lebenszyklus mehrfach modernisiert. Diese Unterschiede sind der Grund, warum ein sauberer Entwurf veränderliche Systeme nicht unnötig mit dauerhaften Systemen verschränkt.

### Tragstruktur

Die Tragstruktur ist das dauerhafte Gerüst des Gebäudes. Dazu gehören Fundamente, Stützen, tragende Wände, Unterzüge, Deckenplatten und aussteifende Kerne. Ihre Lebensdauer liegt typischerweise bei 80 bis 200 Jahren, wenn Material, Feuchte- und Brandschutz stimmen. Sie ist schwer zu ändern, weil jede Änderung Lastwege, Verformungen, Brandschutz und Bauablauf betrifft.

Materialien sind häufig Stahlbeton, Mauerwerk, Stahl oder Holz. Im Wohnungsbau sind tragende Wände und Stahlbeton-Skelettsysteme verbreitet; im Büro- und Gewerbebau dominieren oft Skelettstrukturen, weil sie größere Grundrissfreiheit ermöglichen. Die Entwurfskonsequenz ist klar: Was tragend ist, muss früh stabil entschieden werden. Spätere Öffnungen, Versprünge oder Schachtverlegungen sind möglich, aber sie kosten Planung, Nachweise und meist Geld.

Die Tragstruktur ist deshalb kein Hintergrundthema für Statiker allein. Sie bestimmt Spannweiten, Stützenpositionen, Raumtiefen, Treppenhauslage, Tiefgaragenraster und oft auch die Fassadenordnung. [Kapitel 4](/chapters/04-tragwerk) erklärt diese Lastwege im Detail.

Für Architekten ist wichtig, die Tragstruktur früh als Ordnungsraster zu lesen. Ein Stützenraster von 6 m wirkt auf Parkplätze, Wohnungsbreiten, Fassadenachsen und Leitungswege. Eine tragende Wand kann eine Wohnung klar gliedern, aber auch spätere Zusammenlegungen verhindern. Ein aussteifender Kern ist räumlich effizient, aber er fixiert Treppe, Aufzug, Schächte und häufig auch die Rettungswege. Die Tragstruktur ist damit die langsamste Schicht und zugleich eine der stärksten Entwurfsentscheidungen.

### Gebäudehülle

Die Gebäudehülle trennt innen von außen. Sie besteht aus Außenwänden, Fenstern, Dach, erdberührten Bauteilen, Abdichtungen, Sonnenschutz und Anschlüssen. Ihre Lebensdauer liegt häufig bei 30 bis 50 Jahren, einzelne Komponenten wie Fenster, Dichtstoffe oder Beschichtungen können früher erneuert werden.

Die Hülle ist gleichzeitig Wetterschutz, Wärmeschutz, Schallschutz, Brandschutz, gestalterisches Gesicht und Schnittstelle zur Stadt. Ihre Materialien reichen von Putzsystemen über Klinker, Vorhangfassaden und Holzfassaden bis zu Glas und Metall. Entwurflich ist sie besonders empfindlich, weil sie viele Anforderungen auf engem Raum bündelt: Dämmung braucht Dicke, Fenster brauchen Anschlüsse, Sonnenschutz braucht Führung, Entwässerung braucht Gefälle, und jedes Detail muss Regen, Wind und Temperaturwechsel aushalten.

In digitalen Modellen darf die Hülle deshalb nicht nur als "Wand" erscheinen. Ein Außenwandtyp trägt andere Informationen als eine Wohnungstrennwand: Schichtaufbau, U-Wert, Feuerwiderstand, Außenbezug, Material, Anschlussdetails. Diese Vertiefung folgt in [Kapitel 5](/chapters/05-konstruktion) und [Kapitel 6](/chapters/06-waermeschutz-geg).

Die Hülle ist außerdem die Schicht mit den meisten Detailrisiken. Fast jeder Schaden an Gebäuden entsteht an Übergängen: Fensterlaibung, Balkonanschluss, Dachrand, Sockel, Attika, Durchdringung, Fuge. In der Systemlogik bedeutet das: Die Gebäudehülle ist nicht nur Fläche, sondern eine Kette von Anschlüssen. Wer sie nur im großen Maßstab entwirft, übersieht die Punkte, an denen Wasser, Wärme, Schall oder Feuer den Weg durch das Gebäude finden.

### Technische Gebäudeausrüstung

Die ::TGA:: ist die technische Infrastruktur des Gebäudes. Sie transportiert Wärme, Luft, Wasser, Strom und Daten. Ihre Lebensdauer liegt oft bei 15 bis 25 Jahren; einzelne Geräte, Pumpen, Ventile, Filter oder Regelkomponenten werden deutlich früher ersetzt. Genau deshalb muss sie zugänglich bleiben.

Zur ::TGA:: gehören nicht nur sichtbare Geräte wie Heizkreisverteiler oder Lüftungsventile. Entscheidend sind die unsichtbaren Wege: Schächte, Trassen, Deckenzwischenräume, Durchbrüche, Brandschutzabschottungen und Wartungszonen. Ein guter Entwurf plant Technik nicht erst ein, wenn die Räume fertig sind, sondern legt Raum, Struktur und Technik gemeinsam an.

Für BIM-Anwendungen ist die ::TGA:: besonders datenintensiv. Ein Luftkanal hat Querschnitt, Volumenstrom, Druckverlust, Brandschutzanforderung und Zugehörigkeit zu einem System. Eine Leuchte hat Leistung, Schaltung, Raumzuordnung und Wartungsinformation. Die Grundlagen dazu stehen in [Kapitel 10](/chapters/10-heizung-waermeversorgung), [Kapitel 11](/chapters/11-lueftung), [Kapitel 12](/chapters/12-sanitaer) und [Kapitel 13](/chapters/13-elektro).

Gute ::TGA::-Planung beginnt nicht mit Geräten, sondern mit Wegen. Wo steigen Medien vertikal? Wo können horizontale Trassen geführt werden? Welche Deckenbereiche bleiben frei? Welche Bauteile dürfen nicht durchdrungen werden? Diese Fragen wirken unscheinbar, bestimmen aber den Bauablauf. Ein sauberer Schacht spart nicht nur Leitungslänge, sondern reduziert Kollisionen, Brandschutzdetails und spätere Wartungsprobleme.

### Innenausbau

Der Innenausbau ist die am schnellsten veränderliche Schicht. Dazu gehören nichttragende Trennwände, Türen, Bodenbeläge, Unterdecken, Einbaumöbel, Oberflächen und oft auch lose Ausstattung. Seine Lebensdauer liegt typischerweise bei 5 bis 15 Jahren. Nutzerwechsel, neue Arbeitsweisen, Familienphasen oder Vermietungsstrategien verändern diese Schicht häufig.

Materialien sind Gipskarton, Trockenbauprofile, Estrich, Parkett, Fliesen, Akustikdecken, Putz, Anstriche und Einbauten. Die Entwurfskonsequenz lautet: Was kurzfristig veränderlich sein soll, darf nicht unnötig mit dauerhaften Schichten verknotet werden. Eine nichttragende Wand ist nur dann flexibel, wenn keine unverlegbare Steigleitung, kein tragender Unterzug und kein Brandschutzkonzept sie festschreibt.

Der Innenausbau zeigt besonders gut, warum Lebensdauer ein Planungsparameter ist. Ein Gebäude kann 100 Jahre stehen und trotzdem alle 10 Jahre innen verändert werden. Wer das früh berücksichtigt, baut nicht billiger um jeden Preis, sondern langfristig wirtschaftlicher.

Auch der Innenausbau hat technische Tiefe. Trockenbauwände tragen Anforderungen an Schallschutz, Brandschutz, Feuchtebeständigkeit und Installationen. Bodenbeläge brauchen Aufbauhöhen, Fugen, Übergänge und Trittschallschutz. Unterdecken können Raumakustik verbessern, verdecken aber auch Lüftung, Sprinkler, Kabeltrassen oder Revisionsöffnungen. Gerade weil diese Schicht schnell geändert wird, muss sie verständlich dokumentiert sein.

!!! kastanienallee "Kastanienallee 7"
    Die Tragstruktur ist ein Stahlbeton-Skelett mit einem regelmäßigen Raster von ca. 6,0 m × 6,0 m. Die Gebäudehülle besteht aus Außenwänden mit 200 mm Stahlbeton und 160 mm Dämmung, ergänzt durch dreifach verglaste Fenster und ein extensiv begrüntes Flachdach mit PV-Anlage. Die ::TGA:: umfasst Fernwärme-Übergabestation im Keller, 3 Heizkreise für Fußbodenheizung, dezentrale Lüftungsgeräte je Wohnung, Sanitärstränge, Elektroverteilung und 10 Ladepunkte in der Tiefgarage. Der Innenausbau besteht aus leichten Trennwänden, Wohnungstüren, Bodenbelägen, Bädern und Küchenanschlüssen. Die Schichten altern nicht gleich: Der Skelettbau kann viele Umbauten überleben, während Filter, Pumpen, Bodenbeläge und Oberflächen regelmäßig getauscht werden.

## 1.3 Interdependenzen

Das Schichtenmodell trennt Schichten, aber es behauptet nicht, dass sie unabhängig sind. Im Gegenteil: Sein Nutzen liegt darin, Abhängigkeiten sichtbar zu machen. Gute Planung heißt nicht, jede Schicht isoliert zu optimieren, sondern die wichtigsten Kopplungen früh zu erkennen.

Ein erstes Beispiel ist die Entscheidung für Fußbodenheizung. Sie liegt technisch in der ::TGA::, verändert aber den Aufbau des Bodens. Heizrohre brauchen eine Dämmschicht, Befestigung, Estrichüberdeckung und Regelzonen. Dadurch steigt die Aufbauhöhe des Fußbodens. Diese Höhe beeinflusst Türanschlüsse, Treppensteigungen, barrierefreie Schwellen, Rohbauhöhen und das Gewicht auf der Decke. Gleichzeitig erlaubt eine Fußbodenheizung niedrigere Vorlauftemperaturen, was die Effizienz der Wärmeversorgung verbessert. Eine technische Entscheidung greift also in Tragwerk, Ausbau, Energie und Detailplanung ein.

Ein zweites Beispiel ist die Lage eines Installationsschachts. Ein Schacht wirkt auf den ersten Blick wie ein kleiner Restbereich im Grundriss. Tatsächlich entscheidet er über Badlagen, Küchenlagen, Leitungslängen, Brandschutz, Schallschutz und spätere Wartung. Liegt der Schacht günstig, können mehrere Wohnungen kurze Leitungswege nutzen. Liegt er ungünstig, wandern Rohre durch Decken, Unterzüge oder Abhangdecken, und der Grundriss verliert Freiheit.

Ein drittes Beispiel ist die Fassade. Ein großes Fenster verbessert Tageslicht und Aussicht, kann aber sommerliche Überhitzung, höhere Wärmeverluste, Schallschutzprobleme und größere Sturzhöhen auslösen. Wird der Sonnenschutz außen geführt, braucht er Platz in der Fassadenschicht und sichere Befestigung. Wird er innen geplant, löst er das Wärmethema schlechter. Der Entwurf einer Öffnung ist damit nie nur eine Frage der Ansicht.

<!-- IMAGE
name: kap01_interdependenzen
type: diagram
size: landscape
desc: Systemdiagramm mit vier horizontalen Rechtecken übereinander: Tragstruktur, Gebäudehülle, TGA, Innenausbau. Zwischen den Rechtecken mehrere gerichtete Pfeile mit deutschen Beispiel-Labels: Fußbodenheizung zu Estrichaufbau und Deckenlast, Installationsschacht zu Grundrissfreiheit und Brandschutz, Fenstergröße zu Wärmeschutz und Sonnenschutz, Aufzug zu Kern und Fundament. Dezente Farbcodierung passend zum Schichtenmodell, weißer Hintergrund, klare technische Linien, keine Personen.
caption: Entscheidungen wandern zwischen den Schichten
tags: interdependenzen, schichtenmodell, tga, grundriss
-->
![Interdependenzen zwischen Gebäudeschichten](../assets/illustrations/kap01_interdependenzen.png)

Planungsfehler entstehen oft dort, wo eine Abhängigkeit zu spät sichtbar wird. Dann ist der Grundriss bereits verkauft, die Tragwerksplanung weit fortgeschritten oder die Fassade ausgeschrieben. Digitales Planen hilft nur, wenn das Modell solche Abhängigkeiten ausdrückt. Ein dreidimensionaler Körper ohne Systeminformation bleibt ein Bild. Ein Modell mit Bauteiltypen, Schichten, Räumen, Systemzugehörigkeiten und Beziehungen wird zu einem Prüfwerkzeug.

Die Reihenfolge der Entscheidungen ist deshalb Teil des Entwurfs. Zuerst werden Grundsysteme festgelegt: Baukörper, Kern, Raster, Geschosshöhen, Erschließung, Schachtzonen. Danach werden Räume, Fassaden und technische Systeme verfeinert. Details folgen nicht beliebig spät, sondern an den Stellen, an denen eine grundsätzliche Entscheidung davon abhängt. Ein Fensteranschluss darf später gezeichnet werden; die Frage, ob außenliegender Sonnenschutz Platz hat, muss früh beantwortet werden.

Ein guter Planungsprozess hält diese Abhängigkeiten sichtbar. Er dokumentiert Annahmen, statt sie im Kopf einzelner Planer zu verstecken. Wenn die lichte Raumhöhe nur funktioniert, solange kein Lüftungskanal unter der Decke läuft, muss diese Bedingung im Modell, in Plänen und in Besprechungen auftauchen. Systemdenken ist damit keine Theorie, sondern eine Methode, offene Entscheidungen rechtzeitig zu finden.

!!! kastanienallee "Kastanienallee 7"
    Beispiel Fußbodenheizung: Angenommen der Bodenaufbau über Rohdecke besteht aus 30 mm Trittschalldämmung, 20 mm Systemplatte, 65 mm Heizestrich und 15 mm Belag. Aufbauhöhe = 30 + 20 + 65 + 15 = 130 mm. Bei vier Vollgeschossen wirkt diese Entscheidung auf jede Wohnungstür, jede Treppensteigung und jede lichte Raumhöhe. Beispiel Schachtlage: Wenn ein Steigschacht von 0,80 m × 0,60 m vier übereinanderliegende Badgruppen versorgt, sind kurze horizontale Leitungen möglich. Wird derselbe Schacht um 2,0 m verschoben, entstehen pro Geschoss mehrere zusätzliche Leitungswege durch Decken- oder Wandbereiche; die vermeintlich kleine Grundrissänderung wird zur Koordinationsaufgabe.

## 1.4 Wie dieses Buch aufgebaut ist

Dieses Buch folgt der Logik des Gebäudes. Teil I legt das Fundament: Dieses Kapitel erklärt das System, [Kapitel 2](/chapters/02-entwurf-raum-funktion) erklärt Entwurf, Raum, Planlesen und grundlegende Flächenkennwerte. Danach werden die Schichten fachlich vertieft.

Teil II behandelt den Baukörper. [Kapitel 3](/chapters/03-baustoffe) erklärt Materialien, [Kapitel 4](/chapters/04-tragwerk) die Lastabtragung, [Kapitel 5](/chapters/05-konstruktion) die konstruktiven Aufbauten von Gründung, Wand, Decke und Dach. Diese Kapitel gehören zur dauerhaften und mittelfristigen Substanz des Gebäudes.

Teil III behandelt die bauphysikalischen Anforderungen an Hülle und Räume. [Kapitel 6](/chapters/06-waermeschutz-geg) erklärt Wärmeschutz, [Kapitel 7](/chapters/07-feuchteschutz) den Feuchteschutz, [Kapitel 8](/chapters/08-schallschutz) den Schallschutz und [Kapitel 9](/chapters/09-brandschutz) den Brandschutz. Diese Themen sind nicht Dekoration am Ende, sondern Kriterien, die Entwurf und Konstruktion formen.

Teil IV widmet sich der ::TGA::. [Kapitel 10](/chapters/10-heizung-waermeversorgung) behandelt Heizung und Wärmeversorgung, [Kapitel 11](/chapters/11-lueftung) Lüftung, [Kapitel 12](/chapters/12-sanitaer) Sanitär und Entwässerung, [Kapitel 13](/chapters/13-elektro) Elektro und Gebäudeautomation. Hier wird sichtbar, wie stark Technik den Raum braucht.

Teil V erklärt den rechtlichen und wirtschaftlichen Rahmen. [Kapitel 14](/chapters/14-planungsrecht) ordnet Planungsrecht ein, [Kapitel 15](/chapters/15-hoai) die Leistungsphasen und Honorare, [Kapitel 16](/chapters/16-kosten-ausschreibung) Kosten und Ausschreibung. Diese Themen wirken trocken, entscheiden aber, ob ein Entwurf genehmigungsfähig, beauftragbar und baubar ist.

Teil VI führt in die digitale Methode. [Kapitel 17](/chapters/17-was-bim-wirklich-ist) erklärt, was BIM als Arbeitsweise bedeutet. [Kapitel 18](/chapters/18-ifc) erklärt IFC als offene Datenstruktur. [Kapitel 19](/chapters/19-klassifikation) behandelt Klassifikation, [Kapitel 20](/chapters/20-prozess-kollaboration) Zusammenarbeit und gemeinsame Datenumgebungen, [Kapitel 21](/chapters/21-bim-praxis) die Anwendung in der Praxis.

Teil VII weitet den Blick auf Zukunfts- und Bestandsthemen. [Kapitel 22](/chapters/22-nachhaltigkeit) behandelt Nachhaltigkeit und Kreislaufwirtschaft, [Kapitel 23](/chapters/23-sanierung) die Sanierung, [Kapitel 24](/chapters/24-digitaler-zwilling-ki) digitale Zwillinge und KI. Auch diese Themen lassen sich besser verstehen, wenn man das Gebäude vorher als Schichtsystem gelesen hat.

## BIM-Brücke: Schichten als Modellstruktur

!!! note "Vorausgriff auf IFC"
    Diese Box ist ein Vorausgriff — wer IFC noch nicht kennt, kann sie zunächst überfliegen und nach Kapitel 18 zurückkehren.

Im IFC-Modell wird ein Gebäude nicht als einzige Geometrie gespeichert. Tragende Stützen können etwa als `IfcColumn`, Decken als `IfcSlab`, technische Systeme als `IfcDistributionSystem` und Boden- oder Deckenbeläge als `IfcCovering` beschrieben werden. Das ist keine zufällige Benennung, sondern eine digitale Entsprechung des Schichtenmodells.

Der Nutzen liegt in der Auswertbarkeit. Wenn tragende Bauteile, Räume, Beläge, Leitungen und Systeme semantisch getrennt sind, kann Software andere Fragen stellen: Welche Bauteile sind tragend? Welche Räume hängen an welchem Lüftungssystem? Welche Bodenbeläge müssen erneuert werden? Welche Schachtobjekte schneiden welche Decken? Die Grundlage für solche Fragen ist nicht ein schönes 3D-Modell, sondern eine saubere Zuordnung von Objekten, Eigenschaften und Beziehungen.

Für Entwickler ist das die entscheidende Übersetzung: Eine Gebäudeschicht wird im Modell nicht durch Farbe erkannt, sondern durch Objektklasse, Beziehung und Eigenschaft. Eine Stütze muss nicht nur aussehen wie eine Stütze, sondern als tragendes Element klassifiziert sein. Ein Raum muss nicht nur von Wänden umgeben sein, sondern als Raumobjekt Fläche, Volumen und Nutzung tragen. Ein technisches System muss seine Komponenten bündeln. Erst dann kann Software prüfen, filtern, zählen und vergleichen.

## Zusammenfassung

**Ein Gebäude ist ein System aus Schichten, die unterschiedlich lange leben und trotzdem in jeder Planung miteinander verhandelt werden müssen.**

Das Schichtenmodell hilft, Komplexität zu ordnen, ohne sie zu verharmlosen. Es zeigt, warum Tragstruktur, Hülle, ::TGA:: und Innenausbau getrennt betrachtet, aber gemeinsam koordiniert werden müssen. Diese Denkweise trägt durch das gesamte Buch und bildet später die Brücke zu BIM und IFC.

Verwandte Kapitel: [Kap. 2](/chapters/02-entwurf-raum-funktion) · [Kap. 4](/chapters/04-tragwerk) · [Kap. 5](/chapters/05-konstruktion) · [Kap. 17](/chapters/17-was-bim-wirklich-ist) · [Kap. 18](/chapters/18-ifc)
