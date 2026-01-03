# 90-EXAMPLES/JACK-MERCER-SAMPLE-RUN.md

## Contract
**Purpose:** Provide a complete, realistic example of the pipeline in action for Jack Mercer—showing how the artifacts connect, how IDs flow, how receipts appear, and how QA + registry decisions are recorded. This is a validation harness, not a "best song."

**This file OWNS (authoritative):**
- Example-only content demonstrating correct usage of templates
- A reference wiring diagram from packet → story → frame → lyrics header → registry records

**This file DOES NOT OWN (references-only):**
- Any schema, policies, or rules (those live in governance/templates/registry)
- Any "canonical" creative decisions for Jack (artist wrapper is authority)

---

## 0) Example Notes
- IDs here are plausible examples. In real runs, mint fresh IDs per `ID-SYSTEM.md`.
- This example is intentionally short and focused on *wiring correctness*.

---

## 1) Lane Selection
- artist_id: `ART-jack-mercer` 
- genre_id: `GEN-country-pop` 
- machine_id: `C1` 
- run_id: `RUN-20260102-2140-A7K2` 

---

## 2) Scripture Meaning Packet (Excerpt)
- scripture_packet_id: `SCR-20260102-2141-K3P9` 
- scripture_reference: `Psalm 34:18` 
- core_claim: "God draws near to the brokenhearted; He doesn't despise collapse—He meets it."
- movement:
  - Beat 1 (start): confident self-management, pretending fine
  - Beat 2 (pressure): consequences land, isolation grows
  - Beat 3 (turn): admits need; reaches for help without pretending it fixes everything
- imagery (top):
  - "near"
  - "brokenhearted"
  - "crushed spirit"
- drift warnings:
  - "instant fix ending"
  - "preachy conclusion"
  - "moral superiority"

Story seeds (receipts):
- truck cab glow at 2 a.m., phone vibrating
- motel ice machine hum, cheap carpet smell
- keys dropped on counter, silence too loud

---

## 3) Story Forge (Excerpt)
- story_id: `SF-20260102-2145-Q1M6` 
- anchor_scene_id: `SCN-20260102-2149-Z9H4` 

Scene list:
- `SCN-20260102-2146-R8D3` (setup) — kitchen at midnight, keys on counter
- `SCN-20260102-2147-L2W1` (pressure) — truck cab, dashboard glow, unsent text
- `SCN-20260102-2149-Z9H4` (anchor/collapse) — motel hallway, ice machine, sitting on carpet
- `SCN-20260102-2151-N5C8` (turn) — parking lot, phone call, "I can't do this alone"
- `SCN-20260102-2153-P4J0` (aftermath) — sunrise drive, still hurting but not hiding

Turn definition:
- trigger: a voicemail he can't ignore
- cost: admitting he's not in control
- new posture: asks for help, stops pretending
- unresolved: still alone in the car; nothing magically fixed

---

## 4) Song Frame (Excerpt)
- song_frame_id: `SFR-20260102-2156-V6T2` 
- hook_family_id: `HKF-near-in-the-wreckage` 
- structure: Option A

Receipts map:
- Verse 1: keys, counter, sink drip, hoodie on chair
- Verse 2: dashboard glow, unsent text, low fuel light
- Chorus: "near," "wreckage," "hands shaking"
- Bridge: motel carpet, ice machine hum, cracked prayer

Chorus mechanics:
- central image: "near in the wreckage"
- contradiction: "I ran from You / You ran toward me"
- release: "I finally said I'm not okay"
- last line intent: the line that sticks repeats the central image

---

## 5) Draft Lyrics (Short Example)
Gate 1 intent: demonstrate wrapper + receipts + non-preach.

```yaml
id_header:
  work_id: WORK-20260102-2205-D1S4
  version_id: VER-20260102-2206-H8Q3
  version_label: v01
  run_id: RUN-20260102-2140-A7K2

  artist_id: ART-jack-mercer
  genre_id: GEN-country-pop

  scripture_packet_id: SCR-20260102-2141-K3P9
  hook_family_id: HKF-near-in-the-wreckage
  scene_id: SCN-20260102-2149-Z9H4

  story_id: SF-20260102-2145-Q1M6
  song_frame_id: SFR-20260102-2156-V6T2
  album_id: TBD
  track_id: TBD
  revision_id: TBD
```

# Title: Near In The Wreckage

## Lane
- Artist: ART-jack-mercer
- Genre: GEN-country-pop
- Hook Family: HKF-near-in-the-wreckage
- Scripture Packet: SCR-20260102-2141-K3P9

