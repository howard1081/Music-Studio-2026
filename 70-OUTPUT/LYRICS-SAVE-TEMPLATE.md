# 70-OUTPUT/LYRICS-SAVE-TEMPLATE.md

## Contract
**Purpose:** Define the canonical on-disk format for a saved lyrics file, including required header metadata, structure requirements, and save-readiness checks. This is the "final artifact wrapper" the executor uses when writing to `/Songs/...`.

**This file OWNS (authoritative):**
- Saved-lyrics file layout (header + sections + footer metadata)
- Required metadata fields to embed inside a lyrics file
- What constitutes a "Final Save" lyrics artifact (format-level)
- Optional sidecar recommendations (metadata + prompt capture)

**This file DOES NOT OWN (references-only):**
- ID formats and naming conventions (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA gates and severities (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone/taboo enforcement (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Registry schemas and uniqueness checks storage (owned by `/60-REGISTRY/*`)
- Artist-specific style constraints (owned by artist bible)

---

## 1) Filename Rule (Reference)
Filename MUST follow `ID-SYSTEM.md`.

**Example pattern:**
`<work_id>__v<NN>__<title_slug>.md` 

---

## 2) Required Header Block (MUST be first)
The lyrics file MUST begin with a YAML block exactly like this:

```yaml
id_header:
  work_id: WORK-YYYYMMDD-HHMM-RAND4
  version_id: VER-YYYYMMDD-HHMM-RAND4
  version_label: v01
  run_id: RUN-YYYYMMDD-HHMM-RAND4

  artist_id: ART-<slug>
  genre_id: GEN-<slug>

  scripture_packet_id: SCR-YYYYMMDD-HHMM-RAND4
  hook_family_id: HKF-<slug>
  scene_id: SCN-YYYYMMDD-HHMM-RAND4

  story_id: SF-YYYYMMDD-HHMM-RAND4           # optional but recommended
  song_frame_id: SFR-YYYYMMDD-HHMM-RAND4     # optional but recommended
  album_id: TBD                              # optional
  track_id: TBD                              # optional
  revision_id: TBD                           # optional
```

### Rules
- Keys must match exactly.
- Fields marked optional may be `TBD` at Draft stage, but at Final Save they should be filled if available.
- At Final Save, `hook_family_id`, `scene_id`, and `scripture_packet_id` MUST NOT be `TBD`.

---

## 3) Required Top Metadata (Human-readable)
Immediately after the YAML header, include this block:

```markdown
# Title: <Song Title>
# Subtitle (optional): <short line>

## Credits (optional)
- Words: <name>
- Music: <name>
- Produced: <name>

## Lane
- Artist: <artist_id>
- Genre: <genre_id>
- Hook Family: <hook_family_id>
- Scripture Packet: <scripture_packet_id>
```

### Notes
- Keep this short. The YAML is for machines; this is for humans.

---

## 4) Lyrics Body (Required)
Lyrics must be written with section headers.

### Allowed section tags (choose what fits)
- `[Verse 1]`, `[Verse 2]`, `[Verse 3]`
- `[Pre-Chorus]`
- `[Chorus]`
- `[Bridge]`
- `[Outro]`, `[Intro]`
- `[Breakdown]` (for metal lanes)
- `[Tag]` (short ending line)

### Body rules
- Chorus must be clearly labeled `[Chorus]`.
- Verses must advance story and include receipts; avoid abstract-only verses.
- Avoid sermon voice and hard-banned phrases (see `TONE-TABOOS.md`).

---

## 5) Footer Metadata (Recommended)
At the end of the file, include:

```markdown
---

## QA Snapshot
- Gate 1 (Draft Lyrics): <PASS | PASS WITH MINOR FIXES | REWRITE REQUIRED | PIVOT REQUIRED | FAIL>
- Gate 2 (Final Save): <PASS | FAIL>
- Tone flags (if any): <none | list>
- Uniqueness checks: <PASS | FAIL | NOT RUN>

## Notes
- <1–5 bullets: decisions, what changed, what to try next>
```

---

## 6) Sidecar Files (Recommended, Not Required)
If tooling supports it, save:

- `<stem>.json` — structured metadata (same IDs + quick fields)
- `<stem>.prompt.md` — exact prompt inputs used for reproducibility

Sidecars improve auditability and reuse-window enforcement, but are optional.

---

## 7) Save-Readiness Checks (Executor Must Run)

PASS (Final Save) only if:
- [ ] YAML header exists, first in file, keys correct
- [ ] `work_id`, `version_id`, `run_id` present and valid format
- [ ] `artist_id`, `genre_id` present
- [ ] `scripture_packet_id`, `hook_family_id`, `scene_id` present and NOT `TBD`
- [ ] Lyrics include labeled sections and a chorus
- [ ] No `[TBD]` inside lyrics body
- [ ] Tone/taboo checks pass (per `TONE-TABOOS.md`)
- [ ] Uniqueness preflight recorded (PASS/FAIL/NOT RUN)

FAIL (Blocker) if:
- [ ] Any required ID missing at Final Save
- [ ] YAML header malformed or not first
- [ ] Chorus missing or unlabeled
- [ ] Hard-banned phrases present (tone taboos)
- [ ] Uniqueness check FAIL without logged override

---

## Vetting Outcome
✅ **PASS** — Clean headings, clean code fences, explicit rules, and executor checks. No schema conflicts; ID formats referenced, not redefined.

### Dependencies
- Requires `00-GOVERNANCE/ID-SYSTEM.md` for exact ID formats.
- QA outcome terms from `00-GOVERNANCE/QA-GATES.md`.

### Next Files Impacted
- `/60-REGISTRY/*` (will parse this header for indexing and reuse enforcement)
- Any executor tooling that saves lyrics must follow this template
