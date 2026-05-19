import type { ComponentType } from 'react'
import type { BimIconProps, BimIconHifiProps } from 'bim-icons'
import {
  HomeIcon,
  GridIcon,
  SheetIcon,
  WallIcon,
  RoomIcon,
  DimensionIcon,
  MaterialIcon,
  TrussIcon,
  FoundationIcon,
  EnergyModelIcon,
  WallLayerIcon,
  SoundIcon,
  FireSprinklerIcon,
  PipeIcon,
  DuctRoundIcon,
  PlumbingFixtureIcon,
  ElectricalPanelIcon,
  ProjectInfoIcon,
  PhaseIcon,
  QuantityTakeoffIcon,
  LinkedModelIcon,
  IFCIcon,
  FamilyTypeIcon,
  SyncIcon,
  WorksetIcon,
  PlantingIcon,
  RevisionIcon,
  DigitalTwinIcon,
  TopoIcon,
  KeynoteIcon,
  NoteBlockIcon,
  SheetListIcon,
  ViewReferenceIcon,
  ValidationRuleIcon,
  // Hifi page icons
  FloorHifi,
  SheetHifi,
  WallHifi,
  RoomHifi,
  DimensionHifi,
  MaterialHifi,
  TrussHifi,
  FoundationHifi,
  EnergyModelHifi,
  WallLayerHifi,
  SoundHifi,
  FireSprinklerHifi,
  PipeHifi,
  DuctRoundHifi,
  PlumbingFixtureHifi,
  ElectricalPanelHifi,
  ProjectInfoHifi,
  PhaseHifi,
  QuantityTakeoffHifi,
  LinkedModelHifi,
  IFCHifi,
  FamilyTypeHifi,
  SyncHifi,
  WorksetHifi,
  PlantingHifi,
  RevisionHifi,
  DigitalTwinHifi,
  TopoHifi,
  KeynoteHifi,
  NoteBlockHifi,
  SheetListHifi,
  ViewReferenceHifi,
  ValidationRuleHifi,
} from 'bim-icons'
import { normalizeBookPath } from './books'

export interface Chapter {
  id: string
  num: string
  title: string
  path: string
  icon?: ComponentType<BimIconProps>
  pageIcon?: ComponentType<BimIconHifiProps>
  coverImage?: string
  isReferencePage?: boolean
}

export interface Part {
  title: string
  chapters: Chapter[]
}

export interface ChapterGraphNode {
  chapter: Chapter
  partTitle: string
  incoming: number
  outgoing: number
  total: number
}

export interface ChapterGraphEdge {
  sourceId: string
  targetId: string
  count: number
}

export interface ChapterReferenceGraph {
  nodes: ChapterGraphNode[]
  edges: ChapterGraphEdge[]
  totalLinks: number
}

export const GALLERY_ICON = GridIcon

