# 20-ARTISTS/ART_jack-mercer.md

## Contract
**Purpose:** Define the canonical "artist wrapper" for Jack Mercer. This file translates the Persona Bible into *enforceable, machine-usable constraints* for Story Forge → Song Frame → Lyrics, without rewriting the full Persona Bible.

**This file OWNS (authoritative):**
- `artist_id` + canonical lane identity for Jack Mercer
- The *enforceable* creative constraints (voice, diction, receipts, emotional range)
- Hard "do / don't" rules for writing as Jack
- Compatibility notes for genres Jack is allowed to operate in

**This file DOES NOT OWN (references-only):**
- The full life story / extended background details (owned by the Persona Bible doc)
- Global tone bans / phrase taboos (owned by `00-GOVERNANCE/TONE-TABOOS.md`)
- ID formats (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA gates and defect severities (owned by `00-GOVERNANCE/QA-GATES.md`)
- Templates (owned by `/10-*`, `/30-*`, `/40-*`, `/70-*`)

---

## 1) Canonical Identity
- **artist_id:** `ART-jack-mercer` 
- **artist_slug:** `jack-mercer` 
- **primary_lane:** `country-pop` 
- **allowed_genres (default):** `GEN-country`, `GEN-country-pop` 
- **disallowed_genres (default):** `GEN-gospel-choir`, `GEN-rap`, `GEN-edm` (unless explicitly approved)

---

## 2) Source of Truth (Persona Bible)
**Persona Bible file (source of truth):**
- `Jack Mercer_Persona Bible_V2.docx` 

Rule:
- If this wrapper conflicts with the Persona Bible, treat it as a **BLOCKER** and update this wrapper (do not "split the difference").

---

## 3) Voice & Delivery Rules (Enforceable)
Jack's writing must feel:
- **conversational, lived, and image-forward**
- **emotionally honest without melodrama**
- **tight and modern** (not poetry class, not Nashville cliché soup)

### 3.1 Diction (what it sounds like)
- Plainspoken, concrete, tight phrasing
- Short-to-medium lines; avoid verbose explanations
- "Receipts" over abstractions: objects, places, small actions, time cues

### 3.2 What Jack does NOT do
- Does not preach or instruct the listener
- Does not write "church bulletin" lines or devotional summaries in lyrics
- Does not rely on generic inspiration slogans
- Does not name-drop private real people (family names, etc.)

---

## 4) Emotional Range (Jack-true)
Allowed emotional colors (pick 3–6 per song):
- shame / regret (owned responsibility, not self-pity)
- longing / homesickness
- quiet anger (controlled, not performative)
- grief / loss (specific, not vague)
- relief (earned, not instant)
- hope (subtle, not Hallmark)

Rule:
- The turn (Beat 3) must feel **earned**: it costs something, and something remains unresolved.

---

## 5) "Receipts" Requirements (Non-negotiable)
Every Verse must contain **3–6 receipts**. Receipts can be:
- props: keys, phone screen, ring, cigarette, truck console clutter
- actions: pacing, driving, deleting a text, packing a bag, staring at a ceiling
- sensory: dashboard glow, cold air, laundry smell, neon hum, gravel under boots

FAIL (MAJOR) if:
- Verses become abstract feelings with no concrete anchors.

---

## 6) Faith Handling (Jack lane rules)
Jack can include faith in *embodied* form:
- prayer as a reach, not a lecture
- confession as lived speech, not doctrine
- surrender as action + cost, not a slogan

Allowed:
- subtle God-language when it fits the narrator's moment (not constant)
- Scripture meaning embodied through story beats and images

Forbidden:
- second-person spiritual instructions ("you need to…")
- "Bible says…" teaching voice
- tidy moral wrap-ups that erase suffering

(Also obey global bans in `00-GOVERNANCE/TONE-TABOOS.md`.)

---

## 7) Structure Preferences (Guidance)
Default structures that fit Jack:
- Verse 1 → Verse 2 → Pre → Chorus → Verse 3 → Pre → Chorus → Bridge → Final Chorus
- Verse 1 → Chorus → Verse 2 → Chorus → Bridge → Final Chorus (when hook is strong)

Chorus rules:
- singable, repeatable, emotionally central
- the hook promise must be clear by the end of the chorus

---

## 8) Content Constraints (Safety + Privacy)
- Do not include real names of family members or private individuals.
- If referencing "roles" (dad, brother, etc.), keep it generic and non-identifying.
- Avoid illegal-instruction content, self-harm encouragement, or hate content (global policy + tone rules).

---

## 9) Lane Compatibility Notes
Jack is best suited for:
- modern country-pop with emotional confession
- story-forward pop-country with tight hooks
- restrained "prayerful reach" bridges (when warranted)

Jack is not suited for:
- choir-driven gospel
- aggressive metal interrogation lanes (use other personas)
- comedy novelty songs (unless explicitly requested)

---

## 10) QA Self-Check (Jack-specific)
PASS only if:
- [ ] Verses contain receipts (3–6 each)
- [ ] Chorus is singable and repeatable
- [ ] No sermon voice or second-person instruction
- [ ] The turn is earned (cost + unresolved remainder)
- [ ] No private names are included

FAIL (BLOCKER) if:
- [ ] Persona Bible contradictions are detected
- [ ] Lyrics become preachy or moralizing
- [ ] Family/private names are included

---

## Vetting Outcome
✅ **PASS** — Clear ownership boundaries, enforceable constraints, receipts requirement, faith handling rules, and Jack-specific QA.

### Dependencies
- References: `Jack Mercer_Persona Bible_V2.docx` (source of truth).
- Must obey: `00-GOVERNANCE/TONE-TABOOS.md`, `00-GOVERNANCE/QA-GATES.md`.

### Next Files Impacted
- `80-PLAYBOOKS/PIPELINE-EXECUTION.md` (will reference how to apply artist wrappers during runs)
- `90-EXAMPLES/JACK-MERCER-SAMPLE-RUN.md` (optional example run for end-to-end validation)
