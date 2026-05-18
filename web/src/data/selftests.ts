export type SelfTestQuestionType = 'single' | 'multiple'

export interface SelfTestOption {
  id: string
  text: string
}

export interface SelfTestQuestion {
  id: string
  type: SelfTestQuestionType
  prompt: string
  options: SelfTestOption[]
  correctOptionIds: string[]
  explanation: string
}

export interface SelfTest {
  id: string
  chapterId: string
  title: string
  questions: SelfTestQuestion[]
}

export const SELF_TESTS: SelfTest[] = [
  {
    id: 'test-01-architektur-als-system',
    chapterId: '01-architektur-als-system',
    title: 'Selbsttest: Architektur als System',
    questions: [
      {
        id: 'q01-system',
        type: 'single',
        prompt: 'Was beschreibt Architektur als System am treffendsten?',
        options: [
          { id: 'a', text: 'Ein Gebäude als Zusammenspiel von Raum, Konstruktion, Technik, Nutzung und Kontext.' },
          { id: 'b', text: 'Eine reine Stil- und Fassadenfrage.' },
          { id: 'c', text: 'Eine Sammlung unabhängiger Bauteile ohne Wechselwirkungen.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Systemisches Denken betrachtet die Abhängigkeiten zwischen Entwurf, Bauphysik, Tragwerk, Technik und Nutzung.',
      },
      {
        id: 'q01-wechselwirkungen',
        type: 'multiple',
        prompt: 'Welche Aspekte erzeugen typische Wechselwirkungen in frühen Planungsentscheidungen?',
        options: [
          { id: 'a', text: 'Gebäudeform und Energiebedarf' },
          { id: 'b', text: 'Tragstruktur und Grundrissflexibilität' },
          { id: 'c', text: 'Dateiname des Plan-PDFs' },
          { id: 'd', text: 'TGA-Flächenbedarf und Schachtführung' },
        ],
        correctOptionIds: ['a', 'b', 'd'],
        explanation: 'Form, Struktur und technische Infrastruktur beeinflussen sich direkt; formale Dateinamen sind organisatorisch, aber keine bauliche Wechselwirkung.',
      },
    ],
  },
  {
    id: 'test-02-entwurf-raum-funktion',
    chapterId: '02-entwurf-raum-funktion',
    title: 'Selbsttest: Entwurf, Raum und Funktion',
    questions: [
      {
        id: 'q02-grundriss',
        type: 'single',
        prompt: 'Wozu dient ein guter Grundriss im Entwurf vor allem?',
        options: [
          { id: 'a', text: 'Er organisiert Nutzungen, Wege, Belichtung und Beziehungen im Gebäude.' },
          { id: 'b', text: 'Er ersetzt alle Schnitte und Ansichten.' },
          { id: 'c', text: 'Er legt ausschließlich die Fassadenfarbe fest.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Der Grundriss koordiniert räumliche und funktionale Beziehungen; andere Darstellungen bleiben trotzdem notwendig.',
      },
      {
        id: 'q02-erschliessung',
        type: 'multiple',
        prompt: 'Welche Punkte sind für die Erschließung eines Gebäudes relevant?',
        options: [
          { id: 'a', text: 'Hauptwege und Nebenwege' },
          { id: 'b', text: 'Barrierefreiheit' },
          { id: 'c', text: 'Rettungswegführung' },
          { id: 'd', text: 'Nur die Möblierungsfarbe' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Erschließung verbindet Nutzung, Orientierung, Sicherheit und Zugänglichkeit.',
      },
    ],
  },
  {
    id: 'test-03-baustoffe',
    chapterId: '03-baustoffe',
    title: 'Selbsttest: Baustoffe',
    questions: [
      {
        id: 'q03-materialwahl',
        type: 'single',
        prompt: 'Welche Aussage zur Baustoffwahl ist am sinnvollsten?',
        options: [
          { id: 'a', text: 'Sie muss Tragfähigkeit, Bauphysik, Brandschutz, Ökologie, Kosten und Ausführung zusammen betrachten.' },
          { id: 'b', text: 'Sie hängt nur vom günstigsten Quadratmeterpreis ab.' },
          { id: 'c', text: 'Sie ist nach der Genehmigung nie mehr relevant.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Baustoffe wirken in vielen Leistungsanforderungen gleichzeitig und sollten nicht eindimensional bewertet werden.',
      },
      {
        id: 'q03-eigenschaften',
        type: 'multiple',
        prompt: 'Welche Eigenschaften können für die Bewertung eines Baustoffs wichtig sein?',
        options: [
          { id: 'a', text: 'Rohdichte' },
          { id: 'b', text: 'Wärmeleitfähigkeit' },
          { id: 'c', text: 'Brandverhalten' },
          { id: 'd', text: 'Alphabetische Reihenfolge im Materialkatalog' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Rohdichte, Wärmeleitfähigkeit und Brandverhalten beeinflussen Konstruktion, Bauphysik und Nachweise.',
      },
    ],
  },
  {
    id: 'test-04-tragwerk',
    chapterId: '04-tragwerk',
    title: 'Selbsttest: Tragwerk',
    questions: [
      {
        id: 'q04-lastabtragung',
        type: 'single',
        prompt: 'Was meint Lastabtragung?',
        options: [
          { id: 'a', text: 'Den Weg von Einwirkungen über Bauteile bis in Baugrund und Fundamente.' },
          { id: 'b', text: 'Das Entfernen von Dateien aus dem Modell.' },
          { id: 'c', text: 'Die reine Berechnung der Raumfläche.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Lastabtragung beschreibt den Kräftefluss durch das Tragwerk bis in den Baugrund.',
      },
      {
        id: 'q04-einwirkungen',
        type: 'multiple',
        prompt: 'Welche Einwirkungen sind in der Tragwerksplanung typisch relevant?',
        options: [
          { id: 'a', text: 'Eigenlasten' },
          { id: 'b', text: 'Nutzlasten' },
          { id: 'c', text: 'Wind- und Schneelasten' },
          { id: 'd', text: 'Bildschirmauflösung des Planers' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Eigen-, Nutz-, Wind- und Schneelasten gehören zu den grundlegenden Einwirkungen.',
      },
    ],
  },
  {
    id: 'test-05-konstruktion',
    chapterId: '05-konstruktion',
    title: 'Selbsttest: Konstruktion',
    questions: [
      {
        id: 'q05-detail',
        type: 'single',
        prompt: 'Warum sind konstruktive Details wichtig?',
        options: [
          { id: 'a', text: 'Sie verbinden Anforderungen wie Tragfähigkeit, Feuchteschutz, Wärmeschutz und Ausführbarkeit.' },
          { id: 'b', text: 'Sie ersetzen die Ausschreibung vollständig.' },
          { id: 'c', text: 'Sie sind nur grafischer Schmuck.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Details sind die Stelle, an der mehrere technische Anforderungen praktisch zusammengeführt werden.',
      },
      {
        id: 'q05-bauteile',
        type: 'multiple',
        prompt: 'Welche Bauteile gehören typischerweise zur konstruktiven Grundstruktur?',
        options: [
          { id: 'a', text: 'Gründung' },
          { id: 'b', text: 'Wand' },
          { id: 'c', text: 'Decke und Dach' },
          { id: 'd', text: 'E-Mail-Signatur' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Gründung, Wände, Decken und Dach bilden wesentliche konstruktive Systeme eines Gebäudes.',
      },
    ],
  },
  {
    id: 'test-06-waermeschutz-geg',
    chapterId: '06-waermeschutz-geg',
    title: 'Selbsttest: Wärmeschutz & GEG',
    questions: [
      {
        id: 'q06-u-wert',
        type: 'single',
        prompt: 'Was beschreibt der U-Wert?',
        options: [
          { id: 'a', text: 'Den Wärmedurchgang durch ein Bauteil pro Quadratmeter und Kelvin Temperaturdifferenz.' },
          { id: 'b', text: 'Die maximale Raumhöhe.' },
          { id: 'c', text: 'Die Anzahl der Fensterflügel.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Je kleiner der U-Wert, desto geringer ist der Transmissionswärmeverlust über das Bauteil.',
      },
      {
        id: 'q06-waermebilanz',
        type: 'multiple',
        prompt: 'Welche Faktoren beeinflussen den Wärmebedarf eines Gebäudes?',
        options: [
          { id: 'a', text: 'Gebäudehülle und Wärmebrücken' },
          { id: 'b', text: 'Lüftungswärmeverluste' },
          { id: 'c', text: 'Anlagentechnik' },
          { id: 'd', text: 'Sortierung der Ebenen im CAD-Browser' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Wärmebedarf entsteht aus Hülle, Lüftung, Nutzung und der Effizienz der technischen Systeme.',
      },
    ],
  },
  {
    id: 'test-07-feuchteschutz',
    chapterId: '07-feuchteschutz',
    title: 'Selbsttest: Feuchteschutz',
    questions: [
      {
        id: 'q07-tauwasser',
        type: 'single',
        prompt: 'Warum ist Tauwasser in Bauteilen kritisch?',
        options: [
          { id: 'a', text: 'Es kann Dämmwirkung, Dauerhaftigkeit und Schimmelrisiko negativ beeinflussen.' },
          { id: 'b', text: 'Es erhöht automatisch die Tragfähigkeit.' },
          { id: 'c', text: 'Es ist nur bei Außenanlagen relevant.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Feuchte im Bauteil kann bauphysikalische und hygienische Schäden auslösen.',
      },
      {
        id: 'q07-strategien',
        type: 'multiple',
        prompt: 'Welche Maßnahmen können zum Feuchteschutz beitragen?',
        options: [
          { id: 'a', text: 'Durchdachte Schichtenfolge' },
          { id: 'b', text: 'Luftdichte Anschlüsse' },
          { id: 'c', text: 'Geeignete Abdichtung gegen Wasser' },
          { id: 'd', text: 'Möglichst zufällige Materialkombinationen' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Feuchteschutz entsteht aus Diffusions-, Luftdichtheits- und Abdichtungskonzepten.',
      },
    ],
  },
  {
    id: 'test-08-schallschutz',
    chapterId: '08-schallschutz',
    title: 'Selbsttest: Schallschutz',
    questions: [
      {
        id: 'q08-luftschall',
        type: 'single',
        prompt: 'Was ist Luftschall?',
        options: [
          { id: 'a', text: 'Schall, der sich über die Luft ausbreitet, etwa Sprache oder Musik.' },
          { id: 'b', text: 'Schall, der ausschließlich in Trinkwasserleitungen entsteht.' },
          { id: 'c', text: 'Ein Maß für die Wärmedämmung.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Luftschall breitet sich über Luftdruckschwankungen aus und wird durch Bauteile gedämmt.',
      },
      {
        id: 'q08-pfade',
        type: 'multiple',
        prompt: 'Welche Übertragungswege sind für Schallschutz relevant?',
        options: [
          { id: 'a', text: 'Direktübertragung durch das trennende Bauteil' },
          { id: 'b', text: 'Flankenübertragung über angrenzende Bauteile' },
          { id: 'c', text: 'Trittschall über Decken' },
          { id: 'd', text: 'Dateikomprimierung beim Export' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Schall kann direkt, flankierend und als Körperschall/Trittschall übertragen werden.',
      },
    ],
  },
  {
    id: 'test-09-brandschutz',
    chapterId: '09-brandschutz',
    title: 'Selbsttest: Brandschutz',
    questions: [
      {
        id: 'q09-rettungsweg',
        type: 'single',
        prompt: 'Was ist ein zentrales Ziel des Brandschutzes?',
        options: [
          { id: 'a', text: 'Personenrettung, Begrenzung der Brandausbreitung und Ermöglichung wirksamer Löscharbeiten.' },
          { id: 'b', text: 'Maximierung der Bauteilanzahl.' },
          { id: 'c', text: 'Verzicht auf jede technische Abstimmung.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Brandschutz verbindet bauliche, anlagentechnische und organisatorische Maßnahmen.',
      },
      {
        id: 'q09-bausteine',
        type: 'multiple',
        prompt: 'Welche Themen gehören typischerweise zum Brandschutzkonzept?',
        options: [
          { id: 'a', text: 'Rettungswege' },
          { id: 'b', text: 'Brandabschnitte' },
          { id: 'c', text: 'Feuerwiderstand von Bauteilen' },
          { id: 'd', text: 'Schriftgröße der Legende allein' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Rettungswege, Brandabschnitte und Feuerwiderstände sind zentrale Bestandteile.',
      },
    ],
  },
  {
    id: 'test-10-heizung-waermeversorgung',
    chapterId: '10-heizung-waermeversorgung',
    title: 'Selbsttest: Heizung & Wärmeversorgung',
    questions: [
      {
        id: 'q10-vorlauf',
        type: 'single',
        prompt: 'Warum sind niedrige Systemtemperaturen oft vorteilhaft?',
        options: [
          { id: 'a', text: 'Sie können die Effizienz von Wärmepumpen und Niedertemperatursystemen verbessern.' },
          { id: 'b', text: 'Sie machen Heizflächen überflüssig.' },
          { id: 'c', text: 'Sie erhöhen immer den Energieverbrauch.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Viele effiziente Wärmeerzeuger arbeiten besser mit niedrigen Vorlauftemperaturen.',
      },
      {
        id: 'q10-system',
        type: 'multiple',
        prompt: 'Welche Bausteine gehören zu einem Heizsystem?',
        options: [
          { id: 'a', text: 'Wärmeerzeuger' },
          { id: 'b', text: 'Verteilung' },
          { id: 'c', text: 'Übergabe, etwa Heizflächen' },
          { id: 'd', text: 'Nur die Raumbezeichnung im Plan' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Heizung besteht aus Erzeugung, Speicherung/Verteilung, Regelung und Wärmeübergabe.',
      },
    ],
  },
  {
    id: 'test-11-lueftung',
    chapterId: '11-lueftung',
    title: 'Selbsttest: Lüftung & Raumluftqualität',
    questions: [
      {
        id: 'q11-luftwechsel',
        type: 'single',
        prompt: 'Wozu dient Lüftung im Gebäude?',
        options: [
          { id: 'a', text: 'Sie führt Feuchte, CO2 und Gerüche ab und stellt hygienische Raumluft sicher.' },
          { id: 'b', text: 'Sie ersetzt alle Fenster konstruktiv.' },
          { id: 'c', text: 'Sie ist nur ein grafisches Symbol im Grundriss.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Lüftung ist für Hygiene, Feuchteschutz und Komfort relevant.',
      },
      {
        id: 'q11-kwl',
        type: 'multiple',
        prompt: 'Welche Aspekte sind bei Lüftungsanlagen wichtig?',
        options: [
          { id: 'a', text: 'Luftmengen' },
          { id: 'b', text: 'Kanalführung und Platzbedarf' },
          { id: 'c', text: 'Schall und Wartung' },
          { id: 'd', text: 'Zufällige Positionierung der Auslässe' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Luftmengen, Führung, Schall, Wartung und Brandschutz müssen koordiniert werden.',
      },
    ],
  },
  {
    id: 'test-12-sanitaer',
    chapterId: '12-sanitaer',
    title: 'Selbsttest: Sanitär & Entwässerung',
    questions: [
      {
        id: 'q12-entwaesserung',
        type: 'single',
        prompt: 'Warum brauchen Entwässerungsleitungen Gefälle und geeignete Führung?',
        options: [
          { id: 'a', text: 'Damit Abwasser zuverlässig und hygienisch abgeführt wird.' },
          { id: 'b', text: 'Damit Räume größer wirken.' },
          { id: 'c', text: 'Damit Bauteile schwerer werden.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Entwässerung ist abhängig von Gefälle, Leitungsführung, Belüftung und Schallschutz.',
      },
      {
        id: 'q12-koordination',
        type: 'multiple',
        prompt: 'Welche Themen sind bei Sanitärplanung zu koordinieren?',
        options: [
          { id: 'a', text: 'Steigschächte' },
          { id: 'b', text: 'Trinkwasserhygiene' },
          { id: 'c', text: 'Brandschutz- und Schallschutzanforderungen' },
          { id: 'd', text: 'Nur die Farbe der Armaturen' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Sanitärplanung berührt Schächte, Hygiene, Leitungsführung, Abdichtung, Schall und Brandschutz.',
      },
    ],
  },
  {
    id: 'test-13-elektro',
    chapterId: '13-elektro',
    title: 'Selbsttest: Elektro & Gebäudeautomation',
    questions: [
      {
        id: 'q13-gebaeudeautomation',
        type: 'single',
        prompt: 'Was ist Gebäudeautomation im Kern?',
        options: [
          { id: 'a', text: 'Die vernetzte Steuerung, Regelung und Überwachung technischer Gebäudefunktionen.' },
          { id: 'b', text: 'Eine reine Steckdosenliste ohne Systembezug.' },
          { id: 'c', text: 'Ein Ersatz für die Tragwerksplanung.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Gebäudeautomation verbindet Sensoren, Aktoren, Regelung und Betriebsdaten.',
      },
      {
        id: 'q13-elektro',
        type: 'multiple',
        prompt: 'Welche Themen sind in der Elektroplanung häufig relevant?',
        options: [
          { id: 'a', text: 'Stromversorgung und Verteiler' },
          { id: 'b', text: 'Beleuchtung' },
          { id: 'c', text: 'PV, Zähler und Ladeinfrastruktur' },
          { id: 'd', text: 'Nur der Name der Layergruppe' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Elektroplanung umfasst Versorgung, Sicherheit, Beleuchtung, Kommunikation und zunehmend Eigenstromsysteme.',
      },
    ],
  },
  {
    id: 'test-14-planungsrecht',
    chapterId: '14-planungsrecht',
    title: 'Selbsttest: Planungsrecht',
    questions: [
      {
        id: 'q14-bebauungsplan',
        type: 'single',
        prompt: 'Welche Rolle kann ein Bebauungsplan haben?',
        options: [
          { id: 'a', text: 'Er setzt verbindliche städtebauliche Regeln, etwa zu Art und Maß der baulichen Nutzung.' },
          { id: 'b', text: 'Er ersetzt den Bauantrag vollständig.' },
          { id: 'c', text: 'Er beschreibt ausschließlich Innenraumfarben.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Bebauungspläne regeln baurechtliche Rahmenbedingungen für Grundstück und Baukörper.',
      },
      {
        id: 'q14-kennwerte',
        type: 'multiple',
        prompt: 'Welche Kennwerte oder Regeln können im Planungsrecht relevant sein?',
        options: [
          { id: 'a', text: 'GRZ' },
          { id: 'b', text: 'GFZ' },
          { id: 'c', text: 'Abstandsflächen' },
          { id: 'd', text: 'JPEG-Kompressionsrate' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'GRZ, GFZ und Abstandsflächen beeinflussen zulässige Bebauung und Gebäudekubatur.',
      },
    ],
  },
  {
    id: 'test-15-hoai',
    chapterId: '15-hoai',
    title: 'Selbsttest: HOAI',
    questions: [
      {
        id: 'q15-lph',
        type: 'single',
        prompt: 'Wozu dienen Leistungsphasen?',
        options: [
          { id: 'a', text: 'Sie strukturieren Planungs- und Bauaufgaben von Grundlagenermittlung bis Objektbetreuung.' },
          { id: 'b', text: 'Sie ersetzen die Kommunikation mit Fachplanern.' },
          { id: 'c', text: 'Sie beschreiben nur Renderstile.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Leistungsphasen gliedern Aufgaben, Verantwortlichkeiten und Ergebnisse im Projektablauf.',
      },
      {
        id: 'q15-koordination',
        type: 'multiple',
        prompt: 'Welche Aufgaben sind in Planungsprozessen besonders koordinationsrelevant?',
        options: [
          { id: 'a', text: 'Anforderungen klären' },
          { id: 'b', text: 'Fachplanungen integrieren' },
          { id: 'c', text: 'Entscheidungen dokumentieren' },
          { id: 'd', text: 'Planstände unkommentiert mischen' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Koordination braucht klare Anforderungen, integrierte Fachplanung und nachvollziehbare Dokumentation.',
      },
    ],
  },
  {
    id: 'test-16-kosten-ausschreibung',
    chapterId: '16-kosten-ausschreibung',
    title: 'Selbsttest: Kosten & Ausschreibung',
    questions: [
      {
        id: 'q16-din276',
        type: 'single',
        prompt: 'Wozu dient die DIN 276 in der Kostenplanung?',
        options: [
          { id: 'a', text: 'Sie strukturiert Baukosten nach Kostengruppen.' },
          { id: 'b', text: 'Sie legt den U-Wert eines Bauteils fest.' },
          { id: 'c', text: 'Sie ersetzt jedes Leistungsverzeichnis.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Die DIN 276 ordnet Kosten in Kostengruppen und macht Kostenstände vergleichbar.',
      },
      {
        id: 'q16-lv',
        type: 'multiple',
        prompt: 'Was gehört zu einer brauchbaren Ausschreibung?',
        options: [
          { id: 'a', text: 'Eindeutige Leistungsbeschreibung' },
          { id: 'b', text: 'Mengenbezug' },
          { id: 'c', text: 'Qualitätsanforderungen' },
          { id: 'd', text: 'Unklare Sammelpositionen ohne Bezug' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Ausschreibungen müssen Leistungen, Mengen und Qualitäten nachvollziehbar beschreiben.',
      },
    ],
  },
  {
    id: 'test-17-was-bim-wirklich-ist',
    chapterId: '17-was-bim-wirklich-ist',
    title: 'Selbsttest: Was BIM wirklich ist',
    questions: [
      {
        id: 'q17-bim',
        type: 'single',
        prompt: 'Was ist BIM am treffendsten?',
        options: [
          { id: 'a', text: 'Eine modellbasierte Arbeitsmethode mit strukturierten Informationen und koordinierten Prozessen.' },
          { id: 'b', text: 'Nur ein 3D-Bild für Präsentationen.' },
          { id: 'c', text: 'Ein einzelnes Dateiformat.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'BIM verbindet Modell, Informationen, Rollen, Prozesse und Austauschregeln.',
      },
      {
        id: 'q17-dimensionen',
        type: 'multiple',
        prompt: 'Welche Erweiterungen werden häufig mit BIM-Dimensionen verbunden?',
        options: [
          { id: 'a', text: 'Zeitplanung' },
          { id: 'b', text: 'Kosten' },
          { id: 'c', text: 'Betrieb und Nachhaltigkeit' },
          { id: 'd', text: 'Nur Kameraperspektive' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'BIM kann 3D-Geometrie um Termin-, Kosten-, Betriebs- und Nachhaltigkeitsinformationen erweitern.',
      },
    ],
  },
  {
    id: 'test-18-ifc',
    chapterId: '18-ifc',
    title: 'Selbsttest: IFC',
    questions: [
      {
        id: 'q18-ifc',
        type: 'single',
        prompt: 'Wofür steht IFC praktisch im BIM-Kontext?',
        options: [
          { id: 'a', text: 'Ein offenes Datenschema zum Austausch von Gebäudeinformationen.' },
          { id: 'b', text: 'Ein Bildformat für Renderings.' },
          { id: 'c', text: 'Eine Honorarordnung.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'IFC beschreibt Objekte, Eigenschaften und Beziehungen für offenen BIM-Datenaustausch.',
      },
      {
        id: 'q18-inhalte',
        type: 'multiple',
        prompt: 'Welche Informationen können in IFC relevant sein?',
        options: [
          { id: 'a', text: 'Objektklassen wie Wand, Raum oder Tür' },
          { id: 'b', text: 'Property Sets' },
          { id: 'c', text: 'Beziehungen zwischen Objekten' },
          { id: 'd', text: 'Nur die Pixelgröße eines Screenshots' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'IFC transportiert semantische Objekte, Eigenschaften und Relationen, nicht nur Geometrie.',
      },
    ],
  },
  {
    id: 'test-19-klassifikation',
    chapterId: '19-klassifikation',
    title: 'Selbsttest: Klassifikation',
    questions: [
      {
        id: 'q19-zweck',
        type: 'single',
        prompt: 'Warum werden Klassifikationen in BIM-Projekten genutzt?',
        options: [
          { id: 'a', text: 'Sie ordnen Objekte einheitlich und machen Informationen auswertbar.' },
          { id: 'b', text: 'Sie ersetzen jede Modellprüfung.' },
          { id: 'c', text: 'Sie dienen nur der grafischen Farbwahl.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Klassifikationen schaffen gemeinsame Zuordnungssysteme für Auswertung, Austausch und Kontrolle.',
      },
      {
        id: 'q19-mapping',
        type: 'multiple',
        prompt: 'Wo helfen Klassifikationen besonders?',
        options: [
          { id: 'a', text: 'Kosten- und Mengenstrukturen' },
          { id: 'b', text: 'Bauteil- und Systemzuordnung' },
          { id: 'c', text: 'Datenprüfung und Übergabe' },
          { id: 'd', text: 'Zufällige Benennung ohne Regeln' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Klassifikationen verbinden Modellinhalte mit Kosten, Systemen, Anforderungen und Prüfroutinen.',
      },
    ],
  },
  {
    id: 'test-20-prozess-kollaboration',
    chapterId: '20-prozess-kollaboration',
    title: 'Selbsttest: Prozess & Kollaboration',
    questions: [
      {
        id: 'q20-cde',
        type: 'single',
        prompt: 'Was ist eine CDE?',
        options: [
          { id: 'a', text: 'Eine gemeinsame Datenumgebung für Planstände, Freigaben, Kommunikation und Dokumentation.' },
          { id: 'b', text: 'Ein Dämmstofftyp.' },
          { id: 'c', text: 'Ein statischer Lastfall.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Eine Common Data Environment strukturiert Informationsflüsse und Planstände im Projekt.',
      },
      {
        id: 'q20-prozess',
        type: 'multiple',
        prompt: 'Welche Elemente verbessern kollaborative BIM-Prozesse?',
        options: [
          { id: 'a', text: 'Klare Informationsanforderungen' },
          { id: 'b', text: 'Definierte Prüf- und Freigabewege' },
          { id: 'c', text: 'Versionierung' },
          { id: 'd', text: 'Unkontrollierter Dateiaustausch per Zufall' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'BIM-Kollaboration braucht klare Anforderungen, Zustände, Verantwortlichkeiten und Versionen.',
      },
    ],
  },
  {
    id: 'test-21-bim-praxis',
    chapterId: '21-bim-praxis',
    title: 'Selbsttest: BIM in der Praxis',
    questions: [
      {
        id: 'q21-clash',
        type: 'single',
        prompt: 'Was leistet Kollisionsprüfung?',
        options: [
          { id: 'a', text: 'Sie findet geometrische oder regelbasierte Konflikte zwischen Modellen und Bauteilen.' },
          { id: 'b', text: 'Sie ersetzt alle Fachkoordination.' },
          { id: 'c', text: 'Sie erzeugt automatisch die Baugenehmigung.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Kollisionsprüfung ist ein Werkzeug der Koordination, braucht aber Bewertung und Nachverfolgung.',
      },
      {
        id: 'q21-praxis',
        type: 'multiple',
        prompt: 'Welche Punkte sind für BIM-Praxis wichtig?',
        options: [
          { id: 'a', text: 'Modellierungsregeln' },
          { id: 'b', text: 'Issue-Management' },
          { id: 'c', text: 'Prüfbare Informationsanforderungen' },
          { id: 'd', text: 'Unabgestimmte Sonderlösungen je Person' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'BIM-Praxis wird durch Regeln, Prüfungen, Issues und nachvollziehbare Informationsanforderungen belastbar.',
      },
    ],
  },
  {
    id: 'test-22-nachhaltigkeit',
    chapterId: '22-nachhaltigkeit',
    title: 'Selbsttest: Nachhaltigkeit & Kreislaufwirtschaft',
    questions: [
      {
        id: 'q22-lca',
        type: 'single',
        prompt: 'Was betrachtet eine Lebenszyklusanalyse?',
        options: [
          { id: 'a', text: 'Umweltwirkungen über Phasen wie Herstellung, Nutzung, Rückbau und Verwertung.' },
          { id: 'b', text: 'Nur den Kaufpreis eines Materials.' },
          { id: 'c', text: 'Ausschließlich die Fassadenansicht.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'LCA betrachtet Umweltwirkungen über den Lebenszyklus eines Gebäudes oder Produkts.',
      },
      {
        id: 'q22-kreislauf',
        type: 'multiple',
        prompt: 'Welche Prinzipien unterstützen Kreislaufwirtschaft?',
        options: [
          { id: 'a', text: 'Rückbaubarkeit' },
          { id: 'b', text: 'Materialpässe' },
          { id: 'c', text: 'Wiederverwendung und Recyclingfähigkeit' },
          { id: 'd', text: 'Verklebung ohne Dokumentation als Standardziel' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Kreislaufgerechtes Bauen setzt auf dokumentierte Materialien, lösbare Verbindungen und Wiederverwendung.',
      },
    ],
  },
  {
    id: 'test-23-sanierung',
    chapterId: '23-sanierung',
    title: 'Selbsttest: Sanierung',
    questions: [
      {
        id: 'q23-bestand',
        type: 'single',
        prompt: 'Warum ist Bestandsaufnahme vor Sanierung entscheidend?',
        options: [
          { id: 'a', text: 'Sie schafft belastbare Grundlagen zu Geometrie, Zustand, Bauteilen und Risiken.' },
          { id: 'b', text: 'Sie verhindert jede weitere Planung.' },
          { id: 'c', text: 'Sie ersetzt alle baurechtlichen Prüfungen.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Sanierung hängt stark von realem Bestand, Schadstoffen, Konstruktion und Baualtersphase ab.',
      },
      {
        id: 'q23-methoden',
        type: 'multiple',
        prompt: 'Welche Werkzeuge können bei Sanierungsprojekten helfen?',
        options: [
          { id: 'a', text: 'Aufmaß und Laserscan' },
          { id: 'b', text: 'Bauteilöffnung und Zustandsbewertung' },
          { id: 'c', text: 'Scan-to-BIM' },
          { id: 'd', text: 'Planen ohne Prüfung des Bestands' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Digitale und analoge Bestandsmethoden verbessern die Datengrundlage für Eingriffe in bestehende Gebäude.',
      },
    ],
  },
  {
    id: 'test-24-digitaler-zwilling-ki',
    chapterId: '24-digitaler-zwilling-ki',
    title: 'Selbsttest: Digitaler Zwilling & KI',
    questions: [
      {
        id: 'q24-zwilling',
        type: 'single',
        prompt: 'Was unterscheidet einen digitalen Zwilling von einem statischen Modell?',
        options: [
          { id: 'a', text: 'Er kann mit aktuellen Betriebs-, Sensor- oder Prozessdaten verbunden sein.' },
          { id: 'b', text: 'Er ist immer nur ein gerendertes Bild.' },
          { id: 'c', text: 'Er enthält grundsätzlich keine Informationen.' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Digitale Zwillinge verbinden Modellinformationen mit laufenden Daten und Anwendungsfällen im Betrieb.',
      },
      {
        id: 'q24-ki',
        type: 'multiple',
        prompt: 'Welche Voraussetzungen sind für sinnvolle KI-Anwendungen im Gebäudekontext wichtig?',
        options: [
          { id: 'a', text: 'Verlässliche Datenqualität' },
          { id: 'b', text: 'Klare Anwendungsfälle' },
          { id: 'c', text: 'Nachvollziehbare Grenzen und Kontrolle' },
          { id: 'd', text: 'Blindes Vertrauen ohne Prüfung' },
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'KI braucht gute Daten, klare Ziele und fachliche Kontrolle, besonders bei Planungs- und Betriebsentscheidungen.',
      },
    ],
  },
]

export const SELF_TESTS_BY_CHAPTER = new Map(SELF_TESTS.map(test => [test.chapterId, test]))

export function getSelfTestForChapter(chapterId: string): SelfTest | undefined {
  return SELF_TESTS_BY_CHAPTER.get(chapterId)
}