**[Verse 1]**  
Keys on the counter, sink won't quit drip-drip  
Hoodie on the chair like you might still fit  
I told myself "fine" like I practiced it  
But the silence in this house don't buy it

**[Verse 2]**  
Dashboard glow, 2 a.m. making me honest  
Low fuel light, same way my pride's running on it  
Thumb over "send" on a text I never wanted  
If I say it out loud, it becomes real

**[Chorus]**  
I was running from You in my own loud head  
But You got close when the whole thing bled  
Hands shaking, breathing like I can't catch it  
Yeah, You were near in the wreckage

**[Bridge]**  
Motel carpet, ice machine humming  
I tried to pray but my words kept stunting  
All I got was "help" and it felt like nothing  
Still… it felt like You heard it

---

## QA Snapshot
- Gate 1 (Draft Lyrics): PASS WITH MINOR FIXES
- Gate 2 (Final Save): PASS
- Tone flags (if any): none
- Uniqueness checks: PASS

## Notes
- tighten Verse 1 line 4 for singability
- keep chorus last line exact for repeat

---

## 6) Uniqueness Preflight (Example Results)
- HOOK reuse: PASS
- SCENE fingerprint: PASS
- SCRIPTURE reuse: PASS

No overrides used.

---

## 7) Registry Record Examples (JSONL snippets)

### 7.1 SONG-INDEX VERSION record
```json
{"record_type":"VERSION","work_id":"WORK-20260102-2205-D1S4","version_id":"VER-20260102-2206-H8Q3","version_label":"v01","run_id":"RUN-20260102-2140-A7K2","artist_id":"ART-jack-mercer","genre_id":"GEN-country-pop","title":"Near In The Wreckage","title_slug":"near-in-the-wreckage","hook_family_id":"HKF-near-in-the-wreckage","scripture_packet_id":"SCR-20260102-2141-K3P9","scripture_reference":"Psalm 34:18","scene_id":"SCN-20260102-2149-Z9H4","story_id":"SF-20260102-2145-Q1M6","song_frame_id":"SFR-20260102-2156-V6T2","qa_gate2":"PASS","uniqueness_hook":"PASS","uniqueness_scene":"PASS","uniqueness_scripture":"PASS","saved_filepath_abs":"C:\\Users\\howar\\CascadeProjects\\Music-Studio-2026\\Songs\\Country\\Jack-Mercer\\WORK-20260102-2205-D1S4__v01__near-in-the-wreckage.md","created_utc":"2026-01-02T22:06Z","notes":"example record"}
```

### 7.2 SCENE-INDEX record (fingerprint)
```json
{"record_type":"SCENE","scene_id":"SCN-20260102-2149-Z9H4","artist_id":"ART-jack-mercer","genre_id":"GEN-country-pop","work_id":"WORK-20260102-2205-D1S4","version_id":"VER-20260102-2206-H8Q3","run_id":"RUN-20260102-2140-A7K2","scene_role":"anchor","fingerprint":{"setting_archetype":"motel_hallway","time_archetype":"late_night","primary_props":["ice_machine","carpet","phone"],"primary_actions":["sitting","staring","calling"],"dominant_emotion":"numbness","turn_trigger_type":"help_asked","conflict_axis":"pride_vs_need"},"fingerprint_hash":"<hash>","created_utc":"2026-01-02T22:07Z","last_used_utc":"2026-01-02T22:07Z"}
```

---

## 8) Pass/Fail Checklist (Example)
PASS if the operator can trace:
- scripture_packet_id → story_id → song_frame_id → lyrics header → registry records → saved filepath

✅ In this example, all links exist and use consistent IDs.

---

## Vetting Outcome
✅ **PASS** — Demonstrates end-to-end wiring, receipts usage, correct header placement, QA snapshot, uniqueness outcomes, and registry snippets without redefining rules.

### Dependencies
Uses templates and policies by reference only:
- `10-SCRIPTURE-LIBRARY/PACKET-TEMPLATE.md`
- `30-STORY-FORGE/STORY-FORGE-TEMPLATE.md`
- `40-SONG-FRAME/SONG-FRAME-TEMPLATE.md`
- `50-GENERATION/RUN-LOG-TEMPLATE.md`
- `70-OUTPUT/LYRICS-SAVE-TEMPLATE.md`
- `/60-REGISTRY/*`

### Next Files Impacted
- None required. This is an example harness.
