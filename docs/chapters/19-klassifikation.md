# Kapitel 19 – Klassifikation

*Teil VI – BIM*

---

Ein Modell kann viele Wände enthalten und trotzdem nicht wissen, welche davon ::Außenwand::, tragende Wände, Kostenpositionen oder FM-Assets sind. Namen allein reichen nicht. ::Klassifikation:: macht Objekte über Software- und Sprachgrenzen hinweg auswertbar.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - erklären, warum IFC ohne ::Klassifikation:: nicht alle Auswertungsfragen löst
    - ::DIN 277::, ::DIN 276:: und STLB-Bau als deutsche Kernsysteme einordnen
    - `IfcClassificationReference` als Verbindung zwischen Modell und Ordnungssystem verstehen

## 19.1 Das Problem

Ein Objekt kann in Revit "AW_StB_WDVS_360" heißen, in der Ausschreibung "::Außenwand:: ::Stahlbeton:: mit WDVS" und in der Kostenplanung KG 331. Für Menschen ist die Zuordnung möglich, für Software nicht zuverlässig. ::Klassifikation:: schafft externe Codes, die unabhängig vom lokalen Namen sind.

Ohne ::Klassifikation:: werden Mengen, Kosten, FM-Daten und Nachhaltigkeitsauswertungen schnell manuell. Jeder Export braucht Mapping-Tabellen, und jedes Büro benennt Bauteile anders. Das ist ein Datenqualitätsproblem, kein Schönheitsfehler.

## 19.2 Deutsche Klassifikation im Kern

::DIN 277:: ordnet Flächen und Rauminhalte: BGF, NUF, VF, TF und weitere Flächenarten. Sie ist Grundlage für Flächenberechnung, Wirtschaftlichkeit und Genehmigungsunterlagen. ::DIN 276:: ordnet Kosten in Kostengruppen und verbindet Mengen mit Budgetsteuerung.

STLB-Bau liefert standardisierte Leistungstexte für Ausschreibung. Zusammen bilden diese Systeme eine pragmatische Kette: Raumflächen nach ::DIN 277::, Kosten nach ::DIN 276::, Leistungen nach STLB. Wer BIM-Software für Deutschland baut, muss diese drei kennen.

## 19.3 Internationale Systeme

OmniClass ist ein US-amerikanisches Klassifikationssystem mit mehreren Tabellen. Für BIM sind besonders Table 21 Elements und Table 41 Materials relevant. Uniclass 2015 ist im Vereinigten Königreich wichtig. ISO 12006-2 liefert einen Rahmen für ::Klassifikation:: im Bauwesen.

Für deutsche Hochbauprojekte sind OmniClass und Uniclass meist weniger wichtig als ::DIN 276::, ::DIN 277:: und STLB. Internationale Auftraggeber oder Softwareprodukte verlangen sie trotzdem. Die Empfehlung ist deshalb: lokal sauber klassifizieren, international mappen.

<!-- IMAGE
name: kap19_omniclass_tabellen
type: infographic
size: landscape
desc: Übersicht der OmniClass-Tabellen mit Fokus auf Table 21 Elements und Table 41 Materials. Kurze deutsche Beschreibung je relevanter Tabelle und Beispiel aus einem Wohngebäude. Weißer Hintergrund.
caption: Internationale Klassifikation ist hilfreich, aber im deutschen Alltag nicht allein maßgeblich
tags: klassifikation, omniclass, uniclass, iso12006
-->
![OmniClass-Überblick](../assets/illustrations/kap19_omniclass_tabellen.png)

## 19.4 Verbindung IFC und Klassifikation

IFC verbindet Objekte mit ::Klassifikation:: über `IfcClassificationReference`. Eine Wand kann dadurch auf ::DIN 276:: KG 331, eine STLB-Position oder einen OmniClass-Code verweisen. Diese Referenz ist maschinenlesbar und bleibt unabhängig vom Bauteilnamen.

