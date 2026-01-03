# 30-STORY-FORGE/STORY-FORGE-TEMPLATE.md

## Contract
**Purpose:** Provide the canonical template for converting a Scripture Meaning Packet into a lived, persona-consistent story episode with concrete scenes ("receipts") that can be directly lyricized—without moralizing or sermon voice.

**This file OWNS (authoritative):**
- Required Story Forge sections/fields
- Scene design rules (anchor scene, receipts, continuity)
- Turn mechanics (earned change, not lecture)
- Output requirements used by Song Frame (scene list + emotional arc)

**This file DOES NOT OWN (references-only):**
- ID formats and file naming (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA gates and defect severities (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone bans and preachiness rules (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Artist-specific diction and "what Jack would do" constraints (owned by artist bible)
- Registry schemas for storage/indexing (owned by `/60-REGISTRY/*`)

---

## 0) Story Metadata (Required)
**story_id:** `SF-YYYYMMDD-HHMM-RAND4` (per `ID-SYSTEM.md`)  
**scripture_packet_id:** `[from packet]`  
**artist_id:** `ART-<slug>`  
**genre_id:** `GEN-<slug>`  
**created_utc:** `YYYY-MM-DDTHH:MMZ`  
**status:** `[draft | locked]` 

---

## 1) Inputs Snapshot (Required)
- **Core claim (from packet):** `[paste]` 
- **Movement beats (from packet):**
  - Beat 1: `[start]` 
  - Beat 2: `[pressure]` 
  - Beat 3: `[turn]` 
- **Selected emotional charges (3–6):** `[list]` 
- **Selected imagery (top 5):** `[list]` 
- **Selected drift warnings (top 3):** `[list]` 

---

## 2) Persona Calibration (Required)
Write 5–9 bullets that anchor this story in the persona.

- **Current life season:** `[what's happening in this phase of life]` 
- **Primary wound / fear:** `[what threatens him]` 
- **Primary coping strategy:** `[how he survives]` 
- **Faith posture right now:** `[honest, not idealized]` 
- **What he would NEVER say/do:** `[guardrails]` 
- **What he secretly wants:** `[desire]` 

> Do NOT write like a biography. Write like a director's notes.

---

## 3) Story Spine (Required)
### 3.1 One-paragraph story summary (Required)
Summarize the episode as a short lived story (no sermon voice).
- **Summary:** `[1 paragraph]` 

### 3.2 The "turn" (Required)
Define the turning moment as:
- **Trigger:** `[what forces change]` 
- **Cost:** `[what it costs him to accept]` 
- **New posture:** `[what changes internally]` 
- **What remains unresolved:** `[keep it real]` 

---

## 4) Scene List (Required)
You will generate **3–6 scenes**. Each scene must be usable as lyric material.

### Scene rules (must follow)
- Each scene must include **setting + time cue + receipts + action**.
- At least one scene must be the **Anchor Scene** (the most concrete, most lyricable).
- Scene continuity must hold (no teleporting emotions).
- Avoid "talking heads" scenes where nothing happens.

### Scene Template (repeat for each scene)
**scene_id:** `SCN-YYYYMMDD-HHMM-RAND4`  
**scene_role:** `[setup | pressure | collapse | turn | aftermath]`  
**setting:** `[where]`  
**time cue:** `[when]`  
**receipts (props/actions/sensory):** `[3–10 bullets]`  
**what is happening (beats):** `[3–7 bullets]`  
**what it reveals:** `[1–2 sentences]`  
**dialogue fragments (optional):** `[1–3 short lines, lived speech]` 

> Dialogue must sound like the persona, not like a preacher.

---

## 5) Emotional Arc Map (Required)
Map emotions across the scenes.

- Scene 1: `[emotion → emotion]` 
- Scene 2: `[emotion → emotion]` 
- …
- Anchor Scene: `[emotion → emotion]` 
- Turn Scene: `[emotion → emotion]` 

---

## 6) Hook Fuel (Required)
Provide raw hook fuel without writing the final hook.

### 6.1 Central image (1)
- **Image:** `[one image]` 
- **Meaning:** `[what it carries emotionally]` 

### 6.2 Contradiction line (1)
A short contradiction that captures the tension.
- `[line fragment]` 

### 6.3 Title candidates (3–8)
- `[title]` 
- `[title]` 

### 6.4 Hook directions (2–4)
- **Direction A:** `[what the hook should do emotionally]` 
- **Direction B:** `[alternative angle]` 

---

## 7) Anti-Drift Check (Required)
Verify the story will not produce the wrong meaning.

- [ ] The turn embodies the packet's Beat 3 without "teaching voice"
- [ ] No drift warnings are triggered (or if triggered, explain why)
- [ ] The story does not resolve by self-salvation or moral superiority
- [ ] The story remains persona-authentic even in collapse

If any box fails: mark **REWRITE REQUIRED** and specify what to fix.

---

## 8) QA Self-Check (Required)
PASS only if:
- [ ] 3–6 scenes exist with receipts and continuity
- [ ] Anchor Scene is clearly designated by role
- [ ] Turn is defined (trigger/cost/posture) and feels earned
- [ ] No sermon voice or second-person instruction exists
- [ ] Hook fuel includes a central image and contradiction

FAIL if:
- [ ] Scenes are vague / abstract
- [ ] Turn is motivational instead of lived
- [ ] Dialogue reads like a devotional

---

## Vetting Outcome
✅ **PASS** — Clear structure, measurable scene requirements, anti-drift safeguards, and downstream-ready outputs.

### Dependencies
- References `ID-SYSTEM.md` for ID format.
- Consumes outputs from `10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md`.
- References tone enforcement in `TONE-TABOOS.md` (no redefinition).

### Next Files Impacted
- `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md` (consumes scene list + emotional arc + hook fuel)
- `/60-REGISTRY/*` (will index story_id and scene_ids linked to work/version later)
