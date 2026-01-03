# 60-REGISTRY/HOOK-INDEX.md

## Contract
**Purpose:** Define the HOOK-INDEX schema and policy fields used to prevent hook-family overuse and (optionally) track canonical hook lines. HOOK-INDEX answers: "Have we leaned on this hook family too recently in this lane?"

**This file OWNS (authoritative):**
- HOOK-INDEX record schema (fields + required/optional)
- Hook-family reuse window policy fields (how reuse is judged)
- Append/update rules
- Collision handling rules (what happens on reuse window failure)

**This file DOES NOT OWN (references-only):**
- ID formats and minting (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Song catalog mapping (owned by `60-REGISTRY/SONG-INDEX.md`)
- Scene fingerprint schema (owned by `60-REGISTRY/SCENE-INDEX.md`)
- Scripture reuse window schema (owned by `60-REGISTRY/SCRIPTURE-INDEX.md`)
- Tone bans and phrase list (owned by `00-GOVERNANCE/TONE-TABOOS.md`)

---

## 1) Storage Format
Recommended:
- `60-REGISTRY/data/hook-index.jsonl` (append-only)

Schema is defined independent of storage engine, but JSONL is assumed.

---

## 2) Hook Families (Concept-level)
A `hook_family_id` groups *conceptual* hook angles, not exact wording.
Example: `HKF_empty-seat` could generate many distinct chorus lines.

Optional:
- Track exact hook lines used in versions for extra collision prevention.

---

## 3) HOOK-INDEX Schema (Authoritative)

### 3.1 HOOK-FAMILY record schema
```json
{
  "record_type": "HOOK_FAMILY",

  "hook_family_id": "HKF-<slug>",
  "hook_family_name": "string",
  "hook_family_description": "string",

  "default_reuse_window_songs": 3,
  "default_reuse_window_days": 45,

  "created_utc": "YYYY-MM-DDTHH:MMZ",
  "last_used_utc": "YYYY-MM-DDTHH:MMZ",

  "notes": "string",
  "tags": ["string"]
}
```

**Required fields:**
- `record_type`, `hook_family_id`, `created_utc`

**Policy fields:**
- `default_reuse_window_songs`: minimum number of intervening songs required before reusing this family in the same lane
- `default_reuse_window_days`: minimum days before reuse in the same lane
- Either policy can be used; executor may enforce both.

### 3.2 HOOK-USE record schema (lane-specific usage)
Tracks actual use by artist+genre.

```json
{
  "record_type": "HOOK_USE",

  "hook_family_id": "HKF-<slug>",
  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",
  "version_id": "VER-YYYYMMDD-HHMM-RAND4",
  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",

  "hook_line": "string",
  "hook_line_hash": "string",

  "created_utc": "YYYY-MM-DDTHH:MMZ",

  "enforced_window_songs": 3,
  "enforced_window_days": 45,

  "reuse_check_result": "PASS|FAIL|NOT_RUN",

  "override_id": "OVR-YYYYMMDD-HHMM-RAND4",
  "notes": "string"
}
```

**Required fields:**
- `record_type`, `hook_family_id`, `artist_id`, `genre_id`, `work_id`, `version_id`, `run_id`, `created_utc`

**Optional but recommended:**
- `hook_line` and `hook_line_hash` (see §4)

**Rules:**
- If `reuse_check_result` is `FAIL`, then `override_id` must be present (or the save must not proceed).
- `enforced_window_*` records what policy was actually used at that time.

---

### 3.3 HOOK_USE_VOID record schema
Used to void/cancel prior HOOK_USE records when test runs complete without artifact creation or when corrections are needed.

```json
{
  "record_type": "HOOK_USE_VOID",

  "hook_family_id": "HKF-<slug>",
  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",
  "override_id": "OVR-YYYYMMDD-HHMM-RAND4",

  "voided_utc": "YYYY-MM-DDTHH:MMZ",
  "target_record_timestamp": "YYYY-MM-DDTHH:MMZ",

  "reason": "string",
  "status": "VOIDED_TEST_ONLY|VOIDED_CORRECTION|VOIDED_OTHER",

  "notes": "string"
}
```

**Required fields:**
- `record_type`, `hook_family_id`, `run_id`, `voided_utc`, `target_record_timestamp`, `reason`, `status`

**When to use:**
- Test/validation runs that don't produce artifacts: Mark prior HOOK_USE with TBD values as voided
- Data corrections: Void incorrect entries and append corrected records

**Collision detection rule:**
- Records with `record_type` ending in `_VOID` must be **ignored** in uniqueness checks
- Records with `status` containing `VOIDED` must be **ignored** in uniqueness checks

**Example (test run with no artifact):**
```json
{"record_type":"HOOK_USE_VOID","hook_family_id":"HKF-near-in-the-wreckage","run_id":"RUN-20260103-0358-T2X9","override_id":"OVR-20260103-0401-X7M8","voided_utc":"2026-01-03T04:03Z","target_record_timestamp":"2026-01-03T04:01Z","reason":"Test run completed without artifact creation. Prior HOOK_USE record with TBD values is voided.","status":"VOIDED_TEST_ONLY","notes":"No catalog entry exists."}
```

---

## 4) Hook Line Hashing (Optional but Recommended)
If hook lines are stored, also store a hash to detect exact reuse even if punctuation differs.

`hook_line_hash = lowercase(trim(hook_line))` hashed (sha1/sha256, tooling-dependent)

This file does not mandate a specific hashing algorithm; store the algorithm choice in tooling docs if needed.

---

## 5) Reuse Window Evaluation (Authoritative concept)
A reuse window fails if:
- The hook family was used in the last N songs for the same artist+genre, OR
- The hook family was used within the last D days for the same artist+genre

Exact evaluation method is implemented by tooling, but the schema must support both checks.

---

## 6) Collision Handling Rules (Executor behavior)

### 6.1 If reuse check FAILs
Default required action:
- Mark **PIVOT REQUIRED** at Song Frame stage (choose a new hook family), OR
- Log an override in `OVERRIDES-LOG` and link its `override_id`.

### 6.2 Overrides
Overrides must include:
- human approver
- why reuse is acceptable
- scope (which hook family + which lane)
- timestamp

Overrides are rare. Default is avoid reuse.

---

## 7) Minimal Queries (Must be possible)
- "When was `HKF_x` last used for `ART_y` + `GEN_z`?"
- "List the last N uses of hook families for a lane"
- "Has this exact hook line been used before?" (if storing `hook_line_hash`)

---

## 8) Pass/Fail Checklist

PASS if:
- [ ] Schema supports lane-specific reuse checks
- [ ] Policy fields exist and can be overridden per use
- [ ] FAIL requires override logging or pivot

FAIL (BLOCKER) if:
- [ ] Cannot determine last-used for a lane
- [ ] Hook reuse cannot be evaluated from stored records

---

## Vetting Outcome
✅ **PASS** — Clear reuse policy fields, lane-specific usage records, optional line-hash support, and override discipline.

### Dependencies
- ID formats per `00-GOVERNANCE/ID-SYSTEM.md`.
- Override schema referenced in `60-REGISTRY/OVERRIDES-LOG.md`.

### Next Files Impacted
- `60-REGISTRY/SCENE-INDEX.md`
- `60-REGISTRY/SCRIPTURE-INDEX.md`
- `60-REGISTRY/RUN-INDEX.md`
- `60-REGISTRY/OVERRIDES-LOG.md`
