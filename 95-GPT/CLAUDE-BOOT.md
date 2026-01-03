# 95-GPT/CLAUDE-BOOT.md

## Contract
**Purpose:** Provide the minimal "boot sequence" to initialize Windsurf/Claude as the Music-Studio-2026 Executor on a real machine: where the repo lives, what to load first, what files must exist, and the exact first prompts to run TEST MODE and RUN MODE.

**This file OWNS (authoritative):**
- Runtime boot checklist (what must be present on disk)
- Canonical local paths (repo root + Songs + registry data)
- First-run verification flow (TEST MODE then RUN MODE)
- Failure triage rules for boot-time errors

**This file DOES NOT OWN (references-only):**
- The system prompt itself (owned by `95-GPT/MASTER-SYSTEM-PROMPT.md`)
- User interface spec (owned by `95-GPT/USER-INSTRUCTIONS.md`)
- Unit tests (owned by `95-GPT/UNIT-TESTS.md`)
- Pipeline steps (owned by `80-PLAYBOOKS/PIPELINE-EXECUTION.md`)
- IDs, QA, Tone rules (owned by `/00-GOVERNANCE/*`)
- Registry schemas (owned by `/60-REGISTRY/*`)

---

## 1) Canonical Local Paths (Windows)
Repo root (source of truth):
- `C:\Users\howar\CascadeProjects\Music-Studio-2026` 

Songs output root:
- `C:\Users\howar\CascadeProjects\Music-Studio-2026\Songs` 

Registry data root:
- `C:\Users\howar\CascadeProjects\Music-Studio-2026\60-REGISTRY\data` 

---

## 2) Required Files Present (Boot Checklist)
Must exist (BLOCKER if missing):
- `95-GPT/MASTER-SYSTEM-PROMPT.md` 
- `95-GPT/USER-INSTRUCTIONS.md` 
- `95-GPT/UNIT-TESTS.md` 
- `00-GOVERNANCE/REPO-MAP.md` 
- `00-GOVERNANCE/ID-SYSTEM.md` 
- `00-GOVERNANCE/QA-GATES.md` 
- `00-GOVERNANCE/TONE-TABOOS.md` 
- `80-PLAYBOOKS/PIPELINE-EXECUTION.md` 
- Templates:
  - `10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md` 
  - `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md` 
  - `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md` 
  - `50-GENERATION/RUN-LOG-TEMPLATE.md` 
  - `70-OUTPUT/LYRICS-SAVE-TEMPLATE.md` 
- Artist wrapper:
  - `20-ARTISTS/ART_jack-mercer.md` 
- Persona Bible (source of truth doc, referenced by wrapper):
  - `20-ARTISTS/Jack-Mercer/ARTIST-BIBLE.md` (or the docx in your archive; wrapper references the docx name)

Recommended (create if missing):
- Registry data files (empty is OK):
  - `60-REGISTRY/data/song-index.jsonl` 
  - `60-REGISTRY/data/hook-index.jsonl` 
  - `60-REGISTRY/data/scene-index.jsonl` 
  - `60-REGISTRY/data/scripture-index.jsonl` 
  - `60-REGISTRY/data/run-index.jsonl` 
  - `60-REGISTRY/data/overrides-log.jsonl` 

---

## 3) Boot Sequence (What to load first)
1) Load `95-GPT/MASTER-SYSTEM-PROMPT.md` as the **System Prompt**.
2) Keep `95-GPT/USER-INSTRUCTIONS.md` as the operator reference.
3) Keep `95-GPT/UNIT-TESTS.md` as the verification suite.
4) Use `00-GOVERNANCE/REPO-MAP.md` for navigation.
5) Start in **TEST MODE** before writing any songs.

---

## 4) First Prompts (Copy/Paste)

### 4.1 TEST MODE: CORE (recommended first)
```text
TEST MODE:
test_suite: CORE
lane:
  artist_id: ART-jack-mercer
  genre_id: GEN-country-pop
```

### 4.2 TEST MODE: ALL (full verification)
```text
TEST MODE:
test_suite: ALL
lane:
  artist_id: ART-jack-mercer
  genre_id: GEN-country-pop
```

### 4.3 RUN MODE: first real run
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
  - produce artifacts in order and save final lyrics + registry updates
```

---

## 5) Boot-Time Failure Triage
If you hit a failure:

### 5.1 Missing file (BLOCKER)
- Report exact missing path(s).
- Do not proceed until present.

### 5.2 Registry data missing
If schemas exist but `data/*.jsonl` missing:
- Create the empty files (preferred), OR
- Run uniqueness checks as NOT RUN and flag risk (allowed only if playbook permits).
- Never fabricate history.

### 5.3 Conflicting rules
- STOP and report BLOCKER with file references.
- Do not "blend" constraints.

### 5.4 Formatting / lint issues
- Do not auto-edit spec files in RUN MODE.
- If it's an output artifact (lyrics/run log), fix format immediately before claiming Gate PASS.

---

## 6) Pass/Fail Checklist

PASS if:
- [ ] Required files exist
- [ ] System prompt loaded
- [ ] TEST MODE: CORE passes or reports actionable failures
- [ ] RUN MODE can proceed without missing templates/wrappers

FAIL (BLOCKER) if:
- [ ] Any required governance/template file is missing
- [ ] Artist wrapper missing
- [ ] System prompt references non-existent files
- [ ] Registry writes required but impossible (permissions/path)

---

## Vetting Outcome
✅ **PASS** — Boot flow references existing repo assets, defines concrete paths, enforces STOP rules, and supplies copy/paste prompts.

### Dependencies
- `95-GPT/MASTER-SYSTEM-PROMPT.md`
- `95-GPT/USER-INSTRUCTIONS.md`
- `95-GPT/UNIT-TESTS.md`
- `80-PLAYBOOKS/PIPELINE-EXECUTION.md`
- `00-GOVERNANCE/*`
- Templates and registry schemas as listed

### Next Files Impacted
- None required. This is the final "deployment glue" doc.
