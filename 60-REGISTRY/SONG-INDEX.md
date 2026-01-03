# 60-REGISTRY/SONG-INDEX.md

## Contract
**Purpose:** Define the canonical SONG-INDEX schema and usage rules. SONG-INDEX is the primary lookup table for "what exists" in the catalog: works, versions, lanes, scripture packets, hook families, scenes, and where files live on disk.

**This file OWNS (authoritative):**
- SONG-INDEX record schema (fields + required/optional)
- Append/update rules (how records are added over time)
- Minimal query patterns supported by the schema
- Field validation rules (format + allowed values where applicable)

**This file DOES NOT OWN (references-only):**
- ID minting formats (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Uniqueness policy rules (owned by `HOOK-INDEX.md`, `SCENE-INDEX.md`, `SCRIPTURE-INDEX.md`)
- Tone enforcement (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- QA gate definitions (owned by `00-GOVERNANCE/QA-GATES.md`)

---

## 1) Storage Format Decision (Schema-first)
The schema is defined independent of storage engine. Recommended storage formats:
- **JSONL** (append-only, one record per line)
- **CSV** (simple but weaker for nested fields)

This schema assumes JSONL. If CSV is used, flatten arrays to pipe-delimited strings.

---

## 2) File Location
Recommended path:
- `60-REGISTRY/data/song-index.jsonl` 

If you prefer to keep only Markdown in repo, you may store records under:
- `60-REGISTRY/data/song-index.md` (append-only blocks)

**This file defines schema; it does not create the data file.**

---

## 3) Record Types
SONG-INDEX supports two record types:

### 3.1 WORK record (stable identity)
Tracks the "song concept" across versions.

### 3.2 VERSION record (each saved lyrical state)
Tracks each saved lyrics file version, including QA outcomes and filepath.

Rule:
- Every VERSION record must reference an existing WORK record by `work_id`.
- A WORK may exist with zero versions (concept stage), but once Final Save happens, VERSION records must be added.

---

## 4) SONG-INDEX Schema (Authoritative)

### 4.1 WORK record schema
```json
{
  "record_type": "WORK",
  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",
  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "title_current": "string",
  "title_slug_current": "string",

  "hook_family_id": "HKF-<slug>",
  "scripture_packet_id_primary": "SCR-YYYYMMDD-HHMM-RAND4",
  "scripture_reference_primary": "string",

  "anchor_scene_id": "SCN-YYYYMMDD-HHMM-RAND4",

  "created_utc": "YYYY-MM-DDTHH:MMZ",
  "last_updated_utc": "YYYY-MM-DDTHH:MMZ",

  "status": "concept|draft|active|retired",

  "tags": ["string"],
  "notes": "string"
}
```

**Required fields:**
- `record_type`, `work_id`, `artist_id`, `genre_id`, `created_utc`, `status`

**Recommended required once active:**
- `hook_family_id`, `scripture_packet_id_primary`, `anchor_scene_id`, `title_current`

### 4.2 VERSION record schema
```json
{
  "record_type": "VERSION",
  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",

  "version_id": "VER-YYYYMMDD-HHMM-RAND4",
  "version_label": "v01",

  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",
  "revision_id": "REV-YYYYMMDD-HHMM-RAND4",

  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "title": "string",
  "title_slug": "string",

  "hook_family_id": "HKF-<slug>",
  "scripture_packet_id": "SCR-YYYYMMDD-HHMM-RAND4",
  "scripture_reference": "string",

  "scene_id": "SCN-YYYYMMDD-HHMM-RAND4",

  "story_id": "SF-YYYYMMDD-HHMM-RAND4",
  "song_frame_id": "SFR-YYYYMMDD-HHMM-RAND4",

  "qa_gate1": "PASS|PASS_WITH_MINOR_FIXES|REWRITE_REQUIRED|PIVOT_REQUIRED|FAIL",
  "qa_gate2": "PASS|FAIL",
  "qa_gate3": "PASS|PASS_WITH_MINOR_FIXES|REWRITE_REQUIRED|FAIL",

  "uniqueness_hook": "PASS|FAIL|NOT_RUN",
  "uniqueness_scene": "PASS|FAIL|NOT_RUN",
  "uniqueness_scripture": "PASS|FAIL|NOT_RUN",

  "saved_filepath_abs": "string",
  "saved_filename": "string",

  "created_utc": "YYYY-MM-DDTHH:MMZ",

  "notes": "string"
}
```

**Required fields:**
- `record_type`, `work_id`, `version_id`, `version_label`, `run_id`, `artist_id`, `genre_id`, `hook_family_id`, `scripture_packet_id`, `scene_id`, `saved_filepath_abs`, `created_utc`, `qa_gate2`

**Rule:**
- `qa_gate2` must be `PASS` for any record that points to an actual saved lyrics file.
- If `qa_gate2` is `FAIL`, `saved_filepath_abs` must be empty or omitted.

---

## 5) Validation Rules (Authoritative)

### 5.1 ID formats
All IDs must match `ID-SYSTEM.md` patterns.

### 5.2 Allowed enums
- `WORK.status`: `concept | draft | active | retired`
- `VERSION.qa_*`: only the strings listed in schema

### 5.3 Filepath rules
- `saved_filepath_abs` must be an absolute OS path (Windows or POSIX).
- The path must point under the repo's `/Songs/` directory in practice, but the registry stores absolute for convenience.

### 5.4 Title slug rules
- lowercase
- hyphen-separated
- no punctuation other than hyphen

---

## 6) Append / Update Rules

### 6.1 Append-only discipline
Recommended:
- Append VERSION records only (never edit existing lines).
- WORK records may be updated by appending a newer WORK record with same `work_id` and later `last_updated_utc`.

If storage engine cannot support multiple WORK records with same ID:
- Maintain the latest WORK record only, but keep a backup log.

### 6.2 Lifecycle
- Create WORK record at concept start.
- Append VERSION record on each Gate 2 PASS save.
- Update WORK record when `title_current` changes or work status changes.

---

## 7) Minimal Query Patterns (Must be possible)
- "All versions for work_id" → filter VERSION where `work_id` matches.
- "All works for artist+genre" → filter WORK where `artist_id`+`genre_id` match.
- "Latest version for work_id" → max `created_utc` on VERSION.
- "Where is the file for version_id" → find VERSION by `version_id`, read `saved_filepath_abs`.

---

## 8) Pass/Fail Checklist

PASS if:
- [ ] Schema fields align with templates (Run Log + Lyrics Save header)
- [ ] Required fields are sufficient for retrieval + audits
- [ ] Append/update rules prevent silent overwrites

FAIL (BLOCKER) if:
- [ ] VERSION records cannot point to a filepath
- [ ] work/version linkage cannot be reconstructed
- [ ] Required IDs are missing or ambiguous

---

## Vetting Outcome
✅ **PASS** — Schema is aligned to templates, supports append-only logs, supports core queries, and avoids redefining ID systems.

### Dependencies
- ID patterns from `00-GOVERNANCE/ID-SYSTEM.md`.
- QA result terms from `00-GOVERNANCE/QA-GATES.md`.

### Next Files Impacted
- `60-REGISTRY/HOOK-INDEX.md`
- `60-REGISTRY/SCENE-INDEX.md`
- `60-REGISTRY/SCRIPTURE-INDEX.md`
- `60-REGISTRY/RUN-INDEX.md`
- `60-REGISTRY/OVERRIDES-LOG.md`