export const PARTS: Part[] = [
  {
    title: 'Überblick',
    chapters: [
      { id: 'index', num: '', title: 'Überblick', path: 'index', icon: HomeIcon, pageIcon: FloorHifi },
    ],
  },
  {
    title: 'Nachschlagewerke',
    chapters: [
      { id: 'glossar', num: '', title: 'Glossar', path: 'glossar', icon: NoteBlockIcon, pageIcon: NoteBlockHifi, isReferencePage: true },
      { id: 'markierungen', num: '', title: 'Markierungen', path: 'markierungen', icon: KeynoteIcon, pageIcon: KeynoteHifi, isReferencePage: true },
      { id: 'formelsammlung', num: '', title: 'Formelsammlung', path: 'formelsammlung', icon: DimensionIcon, pageIcon: DimensionHifi, isReferencePage: true },
      { id: 'quellen', num: '', title: 'Quellen', path: 'appendix/quellen', icon: SheetListIcon, pageIcon: SheetListHifi, isReferencePage: true },
      { id: 'selbsttests', num: '', title: 'Selbsttests', path: 'selbsttests', icon: ValidationRuleIcon, pageIcon: ValidationRuleHifi, isReferencePage: true },
      { id: 'kastanienallee7', num: '', title: 'Kastanienallee 7', path: 'appendix/kastanienallee7', icon: TopoIcon, pageIcon: TopoHifi, isReferencePage: true },
      { id: 'ifc-referenz', num: '', title: 'IFC-Schnellreferenz', path: 'appendix/ifc-referenz', icon: ViewReferenceIcon, pageIcon: ViewReferenceHifi, isReferencePage: true },
      { id: 'normen', num: '', title: 'Normen & Gesetze', path: 'appendix/normen', icon: SheetIcon, pageIcon: SheetHifi, isReferencePage: true },
    ],
  },
  {
    title: 'Teil I – Fundament, Projektstart & Entwurf',
    chapters: [
      { id: '01-architektur-als-system', num: '1', title: 'Architektur als System', path: 'chapters/01-architektur-als-system', icon: WallIcon, pageIcon: WallHifi, coverImage: '/assets/covers/cover-ch01.png' },
      { id: '02-projektstart-bauherr-machbarkeit', num: '2', title: 'Projektstart, Bauherr & Machbarkeit', path: 'chapters/02-projektstart-bauherr-machbarkeit', icon: ProjectInfoIcon, pageIcon: ProjectInfoHifi, coverImage: '/assets/covers/cover-ch02.png' },
      { id: '03-problemraum-briefing-anforderungen-raumprogramm', num: '3', title: 'Problemraum: Briefing, Anforderungen, Raumprogramm', path: 'chapters/03-problemraum-briefing-anforderungen-raumprogramm', icon: NoteBlockIcon, pageIcon: NoteBlockHifi, coverImage: '/assets/covers/cover-ch03.png' },
      { id: '04-grundstueck-vorpruefung-due-diligence', num: '4', title: 'Grundstück, Vorprüfung & Due Diligence', path: 'chapters/04-grundstueck-vorpruefung-due-diligence', icon: TopoIcon, pageIcon: TopoHifi, coverImage: '/assets/covers/cover-ch04.png' },
      { id: '05-standortanalyse-grobskizzen-varianten', num: '5', title: 'Standortanalyse, Grobskizzen & Varianten', path: 'chapters/05-standortanalyse-grobskizzen-varianten', icon: GridIcon, pageIcon: FloorHifi, coverImage: '/assets/covers/cover-ch05.png' },
      { id: '06-plaene-raum-funktion-entwurfslogik', num: '6', title: 'Pläne, Raum, Funktion & Entwurfslogik', path: 'chapters/06-plaene-raum-funktion-entwurfslogik', icon: RoomIcon, pageIcon: RoomHifi, coverImage: '/assets/covers/cover-ch06.png' },
    ],
  },
  {
    title: 'Teil II – Baukörper',
    chapters: [
      { id: '07-baustoffe', num: '7', title: 'Baustoffe', path: 'chapters/07-baustoffe', icon: MaterialIcon, pageIcon: MaterialHifi, coverImage: '/assets/covers/cover-ch07.png' },
      { id: '08-tragwerk', num: '8', title: 'Tragwerk: Lasten, Kräfte, Systeme', path: 'chapters/08-tragwerk', icon: TrussIcon, pageIcon: TrussHifi, coverImage: '/assets/covers/cover-ch08.png' },
      { id: '09-konstruktion', num: '9', title: 'Konstruktion: Gründung, Wand, Decke, Dach', path: 'chapters/09-konstruktion', icon: FoundationIcon, pageIcon: FoundationHifi, coverImage: '/assets/covers/cover-ch09.png' },
    ],
  },
  {
    title: 'Teil III – Bauphysik',
    chapters: [
      { id: '10-waermeschutz-geg', num: '10', title: 'Wärmeschutz & GEG', path: 'chapters/10-waermeschutz-geg', icon: EnergyModelIcon, pageIcon: EnergyModelHifi, coverImage: '/assets/covers/cover-ch10.png' },
      { id: '11-feuchteschutz', num: '11', title: 'Feuchteschutz', path: 'chapters/11-feuchteschutz', icon: WallLayerIcon, pageIcon: WallLayerHifi, coverImage: '/assets/covers/cover-ch11.png' },
      { id: '12-schallschutz', num: '12', title: 'Schallschutz', path: 'chapters/12-schallschutz', icon: SoundIcon, pageIcon: SoundHifi, coverImage: '/assets/covers/cover-ch12.png' },
      { id: '13-brandschutz', num: '13', title: 'Brandschutz', path: 'chapters/13-brandschutz', icon: FireSprinklerIcon, pageIcon: FireSprinklerHifi, coverImage: '/assets/covers/cover-ch13.png' },
    ],
  },
  {
    title: 'Teil IV – TGA',
    chapters: [
      { id: '14-heizung-waermeversorgung', num: '14', title: 'Heizung & Wärmeversorgung', path: 'chapters/14-heizung-waermeversorgung', icon: PipeIcon, pageIcon: PipeHifi, coverImage: '/assets/covers/cover-ch14.png' },
      { id: '15-lueftung', num: '15', title: 'Lüftung & Raumluftqualität', path: 'chapters/15-lueftung', icon: DuctRoundIcon, pageIcon: DuctRoundHifi, coverImage: '/assets/covers/cover-ch15.png' },
      { id: '16-sanitaer', num: '16', title: 'Sanitär & Entwässerung', path: 'chapters/16-sanitaer', icon: PlumbingFixtureIcon, pageIcon: PlumbingFixtureHifi, coverImage: '/assets/covers/cover-ch16.png' },
      { id: '17-elektro', num: '17', title: 'Elektro & Gebäudeautomation', path: 'chapters/17-elektro', icon: ElectricalPanelIcon, pageIcon: ElectricalPanelHifi, coverImage: '/assets/covers/cover-ch17.png' },
    ],
  },
  {
    title: 'Teil V – Genehmigung & Planungsreife',
    chapters: [
      { id: '18-planungsrecht-bauantrag', num: '18', title: 'Planungsrecht & Bauantrag im Detail', path: 'chapters/18-planungsrecht-bauantrag', icon: ProjectInfoIcon, pageIcon: ProjectInfoHifi, coverImage: '/assets/covers/cover-ch18.png' },
      { id: '19-hoai-rollen-projektorganisation', num: '19', title: 'HOAI, Rollen & Projektorganisation', path: 'chapters/19-hoai-rollen-projektorganisation', icon: PhaseIcon, pageIcon: PhaseHifi, coverImage: '/assets/covers/cover-ch19.png' },
      { id: '20-fachplanerkoordination-planlauf-bim-koordination', num: '20', title: 'Fachplanerkoordination, Planlauf & BIM-Koordination', path: 'chapters/20-fachplanerkoordination-planlauf-bim-koordination', icon: SyncIcon, pageIcon: SyncHifi, coverImage: '/assets/covers/cover-ch20.png' },
      { id: '21-ausfuehrungsplanung-bauunterlagen', num: '21', title: 'Ausführungsplanung & Bauunterlagen', path: 'chapters/21-ausfuehrungsplanung-bauunterlagen', icon: SheetIcon, pageIcon: SheetHifi, coverImage: '/assets/covers/cover-ch21.png' },
      { id: '22-bemusterung-werkplanung-freigaben', num: '22', title: 'Bemusterung, Werkplanung & Freigaben', path: 'chapters/22-bemusterung-werkplanung-freigaben', icon: ValidationRuleIcon, pageIcon: ValidationRuleHifi, coverImage: '/assets/covers/cover-ch22.png' },
    ],
  },
  {
    title: 'Teil VI – Ausschreibung, Vergabe & Bauvorbereitung',
    chapters: [
      { id: '23-kostenplanung-mengen-din276', num: '23', title: 'Kostenplanung, Mengen & DIN 276', path: 'chapters/23-kostenplanung-mengen-din276', icon: QuantityTakeoffIcon, pageIcon: QuantityTakeoffHifi, coverImage: '/assets/covers/cover-ch23.png' },
      { id: '24-leistungsverzeichnis-stlb-gaeb', num: '24', title: 'Leistungsverzeichnis, STLB & GAEB', path: 'chapters/24-leistungsverzeichnis-stlb-gaeb', icon: SheetListIcon, pageIcon: SheetListHifi, coverImage: '/assets/covers/cover-ch24.png' },
      { id: '25-ausschreibung-bieterkommunikation-vergabe', num: '25', title: 'Ausschreibung, Bieterkommunikation & Vergabe', path: 'chapters/25-ausschreibung-bieterkommunikation-vergabe', icon: KeynoteIcon, pageIcon: KeynoteHifi, coverImage: '/assets/covers/cover-ch25.png' },
      { id: '26-bauvertraege-aenderungen-nachtraege', num: '26', title: 'Bauverträge, Änderungen & Nachträge', path: 'chapters/26-bauvertraege-aenderungen-nachtraege', icon: RevisionIcon, pageIcon: RevisionHifi, coverImage: '/assets/covers/cover-ch26.png' },
      { id: '27-terminplanung-lean-baustellenlogistik', num: '27', title: 'Terminplanung, Lean & Baustellenlogistik', path: 'chapters/27-terminplanung-lean-baustellenlogistik', icon: PhaseIcon, pageIcon: PhaseHifi, coverImage: '/assets/covers/cover-ch27.png' },
      { id: '28-baustellenvorbereitung-sigeko-baustelleneinrichtung', num: '28', title: 'Baustellenvorbereitung, SiGeKo & Baustelleneinrichtung', path: 'chapters/28-baustellenvorbereitung-sigeko-baustelleneinrichtung', icon: TopoIcon, pageIcon: TopoHifi, coverImage: '/assets/covers/cover-ch28.png' },
    ],
  },
  {
    title: 'Teil VII – Bauausführung, Übergabe & Betriebsvorbereitung',
    chapters: [
      { id: '29-bauoberleitung-baukontrolle-maengelmanagement', num: '29', title: 'Bauoberleitung, Baukontrolle & Mängelmanagement', path: 'chapters/29-bauoberleitung-baukontrolle-maengelmanagement', icon: ProjectInfoIcon, pageIcon: ProjectInfoHifi, coverImage: '/assets/covers/cover-ch29.png' },
      { id: '30-aufmass-rechnungspruefung-kostenkontrolle', num: '30', title: 'Aufmaß, Rechnungsprüfung & Kostenkontrolle', path: 'chapters/30-aufmass-rechnungspruefung-kostenkontrolle', icon: QuantityTakeoffIcon, pageIcon: QuantityTakeoffHifi, coverImage: '/assets/covers/cover-ch30.png' },
      { id: '31-inbetriebnahme-abnahme-uebergabe', num: '31', title: 'Inbetriebnahme, Abnahme & Übergabe', path: 'chapters/31-inbetriebnahme-abnahme-uebergabe', icon: ValidationRuleIcon, pageIcon: ValidationRuleHifi, coverImage: '/assets/covers/cover-ch31.png' },
      { id: '32-gewaehrleistung-objektbetreuung-as-built', num: '32', title: 'Gewährleistung, Objektbetreuung & As-built', path: 'chapters/32-gewaehrleistung-objektbetreuung-as-built', icon: DigitalTwinIcon, pageIcon: DigitalTwinHifi, coverImage: '/assets/covers/cover-ch32.png' },
    ],
  },
  {
    title: 'Teil VIII – BIM-Datenmethode',
    chapters: [
      { id: '33-was-bim-wirklich-ist', num: '33', title: 'Was BIM wirklich ist', path: 'chapters/33-was-bim-wirklich-ist', icon: LinkedModelIcon, pageIcon: LinkedModelHifi, coverImage: '/assets/covers/cover-ch33.png' },
      { id: '34-ifc', num: '34', title: 'IFC: Die Sprache des digitalen Gebäudes', path: 'chapters/34-ifc', icon: IFCIcon, pageIcon: IFCHifi, coverImage: '/assets/covers/cover-ch34.png' },
      { id: '35-klassifikation', num: '35', title: 'Klassifikation', path: 'chapters/35-klassifikation', icon: FamilyTypeIcon, pageIcon: FamilyTypeHifi, coverImage: '/assets/covers/cover-ch35.png' },
      { id: '36-prozess-kollaboration', num: '36', title: 'Prozess & Kollaboration', path: 'chapters/36-prozess-kollaboration', icon: SyncIcon, pageIcon: SyncHifi, coverImage: '/assets/covers/cover-ch36.png' },
      { id: '37-bim-praxis', num: '37', title: 'BIM in der Praxis', path: 'chapters/37-bim-praxis', icon: WorksetIcon, pageIcon: WorksetHifi, coverImage: '/assets/covers/cover-ch37.png' },
    ],
  },
  {
    title: 'Teil IX – Bestand, Nachhaltigkeit & Betrieb',
    chapters: [
      { id: '38-nachhaltigkeit', num: '38', title: 'Nachhaltigkeit & Kreislaufwirtschaft', path: 'chapters/38-nachhaltigkeit', icon: PlantingIcon, pageIcon: PlantingHifi, coverImage: '/assets/covers/cover-ch38.png' },
      { id: '39-sanierung', num: '39', title: 'Sanierung', path: 'chapters/39-sanierung', icon: RevisionIcon, pageIcon: RevisionHifi, coverImage: '/assets/covers/cover-ch39.png' },
      { id: '40-projektarten-neubau-bestand-denkmal', num: '40', title: 'Projektarten: Neubau, Bestand, Denkmal', path: 'chapters/40-projektarten-neubau-bestand-denkmal', icon: TopoIcon, pageIcon: TopoHifi, coverImage: '/assets/covers/cover-ch40.png' },
      { id: '41-digitaler-zwilling-ki', num: '41', title: 'Digitaler Zwilling & KI', path: 'chapters/41-digitaler-zwilling-ki', icon: DigitalTwinIcon, pageIcon: DigitalTwinHifi, coverImage: '/assets/covers/cover-ch41.png' },
    ],
  },
]