Mapping bleibt anspruchsvoll. Ein Bauteil kann zu Kosten, Material, Funktion und ::Gewerk:: gleichzeitig klassifiziert werden. Mehrsprachigkeit und unterschiedliche Detaillierung verschärfen das Problem. ::IDS::, also ::IDS::, ist ein moderner Ansatz, um Informationsanforderungen maschinenlesbar zu formulieren.

<!-- IMAGE
name: kap19_mapping
type: diagram
size: landscape
desc: Flussdiagramm IFC-Objekt IfcWall zu IfcClassificationReference, dann Mapping zu DIN 276 KG 331, STLB-Position und optional OmniClass-Code. Pfeile und deutsche Labels, weißer Hintergrund.
caption: Klassifikation verbindet Modellobjekte mit Kosten und Ausschreibung
tags: ifc, klassifikation, din276, stlb
-->
![Mapping von IFC zu Klassifikation](../assets/illustrations/kap19_mapping.png)

!!! kastanienallee "Kastanienallee 7"
    Die K7-Außenwand kann dreifach referenziert werden: ::DIN 276:: KG 331 für ::Außenwand::, ein STLB-Bau-Leistungstext für Stahlbetonwand mit WDVS und optional OmniClass Table 21 für Außenwandelemente. Für die Kostenrechnung zählt ::DIN 276::; für internationale Datenübergabe kann OmniClass zusätzlich nützlich sein.

## 19.5 Klassifikation praktisch anwenden

::Klassifikation:: wird schnell abstrakt, wenn sie nur als Code-System erklärt wird. Ihr Nutzen zeigt sich in Auswertungen. Eine Kostenabfrage fragt nicht: Welche Objekte heißen zufällig "::Außenwand::"? Sie fragt: Welche Elemente gehören zur ::Kostengruppe:: 331 ::Außenwand::? Eine Flächenauswertung fragt nicht: Welche Räume haben den Namen "Wohnen"? Sie fragt: Welche Flächenart nach ::DIN 277:: liegt vor?

In deutschen Hochbauprojekten sind ::DIN 276:: und ::DIN 277:: deshalb näher an der Praxis als internationale Vollsysteme. ::DIN 276:: ordnet Kosten, ::DIN 277:: ordnet Flächen und Rauminhalte. STLB-Bau beschreibt Leistungen. Zusammen bilden sie eine Kette: Raum und Bauteil werden geplant, Mengen werden ermittelt, Leistungen werden ausgeschrieben, Kosten werden zugeordnet. IFC kann diese Kette tragen, wenn Objekte klassifiziert sind.

Das Mapping ist aber nicht trivial. Ein Bauteil kann mehrere fachliche Rollen haben. Eine ::Außenwand:: ist ::Kostengruppe::, tragendes Bauteil, thermische Hülle, Brandschutzbauteil und Ausschreibungsleistung. Ein einziges Klassifikationsfeld reicht selten. Deshalb sind klare projektspezifische Vorgaben nötig: Welche ::Klassifikation:: ist für Kosten maßgeblich? Welche für FM? Welche für Materialpass? Welche für Ausschreibung?

Mehrsprachigkeit und Toolnamen verschärfen das Problem. Ein Architekt nennt etwas "AW ::Stahlbeton:: WDVS", ein Kostenplaner sieht KG 331, ein Ausschreibungstext spricht von Wärmedämmverbundsystem, IFC sieht `IfcWall`, ein Facility-System will eine Asset-Kategorie. ::Klassifikation:: ist die Übersetzungsschicht zwischen diesen Sichten.

Für Entwickler ist wichtig: ::Klassifikation:: darf nicht nur im Namen stehen. Der Objektname "KG331_Aussenwand" ist eine Notlösung. Besser ist eine strukturierte Referenz, etwa `IfcClassificationReference`, mit Systemname, Code und Beschreibung. Dann kann Software unabhängig von Sprache und Benennung filtern.

