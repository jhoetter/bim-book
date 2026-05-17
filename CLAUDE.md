# BIM Book – Arbeitsregeln für Claude

## Fettdruck vs. Glossar

**Regel:** Fachbegriffe, die als Begriff eingeführt werden, müssen immer als `::Begriff::` referenziert werden – niemals als `**Begriff**`.

`**fett**` ist ausschließlich für:
- Labels in Listen (`**Wärmeversorgung:** Fernwärme …`)
- Leit- oder Zusammenfassungssätze (`**Tragwerk begrenzt Hülle und Innenausbau.**`)
- Nicht-terminologische Hervorhebungen

`::Begriff::` ist zu verwenden, wenn:
- ein Fachbegriff im Text eingeführt oder erstmals erläutert wird
- ein Begriff im Glossar (`web/src/data/glossar.ts`) existiert oder existieren sollte

**Vorgehen beim Schreiben von Kapiteltext:**
1. Soll ein Fachbegriff hervorgehoben werden → prüfen, ob er in `glossar.ts` existiert
2. Falls nicht → zuerst Glossareintrag anlegen (id, term, definition, thema, typ)
3. Dann im Markdown `::Begriff::` verwenden, nicht `**Begriff**`

Niemals `**Begriff**` als Ersatz für einen fehlenden Glossareintrag verwenden.

---

## Glossar-Daten (`web/src/data/glossar.ts`)

- Einträge alphabetisch nach `id` sortiert halten
- `thema` muss einer der definierten `GlossThema`-Werte sein
- `typ` muss einer der definierten `GlossTyp`-Werte sein
- `abbrev` nur setzen, wenn der Begriff eine offizielle Abkürzung hat

## Markdown-Konventionen

- Glossarreferenz: `::Begriff::` (löst Tooltip im Reader aus)
- Formelreferenz: `^^formel-id^^`
- Querverweise: `→ Kapitel X`
