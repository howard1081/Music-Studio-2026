# 60-REGISTRY/REGISTRY-OVERVIEW.md

## Contract
**Purpose:** Define the Registry layer: what must be tracked to prevent reuse collisions, enable search, and keep the system consistent across multiple machines and sessions.

**This file OWNS (authoritative):**
- Registry scope and responsibilities
- Required registry "tables" (files) and their purpose
- Canonical uniqueness concepts (hook family reuse windows, scene fingerprinting, scripture reuse tracking)
- What the executor MUST record at Final Save

**This file DOES NOT OWN (references-only):**
- ID formats and minting rules (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA defect definitions and gate rules (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone/taboo lists (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Artist bible rules (owned by `/20-ARTISTS/*`)
- Any code or storage engine choice (CSV/JSONL/etc.). This file defines requirements; schemas live in other registry files.

---

## 1) Registry Mission
The Registry exists to:
- Prevent accidental reuse (same hook line, same scene "fingerprint," same motif stack)
- Enable retrieval ("show me all songs for Jack Mercer, hook family X")
- Make runs auditable (what produced what, when, where it was saved)
- Keep the system consistent across machines (C1/C2) without a central server

---

## 2) Storage Philosophy (Offline-first)
- The Registry is file-based and human-readable.
- Prefer **append-only** logs where possible (JSONL recommended), with periodic index rebuilds if needed.
- The executor (Claude/Windsurf) must be able to:
  - read the registry files
  - append new records
  - reject saves that violate uniqueness policies (or require explicit override logged)

> Exact schema formats are defined in the sibling files under `/60-REGISTRY/`.

---

## 3) Required Registry Files (Authoritative list)

### 3.1 SONG-INDEX
**File:** `60-REGISTRY/SONG-INDEX.md` (schema spec)  
Tracks the canonical mapping:
- work_id → versions → filepaths
- artist_id, genre_id, scripture_packet_id, hook_family_id, scene_id
- created_utc, run_id

### 3.2 HOOK-INDEX
**File:** `60-REGISTRY/HOOK-INDEX.md` (schema spec)  
Tracks:
- hook_family_id
- canonical hook line(s) used (if stored)
- reuse window counters by artist+genre
- last_used_utc

### 3.3 SCENE-INDEX
**File:** `60-REGISTRY/SCENE-INDEX.md` (schema spec)  
Tracks:
- scene_id
- a scene fingerprint (short structured signature)
- which work/version used it
- last_used_utc

### 3.4 SCRIPTURE-INDEX
**File:** `60-REGISTRY/SCRIPTURE-INDEX.md` (schema spec)  
Tracks:
- scripture_packet_id
- scripture_reference
- reuse window by artist+genre
- last_used_utc

### 3.5 RUN-INDEX
**File:** `60-REGISTRY/RUN-INDEX.md` (schema spec)  
Tracks:
- run_id
- which packet/story/frame/work/versions were produced
- QA outcomes
- machine_id (C1/C2 label)

### 3.6 OVERRIDES-LOG
**File:** `60-REGISTRY/OVERRIDES-LOG.md` (schema spec)  
Tracks explicit "allowed collisions":
- what policy was overridden (hook reuse, scripture reuse, etc.)
- who approved (human)
- why
- scope + timestamp

---

## 4) Uniqueness Concepts (Canonical)

### 4.1 Hook family reuse window
Policy concept:
- A hook family should not be overused within the same artist+genre lane.
- The registry must support checking "how recently this hook family was used."

This file does not define the numeric window; that is set in `HOOK-INDEX.md` as policy fields.

### 4.2 Scene fingerprinting
Goal: prevent writing the "same song with different words."

A **scene fingerprint** is a compact signature that can include:
- setting archetype (parking lot / kitchen / highway / backstage)
- primary prop(s)
- primary action(s)
- dominant emotion
- turn trigger type

Exact fingerprint schema lives in `SCENE-INDEX.md`.

### 4.3 Scripture reuse window
Policy concept:
- Avoid reusing the same passage too frequently within the same lane, unless explicitly approved.
- Registry must track last-used per artist+genre.

### 4.4 "Fingerprint collisions"
Two levels:
- **Exact collision** (same fingerprint signature) → default FAIL
- **Soft collision** (shares some attributes) → allowed if hook/angle differs

Collision handling is implemented in registry schema + executor checks.

---

## 4.5) Collision Detection Rules (Authoritative)
**What records to IGNORE during uniqueness checks:**

### Rule 1: Ignore VOID records (exact matching)
- Any record where `record_type` ends with `_VOID` must be **excluded** from collision detection
- Examples: `HOOK_USE_VOID`, `SCRIPTURE_USE_VOID`, `SCENE_VOID`
- Reason: These records mark test runs or corrections; they do not represent actual catalog entries

### Rule 2: Ignore TEST records (optional)
- **Optional:** Any record where `record_type` starts with `TEST_` may be **excluded** from collision detection
- Examples: `TEST_HOOK_USE`, `TEST_SCRIPTURE_USE`
- Reason: Allows explicit test-only record types that are excluded from catalog by design

### Void Semantics (Authoritative)
A USE record is only considered **ACTIVE** if no later VOID record cancels it.

**For HOOK_USE:**
- A `HOOK_USE` record is **ACTIVE** unless a later `HOOK_USE_VOID` exists with:
  - Matching `hook_family_id`
  - `target_record_timestamp` matching the USE record's `created_utc` or `used_utc`

**For SCRIPTURE_USE:**
- A `SCRIPTURE_USE` record is **ACTIVE** unless a later `SCRIPTURE_USE_VOID` exists with:
  - Matching `scripture_packet_id` or `scripture_reference`
  - `target_record_timestamp` matching the USE record's `created_utc` or `used_utc`

**For SCENE:**
- A `SCENE` record is **ACTIVE** unless a later `SCENE_VOID` exists with:
  - Matching `scene_id` or `scene_fingerprint_hash`
  - `target_record_timestamp` matching the SCENE record's `created_utc`

### Implementation guidance
When checking for hook/scene/scripture collisions:
```
FOR EACH record in registry:
  IF record_type ends with "_VOID": SKIP (this is a void marker, not a use)
  IF record_type starts with "TEST_": SKIP (optional test record type)
  
  IF record is HOOK_USE:
    CHECK: Does a later HOOK_USE_VOID exist with matching hook_family_id + target_record_timestamp?
    IF YES: SKIP (this use has been voided)
    ELSE: COUNT as active use
  
  IF record is SCRIPTURE_USE:
    CHECK: Does a later SCRIPTURE_USE_VOID exist with matching scripture_packet_id + target_record_timestamp?
    IF YES: SKIP (this use has been voided)
    ELSE: COUNT as active use
  
  IF record is SCENE:
    CHECK: Does a later SCENE_VOID exist with matching scene_id + target_record_timestamp?
    IF YES: SKIP (this scene has been voided)
    ELSE: COUNT as active use
```

**Examples of records that DO count:**
- `record_type: "HOOK_USE"` with no matching VOID record
- `record_type: "SCRIPTURE_USE"` with no matching VOID record
- `record_type: "SCENE"` with no matching VOID record

**Examples of records that DO NOT count:**
- `record_type: "HOOK_USE_VOID"` (this is a void marker)
- `record_type: "HOOK_USE"` followed by `HOOK_USE_VOID` with matching `hook_family_id` + `target_record_timestamp`
- `record_type: "TEST_HOOK_USE"` (optional test record type)
- `record_type: "OVERRIDE_UPDATE"` (not a USE record)

---

### Self-Test Narrative (Validation)
**Scenario:** Registry contains:
1. `HOOK_USE` record at `2026-01-03T04:01Z` with `hook_family_id: "HKF-near-in-the-wreckage"`
2. `HOOK_USE_VOID` record at `2026-01-03T04:03Z` with `hook_family_id: "HKF-near-in-the-wreckage"` and `target_record_timestamp: "2026-01-03T04:01Z"`

**Collision checker behavior:**
- Encounter first record: `HOOK_USE` at 04:01Z
- Check for later VOID: Found `HOOK_USE_VOID` at 04:03Z with matching `hook_family_id` and `target_record_timestamp`
- **Result:** Treat this hook as **NOT ACTIVE** (voided)
- **Collision check outcome:** Hook family `HKF-near-in-the-wreckage` has zero active uses

**Expected:** Collision checker correctly ignores the voided HOOK_USE record and does not report a collision.

---

## 5) What MUST be recorded at Final Save
At the moment a lyrics file is saved to disk (Gate 2 PASS), the executor MUST append to the registry layer:
- run_id
- work_id
- version_id + version_label
- artist_id + genre_id
- scripture_packet_id + reference
- hook_family_id
- scene_id + fingerprint
- absolute filepath to the lyrics file
- created_utc
- QA Gate 2 result (PASS)
- uniqueness preflight results (PASS/FAIL/NOT RUN)

**TBD Value Rule (Authoritative):**
- **No TBD values in ACTIVE records** (hard requirement)
- ACTIVE records = USE records without matching VOID records (see §4.5)
- Historical TBD values from voided test runs are allowed (append-only integrity preserved)
- Validation must check ACTIVE records only, not entire registry history

---

## 6) Query Requirements (minimum viable)
The Registry must support answering:
- "List all songs by artist+genre"
- "Show all versions of work_id"
- "When was hook family HKF_x last used for ART_y + GEN_z?"
- "Has this scene fingerprint been used before?"
- "What scripture packets were used recently for this lane?"
- "Show all outputs for run_id RUN_..."

How queries are implemented is tooling-dependent; registry schemas must make the data available.

---

## 7) Registry Validation Logic (Authoritative)

### 7.1 TBD Validation
**Rule:** No TBD values in ACTIVE records.

**Validator logic:**
```
ACTIVE_TBD_COUNT = 0
HISTORICAL_TBD_COUNT = 0

FOR EACH record in registry:
  IF record contains "TBD" value:
    HISTORICAL_TBD_COUNT++
    
    # Check if record is ACTIVE
    IF record_type ends with "_VOID": SKIP (not a USE record)
    IF record_type is "OVERRIDE" or "OVERRIDE_UPDATE": SKIP (informational, not a USE)
    
    IF record is HOOK_USE:
      # Field-anchored matching (no substring false positives)
      hookId = extract hook_family_id from record
      usedUtc = extract used_utc from record
      
      voidExists = FALSE
      FOR EACH later line in registry:
        IF line contains ALL of:
          "record_type":"HOOK_USE_VOID"
          "hook_family_id":"<hookId>" (exact match)
          "target_record_timestamp":"<usedUtc>" (exact match)
        THEN:
          voidExists = TRUE
          BREAK
      
      IF voidExists: SKIP (INACTIVE due to VOID)
      ELSE: ACTIVE_TBD_COUNT++ (FAIL)
    
    IF record is SCRIPTURE_USE:
      # Field-anchored matching
      packetId = extract scripture_packet_id from record
      usedUtc = extract used_utc from record
      
      voidExists = FALSE
      FOR EACH later line in registry:
        IF line contains ALL of:
          "record_type":"SCRIPTURE_USE_VOID"
          "scripture_packet_id":"<packetId>" (exact match)
          "target_record_timestamp":"<usedUtc>" (exact match)
        THEN:
          voidExists = TRUE
          BREAK
      
      IF voidExists: SKIP (INACTIVE due to VOID)
      ELSE: ACTIVE_TBD_COUNT++ (FAIL)
    
    IF record is SCENE:
      # Field-anchored matching
      sceneId = extract scene_id from record
      createdUtc = extract created_utc from record
      
      voidExists = FALSE
      FOR EACH later line in registry:
        IF line contains ALL of:
          "record_type":"SCENE_VOID"
          "scene_id":"<sceneId>" (exact match)
          "target_record_timestamp":"<createdUtc>" (exact match)
        THEN:
          voidExists = TRUE
          BREAK
      
      IF voidExists: SKIP (INACTIVE due to VOID)
      ELSE: ACTIVE_TBD_COUNT++ (FAIL)
    
    IF record is VERSION (song-index):
      # VERSION records are always ACTIVE unless entire work is voided
      ACTIVE_TBD_COUNT++ (FAIL)

RESULT:
- PASS if: ACTIVE_TBD_COUNT == 0
- INFO if: HISTORICAL_TBD_COUNT > 0 (voided test runs, expected)
- FAIL if: ACTIVE_TBD_COUNT > 0 (TBD in active catalog entries)
```

**ACTIVE record definition:**
- `record_type` does NOT end with `_VOID`
- `record_type` is NOT `OVERRIDE` or `OVERRIDE_UPDATE`
- For USE records: No matching VOID record exists with correct `target_record_timestamp`
- For VERSION records: Always active (unless work-level void, not yet implemented)

**Implementation guidance (field-anchored matching):**

Preferred approach: Parse JSONL lines
```powershell
# For each line with TBD
$record = $line | ConvertFrom-Json
if ($record.record_type -eq "HOOK_USE") {
  $hookId = $record.hook_family_id
  $usedUtc = $record.used_utc
  
  # Check for matching VOID
  $voidExists = $allLines | ForEach-Object {
    $void = $_ | ConvertFrom-Json
    $void.record_type -eq "HOOK_USE_VOID" -and 
    $void.hook_family_id -eq $hookId -and 
    $void.target_record_timestamp -eq $usedUtc
  } | Where-Object { $_ } | Select-Object -First 1
  
  if (-not $voidExists) { $activeTBD++ }
}
```

Alternative: Anchored regex (if JSON parsing unavailable)
```powershell
# Extract fields with anchored patterns
if ($line -match '"hook_family_id":"([^"]+)"') { $hookId = $matches[1] }
if ($line -match '"used_utc":"([^"]+)"') { $usedUtc = $matches[1] }

# Check VOID with ALL three anchored patterns
$voidPattern = '"record_type":"HOOK_USE_VOID".*"hook_family_id":"' + [regex]::Escape($hookId) + '".*"target_record_timestamp":"' + [regex]::Escape($usedUtc) + '"'
$voidExists = $allContent -match $voidPattern
```

**Critical:** Always use exact field value matching, never substring search of IDs/timestamps.

---

## 8) Pass/Fail Checklist

PASS if:
- [ ] All required registry files exist (or have stubs) under `/60-REGISTRY/` 
- [ ] Final Save event records all fields in §5
- [ ] Overrides are logged in OVERRIDES-LOG when used
- [ ] Registry remains readable/editable on two machines without conflict
- [ ] **ACTIVE_TBD_COUNT == 0** (no TBD in active records)

FAIL (BLOCKER) if:
- [ ] Final Save occurs without recording to registry
- [ ] Uniqueness checks cannot be performed due to missing registry data
- [ ] **ACTIVE_TBD_COUNT > 0** (TBD values in active catalog entries)

INFO (not a failure):
- [ ] HISTORICAL_TBD_COUNT > 0 (voided test runs with TBD values present)
- [ ] Override occurs without override logging

---

## Vetting Outcome
✅ **PASS** — Clear responsibilities, file list, uniqueness concepts, and mandatory Final Save recording requirements. No schema conflicts.

### Dependencies
- ID formats reference `00-GOVERNANCE/ID-SYSTEM.md`.
- QA definitions reference `00-GOVERNANCE/QA-GATES.md`.

### Next Files Impacted
- `60-REGISTRY/SONG-INDEX.md` 
- `60-REGISTRY/HOOK-INDEX.md` 
- `60-REGISTRY/SCENE-INDEX.md` 
- `60-REGISTRY/SCRIPTURE-INDEX.md` 
- `60-REGISTRY/RUN-INDEX.md` 
- `60-REGISTRY/OVERRIDES-LOG.md`