!!! kastanienallee "Kastanienallee 7"
    Die K7-Außenwand kann gleichzeitig als `IfcWall`, ::DIN 276:: KG 331 ::Außenwand::, STLB-nahe Fassadenleistung und Materialpass-Objekt klassifiziert werden. Für Kosten zählt KG 331, für Ausschreibung der Leistungstext, für LCA die Materialschichten. Ohne diese Trennung würde eine spätere Auswertung entweder zu grob oder widersprüchlich.

## 19.6 Prüffragen für die Praxis

Vor einer Klassifikationsstrategie muss geklärt werden, wofür klassifiziert wird. Kostenplanung braucht andere Codes als Facility Management. Ausschreibung braucht andere Strukturen als Materialpass. Nachhaltigkeitsauswertung braucht Material- und Produktbezug. Ein einziges universelles Klassifikationsschema klingt attraktiv, wird aber in der Praxis schnell zu grob oder zu kompliziert.

Die zweite Frage betrifft die Granularität. Wird eine komplette ::Außenwand:: klassifiziert oder jede Schicht? Für ::DIN 276:: reicht oft das Bauteil. Für LCA braucht man ::Beton::, Dämmung, Putz und Befestigung getrennt. Für Ausschreibung können wiederum Arbeitsschritte relevant sein. BIM-Modelle müssen deshalb Bauteil- und Materialebene sauber unterscheiden.

Die dritte Frage lautet: Wer pflegt die Codes? Wenn Architekten, Fachplaner, Kostenplaner und Unternehmer alle eigene Klassifikationen eintragen, entstehen Widersprüche. Besser ist eine Verantwortlichkeitsmatrix: Raumklassifikation durch Architektur, ::Kostengruppe:: durch Kostenplanung oder abgestimmte Modellvorgabe, Materialklassifikation durch Fachplaner oder Ausschreibung, FM-Assetklasse durch Betreiberanforderung.

Schließlich muss ::Klassifikation:: geprüft werden. Ein Modell kann hunderte Objekte ohne Code enthalten und trotzdem im Viewer vollständig aussehen. Prüfregeln sollten melden, welche Objekte keinen DIN-276-Code, keine DIN-277-Flächenart oder keine STLB-Zuordnung haben. Erst dann wird ::Klassifikation:: von einer Theorie zu einer nutzbaren Datenqualität.

## 19.7 Entwicklerperspektive

::Klassifikation:: ist in Software ein Identitätsproblem. Namen sind instabil: "::Außenwand::", "AW", "Fassade", "Exterior Wall" oder "Basic Wall 200mm" können dasselbe meinen. Codes sind stabiler, wenn sie sauber referenziert werden. Deshalb sollten Klassifikationen als strukturierte Objekte gespeichert werden, nicht als Textpräfix im Namen.

Ein Mapping-System muss Mehrdeutigkeit erlauben. Ein `IfcWall` kann eine Innenwand, ::Außenwand::, Brandwand, Schachtwand oder Kellerwand sein. Die IFC-Klasse allein reicht nicht. Material, Lage, Raumbezug, IsExternal-Property, Brandschutz und ::Kostengruppe:: liefern gemeinsam Bedeutung. Gute ::Klassifikation:: nutzt mehrere Signale und lässt manuelle Bestätigung zu.

Auch Versionsmanagement ist wichtig. ::Klassifikation:: ändern sich. STLB-Texte, Uniclass-Tabellen oder interne Betreiberklassen können neue Codes erhalten. Ein Modell sollte deshalb nicht nur einen Code speichern, sondern auch Systemname, Version und Quelle. Sonst weiß später niemand, welche Tabelle gemeint war.

