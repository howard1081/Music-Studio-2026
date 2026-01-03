# 80-PLAYBOOKS/PIPELINE-EXECUTION.md

## Contract
**Purpose:** Define the end-to-end execution procedure for generating and saving a song using this repo: Scripture Packet → Story Forge → Song Frame → Lyrics Draft → Final Save → Registry Updates. This is the operator playbook for Windsurf/Claude.

**This file OWNS (authoritative):**
- The step-by-step run procedure and required artifacts
- When to stop, rewrite, pivot, or abandon
- What gets written to disk and when
- Required registry writes at Gate 2 (Final Save)

**This file DOES NOT OWN (references-only):**
- Templates (owned by `/10-*`, `/30-*`, `/40-*`, `/50-*`, `/70-*`)
- Artist rules (owned by `/20-ARTISTS/*` and Persona Bible docs)
- ID formats (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA stage gates (owned by `00-GOVERNANCE/QA-GATES.md`)
- Registry schemas (owned by `/60-REGISTRY/*`)

---

## 0) Preconditions (Must be true before running)
- Repo exists locally at a known path.
- Artist wrapper exists for the target lane (e.g., `20-ARTISTS/ART_jack-mercer.md`).
- Templates exist:
  - `10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md` 
  - `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md` 
  - `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md` 
  - `50-GENERATION/RUN-LOG-TEMPLATE.md` 
  - `70-OUTPUT/LYRICS-SAVE-TEMPLATE.md` 
- Registry files exist (schema specs). Data files may be empty on day one.
- Operator has chosen:
  - **artist_id**
  - **genre_id**
  - **scripture_reference** (or a target theme to select scripture)

---

## 1) Run Start (Mint run_id + set lane)
### 1.1 Mint IDs
- Mint `run_id` per `ID-SYSTEM.md`.
- Record `machine_id` label (e.g., C1/C2) for the run.

### 1.2 Create a Run Log (Draft)
- Create a Run Log document using `50-GENERATION/RUN-LOG-TEMPLATE.md`.
- Fill sections 0–2 with known inputs.
- Mark status = `draft`.

STOP if:
- artist wrapper is missing or contradicts Persona Bible (BLOCKER).

---

## 2) Build the Scripture Meaning Packet (Gate 0 prerequisite)
Using `10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md`:
- Fill **Scope**, **Core claim**, **Movement**, **Imagery**, **Misreadings**, **Story Seeds**.

Rules:
- Packet may be explicit theological language (allowed here).
- Must include 3–7 story seeds with receipts.

Checkpoint:
- If packet fails its self-check → **REWRITE REQUIRED** (do not proceed).

Record in Run Log:
- scripture_packet_id, scripture_reference, core_claim.

---

## 3) Story Forge (Scene creation)
Using `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md`:
- Calibrate to persona rules from `20-ARTISTS/*`.
- Generate 3–6 scenes.
- Designate **Anchor Scene**.

Rules:
- Every scene must include receipts (props/actions/sensory).
- Turn must be defined as trigger/cost/new posture/unresolved remainder.
- No sermon voice.

Checkpoint:
- If scenes are abstract or "talking heads" → **REWRITE REQUIRED**.
- If the episode feels like a duplicate of prior work → plan for registry check later; likely **PIVOT REQUIRED**.

Record in Run Log:
- story_id, anchor_scene_id, scene_ids.

---

## 4) Song Frame (Hook + structure)
Using `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md`:
- Choose structure (A/B/C/custom).
- Assign `hook_family_id` (or set `TBD` only in concept mode).
- Fill section blueprints + receipts map + bridge plan.

Rules:
- Chorus hook mechanics must be filled.
- Verses must have receipts.
- Bridge must embody Beat 3 without teaching voice.

Checkpoint:
- If chorus promise is unclear → **REWRITE REQUIRED**.
- If the frame drifts into moral summary → **REWRITE REQUIRED**.

Record in Run Log:
- song_frame_id, structure, hook_family_id, central image, contradiction.

---

## 5) Draft Lyrics (Gate 1)
Write the draft lyrics from the Song Frame, obeying:
- Artist wrapper constraints (receipts, voice, faith handling)
- Global tone taboos
- No naming private individuals

Gate 1 outcomes (per `QA-GATES.md`):
- PASS
- PASS WITH MINOR FIXES
- REWRITE REQUIRED
- PIVOT REQUIRED
- FAIL

If **REWRITE REQUIRED**:
- Keep the same hook family and anchor scene; fix the defect.
If **PIVOT REQUIRED**:
- Change hook family and/or anchor scene before re-drafting.

Record Gate 1 result in Run Log.

---

## 6) Uniqueness Preflight (Before Final Save)
Before saving a lyrics file to disk (Gate 2), check:
- Hook reuse window (via HOOK-INDEX data)
- Scene fingerprint collisions (via SCENE-INDEX data)
- Scripture reuse window (via SCRIPTURE-INDEX data)

Rules:
- Any FAIL → default **PIVOT REQUIRED**
- Override allowed only with OVERRIDES-LOG entry and human approver.

Record uniqueness outcomes in Run Log.

---

## 7) Final Save (Gate 2)
### 7.1 Mint song IDs
- Mint `work_id` (new concept) unless this is explicitly a new version of an existing work.
- Mint `version_id` and `version_label`.

### 7.2 Save lyrics using the canonical wrapper
Use `70-OUTPUT/LYRICS-SAVE-TEMPLATE.md`:
- YAML id_header first
- Human-readable lane block
- Lyrics with section headers
- QA snapshot footer

Save location rule (operator-selected, but must be consistent):
- `/Songs/<Genre>/<Artist>/` 

Gate 2 PASS requires:
- all required IDs present
- uniqueness preflight recorded
- tone taboos pass
- file written successfully

Record absolute filepath in Run Log.

---

## 8) Registry Writes (Mandatory after Gate 2 PASS)
**Critical timing rule:** Registry writes happen **ONLY after Gate 2 PASS** (Final Save complete).

**Hard rules:**
- **Never append HOOK_USE/SCRIPTURE_USE before Gate 2 PASS**
- **Do NOT write registry records before Gate 2** — this prevents TBD values in registry
- Only OVERRIDE/OVERRIDE_UPDATE records may be written before Gate 2 (for test/override logging)

After the lyrics file is saved and Gate 2 is PASS, append registry records:

- SONG-INDEX: WORK record (if new) + VERSION record
- HOOK-INDEX: HOOK_USE record (and HOOK_FAMILY record if new)
- SCENE-INDEX: SCENE record (fingerprint + hash)
- SCRIPTURE-INDEX: SCRIPTURE_USE record
- RUN-INDEX: RUN record linking all artifacts
- OVERRIDES-LOG: OVERRIDE record if any overrides used

**All registry records must include:**
- Valid `work_id`, `version_id`, `title` (**no TBD values in ACTIVE records**)
- Valid `run_id`
- Timestamp (`created_utc` or `used_utc`)

**TBD Value Rule (scoped):**
- **No TBD values in ACTIVE records** (hard requirement)
- ACTIVE = USE records without matching VOID records (see `60-REGISTRY/REGISTRY-OVERVIEW.md` §7.1)
- Historical TBD values from voided test runs are allowed (append-only registry integrity)
- Validation checks ACTIVE records only, not entire registry history

If registry write fails:
- Treat as **BLOCKER** until resolved (do not consider the song "saved and done").

---

### 8.1 Test/Validation Runs (No Artifact Created)
For test runs that validate collision detection or other system behavior without producing a final artifact:

**Correct workflow (test stops before Gate 2):**
1. **Do NOT append HOOK_USE/SCRIPTURE_USE/SCENE records** during the run
2. If override was logged (for testing purposes), append:
   - `OVERRIDE_UPDATE` record to `overrides-log.jsonl` with:
     - `work_id/version_id/title: "VOID"`
     - `status: "test_complete_no_artifact_created"`
   - **Result:** Override marked as test-only, no USE records exist

**Correction workflow (if USE records were prematurely appended with TBD values):**
1. Append `HOOK_USE_VOID`, `SCRIPTURE_USE_VOID`, `SCENE_VOID` records to void them
2. Each VOID record must include:
   - `override_id` (linking to the override that authorized the test)
   - `target_record_timestamp` (matching the USE record's timestamp)
   - `status: "VOIDED_TEST_ONLY"`
3. Append `OVERRIDE_UPDATE` to mark override as test-complete with no artifact

**Void semantics:**
- VOID records mark prior entries as **NON-ACTIVE**
- Collision detection ignores USE records that have matching VOID records (see `60-REGISTRY/REGISTRY-OVERVIEW.md` §4.5)
- A `HOOK_USE` is only **ACTIVE** if no later `HOOK_USE_VOID` exists with matching `hook_family_id` + `target_record_timestamp`
- Same rule applies for `SCRIPTURE_USE` vs `SCRIPTURE_USE_VOID` and `SCENE` vs `SCENE_VOID`

---

## 9) Release Candidate (Gate 3) (Optional)
Gate 3 is for polish and publish readiness:
- tighten lines
- improve singability
- eliminate cliché
- final tone audit

If Gate 3 is PASS:
- optionally update version_label to `v02` with a new version_id and repeat Gate 2 + registry append.

---

## 10) Stop Conditions (When to abort a run)
Abort (FAIL) if:
- Persona contradictions cannot be resolved
- The meaning packet cannot produce a coherent movement
- Repeated rewrites fail to remove sermon voice
- Uniqueness FAIL cannot be avoided and no override is acceptable

Log the abort in Run Log (Decision entry: abandon).

---

## 11) Pass/Fail Checklist (Executor)
PASS only if:
- [ ] Run Log exists and is updated through Gate 2
- [ ] Lyrics saved with correct wrapper format
- [ ] Registry writes appended successfully
- [ ] No uniqueness FAIL without override
- [ ] No tone-taboo violations

FAIL (BLOCKER) if:
- [ ] Lyrics saved but registry not updated
- [ ] IDs missing/malformed at Final Save
- [ ] Overrides implied but not logged

---

## Vetting Outcome
✅ **PASS** — Clear step-by-step operator flow, explicit stop/rewrite/pivot logic, Gate 2 + registry requirements enforced, and no ownership conflicts.

### Dependencies
- Requires `00-GOVERNANCE/ID-SYSTEM.md`, `00-GOVERNANCE/QA-GATES.md`, `00-GOVERNANCE/TONE-TABOOS.md` 
- Uses templates: `10-*`, `30-*`, `40-*`, `50-*`, `70-*` 
- Uses registry schemas: `/60-REGISTRY/*` 
- Uses artist wrapper: `/20-ARTISTS/*` 

### Next Files Impacted
- `90-EXAMPLES/JACK-MERCER-SAMPLE-RUN.md` (optional end-to-end example)
