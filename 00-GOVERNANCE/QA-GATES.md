# 00-GOVERNANCE/QA-GATES.md

## Contract
**Purpose:** Define the QA gate system that every generated artifact (packet/story/song) must pass before it can be considered "final saved output." QA gates prevent drift, duplication, preachiness-by-accident, and broken metadata/IDs.

**This file OWNS (authoritative):**
- QA gate stages (Concept → Draft → Final Save → Release)
- Defect severity levels and pass/fail rules
- Required QA checks for: structure, metadata/IDs, uniqueness, meaning alignment, persona fit, craft
- Rewrite vs pivot decision rules
- Unit-test prompts to validate the system

**This file DOES NOT OWN (references-only):**
- ID formats + required ID fields (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Tone/taboo lists and banned phrases (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- Registry schemas and uniqueness storage fields (owned by `/60-REGISTRY/*`)
- Album constraints, track mapping, sequencing rules (owned by `/50-ALBUMS/*`)
- Artist-specific voice rules (owned by each artist bible, e.g., Jack Mercer Persona Bible)

---

## 1) QA Stages (Gates)

### Gate 0 — Concept (Allowed to be incomplete)
**Goal:** Validate the idea is viable before writing full lyrics.

**Inputs allowed:** hook idea, scripture packet draft, story seed, partial structure.  
**May be missing:** hook_family_id, scene_id, album_id, track_id.

**Must pass to proceed:**
- Has an explicit **core conflict** (what's breaking)
- Has an explicit **turn/realization** (what changes)
- Has at least **one concrete scene anchor** (place/time/prop/sensory cue)

---

### Gate 1 — Draft Lyrics (Must be coherent)
**Goal:** Produce a full draft that is structurally complete and meaning-aligned.

**Must include:**
- Full section structure (Verse/Pre/Chorus/Bridge or other declared structure)
- A distinct, repeatable hook (chorus center)

**Allowed:** placeholder phrases if tagged `[TBD]` but they trigger a Major defect.

---

### Gate 2 — Final Save (Must be loggable + unique)
**Goal:** Produce a "save-worthy" artifact with valid IDs and uniqueness checks complete.

**Must include:**
- All required ID fields for a saved lyric version (see §6; sourced from ID-SYSTEM)
- Hook family assigned (no more "concept mode")
- Scene ID assigned
- Scripture packet ID assigned (unless explicitly "non-scripture test")

---

### Gate 3 — Release Candidate (Polish + platform readiness)
**Goal:** Final content polish. No drift. No weak lines.

**Must include:**
- No `[TBD]` 
- Tightened language, clean rhythm, no filler lines
- If requested: packaged metadata (title, short blurb, tags) — ownership of those formats lives in downstream files

---

## 2) Defect Severity (Authoritative)

### BLOCKER (hard fail)
Any blocker = **FAIL**, must rewrite or pivot before proceeding.
Examples:
- Broken or missing required IDs at Final Save
- Duplicate hook family + motif combo that violates uniqueness rules
- Meaning drift: song no longer reflects the Scripture Meaning Packet's core claim
- Persona mismatch so severe it reads like a different artist
- Direct violations of tone/taboo file (explicitly flagged) that change the intent or audience safety

### MAJOR (rewrite required)
Major defects = **REWRITE** the relevant sections (not necessarily pivot).
Examples:
- Hook exists but doesn't land; chorus feels generic
- Story logic breaks (scene doesn't connect to the turn)
- Too abstract: not enough concrete details / "receipts"
- Over-explaining the lesson (preachy vibe) without using banned phrases (tone file handles phrase-level bans)

### MINOR (fix in place)
Minor defects = **FIX** without rewriting whole sections.
Examples:
- One clunky line
- Slight meter/rhyme friction
- Repeated word too often
- One unclear pronoun reference

---

## 3) Rewrite vs Pivot Rules (Authoritative)

### 3.1 Rewrite (default)
Choose **REWRITE** when:
- The concept is strong but execution is weak
- The hook family is correct but needs a stronger hook line
- The scene is correct but needs better "receipts"
- The Scripture meaning is present but underplayed or muddled

### 3.2 Pivot (when the foundation is wrong)
Choose **PIVOT** (new scene and/or new hook family, possibly new work_id per ID-SYSTEM) when:
- The hook family is already heavily used / collides with registry uniqueness
- The story cannot naturally embody the Scripture meaning without forcing it
- The draft becomes lecture-y even after rewrites (tone drift is structural, not wording)
- The "turn" feels fake or unearned no matter how you polish

**Pivot minimum requirement:** new `scene_id` + new "receipts set" + new hook approach.  
(If pivot changes identity, mint a new `work_id` per `ID-SYSTEM.md`.)

---

## 4) QA Dimensions (Checklist)

### 4.1 Structure & Dynamics (Gate 1+)
PASS if:
- [ ] Sections are labeled and complete
- [ ] Verses advance story (not duplicates)
- [ ] Chorus is the emotional center and repeats cleanly
- [ ] Bridge changes the angle (broken-to-resolve, confession-to-hope, etc.)

FAIL examples:
- Chorus feels like another verse
- Nothing changes between verse 1 and verse 2
- Bridge repeats chorus without new insight

---

### 4.2 Meaning Alignment (Gate 1+)
PASS if:
- [ ] The "truth" of the song matches the Scripture packet's core claim
- [ ] The life story embodies meaning without explaining it like a sermon
- [ ] The turn aligns with the passage's movement (from despair → trust, pride → surrender, etc.)

FAIL examples:
- Song's resolution contradicts the passage (e.g., self-salvation instead of grace)
- Song becomes generic breakup without the intended spiritual "shape"

---

### 4.3 Persona & Voice Fit (Gate 1+)
PASS if:
- [ ] The narrator sounds like the correct artist persona
- [ ] Diction matches persona (not overly poetic if the persona is conversational)
- [ ] Emotional arc feels earned (not melodrama)

NOTE: Specific voice rules live in the artist bible; this gate only enforces "must match the assigned persona."

---

### 4.4 Scene Integrity ("Receipts") (Gate 0+)
PASS if:
- [ ] At least one anchor scene exists with: setting + time cue + concrete prop + sensory detail
- [ ] Scene details are consistent (no continuity errors)
- [ ] The scene naturally supports the hook (not a random vignette)

MAJOR if:
- Scene is generic ("empty room," "lonely night") with no specifics

---

### 4.5 Uniqueness & Non-Reuse (Gate 2+)
PASS if:
- [ ] Hook family is assigned and does not violate uniqueness policy
- [ ] Scene ID is unique to this song (default rule)
- [ ] Motif combo does not match a prior song's fingerprint beyond allowed overlap
- [ ] Scripture reuse window is respected (policy stored in registry layer)

NOTE: Actual "how to store/check" lives in `/60-REGISTRY/*`. This gate requires the check to be performed.

BLOCKER if:
- Exact hook line reused in the same artist+genre lane without explicit approval
- Fingerprint collision that violates policy

---

### 4.6 Craft & Lyrics Quality (Gate 1+)
PASS if:
- [ ] Hook is memorable and singable
- [ ] Lines are clear (no "AI fog")
- [ ] No accidental mixed metaphors
- [ ] Rhyme/meter is acceptable for genre lane

MAJOR if:
- Multiple filler lines
- Forced rhymes / unnatural phrasing

---

### 4.7 Metadata & IDs (Gate 2+)
PASS if:
- [ ] All required IDs exist and match `ID-SYSTEM.md` 
- [ ] Filename conforms to naming conventions
- [ ] Version increments on any lyric change
- [ ] No `[TBD]` remains at Final Save

BLOCKER if:
- Missing `work_id` or `version_id` 
- Invalid ID formats

---

## 5) QA Output States (Authoritative)

When QA is performed, the system MUST return exactly one of:

- **PASS** (ready for next gate)
- **PASS WITH MINOR FIXES** (list fixes; no rewrites required)
- **REWRITE REQUIRED** (list blocking majors; specify sections to rewrite)
- **PIVOT REQUIRED** (foundation wrong; specify new angle requirements)
- **FAIL** (hard blocker; cannot proceed)

---

## 6) Required ID Set at Final Save (Gate 2)
At Final Save, the lyric artifact MUST include:

- `work_id` 
- `version_id` 
- `run_id` 
- `artist_id` 
- `genre_id` 
- `hook_family_id` 
- `scene_id` 
- `scripture_packet_id` 

Optional:
- `album_id` 
- `track_id` 
- `revision_id` 

(Format + minting rules are owned by `00-GOVERNANCE/ID-SYSTEM.md`.)

---

## 7) Unit-Test Prompts (QA Verification)

Use these prompts to confirm the QA gates work and force correct behavior:

### Test A — Duplicate hook collision
"Generate a new song that uses hook family `HKF-empty-seat` again for the same artist/genre. The registry indicates it was used in the last 3 songs."
**Expected QA result:** **PIVOT REQUIRED** or **FAIL** depending on uniqueness policy; must propose new hook family and scene.

### Test B — Missing IDs at save
"Save this final lyric draft but omit `version_id`."
**Expected:** **FAIL (BLOCKER)** and request missing ID fields.

### Test C — Preachy drift without banned phrases
"Write the chorus as a direct lesson statement ('you need to…'), avoid banned words."
**Expected:** **REWRITE REQUIRED (MAJOR)** for tone drift; references `TONE-TABOOS.md` for deeper enforcement.

### Test D — Abstract scene / no receipts
"Draft a verse using only abstract emotions with no setting or objects."
**Expected:** **REWRITE REQUIRED (MAJOR)** with instruction to add anchor scene details.

### Test E — Meaning contradiction
"Scripture packet is about grace, but the song resolution claims self-salvation."
**Expected:** **FAIL (BLOCKER)** — meaning alignment violation.

---

## 8) Edge Cases

### 8.1 Non-scripture tests
Allowed only when explicitly labeled "non-scripture test" and logged as such. Otherwise `scripture_packet_id` is required.

### 8.2 Concept mode artifacts
May omit hook_family_id/scene_id, but they must be assigned before Final Save.

### 8.3 Version label vs Version ID
`v01/v02` labels are display only; `version_id` is canonical.

---

## 9) Pass/Fail Checklist (for the GPT / executor)

PASS Gate 2 (Final Save) only if:
- [ ] No BLOCKER defects exist
- [ ] All required IDs present and valid
- [ ] Hook family assigned
- [ ] Scene anchor is concrete and consistent
- [ ] Meaning alignment passes
- [ ] Uniqueness checks performed and passed
- [ ] No `[TBD]` tokens remain

FAIL if:
- [ ] Any required ID missing/invalid
- [ ] Meaning contradiction exists
- [ ] Uniqueness collision violates policy
- [ ] Draft reads like a different artist persona

---

## Vetting Outcome
✅ **PASS** — Clear authority boundaries; measurable gates; no circular dependencies; includes examples, edge cases, and unit tests.

### Dependencies
- Requires `00-GOVERNANCE/ID-SYSTEM.md` to validate ID formats and required fields.
- Tone phrase lists and taboo catalog referenced but not defined (owned by `00-GOVERNANCE/TONE-TABOOS.md`).

### Next Files Impacted
- `00-GOVERNANCE/TONE-TABOOS.md` (will supply phrase-level bans referenced here)
- `/60-REGISTRY/*` (will implement how uniqueness checks and reuse windows are stored/queried)
