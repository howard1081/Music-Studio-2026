# 95-GPT/UNIT-TESTS.md

## Contract
**Purpose:** Define the unit-test suite for validating the executor and repo rules. Each test includes: setup, prompt, expected behavior, and pass/fail conditions. Tests are designed to catch rule conflicts early (before 40 files drift out of sync).

**This file OWNS (authoritative):**
- Test suites and test cases (names, prompts, expectations)
- Pass/fail criteria per test
- Required evidence in outputs (what must be shown)

**This file DOES NOT OWN (references-only):**
- Gate definitions (owned by `00-GOVERNANCE/QA-GATES.md`)
- ID formats (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Tone bans (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Registry schemas (owned by `/60-REGISTRY/*`)
- Execution steps (owned by `80-PLAYBOOKS/PIPELINE-EXECUTION.md`)

---

## 1) Test Suite Index

### CORE
- CORE-01: Happy-path Jack run (full pipeline)
- CORE-02: Missing required input → ask for it
- CORE-03: Mode defaulting when unspecified

### TONE
- TONE-01: Preachy draft must fail Gate 1
- TONE-02: Cliché / banned phrases flagged
- TONE-03: Private names blocked

### IDS
- IDS-01: Malformed IDs fail Gate 2
- IDS-02: Reused version_id blocked
- IDS-03: Missing required header fields fail Gate 2

### REGISTRY
- REG-01: Registry preflight with empty data → NOT RUN + risk note
- REG-02: Hook reuse collision triggers pivot
- REG-03: Scene exact collision triggers pivot
- REG-04: Scripture reuse collision triggers pivot
- REG-05: Override allowed only with OVERRIDES-LOG record

### QA
- QA-01: Gate transitions enforced
- QA-02: Registry write failure is BLOCKER
- QA-03: "One artifact per message" discipline is followed

---

## 2) Test Case Format (Canonical)
Each test must include:
- **Setup**
- **Prompt**
- **Expected**
- **Evidence Required**
- **PASS if**
- **FAIL if**

---

## 3) CORE Suite

### CORE-01 — Happy-path Jack run
**Setup:** Repo has all templates + artist wrapper + governance. Registry data files may be empty.

**Prompt:**
```text
RUN MODE:
artist_id: ART-jack-mercer
genre_id: GEN-country-pop
scripture_reference: Psalm 34:18
constraints:
  - modern country-pop, conversational
  - heavy receipts in verses
  - embodied faith only (no sermon voice)
output:
  - generate artifacts in order and complete Gate 2 + registry writes
```

**Expected:**
- Produces artifacts in order (Run Log → Packet → Story → Frame → Draft Lyrics → Preflight → Final Save → Registry summary)
- Gate 1 verdict stated
- Gate 2 PASS only if IDs + wrapper correct
- Registry writes attempted and summarized

**Evidence Required:**
- Status line on each artifact
- Final Save includes YAML id_header
- Registry append list (filepaths)

**PASS if:**
- All steps occur without skipping
- No tone violations
- Completion criteria satisfied

**FAIL if:**
- Claims completion without registry writes
- Skips packet/story/frame

### CORE-02 — Missing required input
**Setup:** none

**Prompt:**
```text
RUN MODE:
artist_id: ART-jack-mercer
genre_id: GEN-country-pop
```

**Expected:** Executor requests missing `scripture_reference`/theme.

**Evidence Required:** Explicit ask for missing field.

**PASS if:** Asks for missing required input before proceeding.

**FAIL if:** Fabricates scripture reference without user allowance.

### CORE-03 — Mode defaulting
**Setup:** none

**Prompt:** "Make me a Jack Mercer song from Psalm 34:18."

**Expected:** Defaults to RUN MODE, asks for missing lane inputs if needed.

**PASS if:** Announces RUN MODE and requests required fields or infers only if unambiguous.

**FAIL if:** Enters BUILD MODE or TEST MODE incorrectly.

---

## 4) TONE Suite

### TONE-01 — Preachy draft must fail Gate 1
**Setup:** none

**Prompt:**
```text
RUN MODE:
artist_id: ART-jack-mercer
genre_id: GEN-country-pop
scripture_reference: Psalm 34:18
constraints:
  - include a lot of "you need to…" advice lines
```

**Expected:** Flags sermon voice conflict with tone rules and Jack wrapper; Gate 1 = REWRITE REQUIRED.

**Evidence Required:** Calls out the exact violation category and replacement guidance.

**PASS if:** Refuses to include "you need to…" teaching voice and forces rewrite.

**FAIL if:** Produces preachy lyrics and passes Gate 1.

### TONE-02 — Cliché / banned phrases flagged
**Setup:** Add a banned phrase in a draft line during Gate 1 check.

**Prompt:** "Include the phrase 'broken but blessed' in the chorus."

**Expected:** Flags per `TONE-TABOOS.md`, triggers rewrite/pivot.

**PASS if:** Rejects or replaces banned phrase.

**FAIL if:** Leaves it in and passes.

### TONE-03 — Private names blocked
**Prompt:** "Name his sister Sarah and his dad Mike in Verse 1."

**Expected:** Refuses to include private names; keeps roles generic.

**PASS if:** Removes names and explains constraint.

**FAIL if:** Includes names.

---

## 5) IDS Suite

### IDS-01 — Malformed IDs fail Gate 2
**Setup:** Attempt to save with malformed IDs (wrong prefix, wrong length).

**Prompt:** "Save with work_id: wrk_123 and version_id: 123."

**Expected:** Gate 2 = FAIL (BLOCKER).

**Evidence Required:** Identifies which IDs are malformed and why.

**PASS if:** Blocks save and demands corrected IDs.

**FAIL if:** Saves anyway.

### IDS-02 — Reused version_id blocked
**Setup:** Two different lyric contents attempt same `version_id`.

**Expected:** Gate 2 FAIL (BLOCKER) until reminted `version_id`.

**PASS if:** Requires new `version_id`.

**FAIL if:** Allows reuse.

### IDS-03 — Missing required header fields fail Gate 2
**Prompt:** "Save final lyrics without `run_id` and `hook_family_id`."

**Expected:** Gate 2 FAIL (BLOCKER).

**PASS if:** Blocks until fields present.

**FAIL if:** Saves anyway.

---

## 6) REGISTRY Suite

### REG-01 — Empty registry data → NOT RUN + risk note
**Setup:** `/60-REGISTRY/data/*` missing or empty.

**Expected:** Uniqueness checks = NOT RUN; executor flags risk and continues only if allowed by playbook.

**PASS if:** Does not fabricate history.

**FAIL if:** Claims PASS with no data.

### REG-02 — Hook reuse collision triggers pivot
**Setup:** HOOK-INDEX shows `HKF_x` used recently for lane.

**Prompt:** "Force `hook_family_id` HKF_x."

**Expected:** PIVOT REQUIRED unless override logged.

**PASS if:** Pivots or logs override.

**FAIL if:** Ignores collision.

### REG-03 — Scene exact collision triggers pivot
**Setup:** SCENE-INDEX contains same `fingerprint_hash`.

**Expected:** PIVOT REQUIRED unless override logged.

**PASS if:** Pivot or override logged.

**FAIL if:** Proceeds silently.

### REG-04 — Scripture reuse collision triggers pivot
**Setup:** SCRIPTURE-INDEX shows recent use.

**Expected:** Pivot scripture packet or override logged.

**PASS if:** Pivot/override.

**FAIL if:** Proceeds silently.

### REG-05 — Overrides require OVERRIDES-LOG record
**Prompt:** "Override the hook reuse policy and proceed."

**Expected:** Must produce an OVERRIDE record and reference `override_id` in hook/scripture/scene use record.

**PASS if:** Override record produced and referenced.

**FAIL if:** Proceeds with no override record.

---

## 7) QA Suite

### QA-01 — Gate transitions enforced
**Expected:** Gate 2 cannot be PASS if Gate 1 is FAIL.

**PASS if:** Enforces sequence and requirements.

**FAIL if:** Skips gates.

### QA-02 — Registry write failure is BLOCKER
**Setup:** Simulate inability to append registry file.

**Expected:** BLOCKER; no completion claim.

**PASS if:** Blocks completion.

**FAIL if:** Says "done" anyway.

### QA-03 — One artifact per message discipline
**Expected:** Produces one major artifact per response, unless user requests otherwise.

**PASS if:** Obeys output discipline.

**FAIL if:** Dumps multiple artifacts and breaks formatting.

---

## 8) Vetting Outcome
✅ **PASS** — Comprehensive suite covering core run, tone, IDs, registry, and QA behaviors with explicit evidence requirements.

### Dependencies
- `80-PLAYBOOKS/PIPELINE-EXECUTION.md`
- `00-GOVERNANCE/ID-SYSTEM.md`
- `00-GOVERNANCE/QA-GATES.md`
- `00-GOVERNANCE/TONE-TABOOS.md`
- `/60-REGISTRY/*`

### Next Files Impacted
- None required. This completes the GPT assembly layer.
