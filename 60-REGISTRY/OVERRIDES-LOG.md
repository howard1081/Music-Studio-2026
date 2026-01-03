# 60-REGISTRY/OVERRIDES-LOG.md

## Contract
**Purpose:** Define the OVERRIDES-LOG schema for logging any deliberate policy override (hook reuse, scene collision, scripture reuse, etc.). Overrides are the only allowed path to proceed when a uniqueness policy fails.

**This file OWNS (authoritative):**
- OVERRIDES-LOG record schema (fields + required/optional)
- Required contents of an override (who/why/what)
- Rules for when an override is allowed vs forbidden
- Cross-reference requirements to other indexes (hook/scene/scripture/run/song)

**This file DOES NOT OWN (references-only):**
- ID formats and naming conventions (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Numeric policy windows (owned by `HOOK-INDEX.md`, `SCRIPTURE-INDEX.md`, and any scene reuse policy fields)
- Song catalog schema (owned by `SONG-INDEX.md`)
- QA gate definitions (owned by `00-GOVERNANCE/QA-GATES.md`)

---

## 1) Storage Format
Recommended:
- `60-REGISTRY/data/overrides-log.jsonl` (append-only)

---

## 2) Override Philosophy (Canonical)
Overrides are:
- rare
- explicit
- human-approved
- auditable

Default posture is: **pivot instead of override.**

---

## 3) OVERRIDES-LOG Schema (Authoritative)

### 3.1 OVERRIDE record schema
```json
{
  "record_type": "OVERRIDE",

  "override_id": "OVR-YYYYMMDD-HHMM-RAND4",
  "created_utc": "YYYY-MM-DDTHH:MMZ",

  "approved_by": "string",
  "approval_context": "string",

  "override_type": "HOOK_REUSE|SCENE_COLLISION|SCRIPTURE_REUSE|OTHER",

  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",
  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",
  "version_id": "VER-YYYYMMDD-HHMM-RAND4",

  "hook_family_id": "HKF-<slug>",
  "scripture_packet_id": "SCR-YYYYMMDD-HHMM-RAND4",
  "scene_id": "SCN-YYYYMMDD-HHMM-RAND4",
  "scene_fingerprint_hash": "string",

  "policy_failed": "string",
  "why_allowed": "string",

  "scope_notes": "string"
}
```

**Required fields:**
- `record_type`, `override_id`, `created_utc`, `approved_by`, `override_type`, `artist_id`, `genre_id`, `run_id`, `policy_failed`, `why_allowed`

**Required linkage depends on override_type:**
- `HOOK_REUSE`: `hook_family_id` required
- `SCRIPTURE_REUSE`: `scripture_packet_id` required
- `SCENE_COLLISION`: `scene_fingerprint_hash` (and ideally `scene_id`) required
- `OTHER`: must specify scope in `scope_notes`

---

### 3.2 OVERRIDE_UPDATE record schema
Used to update/correct existing override records, typically when test runs complete without artifact creation.

```json
{
  "record_type": "OVERRIDE_UPDATE",

  "override_id": "OVR-YYYYMMDD-HHMM-RAND4",
  "update_utc": "YYYY-MM-DDTHH:MMZ",
  "updated_by": "string",

  "update_type": "TEST_NO_ARTIFACT|STATUS_CHANGE|CORRECTION|OTHER",

  "work_id": "WORK-YYYYMMDD-HHMM-RAND4|VOID",
  "version_id": "VER-YYYYMMDD-HHMM-RAND4|VOID",
  "title": "string|VOID",

  "status": "test_complete_no_artifact_created|active|resolved|voided",

  "notes": "string"
}
```

**Required fields:**
- `record_type`, `override_id`, `update_utc`, `updated_by`, `update_type`, `status`, `notes`

**When to use:**
- Test/validation runs that don't produce artifacts: set `update_type: "TEST_NO_ARTIFACT"`, `work_id/version_id/title: "VOID"`
- Correcting override metadata after Final Save: include actual `work_id`, `version_id`, `title`

**Example (test run with no artifact):**
```json
{"record_type":"OVERRIDE_UPDATE","override_id":"OVR-20260103-0401-X7M8","update_utc":"2026-01-03T04:03Z","updated_by":"system","update_type":"TEST_NO_ARTIFACT","work_id":"VOID","version_id":"VOID","title":"VOID","status":"test_complete_no_artifact_created","notes":"Test run completed. No artifact generated. Related registry USE records voided."}
```

---

## 4) Required Override Content (Authoritative)
Every override MUST include:
- **Who approved:** `approved_by`
- **Why allowed:** `why_allowed` (plain language)
- **What policy failed:** `policy_failed` (e.g., "HKF reuse within 45 days for ART_x + GEN_y")
- **Scope:** lane (`artist_id` + `genre_id`) and relevant IDs
- **Run linkage:** `run_id`

Optional but recommended:
- Add `work_id` and `version_id` once known (Final Save).

---

## 5) When Overrides Are Allowed vs Forbidden

### 5.1 Allowed (examples)
- Deliberate multi-song series on same passage with different angle
- Explicitly revisiting an earlier hook family for thematic bookends
- Scene collision acceptable because setting overlaps but conflict axis differs materially

### 5.2 Forbidden (BLOCKER)
- Override requested to avoid doing the creative work ("too hard to pivot")
- Override without a human approver name
- Override that would cause near-duplicate song outcomes (exact scene fingerprint + same hook family)
- Override that bypasses hard tone bans (tone bans are not overrideable)

**Rule:**
- Tone/taboo violations are **never** overrideable.

---

## 6) Minimal Queries (Must be possible)
- "List overrides for `ART_y` + `GEN_z`"
- "Show overrides tied to run `RUN_x`"
- "Show overrides for hook family `HKF_x`"
- "Show overrides in last 90 days"

---

## 7) Pass/Fail Checklist

PASS if:
- [ ] Overrides always include approver + why + policy_failed
- [ ] Override type maps to required linkage fields
- [ ] Overrides are referenced by other indexes when a FAIL would otherwise block

FAIL (BLOCKER) if:
- [ ] Override exists with missing approver
- [ ] Override used to bypass tone bans
- [ ] Uniqueness FAIL proceeds with no override logged

---

## Vetting Outcome
✅ **PASS** — Clear override schema, enforceable requirements, and explicit "no tone override" rule.

### Dependencies
- ID formats per `00-GOVERNANCE/ID-SYSTEM.md`.
- Scene fingerprint hash concept from `60-REGISTRY/SCENE-INDEX.md`.

### Next Files Impacted
- None required. This completes the core Registry layer.
