# 10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md

## Contract
**Purpose:** Provide the canonical template for a Scripture Meaning Packet (SMP). This packet translates Scripture into a usable meaning-shape, imagery bank, and story seeds—without turning into a sermon—so downstream Story Forge and Song Frame can embody it.

**This file OWNS (authoritative):**
- The required sections/fields of a Scripture Meaning Packet
- The packet "shape" outputs (core claim, movement, imagery, misreads, story seeds)
- Packet-ready constraints that prevent downstream preachiness by design

**This file DOES NOT OWN (references-only):**
- ID formats (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA stage gates (owned by `00-GOVERNANCE/QA-GATES.md`)
- Tone bans for final lyrics (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Registry schemas for storage/indexing (owned by `/60-REGISTRY/*`)

---

## 0) Packet Metadata (Required)
> This is "meaning-layer" metadata. It is allowed to be explicit and theological. Lyrics later must embody, not lecture.

**scripture_packet_id:** `SCR-YYYYMMDD-HHMM-RAND4` (per `ID-SYSTEM.md`)  
**scripture_reference (human):** `[Book Chapter:Verse–Verse]`  
**created_utc:** `YYYY-MM-DDTHH:MMZ`  
**created_by:** `[human | gpt | windsurf | claude]`  
**status:** `[draft | locked]` 

**Example**
- scripture_packet_id: `SCR-20260102-0152-9D4M` 
- scripture_reference: `Luke 15:11–32` 
- status: `draft` 

---

## 1) Scope Definition (Required)
### 1.1 Passage boundaries
- **Primary passage:** `[exact range]` 
- **Immediate context:** `[what comes before/after that matters]` 
- **Audience & situation:** `[who is being addressed and why]` 

### 1.2 One-sentence summary (Required)
Write a single sentence that captures what's happening on the surface (no theology yet).
- **Surface summary:** `[one sentence]` 

---

## 2) The Core Claim (Required)
### 2.1 Core claim (1–2 sentences)
State the "truth" the song must embody. Keep it tight.
- **Core claim:** `[1–2 sentences]` 

### 2.2 The movement (Required)
Define the emotional/spiritual movement as a 3-beat arc:
- **Beat 1 (start):** `[state]` 
- **Beat 2 (pressure):** `[what breaks/convicts/exposes]` 
- **Beat 3 (turn):** `[what changes / what is received]` 

> This movement is the spine. Story Forge must map a lived episode onto this arc.

---

## 3) What NOT to do (Anti-Sermon Guardrails) (Required)
List failure modes that would turn the downstream song into a lecture.

- **Do NOT:** `[example: second-person instruction chorus]` 
- **Do NOT:** `[example: "Bible says…" teaching voice in lyrics]` 
- **Do NOT:** `[example: generic inspiration ending that contradicts grace]` 

**Allowed in packet:** clear theological language.  
**Not allowed in lyrics by default:** sermon voice. (See `TONE-TABOOS.md`.)

---

## 4) Key Phrases & Emotional Charges (Required)
### 4.1 Key words/phrases from the passage
- `[word/phrase] — why it matters emotionally` 
- `[word/phrase] — what it threatens/exposes` 
- `[word/phrase] — what it offers` 

### 4.2 Emotional charges (choose 3–6)
Pick the emotions this passage most strongly carries (not a full list).
- `[shame] [relief] [fear] [homesickness] [rage] [gratitude] ...` 

---

## 5) Imagery Bank (Required)
Provide **images**, not doctrines. This becomes lyric fuel.

### 5.1 Visual images (3–10)
- `[image] — what it implies` 
- `[image] — how it can show up in a modern scene` 

### 5.2 Physical actions (3–10)
- `[action] — what it communicates without words` 

### 5.3 Sound/texture/sensory cues (3–10)
- `[sensory cue] — emotional implication` 

> Keep these genre-neutral. The artist persona will choose lane-appropriate receipts later.

---

## 6) Misreadings & Corrections (Required)
This prevents the song from teaching the wrong thing.

### 6.1 Common misreadings (2–6)
- **Misread:** `[bad take]` 
- **Correction:** `[what the passage actually supports]` 

### 6.2 Drift warnings (Required)
List 2–4 "drift" outcomes that would violate meaning alignment:
- `[drift: self-salvation]` 
- `[drift: vengeance as virtue]` 
- `[drift: denial of suffering]` 

---

## 7) Modern Embodiment (Required)
### 7.1 Modern translation (2–6 bullets)
Describe how the core claim shows up in real life without religious jargon.
- `[bullet]` 
- `[bullet]` 

### 7.2 Costs & consequences (Required)
What does it cost to live the movement?
- **Cost:** `[relational / internal / reputational / practical]` 
- **Risk:** `[what happens if the narrator refuses the turn]` 

---

## 8) Story Seeds (Required)
Provide **3–7** story seeds that can embody the movement.

Each seed must include:
- **Setting:** `[where]` 
- **Pressure:** `[what squeezes the narrator]` 
- **Receipts:** `[props/actions]` 
- **Turn trigger:** `[moment that pivots]` 
- **Aftermath:** `[what changes]` 

**Seed 1:** …
**Seed 2:** …
**Seed 3:** …

---

## 9) Hook Seeds (Optional but Recommended)
Give hook directions **without writing final hooks**.

- **Hook angle A:** `[short description]` 
- **Hook angle B:** `[short description]` 
- **Hook angle C:** `[short description]` 

> Hook families are assigned later. Do not name or mint hook_family_id here.

---

## 10) Compatibility Notes (Required)
### 10.1 Persona fit notes
- **What this passage *sounds like* in lived speech:** `[1–3 bullets]` 
- **What it should avoid sounding like:** `[1–3 bullets]` 

### 10.2 Lane flexibility
Mark which lanes this packet can support:
- `[country] [nu-metal] [alternative] [rock] [gospel]` (check all that apply)

---

## 11) QA Self-Check (Required)
This packet PASSES only if:
- [ ] Core claim is 1–2 sentences and does not contradict the passage
- [ ] Movement is defined as a 3-beat arc
- [ ] Imagery bank contains actionable images/props/actions (not just abstractions)
- [ ] Misreadings include corrections that prevent wrong-song outcomes
- [ ] Story seeds contain concrete receipts and a turn trigger
- [ ] Drift warnings include at least one "meaning contradiction" risk

FAIL if:
- [ ] Packet reads like a sermon outline with steps
- [ ] No concrete images/actions exist
- [ ] The "turn" is vague or unearned

---

## Vetting Outcome
✅ **PASS** — Clear owned structure, no circular dependencies, measurable required fields, includes anti-sermon guardrails + QA checklist.

### Dependencies
- References `00-GOVERNANCE/ID-SYSTEM.md` for ID formatting.
- References `00-GOVERNANCE/TONE-TABOOS.md` for lyric-stage bans (not enforced here).

### Next Files Impacted
- `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md` (consumes sections 2, 5, 8)
- `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md` (consumes movement + imagery + drift warnings)
- `/60-REGISTRY/*` (will index scripture_packet_id + scripture_reference)
