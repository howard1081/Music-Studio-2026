# 60-REGISTRY/RUN-INDEX.md

## Contract
**Purpose:** Define the RUN-INDEX schema used to track generation runs (inputs → outputs), QA outcomes, and machine context (C1/C2). RUN-INDEX answers: "What happened in run RUN_x and what artifacts did it produce?"

**This file OWNS (authoritative):**
- RUN-INDEX record schema (fields + required/optional)
- Append rules (one run = one record, optionally augmented)
- Minimal queries supported (by run_id, by lane, by date)
- Cross-referencing rules to SONG-INDEX and the on-disk Run Log

**This file DOES NOT OWN (references-only):**
- ID formats and naming conventions (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Song catalog schema (owned by `60-REGISTRY/SONG-INDEX.md`)
- Hook/scene/scripture policies (owned by their respective indexes)
- QA gate definitions (owned by `00-GOVERNANCE/QA-GATES.md`)

---

## 1) Storage Format
Recommended:
- `60-REGISTRY/data/run-index.jsonl` (append-only)

---

## 2) RUN-INDEX Schema (Authoritative)

### 2.1 RUN record schema
```json
{
  "record_type": "RUN",

  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",
  "created_utc": "YYYY-MM-DDTHH:MMZ",

  "created_by": "human|gpt|windsurf|claude",
  "machine_id": "C1|C2|other",

  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "scripture_packet_id": "SCR-YYYYMMDD-HHMM-RAND4",
  "story_id": "SF-YYYYMMDD-HHMM-RAND4",
  "song_frame_id": "SFR-YYYYMMDD-HHMM-RAND4",

  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",
  "version_ids": ["VER-YYYYMMDD-HHMM-RAND4"],

  "qa_gate0": "PASS|REWRITE_REQUIRED|PIVOT_REQUIRED|FAIL",
  "qa_gate1": "PASS|PASS_WITH_MINOR_FIXES|REWRITE_REQUIRED|PIVOT_REQUIRED|FAIL",
  "qa_gate2": "PASS|FAIL",
  "qa_gate3": "PASS|PASS_WITH_MINOR_FIXES|REWRITE_REQUIRED|FAIL",

  "uniqueness_hook": "PASS|FAIL|NOT_RUN",
  "uniqueness_scene": "PASS|FAIL|NOT_RUN",
  "uniqueness_scripture": "PASS|FAIL|NOT_RUN",

  "run_log_filepath_abs": "string",

  "notes": "string"
}
```

**Required fields:**
- `record_type`, `run_id`, `created_utc`, `created_by`, `machine_id`, `artist_id`, `genre_id`, `qa_gate2`

**Recommended required at Final Save:**
- `scripture_packet_id`, `work_id`, `version_ids`, `run_log_filepath_abs`

**Rules:**
- If `qa_gate2` is `PASS`, then `work_id` and at least one `version_id` should be present.
- If any uniqueness check is `FAIL`, `qa_gate2` should not be `PASS` unless an override was logged (see `OVERRIDES-LOG`).

---

## 3) Append / Update Rules

### 3.1 Append-only
Append one RUN record per `run_id`.

If additional details become known later (e.g., a second `version_id`), append a newer RUN record with same `run_id` and later `created_utc` or add `last_updated_utc` if your tooling supports it.

### 3.2 Source of truth
The full narrative details live in the on-disk Run Log file (see `50-GENERATION/RUN-LOG-TEMPLATE.md`).

RUN-INDEX is an index layer for fast lookup.

---

## 4) Minimal Queries (Must be possible)
- "Show run record for `RUN_x`"
- "List runs for `ART_y` + `GEN_z` in date range"
- "Find runs that failed uniqueness checks"
- "Find latest successful run for `ART_y` + `GEN_z`"

---

## 5) Pass/Fail Checklist

PASS if:
- [ ] RUN record links to lane, packet, and outputs
- [ ] QA outcomes are stored as enums
- [ ] Run Log absolute path is stored at Final Save

FAIL (BLOCKER) if:
- [ ] `run_id` cannot be linked to outputs
- [ ] `qa_gate2` PASS with no work/version IDs

---

## Vetting Outcome
✅ **PASS** — Schema aligns to Run Log template, supports two-machine context, and preserves append-only discipline.

### Dependencies
- ID formats per `00-GOVERNANCE/ID-SYSTEM.md`.
- QA enums per `00-GOVERNANCE/QA-GATES.md`.
- Override linkage concept from `60-REGISTRY/OVERRIDES-LOG.md`.

### Next Files Impacted
- `60-REGISTRY/OVERRIDES-LOG.md`