Für Auswertungen ist Vollständigkeit entscheidend. Eine Mengenliste mit 95 Prozent klassifizierten Objekten kann für grobe Kosten reichen, aber nicht für automatisierte Ausschreibung. Ein Tool sollte deshalb Abdeckungsgrade anzeigen: Wie viele Objekte, Flächen oder Kostenanteile sind klassifiziert? Wo fehlen Codes? Welche Codes kommen ungewöhnlich häufig vor?

!!! kastanienallee "Kastanienallee 7"
    Bei K7 wäre ein Klassifikations-Dashboard hilfreich: 100 Prozent Räume mit DIN-277-Flächenart, 98 Prozent Bauteile mit DIN-276-Kostengruppe, 85 Prozent ausschreibungsrelevante Bauteile mit STLB-Zuordnung. Die fehlenden 15 Prozent sind kein Detail; sie zeigen, wo 5D-Auswertung oder Ausschreibung noch nicht belastbar ist.

::Klassifikation:: darf dabei nicht als einmaliger Import verstanden werden. Wenn ein Bauteil seinen Aufbau ändert, kann sich Kosten-, Material- oder Ausschreibungszuordnung ändern. Wenn ein Raum von Wohnen zu Gewerbe wird, ändern sich Flächenlogik, Anforderungen und Betrieb. ::Klassifikation:: muss daher im Änderungsprozess geprüft werden. Gute Werkzeuge behandeln Codes nicht als Dekoration, sondern als Daten, die bei Änderungen validiert werden.

Für Einsteiger ist der einfachste Einstieg eine dreispaltige Denkweise: Objekt, Bedeutung, Auswertung. Das Objekt ist die Wand. Die Bedeutung ist ::Außenwand::, tragend, thermische Hülle, KG 331. Die Auswertung ist Kosten, Energie, LCA oder FM. Sobald diese drei Ebenen getrennt sind, wird klar, warum ::Klassifikation:: mehr ist als ein Nummernsystem.

In der Praxis beginnt man am besten mit wenigen stabilen Systemen. ::DIN 277:: für Räume, ::DIN 276:: für Kosten und eine einfache interne Bauteilklassifikation reichen oft für den Einstieg. Internationale Systeme können später ergänzt werden, wenn Projekte oder Auftraggeber sie brauchen. Entscheidend ist Konsistenz, nicht maximale Tabellenfülle.

Damit wird ::Klassifikation:: zu einem Wartungsthema. Codes müssen bei Änderungen mitwandern, Vorlagen müssen gepflegt und Prüfregeln aktualisiert werden. Ein Klassifikationssystem, das niemand verantwortet, zerfällt leise. Ein einfaches, gepflegtes System ist besser als ein perfektes, das nur auf dem Papier existiert.

Für das Buch ist ::Klassifikation:: die Brücke zwischen Modell und Auswertung. Ohne Codes bleibt ein Modell ein semantischer Einzelfall. Mit Codes kann es Teil von Kostenplanung, Ausschreibung, LCA und Betrieb werden.

Genau deshalb gehört ::Klassifikation:: früh in den BAP.

## BIM-Brücke: Klassifikation als Auswertungsschlüssel

::Klassifikation:: macht Mengenermittlung belastbarer. Wenn alle ::Außenwand:: dieselbe Kostenklassifikation tragen, kann Software Mengen aus `Qto_WallBaseQuantities` aggregieren und Kostenpositionen vorbereiten. Ohne ::Klassifikation:: bleibt das Modell visuell, aber betriebswirtschaftlich unscharf.

## Zusammenfassung

**::Klassifikation:: übersetzt Modellobjekte in auswertbare Ordnungssysteme.**

Für Deutschland sind ::DIN 277::, ::DIN 276:: und STLB-Bau wichtiger als abstrakte internationale Vollständigkeit. IFC liefert mit `IfcClassificationReference` die technische Verbindung.

Verwandte Kapitel: [Kap. 16](/chapters/16-kosten-ausschreibung) · [Kap. 18](/chapters/18-ifc) · [Kap. 20](/chapters/20-prozess-kollaboration)
