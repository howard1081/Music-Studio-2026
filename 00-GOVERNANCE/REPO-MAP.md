# 00-GOVERNANCE/REPO-MAP.md

## Contract
**Purpose:** Provide a single-page navigation map of the repo: what each top-level folder contains, what it's for, and where the operator should look first. This reduces cognitive load and prevents "where is that file again?" failures.

**This file OWNS (authoritative):**
- Repo structure overview and intent
- "Start here" pointers for humans and executors
- Canonical folder responsibilities and boundaries

**This file DOES NOT OWN (references-only):**
- Any schemas or policies (owned by their respective files)
- Any execution steps (owned by `80-PLAYBOOKS/PIPELINE-EXECUTION.md`)
- Any ID or QA rules (owned by `00-GOVERNANCE/ID-SYSTEM.md` and `00-GOVERNANCE/QA-GATES.md`)

---

## 1) Repo Root Overview

### 00-GOVERNANCE/
Rules that govern the whole system.
- `ID-SYSTEM.md` — canonical IDs, header schema, naming rules
- `QA-GATES.md` — gate stages + pass/fail rules
- `TONE-TABOOS.md` — global bans, cliché controls, sermon-voice rules
- `REPO-MAP.md` — this file

### 10-SCRIPTURE-LIBRARY/
Meaning packets (Scripture → claim → movement → imagery).
- `PACKET-TEMPLATE.md` — required structure for a Scripture Meaning Packet

### 20-ARTISTS/
Artist wrappers (enforceable constraints per persona).
- `ART_jack-mercer.md` — Jack's enforceable writing lane rules

### 30-STORY-FORGE/
Scene generation templates (story seeds → scenes → turn).
- `STORY-FORGE-TEMPLATE.md` 

### 40-SONG-FRAME/
Lyric planning templates (structure + hook + receipts map).
- `SONG-FRAME-TEMPLATE.md` 

### 50-GENERATION/
Run tracking templates.
- `RUN-LOG-TEMPLATE.md` 

### 60-REGISTRY/
Schemas for file-based registries (reuse prevention + indexing).
- `REGISTRY-OVERVIEW.md` 
- `SONG-INDEX.md` 
- `HOOK-INDEX.md` 
- `SCENE-INDEX.md` 
- `SCRIPTURE-INDEX.md` 
- `RUN-INDEX.md` 
- `OVERRIDES-LOG.md` 
- `data/` (optional) — append-only JSONL files (tooling-generated)

### 70-OUTPUT/
Canonical saved artifact wrappers.
- `LYRICS-SAVE-TEMPLATE.md` 

### 80-PLAYBOOKS/
Operator instructions for execution.
- `PIPELINE-EXECUTION.md` 

### 90-EXAMPLES/
Filled examples to validate wiring.
- `JACK-MERCER-SAMPLE-RUN.md` 

### Songs/
The actual saved outputs (lyrics files) by lane.
- `/Songs/<Genre>/<Artist>/...` 

---

## 2) Start Here (Human / Operator)

If you're running the system:
1) Read `80-PLAYBOOKS/PIPELINE-EXECUTION.md` 
2) Confirm `20-ARTISTS/<artist>.md` exists for your lane
3) Generate artifacts using templates in order:
   - Packet → Story → Frame → Lyrics Save
4) Save to `/Songs/...` using `70-OUTPUT/LYRICS-SAVE-TEMPLATE.md` 
5) Append registry records under `/60-REGISTRY/data/...` 

If you're editing rules:
- IDs: `00-GOVERNANCE/ID-SYSTEM.md` 
- Quality gates: `00-GOVERNANCE/QA-GATES.md` 
- Tone bans: `00-GOVERNANCE/TONE-TABOOS.md` 

---

## 3) "Where does this belong?" Quick Routing
- New global rule → `00-GOVERNANCE/` 
- New scripture packet template variant → `10-SCRIPTURE-LIBRARY/` 
- New artist lane wrapper → `20-ARTISTS/` 
- New story mechanics → `30-STORY-FORGE/` 
- New hook/structure mechanics → `40-SONG-FRAME/` 
- New run tracking → `50-GENERATION/` 
- Anything preventing reuse or enabling search → `60-REGISTRY/` 
- Anything about how the final saved lyric file must look → `70-OUTPUT/` 
- Operator "how to run it" docs → `80-PLAYBOOKS/` 
- End-to-end example harnesses → `90-EXAMPLES/` 

---

## Vetting Outcome
✅ **PASS** — Accurate high-level map, clear ownership boundaries, and proper "start here" pointers.

### Dependencies
- References file names already defined across repo; does not redefine any policies.

### Next Files Impacted
- None required. This is a navigation aid.