export const TOP_PAGES: Chapter[] = PARTS.find(p => p.title === 'Nachschlagewerke')?.chapters ?? []

// Flat ordered list for prev/next navigation
export const ALL_CHAPTERS: Chapter[] = PARTS.flatMap(p => p.chapters)

// Load all markdown files via Vite glob
const rawFiles = import.meta.glob('../../docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getContent(path: string): string {
  const normalizedPath = normalizeBookPath(path)
  const key = `../../docs/${normalizedPath}.md`
  return (rawFiles[key] as string | undefined) ?? `# Nicht gefunden\n\nDie Seite \`${normalizedPath}\` existiert noch nicht.`
}

export function getChapterDescription(path: string): string {
  const raw = getContent(path)
  const match = raw.match(/^# [^\n]+\n(?:\n\*[^\n]+\*\n)?\n---\n\n?([\s\S]*?)(?=\n---|\n##)/)
  if (!match) return ''
  return match[1].trim().split('\n\n')[0]
}

function normalizeChapterHref(href: string): string | null {
  const normalized = href
    .trim()
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/+/, '')
    .split(/[?#]/)[0]

  if (!normalized.startsWith('chapters/')) return null
  return normalized.replace(/\.md$/, '')
}

export function getChapterReferenceGraph(): ChapterReferenceGraph {
  const chapterPart = new Map<string, string>()
  for (const part of PARTS) {
    for (const chapter of part.chapters) chapterPart.set(chapter.id, part.title)
  }

  const chapters = ALL_CHAPTERS.filter(chapter => chapter.num && !chapter.isReferencePage)
  const byPath = new Map(chapters.map(chapter => [chapter.path, chapter]))
  const edgeCounts = new Map<string, number>()
  let totalLinks = 0

  for (const source of chapters) {
    const content = getContent(source.path)
    const linkPattern = /(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
    let match: RegExpExecArray | null
    while ((match = linkPattern.exec(content))) {
      const targetPath = normalizeChapterHref(match[1])
      if (!targetPath) continue
      const target = byPath.get(targetPath)
      if (!target || target.id === source.id) continue

      const key = `${source.id}->${target.id}`
      edgeCounts.set(key, (edgeCounts.get(key) ?? 0) + 1)
      totalLinks += 1
    }
  }

  const edges = Array.from(edgeCounts.entries()).map(([key, count]) => {
    const [sourceId, targetId] = key.split('->')
    return { sourceId, targetId, count }
  })

  const incoming = new Map<string, number>()
  const outgoing = new Map<string, number>()
  for (const edge of edges) {
    outgoing.set(edge.sourceId, (outgoing.get(edge.sourceId) ?? 0) + edge.count)
    incoming.set(edge.targetId, (incoming.get(edge.targetId) ?? 0) + edge.count)
  }

  return {
    nodes: chapters.map(chapter => {
      const inCount = incoming.get(chapter.id) ?? 0
      const outCount = outgoing.get(chapter.id) ?? 0
      return {
        chapter,
        partTitle: chapterPart.get(chapter.id) ?? '',
        incoming: inCount,
        outgoing: outCount,
        total: inCount + outCount,
      }
    }),
    edges,
    totalLinks,
  }
}

export function findChapterByPath(path: string): Chapter | undefined {
  const normalizedPath = normalizeBookPath(path)
  return ALL_CHAPTERS.find(c => c.path === normalizedPath || c.id === normalizedPath)
}

const NAV_CHAPTERS = ALL_CHAPTERS.filter(c => !c.isReferencePage)

export function getNavigation(id: string): { prev: Chapter | null; next: Chapter | null } {
  const idx = NAV_CHAPTERS.findIndex(c => c.id === id)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? NAV_CHAPTERS[idx - 1] : null,
    next: idx < NAV_CHAPTERS.length - 1 ? NAV_CHAPTERS[idx + 1] : null,
  }
}

export function getBreadcrumb(pathname: string): { part: string | null; chapter: string | null } {
  const path = normalizeBookPath(pathname)
  if (path === 'gallery') return { part: null, chapter: 'Bildgalerie' }
  const chapter = ALL_CHAPTERS.find(c => c.path === path)
  if (!chapter) return { part: null, chapter: null }
  const part = PARTS.find(p => p.chapters.some(c => c.id === chapter.id))
  const skipPartTitle = new Set(['Überblick', 'Nachschlagewerke'])
  return {
    part: part && !skipPartTitle.has(part.title) ? part.title : null,
    chapter: chapter.title,
  }
}
