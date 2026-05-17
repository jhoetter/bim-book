import type { ComponentType } from 'react'
import type { BimIconProps, BimIconHifiProps } from 'bim-icons'
import {
  HomeIcon,
  GridIcon,
  WallIcon,
  RoomIcon,
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
  NoteBlockIcon,
  ScheduleViewIcon,
  // Hifi page icons
  FloorHifi,
  WallHifi,
  RoomHifi,
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
  NoteBlockHifi,
  ScheduleViewHifi,
} from 'bim-icons'

export interface Chapter {
  id: string
  num: string
  title: string
  path: string
  icon?: ComponentType<BimIconProps>
  pageIcon?: ComponentType<BimIconHifiProps>
  coverImage?: string
}

export interface Part {
  title: string
  chapters: Chapter[]
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
      { id: 'glossar', num: '', title: 'Glossar', path: 'appendix/glossar', icon: NoteBlockIcon, pageIcon: NoteBlockHifi },
      { id: 'formelsammlung', num: '', title: 'Formelsammlung', path: 'appendix/formelsammlung', icon: QuantityTakeoffIcon, pageIcon: QuantityTakeoffHifi },
    ],
  },
  {
    title: 'Teil I – Fundament',
    chapters: [
      { id: '01-architektur-als-system', num: '1', title: 'Architektur als System', path: 'chapters/01-architektur-als-system', icon: WallIcon, pageIcon: WallHifi, coverImage: '/assets/covers/cover-ch01.png' },
      { id: '02-entwurf-raum-funktion', num: '2', title: 'Entwurf, Raum und Funktion', path: 'chapters/02-entwurf-raum-funktion', icon: RoomIcon, pageIcon: RoomHifi, coverImage: '/assets/covers/cover-ch02.png' },
    ],
  },
  {
    title: 'Teil II – Baukörper',
    chapters: [
      { id: '03-baustoffe', num: '3', title: 'Baustoffe', path: 'chapters/03-baustoffe', icon: MaterialIcon, pageIcon: MaterialHifi, coverImage: '/assets/covers/cover-ch03.png' },
      { id: '04-tragwerk', num: '4', title: 'Tragwerk: Lasten, Kräfte, Systeme', path: 'chapters/04-tragwerk', icon: TrussIcon, pageIcon: TrussHifi, coverImage: '/assets/covers/cover-ch04.png' },
      { id: '05-konstruktion', num: '5', title: 'Konstruktion: Gründung, Wand, Decke, Dach', path: 'chapters/05-konstruktion', icon: FoundationIcon, pageIcon: FoundationHifi, coverImage: '/assets/covers/cover-ch05.png' },
    ],
  },
  {
    title: 'Teil III – Bauphysik',
    chapters: [
      { id: '06-waermeschutz-geg', num: '6', title: 'Wärmeschutz & GEG', path: 'chapters/06-waermeschutz-geg', icon: EnergyModelIcon, pageIcon: EnergyModelHifi, coverImage: '/assets/covers/cover-ch06.png' },
      { id: '07-feuchteschutz', num: '7', title: 'Feuchteschutz', path: 'chapters/07-feuchteschutz', icon: WallLayerIcon, pageIcon: WallLayerHifi, coverImage: '/assets/covers/cover-ch07.png' },
      { id: '08-schallschutz', num: '8', title: 'Schallschutz', path: 'chapters/08-schallschutz', icon: SoundIcon, pageIcon: SoundHifi, coverImage: '/assets/covers/cover-ch08.png' },
      { id: '09-brandschutz', num: '9', title: 'Brandschutz', path: 'chapters/09-brandschutz', icon: FireSprinklerIcon, pageIcon: FireSprinklerHifi, coverImage: '/assets/covers/cover-ch09.png' },
    ],
  },
  {
    title: 'Teil IV – TGA',
    chapters: [
      { id: '10-heizung-waermeversorgung', num: '10', title: 'Heizung & Wärmeversorgung', path: 'chapters/10-heizung-waermeversorgung', icon: PipeIcon, pageIcon: PipeHifi, coverImage: '/assets/covers/cover-ch10.png' },
      { id: '11-lueftung', num: '11', title: 'Lüftung & Raumluftqualität', path: 'chapters/11-lueftung', icon: DuctRoundIcon, pageIcon: DuctRoundHifi, coverImage: '/assets/covers/cover-ch11.png' },
      { id: '12-sanitaer', num: '12', title: 'Sanitär & Entwässerung', path: 'chapters/12-sanitaer', icon: PlumbingFixtureIcon, pageIcon: PlumbingFixtureHifi, coverImage: '/assets/covers/cover-ch12.png' },
      { id: '13-elektro', num: '13', title: 'Elektro & Gebäudeautomation', path: 'chapters/13-elektro', icon: ElectricalPanelIcon, pageIcon: ElectricalPanelHifi, coverImage: '/assets/covers/cover-ch13.png' },
    ],
  },
  {
    title: 'Teil V – Recht & Prozess',
    chapters: [
      { id: '14-planungsrecht', num: '14', title: 'Planungsrecht', path: 'chapters/14-planungsrecht', icon: ProjectInfoIcon, pageIcon: ProjectInfoHifi, coverImage: '/assets/covers/cover-ch14.png' },
      { id: '15-hoai', num: '15', title: 'HOAI: Phasen, Leistungen, Koordination', path: 'chapters/15-hoai', icon: PhaseIcon, pageIcon: PhaseHifi, coverImage: '/assets/covers/cover-ch15.png' },
      { id: '16-kosten-ausschreibung', num: '16', title: 'Kosten & Ausschreibung', path: 'chapters/16-kosten-ausschreibung', icon: QuantityTakeoffIcon, pageIcon: QuantityTakeoffHifi, coverImage: '/assets/covers/cover-ch16.png' },
    ],
  },
  {
    title: 'Teil VI – BIM',
    chapters: [
      { id: '17-was-bim-wirklich-ist', num: '17', title: 'Was BIM wirklich ist', path: 'chapters/17-was-bim-wirklich-ist', icon: LinkedModelIcon, pageIcon: LinkedModelHifi, coverImage: '/assets/covers/cover-ch17.png' },
      { id: '18-ifc', num: '18', title: 'IFC: Die Sprache des digitalen Gebäudes', path: 'chapters/18-ifc', icon: IFCIcon, pageIcon: IFCHifi, coverImage: '/assets/covers/cover-ch18.png' },
      { id: '19-klassifikation', num: '19', title: 'Klassifikation', path: 'chapters/19-klassifikation', icon: FamilyTypeIcon, pageIcon: FamilyTypeHifi, coverImage: '/assets/covers/cover-ch19.png' },
      { id: '20-prozess-kollaboration', num: '20', title: 'Prozess & Kollaboration', path: 'chapters/20-prozess-kollaboration', icon: SyncIcon, pageIcon: SyncHifi, coverImage: '/assets/covers/cover-ch20.png' },
      { id: '21-bim-praxis', num: '21', title: 'BIM in der Praxis', path: 'chapters/21-bim-praxis', icon: WorksetIcon, pageIcon: WorksetHifi, coverImage: '/assets/covers/cover-ch21.png' },
    ],
  },
  {
    title: 'Teil VII – Nachhaltigkeit',
    chapters: [
      { id: '22-nachhaltigkeit', num: '22', title: 'Nachhaltigkeit & Kreislaufwirtschaft', path: 'chapters/22-nachhaltigkeit', icon: PlantingIcon, pageIcon: PlantingHifi, coverImage: '/assets/covers/cover-ch22.png' },
      { id: '23-sanierung', num: '23', title: 'Sanierung', path: 'chapters/23-sanierung', icon: RevisionIcon, pageIcon: RevisionHifi, coverImage: '/assets/covers/cover-ch23.png' },
      { id: '24-digitaler-zwilling-ki', num: '24', title: 'Digitaler Zwilling & KI', path: 'chapters/24-digitaler-zwilling-ki', icon: DigitalTwinIcon, pageIcon: DigitalTwinHifi, coverImage: '/assets/covers/cover-ch24.png' },
    ],
  },
  {
    title: 'Anhang',
    chapters: [
      { id: 'kastanienallee7', num: '', title: 'Kastanienallee 7', path: 'appendix/kastanienallee7', icon: TopoIcon, pageIcon: TopoHifi },
      { id: 'ifc-referenz', num: '', title: 'IFC-Schnellreferenz', path: 'appendix/ifc-referenz', icon: IFCIcon, pageIcon: IFCHifi },
      { id: 'normen', num: '', title: 'Normen & Gesetze', path: 'appendix/normen', icon: ScheduleViewIcon, pageIcon: ScheduleViewHifi },
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
  const key = `../../docs/${path}.md`
  return (rawFiles[key] as string | undefined) ?? `# Nicht gefunden\n\nDie Seite \`${path}\` existiert noch nicht.`
}

export function findChapterByPath(path: string): Chapter | undefined {
  return ALL_CHAPTERS.find(c => c.path === path || c.id === path)
}

export function getNavigation(id: string): { prev: Chapter | null; next: Chapter | null } {
  const idx = ALL_CHAPTERS.findIndex(c => c.id === id)
  return {
    prev: idx > 0 ? ALL_CHAPTERS[idx - 1] : null,
    next: idx >= 0 && idx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[idx + 1] : null,
  }
}

export function getBreadcrumb(pathname: string): { part: string | null; chapter: string | null } {
  const path = pathname.replace(/^\//, '') || 'index'
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
