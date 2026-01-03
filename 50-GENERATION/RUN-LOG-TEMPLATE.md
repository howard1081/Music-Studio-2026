# 50-GENERATION/RUN-LOG-TEMPLATE.md

## Contract
**Purpose:** Provide the canonical Run Log template for tracking a single generation attempt end-to-end (Scripture Packet → Story Forge → Song Frame → Lyrics Drafts), including decisions, QA outcomes, and file save locations.

**This file OWNS (authoritative):**
- Required Run Log sections/fields
- Decision logging format (rewrite vs pivot, why)
- QA result capture format (PASS/REWRITE/PIVOT/FAIL)
- Linkage rules between run_id and produced artifacts

**This file DOES NOT OWN (references-only):**
- ID formats + naming conventions (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA gate rules and defect definitions (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone bans (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Registry storage schemas (owned by `/60-REGISTRY/*`)
- Artist-specific constraints (owned by artist bible)

---

## 0) Run Metadata (Required)
**run_id:** `RUN-YYYYMMDD-HHMM-RAND4` (per `ID-SYSTEM.md`)  
**created_utc:** `YYYY-MM-DDTHH:MMZ`  
**created_by:** `[human | gpt | windsurf | claude]`  
**machine_id:** `[C1 | C2 | other]` (human label; not an ID system field)  
**status:** `[draft | locked]` 

---

## 1) Target Lane (Required)
- **artist_id:** `ART-<slug>` 
- **genre_id:** `GEN-<slug>` 
- **lane_notes (optional):** `[short notes about style or constraints for this run]` 

---

## 2) Inputs (Required)
### 2.1 Scripture Meaning Packet
- **scripture_packet_id:** `SCR-YYYYMMDD-HHMM-RAND4` 
- **scripture_reference (human):** `[Book Chapter:Verse–Verse]` 
- **core_claim (paste 1–2 sentences):** `[paste]` 

### 2.2 Story Forge
- **story_id:** `SF-YYYYMMDD-HHMM-RAND4` (or `TBD` if not generated yet)
- **anchor_scene_id:** `SCN-YYYYMMDD-HHMM-RAND4` (or `TBD`)
- **scene_ids (list):** `[SCN-... , SCN-... , ...]` 

### 2.3 Song Frame
- **song_frame_id:** `SFR-YYYYMMDD-HHMM-RAND4` (or `TBD`)
- **selected_structure:** `[A | B | C | custom]` 
- **hook_family_id:** `HKF-<slug>` (or `TBD` in concept mode only)
- **central_image:** `[paste]` 
- **contradiction:** `[paste]` 

---

## 3) Outputs (Required at Final Save)
### 3.1 Song Work + Versions
- **work_id:** `WORK-YYYYMMDD-HHMM-RAND4` (or `TBD` until minted)
- **versions produced (list):**
  - **version_label:** `v01` 
  - **version_id:** `VER-YYYYMMDD-HHMM-RAND4` 
  - **qa_result:** `[PASS | PASS WITH MINOR FIXES | REWRITE REQUIRED | PIVOT REQUIRED | FAIL]` 
  - **notes:** `[short]` 

Add more version rows as needed.

---

## 4) Decisions Log (Required)
Record decisions in chronological order.

### Decision entry format
- **decision_id (optional):** `REV-YYYYMMDD-HHMM-RAND4` 
- **type:** `[rewrite | pivot | tighten | abandon]` 
- **scope:** `[chorus | verse2 | bridge | full-draft | concept]` 
- **why (1–3 bullets):**
  - `[reason]` 
- **what changed (1–5 bullets):**
  - `[change]` 
- **result:** `[improved | no-change | worse | unknown]` 

---

## 5) QA Capture (Required)
### 5.1 Gate results
- **Gate 0 (Concept):** `[PASS | REWRITE REQUIRED | PIVOT REQUIRED | FAIL]` 
- **Gate 1 (Draft Lyrics):** `[PASS | PASS WITH MINOR FIXES | REWRITE REQUIRED | PIVOT REQUIRED | FAIL]` 
- **Gate 2 (Final Save):** `[PASS | FAIL]` 
- **Gate 3 (Release Candidate):** `[PASS | PASS WITH MINOR FIXES | REWRITE REQUIRED | FAIL]` 

### 5.2 Defects (if any)
List defects with severity per `QA-GATES.md`.

- **severity:** `[BLOCKER | MAJOR | MINOR]` 
- **area:** `[meaning | tone | structure | receipts | uniqueness | metadata]` 
- **description:** `[what failed]` 
- **fix:** `[what to do next]` 

---

## 6) Uniqueness Preflight (Required at Final Save)
Record the outcome of uniqueness checks (storage rules live in registry layer).

- **hook_family reuse window check:** `[PASS | FAIL | NOT RUN]` 
- **scene fingerprint collision check:** `[PASS | FAIL | NOT RUN]` 
- **scripture reuse window check:** `[PASS | FAIL | NOT RUN]` 

If any FAIL: expected result is **PIVOT REQUIRED** unless explicitly overridden and logged.

---

## 7) Save Locations (Required at Final Save)
Record exactly where outputs were saved on disk.

### 7.1 Lyrics file saves
For each saved lyric version:
- **version_id:** `VER-...` 
- **filepath (absolute):** `[e.g., C:\Users\howar\CascadeProjects\Music-Studio-2026\Songs\Country\Jack-Mercer\WORK-...__v01__title-slug.md]` 
- **filename conforms to ID-SYSTEM naming:** `[YES | NO]` 

### 7.2 Sidecars (optional)
- `.json` metadata saved: `[YES | NO]` 
- `.prompt.md` saved: `[YES | NO]` 
- paths: `[list]` 

---

## 8) Notes (Optional)
- `[anything useful for future runs: what worked, what didn't, motifs to avoid, etc.]` 

---

## 9) Pass/Fail Checklist (for the executor)

PASS this Run Log at Final Save only if:
- [ ] `run_id` exists and is valid per `ID-SYSTEM.md` 
- [ ] `work_id` exists and is valid
- [ ] At least one `version_id` exists and is valid
- [ ] Gate 2 recorded as PASS
- [ ] Save filepath(s) recorded as absolute paths
- [ ] Uniqueness preflight recorded (PASS/FAIL/NOT RUN)

FAIL if:
- [ ] Missing run_id/work_id/version_id at Final Save
- [ ] Gate 2 missing or marked FAIL
- [ ] No filepaths recorded for saved outputs

---

## Vetting Outcome
✅ **PASS** — Clear ownership, measurable required fields, no ID schema redefinition, and consistent linkage across run → artifacts → saved files.

### Dependencies
- Must follow ID formats and naming rules in `00-GOVERNANCE/ID-SYSTEM.md`.
- QA severity terms and gate expectations come from `00-GOVERNANCE/QA-GATES.md`.

### Next Files Impacted
- `/60-REGISTRY/*` (will store run_id/work_id/version_id relationships for querying and reuse control)
- `70-OUTPUT/LYRICS-SAVE-TEMPLATE.md` (will reference the same save + header expectations)
