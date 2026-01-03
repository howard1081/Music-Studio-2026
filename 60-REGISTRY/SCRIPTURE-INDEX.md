# 60-REGISTRY/SCRIPTURE-INDEX.md

## Contract
**Purpose:** Define the SCRIPTURE-INDEX schema and reuse-window policy fields used to prevent over-reliance on the same passages within the same artist+genre lane. SCRIPTURE-INDEX answers: "Have we used this Scripture packet too recently here?"

**This file OWNS (authoritative):**
- SCRIPTURE-INDEX record schema (fields + required/optional)
- Scripture reuse window policy fields (songs/days)
- Append/update rules
- Collision handling rules (pivot vs override)

**This file DOES NOT OWN (references-only):**
- ID formats and minting (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Song catalog mapping (owned by `60-REGISTRY/SONG-INDEX.md`)
- Hook reuse policy (owned by `60-REGISTRY/HOOK-INDEX.md`)
- Scene fingerprint schema (owned by `60-REGISTRY/SCENE-INDEX.md`)
- Tone enforcement (owned by `00-GOVERNANCE/TONE-TABOOS.md`)

---

## 1) Storage Format
Recommended:
- `60-REGISTRY/data/scripture-index.jsonl` (append-only)

---

## 2) Reuse Philosophy (Canonical)
Scripture is a "meaning backbone." Reusing the same passage too often causes:
- repetitiveness in themes and imagery
- predictable turns
- diminished creative range

Reuse is allowed, but should be intentional and trackable.

---

## 3) SCRIPTURE-INDEX Schema (Authoritative)

### 3.1 SCRIPTURE-PACKET record schema
```json
{
  "record_type": "SCRIPTURE_PACKET",

  "scripture_packet_id": "SCR-YYYYMMDD-HHMM-RAND4",
  "scripture_reference": "string",
  "primary_theme_tags": ["string"],

  "default_reuse_window_songs": 4,
  "default_reuse_window_days": 60,

  "created_utc": "YYYY-MM-DDTHH:MMZ",
  "last_used_utc": "YYYY-MM-DDTHH:MMZ",

  "notes": "string"
}
```

**Required fields:**
- `record_type`, `scripture_packet_id`, `scripture_reference`, `created_utc`

### 3.2 SCRIPTURE-USE record schema (lane-specific usage)
Tracks actual use by artist+genre.

```json
{
  "record_type": "SCRIPTURE_USE",

  "scripture_packet_id": "SCR-YYYYMMDD-HHMM-RAND4",
  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",
  "version_id": "VER-YYYYMMDD-HHMM-RAND4",
  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",

  "created_utc": "YYYY-MM-DDTHH:MMZ",

  "enforced_window_songs": 4,
  "enforced_window_days": 60,

  "reuse_check_result": "PASS|FAIL|NOT_RUN",

  "override_id": "OVR-YYYYMMDD-HHMM-RAND4",
  "notes": "string"
}
```

**Required fields:**
- `record_type`, `scripture_packet_id`, `artist_id`, `genre_id`, `work_id`, `version_id`, `run_id`, `created_utc`

**Rules:**
- If `reuse_check_result` is `FAIL`, then `override_id` must be present (or the save must not proceed).
- `enforced_window_*` records what policy was used at the time.

---

### 3.3 SCRIPTURE_USE_VOID record schema
Used to void/cancel prior SCRIPTURE_USE records when test runs complete without artifact creation or when corrections are needed.

```json
{
  "record_type": "SCRIPTURE_USE_VOID",

  "scripture_packet_id": "SCR-YYYYMMDD-HHMM-RAND4",
  "scripture_reference": "string",
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
- `record_type`, `scripture_packet_id`, `scripture_reference`, `run_id`, `voided_utc`, `target_record_timestamp`, `reason`, `status`

**When to use:**
- Test/validation runs that don't produce artifacts: Mark prior SCRIPTURE_USE with TBD values as voided
- Data corrections: Void incorrect entries and append corrected records

**Collision detection rule:**
- Records with `record_type` ending in `_VOID` must be **ignored** in uniqueness checks
- Records with `status` containing `VOIDED` must be **ignored** in uniqueness checks

**Example (test run with no artifact):**
```json
{"record_type":"SCRIPTURE_USE_VOID","scripture_packet_id":"SCR-20260103-0341-K3P9","scripture_reference":"Psalm 34:18","run_id":"RUN-20260103-0358-T2X9","override_id":"OVR-20260103-0401-X7M8","voided_utc":"2026-01-03T04:03Z","target_record_timestamp":"2026-01-03T04:01Z","reason":"Test run completed without artifact creation. Prior SCRIPTURE_USE record with TBD values is voided.","status":"VOIDED_TEST_ONLY","notes":"No catalog entry exists."}
```

---

## 4) Reuse Window Evaluation (Authoritative concept)
A reuse window fails if:
- The packet was used in the last N songs for the same artist+genre, OR
- The packet was used within the last D days for the same artist+genre

Tooling may enforce either or both. Schema supports both.

---

## 5) Collision Handling Rules (Executor behavior)

### 5.1 If reuse check FAILs
Default action:
- **PIVOT REQUIRED** (choose a different `scripture_packet_id`), OR
- Log an override in `OVERRIDES-LOG` and link `override_id`.

### 5.2 Overrides
Overrides must include:
- human approver
- why reuse is acceptable (e.g., deliberate series, contrasting angle)
- timestamp + scope

---

## 6) Minimal Queries (Must be possible)
- "When was `SCR_x` last used for `ART_y` + `GEN_z`?"
- "List last N scripture packets used in a lane"
- "Show all lanes that used `SCR_x`"

---

## 7) Pass/Fail Checklist

PASS if:
- [ ] Schema supports lane-specific reuse checks
- [ ] Policy fields exist and can be overridden per use
- [ ] FAIL requires pivot or explicit override logging

FAIL (BLOCKER) if:
- [ ] Cannot determine last-used for a lane
- [ ] Scripture reuse cannot be evaluated from stored records

---

## Vetting Outcome
✅ **PASS** — Clean reuse policy fields, lane-specific usage records, and explicit pivot/override behavior.

### Dependencies
- ID formats per `00-GOVERNANCE/ID-SYSTEM.md`.
- Override schema referenced in `60-REGISTRY/OVERRIDES-LOG.md`.

### Next Files Impacted
- `60-REGISTRY/RUN-INDEX.md`
- `60-REGISTRY/OVERRIDES-LOG.md`
