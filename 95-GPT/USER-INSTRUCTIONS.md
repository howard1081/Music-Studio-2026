# 95-GPT/USER-INSTRUCTIONS.md

## Contract
**Purpose:** Define the human-facing interface for operating the Music-Studio-2026 Executor: what the user supplies, what the executor returns, and how to invoke modes (RUN/TEST/BUILD). This file is the canonical "operator manual" for prompting.

**This file OWNS (authoritative):**
- User input schema (minimum required + optional)
- Mode invocation syntax (RUN/TEST/BUILD)
- Expected outputs by mode
- Default behaviors when inputs are missing

**This file DOES NOT OWN (references-only):**
- Pipeline steps (owned by `80-PLAYBOOKS/PIPELINE-EXECUTION.md`)
- ID formats (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA gate rules (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone bans (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Artist constraints (owned by `/20-ARTISTS/*`)

---

## 1) Quick Start Prompts

### 1.1 RUN MODE (make a song)
```text
RUN MODE:
artist_id: ART-jack-mercer
genre_id: GEN-country-pop
scripture_reference: Psalm 34:18
title_hint: Near in the Wreckage
constraints:
  - modern country-pop, conversational
  - no preachy lines, embodied faith only
  - heavy receipts in verses
output:
  - produce artifacts in order and save final lyrics + registry updates
```

### 1.2 TEST MODE (verify the system)
```text
TEST MODE:
test_suite: CORE
lane:
  artist_id: ART-jack-mercer
  genre_id: GEN-country-pop
```

### 1.3 BUILD MODE (write repo files verbatim)
```text
BUILD MODE:
target_filepath: 40-SONG-FRAME/SECTION-BANK.md
write_verbatim: true
markdown:
  <paste markdown here>
```

---

## 2) Mode Invocation (Canonical)

### 2.1 RUN MODE
Use when you want songs generated and saved.

Header must include:
```text
RUN MODE:
artist_id: ...
genre_id: ...
```

You must provide ONE of:
- `scripture_reference` (preferred), OR
- `scripture_theme` (executor will select a passage, then confirm selection in the packet)

Optional:
- `title_hint`
- `hook_family_id` (if you want to force an angle)
- `structure_preference` (Option A/B/C)
- `mood_tags`
- `constraints` list
- `avoid_list` (phrases, themes, props)

Default if omitted:
- Structure defaults to the artist wrapper's guidance.
- Hook family will be chosen during Song Frame.
- Title is chosen during lyrics drafting.

### 2.2 TEST MODE
Use when you want pass/fail verification.

Header must include:
```text
TEST MODE:
test_suite: CORE|REGISTRY|TONE|ALL
```

Optional:
- `lane` (artist_id + genre_id)
- `seed_inputs` (scripture reference, hook family, etc.)

Executor outputs:
- A test report listing each test case and PASS/FAIL with reasons.
- Any BLOCKER findings with file references.

### 2.3 BUILD MODE
Use when you want the executor to write files exactly as you provide.

Header must include:
```text
BUILD MODE:
target_filepath: <relative path under repo root>
write_verbatim: true
markdown: <content>
```

Rules:
- Executor must not edit/improve content.
- Executor runs lint checks and reports flags, but does not change the file unless user resends corrected content.

---

## 3) User Input Schema (RUN MODE)

### 3.1 Required (minimum viable run)
- `artist_id`
- `genre_id`
- `scripture_reference` OR `scripture_theme`

### 3.2 Strongly recommended
- "Do not name private people" (default enforced)
- Constraints: 3–7 bullets on vibe/voice
- Any "hard avoids" (topics, words, clichés)

### 3.3 Optional
- `album_id` / `track_id` (if working inside an album project)
- target length (short radio, long emotional)
- BPM/key/instrumentation hints (executor treats as guidance, not laws, unless specified as MUST)

---

## 4) What You Will Receive (RUN MODE outputs)

### 4.1 Artifact sequence
Executor will produce:
1. Run Log (draft)
2. Scripture Meaning Packet
3. Story Forge
4. Song Frame
5. Draft Lyrics + Gate 1 verdict
6. Uniqueness Preflight results
7. Final Save Lyrics (Gate 2 PASS) + saved filepath
8. Registry append summary (what files were appended)

### 4.2 Default pacing
- Usually one artifact per message.
- If you request "all-in-one," executor may refuse if it risks format errors; correctness > speed.

---

## 5) Common Controls (Operator knobs)
- `force_pivot: true` — if you want a new hook family or scene regardless of reuse checks
- `no_overrides: true` — disables override option; forces pivots only
- `strict_tone: true` — flags borderline preachy language more aggressively

---

## 6) Failure Handling (What to do when things go wrong)

If executor outputs **ACTION REQUIRED: REWRITE REQUIRED**:
- You can say: "Rewrite only the chorus. Keep hook family and anchor scene."

If executor outputs **ACTION REQUIRED: PIVOT REQUIRED**:
- You can say: "Pivot hook family only. Keep scripture. New anchor scene."

If executor outputs **BLOCKER**:
- You must resolve missing files, conflicts, or registry write failures before proceeding.

---

## 7) Pass/Fail Checklist

PASS if:
- [ ] RUN/TEST/BUILD invocation formats are clear
- [ ] Minimum required inputs are minimal and correct
- [ ] Output expectations align with pipeline playbook

FAIL (BLOCKER) if:
- [ ] Instructions contradict the playbook or allow bypassing tone bans
- [ ] Mode triggers are ambiguous

---

## Vetting Outcome
✅ **PASS** — Clear prompting interface, unambiguous mode triggers, minimal required inputs, and correct alignment to the execution playbook.

### Dependencies
- `95-GPT/MASTER-SYSTEM-PROMPT.md`
- `80-PLAYBOOKS/PIPELINE-EXECUTION.md`
- `00-GOVERNANCE/QA-GATES.md`
- `00-GOVERNANCE/TONE-TABOOS.md`
- `/20-ARTISTS/*`

### Next Files Impacted
- `95-GPT/UNIT-TESTS.md`
