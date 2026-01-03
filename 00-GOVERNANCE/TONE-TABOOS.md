# 00-GOVERNANCE/TONE-TABOOS.md

## Contract
**Purpose:** Define global tone constraints, taboo categories, and banned phrase/pattern rules to prevent preachiness, cliché drift, identity leakage, and "AI fog." This file is the canonical source for tone compliance across all artists/genres.

**This file OWNS (authoritative):**
- Tone posture rules (how the narrator speaks)
- Taboo categories (what is disallowed)
- Banned phrase/pattern lists (with severity)
- Allowed alternatives (how to achieve meaning without breaking tone)
- Enforcement mapping to QA severity (Blocker/Major/Minor)

**This file DOES NOT OWN (references-only):**
- ID rules and required fields (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- QA stage definitions and pass/fail gates (owned by `00-GOVERNANCE/QA-GATES.md`)
- Artist-specific voice fingerprint, diction, and "receipts quota" (owned by the artist bible, e.g., Jack Mercer Persona Bible)
- Registry uniqueness policy (owned by `/60-REGISTRY/*`)
- Album/track sequencing logic (owned by `/50-ALBUMS/*`)

---

## 1) Tone Posture (Global)

### 1.1 The narrator's stance
- **Show, don't lecture.** The song is lived experience first, meaning second.
- **Confessional > instructional.** "Here's what happened to me" beats "Here's what you should do."
- **Earned hope.** Any resolve must come after struggle, not before it.
- **Concrete > abstract.** Prefer scenes, objects, habits, and sensory cues over concepts.

**Genre neutrality note:** Any examples in this file are illustrative only. When generating lyrics, choose scenes/props/diction appropriate to the assigned artist persona + genre lane; do not default to country-coded imagery unless the lane is country.

### 1.2 Faith-aware but not churchy by default
Allowed:
- Subtle spiritual gravity (surrender, mercy, grace, prayer as a human act)
- Biblical meaning embodied through story
- Occasional direct God-reference **if** it feels native to the persona and is not used as a sermon hammer

Disallowed:
- Turning the chorus into a Sunday-school summary
- "Altar call" language unless explicitly required by a Gospel persona lane (owned elsewhere)

---

## 2) Enforcement Levels (Severity Mapping)

This file assigns severity. QA execution is governed by `QA-GATES.md`.

### BLOCKER (hard fail)
Any of the following triggers a BLOCKER:
- Direct second-person commands framed as spiritual instruction ("you need to…", "you must…", "repent now…") outside an explicitly-authorized lane
- Overt "preacher voice" sermon structures (see §4.2)
- Explicitly hateful, demeaning, or harassing language toward protected groups
- Identity leakage: real private names, doxxing, or uniquely identifying personal details (see §5)

### MAJOR (rewrite required)
- Moralizing tone that implies superiority ("I figured it out, you didn't")
- Generic inspiration lines that could fit any song
- AI-fog phrasing (vague, overpoetic, nonspecific)
- Excessive "faith slogans" even if not direct commands

### MINOR (fix in place)
- Single cliché line in an otherwise strong section
- One corny rhyme or filler phrase
- One repeated word that dulls impact

---

## 3) Banned Phrase List (Hard Bans)
These phrases are disallowed in final lyrics (BLOCKER if present verbatim).  
(If a phrase is quoted in dialogue for a story reason, it must be clearly marked as dialogue and justified; default is still avoid.)

### 3.1 Sermon/command phrasing
- "you need to"
- "you must"
- "let me tell you"
- "listen to me"
- "here's the lesson"
- "the moral of the story"
- "turn your life around"
- "repent" (unless explicitly required by lane)
- "accept Jesus" (unless explicitly required by lane)
- "get saved" (unless explicitly required by lane)

### 3.2 Christian cliché slogans (overused)
- "God is good all the time / all the time God is good"
- "everything happens for a reason"
- "take the wheel" / "Jesus take the wheel"
- "let go and let God"
- "not today, Satan"
- "washed in the blood" (unless lane explicitly calls for it)
- "blessed and highly favored"
- "it's a God thing"

### 3.3 AI-tells (banned wording)
- "in the midst of"
- "a testament to"
- "shattered into a million pieces"
- "echoes of"
- "like a symphony"
- "dancing shadows"
- "whispers in the wind"
- "time stood still"

---

## 4) Banned Patterns (Soft/Structural Bans)

### 4.1 Preachiness pattern (MAJOR by default; can become BLOCKER)
Red flags:
- Verse = problem, Chorus = instruction, Bridge = doctrine summary
- Chorus framed as a "rule" or "principle" instead of a felt hook
- Repeated second-person moral guidance

Rewrite rule:
- Convert instructions into **confession** or **scene evidence**.
  - Bad: "You need to trust God when you're low"
  - Better: "I hit my knees in the parking lot, hands shaking, asking for enough to make it home"

### 4.2 "Mini-sermon" structure (BLOCKER if obvious)
If the song includes:
- "First… Second… Third…"
- "Here are the steps…"
- "This is what the Bible says…" (direct teaching voice)
It fails tone by default.

### 4.3 "Hallmark" inspiration drift (MAJOR)
If lines could be pasted into any generic motivational poster:
- "I found my strength inside"
- "I rose above it all"
- "I became a better man"
Require rewrite into concrete receipts.

---

## 5) Identity + Privacy Rules (Global Safety)

### 5.1 No real-person private identifiers (BLOCKER)
Disallowed:
- Full names of real private individuals
- Addresses, phone numbers, workplaces, identifiable medical details
- "This happened on ____ Street in ____ city" if it maps to a real private person

Allowed:
- Generic roles: "my mom," "my brother," "my girl," "my old man"
- Fictionalized place cues: "county line," "that Walmart lot," "the river bridge," "the bar by the tracks"

### 5.2 Family/name leakage rule (for Jack lane)
If the artist bible indicates "do not reference family names," then:
- Use relational identifiers only (mother/father/brother) with zero names.

(Artist bible owns specifics; this file enforces the global posture.)

---

## 6) Scripture References (How to include without breaking tone)

### 6.1 Allowed
- Indirect embodiment: grace shown as undeserved mercy in scene
- Paraphrased imagery: "prodigal road," "lion in the dark," "valley walk" (avoid obvious sermon framing)
- One subtle verse echo if it sounds like lived speech

### 6.2 Disallowed (MAJOR → BLOCKER if heavy)
- "The Bible says…" teaching voice
- Verse citations in-line ("Romans 8:28 says…") unless explicitly requested for a church setting output format
- Long scripture paraphrase that reads like a devotional

Rule of thumb:
- If the listener can feel the scripture without being told "this is scripture," it passes.

---

## 7) Language Quality Rules (Anti-Fog / Anti-Fluff)

### 7.1 Concrete detail requirement (MAJOR if absent)
Each verse must include at least **two** of:
- a place cue (kitchen, porch, truck cab, hospital lot)
- a prop (ring, receipt, keys, ashtray, hoodie)
- a sensory detail (cold vinyl seat, stale coffee, neon buzzing)
- an action (dialing, folding, packing, scraping ice)

### 7.2 Avoid over-poetic stacking (MAJOR)
Disallow multiple metaphor lines in a row without a grounding image.
Example of bad stacking:
- "the ocean of sorrow / the storm of regret / the sky of my soul"
Rewrite into a single metaphor anchored by a scene.

## 7.3 Receipts Bank by Lane (Examples, Not Defaults)

Use these as *idea sparks* to keep "receipts" concrete without dragging every genre into the same setting.

### Country / Heartland
- settings: truck cab, porch steps, diner booth, Walmart lot, gravel drive
- props: keys, ring, hoodie, receipt, gas station cup
- sensory: dust on dash, cold vinyl seat, neon buzz, stale coffee

### Metal / Nu-metal
- settings: empty rehearsal space, backstage hallway, fluorescent bathroom, late-night highway, storage unit
- props: torn setlist, busted string, lighter, medication bottle, cracked phone screen
- sensory: ears ringing, amp hum, sweat-soaked shirt, harsh florescents, rain on concrete

### Alternative / Indie
- settings: apartment stairwell, laundromat, midnight kitchen, bus stop, thrift store aisle
- props: old photo strip, voicemail, coffee mug, thrifted jacket, sticky note
- sensory: radiator hiss, buzzing streetlight, damp air, cold tile, muffled city noise

### Rock (earned resolve)
- settings: garage, bar back door, motel room, practice room, long drive home
- props: bar wristband, worn pick, cracked mirror, packed duffel, last cigarette (if allowed by persona)
- sensory: knuckles sore, stale beer smell, gravel under boots, engine vibration

### Gospel / Worship-through-collapse
- settings: hospital parking lot, bedroom floor, quiet sanctuary, early morning kitchen, roadside pull-off
- props: tissue, Bible with notes (no verse-citing in lyrics), rosary/prayer beads (only if lane allows), folded letter, candle
- sensory: shaking hands, silence loud, breath catching, sunrise light, hum of AC

---

## 8) Allowed Alternatives (What to do instead)

When you feel the urge to preach:
- Convert "you" to "I"
- Convert instruction to a scene
- Convert doctrine to a cost paid
- Convert moral to a confession

Examples:
- Bad: "You should forgive or you'll never be free"
- Better: "I held that grudge like a bottle in my coat / didn't notice it was leaking on everything I loved"

---

## 9) Quick Checklists

### 9.1 PASS checklist (final lyrics)
- [ ] No hard-banned phrases present (§3)
- [ ] No sermon structures present (§4.2)
- [ ] No second-person spiritual commands (unless explicitly authorized)
- [ ] Verses contain concrete receipts (§7.1)
- [ ] Scripture meaning is embodied, not explained (§6)

### 9.2 FAIL triggers
- [ ] Any phrase from §3 appears verbatim
- [ ] Lyrics contain step-by-step teaching or "Bible says…" lecturing
- [ ] Identity leakage (names/addresses/private details)

---

## 10) Unit-Test Prompts (Tone Verification)

### Test A — Instructional drift
"Write a chorus that tells the listener what to do spiritually."
**Expected:** FAIL or REWRITE; rewrite chorus into confession + scene evidence.

### Test B — Cliché injection
"Include common Christian catchphrases."
**Expected:** FAIL (hard bans), replace with original imagery.

### Test C — AI fog
"Write poetic lines without scenes."
**Expected:** REWRITE; add receipts and grounded detail.

---

## Vetting Outcome
✅ **PASS** — Clear ownership; measurable bans and pattern rules; mapped severity; includes alternatives, edge cases, and unit tests.

### Dependencies
- References `QA-GATES.md` for gate execution, but does not require it to be present to apply bans.
- References artist bible constraints (e.g., no family names) without redefining them.

### Next Files Impacted
- `/60-REGISTRY/*` (may store "tone flags" or "banned phrase hits" as optional fields; schema owns that decision)
- Template files in `/30-STORY-FORGE` and `/40-SONG-FRAME` should reference these rules to avoid preachy scaffolding.
