# 40-SONG-FRAME/SONG-FRAME-TEMPLATE.md

## Contract
**Purpose:** Provide the canonical Song Frame template that converts Story Forge outputs into a tightly-scaffolded lyric plan (sections, line intent, receipts placement, hook mechanics) while enforcing tone + meaning constraints.

**This file OWNS (authoritative):**
- Required Song Frame sections/fields
- Section-by-section intent rules (what each section must accomplish)
- Hook mechanics rules (memorability, repeat logic, conflict, release)
- Receipts placement rules (where concreteness must appear)
- "No-sermon" enforcement at the frame level (before lyrics exist)

**This file DOES NOT OWN (references-only):**
- ID formats and minting rules (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA stage rules and severity mapping (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone taboo list and banned phrases (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Artist-specific diction and style choices (owned by artist bible)
- Registry schemas and uniqueness policy storage (owned by `/60-REGISTRY/*`)

---

## 0) Frame Metadata (Required)
**song_frame_id:** `SFR-YYYYMMDD-HHMM-RAND4` (per `ID-SYSTEM.md`)  
**scripture_packet_id:** `[from packet]`  
**story_id:** `[from story forge]`  
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
- **Anchor scene_id:** `[from story forge]` 
- **Scene list (IDs + roles):** `[list]` 
- **Central image + contradiction:** `[paste]` 

---

## 2) Song Strategy (Required)

### 2.1 Hook family assignment (Required at Final Save)
- **hook_family_id:** `HKF-<slug>` (or `TBD` in concept mode only)
- **Hook promise:** `[what listener will feel/remember]` 

> Do not write the final hook line here unless explicitly requested.

### 2.2 Perspective + tense
- **POV:** `[1st person | 2nd person (rare) | 3rd person]` 
- **Tense:** `[past | present]` 

Rules:
- Default to **1st person** for confession and lived experience.
- 2nd person is allowed only when it is relational/intimate, not instructional.

### 2.3 Emotional arc (Required)
Describe arc in one line:
- `[start emotion] → [collapse/pressure] → [turn] → [aftertaste]` 

---

## 3) Structure (Required)
Choose one of these canonical structures:

### Option A (standard modern country-pop)
- Verse 1 → Verse 2 → Pre → Chorus → Verse 3 → Pre → Chorus → Bridge → Final Chorus

### Option B (alt/rock flexible)
- Verse 1 → Chorus → Verse 2 → Chorus → Bridge → Final Chorus

### Option C (nu-metal interrogation)
- Verse 1 (tight) → Pre (build) → Chorus (blast) → Verse 2 → Chorus → Breakdown/Bridge → Final Chorus

**Selected structure:** `[A | B | C | custom]`  
If custom, list the exact section order.

---

## 4) Section Blueprints (Required)

### Global rules for all sections
- Each Verse must include **receipts** (props/actions/sensory). No abstract-only verses.
- Chorus must be **the emotional center** and repeatable.
- Bridge must change angle (confession deepens, new image, new admission, or surrender moment).
- Avoid moral summary lines (see `TONE-TABOOS.md`).

---

### 4.1 Verse 1 Blueprint
**Scene source:** `[scene_id]`  
**Purpose:** establish world + wound (Beat 1).  
**Required receipts:** 3–6 (list them)  
**Line intents (5–8 bullets):**
- `[intent]` 
- `[intent]` 

**Forbidden:** explaining the lesson.

---

### 4.2 Verse 2 Blueprint
**Scene source:** `[scene_id]`  
**Purpose:** pressure increases (Beat 2), stakes rise.  
**Required receipts:** 3–6  
**Line intents (5–8 bullets):**
- `[intent]` 

---

### 4.3 Pre-Chorus Blueprint (if used)
**Purpose:** tighten tension, point toward chorus.  
**Mechanic:** shorten lines / lift melody / heighten honesty.  
**Line intents (3–6 bullets):**
- `[intent]` 

---

### 4.4 Chorus Blueprint
**Purpose:** deliver hook promise; repeatable and singable.  
**Hook mechanics (must fill):**
- **Central image:** `[image]` 
- **Contradiction:** `[tension phrase]` 
- **Release:** `[what finally gets said/owned]` 
- **Chorus last line:** `[the "stick" line intent, not final words]` 

**Repeat rule:**
- Chorus must be able to repeat 2–4 times without losing meaning.

**Forbidden:**
- Second-person spiritual instructions
- "Bible says…" teaching voice
- Generic inspiration slogans

---

### 4.5 Verse 3 Blueprint (if used)
**Scene source:** `[scene_id]`  
**Purpose:** aftermath or deeper confession; prepares bridge.  
**Required receipts:** 2–5  
**Line intents (4–7 bullets):**
- `[intent]` 

---

### 4.6 Bridge Blueprint
**Purpose:** pivot/turn embodiment (Beat 3) without sermon voice.  
**Bridge options (pick one):**
- **Broken confession:** "I can't fix this."
- **Surrender moment:** "I let go."
- **Earned resolve:** "I'll face it."
- **Prayerful reach (if lane allows):** "I asked for help."

**Required element:**
- One new image not used earlier.

**Line intents (4–8 bullets):**
- `[intent]` 

---

### 4.7 Final Chorus Notes (if used)
- **Bigger but not preachier.**
- Add 1–2 fresh lines max, otherwise repeat.

---

## 5) Receipts Map (Required)
Create a quick map of where concreteness appears.

- Verse 1 receipts: `[list]` 
- Verse 2 receipts: `[list]` 
- Chorus receipts (light): `[list]` 
- Bridge receipts: `[list]` 

Rule:
- If receipts are missing from any Verse, mark **REWRITE REQUIRED**.

---

## 6) Uniqueness Preflight (Required at Final Save)
Before writing final lyrics, confirm:
- [ ] hook_family_id does not violate reuse window (registry check)
- [ ] anchor scene is not a duplicate of a prior scene fingerprint (registry check)
- [ ] scripture_packet_id reuse is within policy (registry check)

If any fail: mark **PIVOT REQUIRED** and propose a new hook family + new anchor scene.

---

## 7) Lyric Drafting Instructions (for executor) (Required)
When writing lyrics from this frame:
- Keep narrator confessional, not instructional.
- Show meaning through scenes; avoid overt teaching.
- Preserve receipts; do not abstract them away.
- Make chorus singable, not wordy.
- If tempted to preach, convert it to a cost/confession/image.

---

## 8) QA Self-Check (Required)
PASS only if:
- [ ] Structure selected and section intents filled
- [ ] Anchor scene + at least 2 other scenes referenced
- [ ] Chorus hook mechanics filled
- [ ] Receipts map completed
- [ ] Bridge option selected and includes a new image
- [ ] Uniqueness preflight acknowledged for Final Save

FAIL if:
- [ ] Verse intents are abstract and have no receipts
- [ ] Chorus is indistinguishable from verses
- [ ] Bridge becomes a moral summary

---

## Vetting Outcome
✅ **PASS** — Measurable section requirements, hook mechanics, receipts mapping, and explicit anti-sermon enforcement before lyrics exist.

### Dependencies
- Consumes: `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md` outputs.
- References: `TONE-TABOOS.md` for lyric-stage bans, and `QA-GATES.md` for gate behavior.
- References ID format rules from `ID-SYSTEM.md`.

### Next Files Impacted
- `50-GENERATION/RUN-LOG-TEMPLATE.md` (will log which frame produced which version)
- `/60-REGISTRY/*` (will store hook_family_id, scripture_packet_id, and scene fingerprint data)
