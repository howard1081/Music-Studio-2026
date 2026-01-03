# 60-REGISTRY/SCENE-INDEX.md

## Contract
**Purpose:** Define the SCENE-INDEX schema and scene fingerprinting requirements used to prevent "same song, different words." SCENE-INDEX answers: "Have we already written this scene archetype too recently (or exactly)?"

**This file OWNS (authoritative):**
- SCENE-INDEX record schema (fields + required/optional)
- Scene fingerprint schema (the compact signature fields)
- Collision rules (exact vs soft collisions) and required executor responses
- Append/update rules

**This file DOES NOT OWN (references-only):**
- ID formats and minting (owned by `00-GOVERNANCE/ID-SYSTEM.md`)
- Hook reuse policy (owned by `60-REGISTRY/HOOK-INDEX.md`)
- Scripture reuse policy (owned by `60-REGISTRY/SCRIPTURE-INDEX.md`)
- Song mapping (owned by `60-REGISTRY/SONG-INDEX.md`)
- Tone bans (owned by `00-GOVERNANCE/TONE-TABOOS.md`)

---

## 1) Storage Format
Recommended:
- `60-REGISTRY/data/scene-index.jsonl` (append-only)

---

## 2) Fingerprint Philosophy (Canonical)
A scene fingerprint is meant to be:
- small enough to log every time
- structured enough to compare
- stable enough that "same scene" hits the same signature even across rewrites

Fingerprinting is not NLP-heavy by default; it's a structured tag set.

---

## 3) SCENE-INDEX Schema (Authoritative)

### 3.1 SCENE record schema
```json
{
  "record_type": "SCENE",

  "scene_id": "SCN-YYYYMMDD-HHMM-RAND4",
  "artist_id": "ART-<slug>",
  "genre_id": "GEN-<slug>",

  "work_id": "WORK-YYYYMMDD-HHMM-RAND4",
  "version_id": "VER-YYYYMMDD-HHMM-RAND4",
  "run_id": "RUN-YYYYMMDD-HHMM-RAND4",

  "scene_role": "setup|pressure|collapse|turn|aftermath|anchor",

  "fingerprint": {
    "setting_archetype": "string",
    "time_archetype": "string",
    "primary_props": ["string"],
    "primary_actions": ["string"],
    "dominant_emotion": "string",
    "turn_trigger_type": "string",
    "conflict_axis": "string"
  },

  "fingerprint_hash": "string",

  "created_utc": "YYYY-MM-DDTHH:MMZ",
  "last_used_utc": "YYYY-MM-DDTHH:MMZ",

  "notes": "string"
}
```

**Required fields:**
- `record_type`, `scene_id`, `artist_id`, `genre_id`, `work_id`, `version_id`, `run_id`, `scene_role`, `fingerprint`, `created_utc`

**Rules:**
- `scene_role` should be `anchor` for the primary anchor scene if known.
- `last_used_utc` may equal `created_utc` on first insert.

---

## 4) Fingerprint Field Definitions (Authoritative)

### 4.1 setting_archetype
Short label for the setting category, examples:
- `parking_lot`, `kitchen`, `stairwell`, `backstage`, `bedroom_floor`, `highway_pull-off`, `bar_backdoor`, `hospital_lot`

### 4.2 time_archetype
Examples:
- `late_night`, `early_morning`, `after_shift`, `sunday_morning`, `winter_evening`

### 4.3 primary_props (1–5)
Concrete items central to the scene:
- `keys`, `ring`, `phone_screen`, `setlist`, `receipt`, `tissue`, `duffel`, `lighter`

### 4.4 primary_actions (1–5)
What the narrator is doing:
- `dialing`, `packing`, `sitting_in_silence`, `driving`, `pacing`, `texting`, `kneeling`, `throwing_away`

### 4.5 dominant_emotion (1)
Single dominant emotion:
- `shame`, `relief`, `rage`, `grief`, `fear`, `numbness`, `longing`, `gratitude`

### 4.6 turn_trigger_type (1)
What triggers the turn:
- `message_received`, `silence_breaks`, `memory_hits`, `consequence_lands`, `mercy_shown`, `confession_spills`, `help_asked`

### 4.7 conflict_axis (1)
What the conflict fundamentally is:
- `pride_vs_need`, `control_vs_surrender`, `escape_vs_face_it`, `shame_vs_grace`, `anger_vs_mercy`, `love_vs_fear`

---

## 5) Fingerprint Hashing (Recommended)
To detect exact collisions:

`fingerprint_hash = hash of a normalized fingerprint JSON` (sorted keys, lowercase strings)

Algorithm is tooling-defined; the schema stores the output only.

---

## 6) Collision Rules (Executor Requirements)

### 6.1 Exact collision (BLOCKER by default)
Exact collision means:
- same `fingerprint_hash` exists for the same artist+genre lane within the reuse window (or at all, depending on strictness)

Default action:
- **PIVOT REQUIRED** (new anchor scene fingerprint), unless override logged.

### 6.2 Soft collision (MAJOR by default)
Soft collision means:
- shares 2+ of: `setting_archetype`, `primary_props` overlap, `turn_trigger_type`, `conflict_axis`
- but not exact hash match.

Default action:
- Allowed only if hook family and angle differ significantly; otherwise **REWRITE REQUIRED** to differentiate.

### 6.3 Overrides
If executor proceeds with collision:
- Must log override in `OVERRIDES-LOG` with scope = fingerprint hash + lane.

---

## 7) Minimal Queries (Must be possible)
- "Has this `fingerprint_hash` existed for `ART_y` + `GEN_z`?"
- "Show recent anchor scenes for a lane"
- "List collisions in last N days"

---

## 8) Pass/Fail Checklist

PASS if:
- [ ] Fingerprint schema is compact and usable
- [ ] Exact and soft collision concepts are separable
- [ ] Executor response rules (pivot/override) are explicit

FAIL (BLOCKER) if:
- [ ] No way to detect exact repeats
- [ ] Fingerprints are unstructured free text only

---

## Vetting Outcome
✅ **PASS** — Clear fingerprint schema, collision logic, and enforceable executor behaviors without redefining IDs.

### Dependencies
- ID formats per `00-GOVERNANCE/ID-SYSTEM.md`.
- Overrides referenced in `60-REGISTRY/OVERRIDES-LOG.md`.

### Next Files Impacted
- `60-REGISTRY/SCRIPTURE-INDEX.md`
- `60-REGISTRY/RUN-INDEX.md`
- `60-REGISTRY/OVERRIDES-LOG.md`
