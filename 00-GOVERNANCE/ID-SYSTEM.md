# 00-GOVERNANCE/ID-SYSTEM.md

## Contract
**Purpose:** Define the canonical ID formats and minting rules so every artifact (meaning packet → story → song frame → lyrics) is traceable, unique across multiple machines, and loggable into the Registry.

**This file OWNS (authoritative):**
- Canonical ID fields and formats
- Minting rules (how IDs are created)
- Filename conventions for saved artifacts
- Required "ID header block" schema for artifacts
- Cross-machine uniqueness guarantees (no central server required)

**This file DOES NOT OWN (references-only):**
- QA stages and pass/fail gates (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone/taboo phrase enforcement (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Registry file schemas (owned by `/60-REGISTRY/*`)
- Artist persona rules and voice constraints (owned by `/20-ARTISTS/*`)

---

## 1) Core Principle
IDs must work in a **two-computer / offline-friendly** reality. That means:
- No reliance on a central database to mint IDs
- Extremely low collision risk
- Sortable when possible
- Human readable where it matters (hook families, scripture units)

---

## 2) Canonical ID Fields (Definitions)

### 2.1 Song identity
- **work_id**: The stable identity of a song concept across rewrites and versions.
- **version_id**: The unique identity for a specific lyrical state (v1, v2, etc.).
- **version_label**: Display label (e.g., `v01`, `v02`). Not canonical; used for humans.

### 2.2 Generation traceability
- **run_id**: Unique ID for one generation run (inputs + decisions + outputs).
- **revision_id** (optional): Unique ID for a revision pass if you want to separate "run" from "edit pass."

### 2.3 Meaning + story + frame
- **scripture_packet_id**: Canonical ID for the Scripture Meaning Packet used.
- **story_id** (optional but recommended): ID for the Story Forge output instance.
- **song_frame_id** (optional but recommended): ID for the Song Frame instance.
- **scene_id**: Canonical ID for the primary anchor scene (the "receipt-rich" center).

### 2.4 Catalog + uniqueness control
- **hook_family_id**: A stable taxonomy ID used to group hook concepts and prevent overuse.
- **artist_id**: Canonical artist identifier (from artist folder, not invented ad hoc).
- **genre_id**: Canonical genre lane identifier (country / metal / gospel / alternative / rock).
- **album_id** (optional): Album identity if the song is part of an album plan.
- **track_id** (optional): Track number or track identity within an album.

---

## 3) ID Formats (Authoritative)

### 3.1 ULID backbone (for collision-safe IDs)
For IDs that must be globally unique across machines, use **ULID**:
- 26 chars, Crockford Base32, time-sortable.
- Example ULID: `01J2B6M3K9XK0M2V4H7D8Q1R2S` (example only)

**ULID-based IDs:**
- `work_id` = `WRK_<ULID>` 
- `version_id` = `VER_<ULID>` 
- `run_id` = `RUN_<ULID>` 
- `revision_id` = `REV_<ULID>` (optional)
- `scene_id` = `SCN_<ULID>` 
- `story_id` = `STY_<ULID>` (optional)
- `song_frame_id` = `SFR_<ULID>` (optional)

### 3.2 Human-taxonomy IDs (stable strings)
These must be **stable and human-managed** (not ULIDs):

#### hook_family_id
Format: `HKF_<kebab-case-slug>` 
Examples:
- `HKF_empty-seat` 
- `HKF_call-that-never-came` 
- `HKF_blood-on-the-hands` (example only; subject to tone rules)

Rules:
- lowercase kebab-case
- no punctuation except hyphen
- "family" is concept-level, not wording-level

#### scripture_packet_id
Format: `SPK_<unit_slug>` 
Examples:
- `SPK_isaiah_52-13__53-12` 
- `SPK_psalm_23` 
- `SPK_luke_15-11_32`  (prodigal son)
- `SPK_romans_8-1_39` 

Rules:
- book name lowercase
- chapter/verse ranges use `-` and `_` only
- multi-chapter uses double-underscore `__` to separate ranges
- packet IDs should remain stable once created (do not change unless the scope changes)

#### artist_id / genre_id
Format:
- `artist_id` = `ART_<slug>` (canonical slug owned by artist folder)
- `genre_id`  = `GEN_<slug>` 

Examples:
- `ART_jack-mercer` 
- `GEN_country` 
- `GEN_nu-metal` 

---

## 4) Versioning Rules (Canonical)

### 4.1 Canonical version identity
Each time lyrics change materially, mint a new:
- `version_id` 
- `version_label` increments (`v01` → `v02`)

### 4.2 What counts as "material"
Material = changes that affect meaning, hook wording, structure, or multiple lines.
Non-material (optional) = punctuation fixes; still recommended to version if you want full traceability.

### 4.3 Display labels vs canonical IDs
- `version_label` is for humans and filenames.
- `version_id` is the authoritative unique identifier.

---

## 5) Required ID Header Block (Embed in every artifact)

Every saved artifact MUST start with an ID header block like this:

```yaml
id_header:
  work_id: WRK_<ULID>
  version_id: VER_<ULID>
  version_label: v01
  run_id: RUN_<ULID>

  artist_id: ART_<slug>
  genre_id: GEN_<slug>

  scripture_packet_id: SPK_<unit_slug>
  hook_family_id: HKF_<kebab-case-slug>
  scene_id: SCN_<ULID>

  story_id: STY_<ULID>           # optional but recommended
  song_frame_id: SFR_<ULID>      # optional but recommended
  album_id: ALB-001              # optional
  track_id: TRK-01               # optional
  revision_id: REV_<ULID>        # optional
```

Rules:
- Keys must match exactly.
- No extra fields unless downstream schema files explicitly allow them.
- This header is copied into Registry logs when needed.

---

## 6) Filename Conventions (Save Locations)

### 6.1 Lyrics file naming
Recommended lyric filename format:
`<work_id>__<title_slug>__<version_label>.md` 

Example:
`WRK_01J2B6M3K9XK0M2V4H7D8Q1R2S__hole-where-you-were__v01.md` 

### 6.2 Directory convention (matches your "Songs/Genre/Artist" structure)
`/Songs/<Genre>/<Artist>/` 

Examples:
- `/Songs/Country/Jack-Mercer/` 
- `/Songs/Metal/<Artist>/` 

Notes:
- Directory casing is allowed for human readability.
- IDs remain canonical regardless of casing in folder names.

---

## 7) Minting Rules (How to generate IDs)

### 7.1 ULID minting (required)
When creating any ULID-based ID:
- Generate ULID at creation time (do not reuse)
- Copy it consistently across artifacts created in the same run (e.g., the same `run_id` should appear in meaning/story/frame/lyrics created in that run)

### 7.2 Stable taxonomy minting (required)
- `hook_family_id` is chosen from taxonomy or created as a new family slug.
- `scripture_packet_id` is derived from scope and remains stable.

### 7.3 Cross-machine collision avoidance
- ULID is sufficiently collision-resistant for multi-machine offline work.
- If you ever suspect a collision, treat it as a BLOCKER and re-mint the newer ID.

---

## 8) Pass/Fail Checklist

PASS if:
- [ ] All required IDs present for the artifact's gate stage (see QA gates)
- [ ] ULID formats match 26-char Base32 (no lowercase in ULID)
- [ ] Taxonomy IDs are lowercase slugs where required
- [ ] `scripture_packet_id` matches scope unit and stays stable

FAIL (BLOCKER) if:
- [ ] Missing `work_id` or `version_id` at Final Save
- [ ] Invalid prefixes or malformed ULID length
- [ ] Reusing the same `version_id` for different lyric content
- [ ] Changing an existing `scripture_packet_id` without scope change

---

## 9) Unit-Test Prompts (ID System Verification)

### Test A — Two-computer collision scenario
"Mint IDs for two runs at the same second on different machines."
Expected: Different ULIDs → no collision.

### Test B — Bad formatting
"Use `wrk_` lowercase prefix and a 20-character ULID."
Expected: FAIL (BLOCKER) — invalid format.

### Test C — Changing scripture packet ID
"Rename `SPK_psalm_23` to `SPK_psalms_23` without scope change."
Expected: FAIL (BLOCKER) — packet ID stability violation.

---

## Vetting Outcome
✅ **PASS** — Clear canonical fields, collision-safe strategy, stable taxonomy where needed, explicit header schema, and pass/fail rules. No circular dependencies.

### Dependencies
- `00-GOVERNANCE/QA-GATES.md` uses these fields to define required ID sets at Gate 2.
- `/60-REGISTRY/*` will reference these IDs but owns storage schemas.

### Next Files Impacted
- `10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md` (will embed the ID header block)
- `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md` (will embed the ID header block)
- `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md` (will embed the ID header block)
- `/60-REGISTRY/*` (will define columns/fields that store these IDs)
