# Product Requirements Document
## For Momo — A Cinematic Anniversary Experience

**Author:** Fusco (Ignatius Emeka Joshua)
**Version:** 1.0
**Date:** June 2026
**Classification:** Personal / Private

---

## Table of Contents

1. Executive Summary
2. Vision & Experience Philosophy
3. The Narrative Arc (The Full Journey)
4. Phase Specifications
5. 3D & Animation Architecture
6. Audio Architecture
7. Visual Design System
8. Technical Architecture
9. Content Requirements
10. Performance & Compatibility
11. Deployment Plan
12. Open Questions & Decisions

---

## 1. Executive Summary

**What this is:**
A private, cinematic, one-time web experience built for one specific person — Momo — to mark a relationship anniversary. It is not a website. It is not a web app. It is a *journey*. When she clicks the link, she enters a fully immersive, multi-phase experience with 3D environments, ambient sound per scene, animated memory reveals, and a personal love letter as the emotional finale.

**The one-line pitch:**
> "An interactive short film she walks through — built entirely out of your story."

**What makes this different from a standard anniversary page:**
- Every phase has a distinct 3D environment with particles, depth, and camera movement
- Every phase has its own musical atmosphere that crossfades between transitions
- There is a narrative arc with a beginning, middle, climax, and resolution — not just a gallery
- Navigation feels like *traveling through space*, not scrolling a page
- The experience is personalized at every frame — nothing is generic

**Target User:**
A single person: Momo. She will receive a link on or before June 19, 2026.

---

## 2. Vision & Experience Philosophy

### 2.1 The Guiding Metaphor

Think of a **film reel**. Each memory is a frame. She is watching your relationship projected — but she is also *inside* the projection. The vintage film aesthetic (grain, warmth, perforations, soft light leaks) grounds the experience in memory and nostalgia, while the 3D dimension makes it feel alive and present.

### 2.2 Core Principles

**Principle 1 — Every second is intentional.**
Nothing happens without purpose. Every animation, every particle, every musical note serves the emotional state of that phase. No decoration for decoration's sake.

**Principle 2 — It should feel like she's being held.**
The pace is slow, warm, and unhurried. She should never feel rushed. Auto-transitions are generous. Text appears at reading speed, not scroll speed.

**Principle 3 — Sound is not a feature, it is a co-author.**
The audio experience is designed with the same intentionality as the visuals. Phase music doesn't just play in the background — it shapes the emotional colour of each scene. Silence and crescendo are both tools.

**Principle 4 — Real specificity over beautiful generics.**
A placeholder memory with beautiful 3D is worthless. A real memory with a simple design is gold. The content (your actual memories, your actual words) is the product. Everything else is the frame.

**Principle 5 — Mobile-first, degrade gracefully.**
She is almost certainly going to open this on her phone. The experience should feel equally complete on mobile — simplified particle counts, adapted layouts, but the same emotional journey.

---

## 3. The Narrative Arc

The experience is structured as **5 Acts**, each with a distinct emotional register. Together they form a complete arc.

```
ACT I           ACT II          ACT III          ACT IV          ACT V
Invitation  →   The Gate    →   The Reveal   →   The Journey  →  The Letter
 (Wonder)       (Playfulness)    (Climax)         (Nostalgia)     (Intimacy)
```

### The Emotional Journey

| Act | Emotional State | Her Inner Experience |
|-----|----------------|----------------------|
| I — Invitation | Wonder, curiosity | "What is this? Who sent this?" |
| II — The Gate | Playfulness, recognition | "These are things only I would know..." |
| III — The Reveal | Surprise, joy, emotion | "Oh. Oh wow. He did all this." |
| IV — The Journey | Nostalgia, warmth, tenderness | "I remember this. I remember all of this." |
| V — The Letter | Intimacy, love, tears (happy) | "This is real. He really means this." |

### Scene Transition Logic

Each act flows into the next through a *portal transition* — a cinematic moment where the camera appears to fly through a point of light or through a film frame into the next environment. These transitions are 1.5–2 seconds, scored with a brief audio crossfade.

---

## 4. Phase Specifications

---

### ACT I — The Invitation

**Purpose:** First impression. Establish that this is unlike anything she's opened before.

**Environment:**
- Deep space aesthetic — a near-black background (#080410) filled with a slowly drifting star field (Three.js particle system, ~2,000 points)
- Soft rose-gold nebula clouds in the far background (layered PNG planes with opacity and slow drift)
- Warm light source from below-center — as if lit by something beautiful just out of frame
- Subtle film grain overlay (CSS SVG filter, opacity ~0.04)
- Vignette (CSS radial gradient overlay)

**Animation Sequence (on load):**
1. Screen starts completely black — 1.5s hold
2. Stars fade in slowly (2s fadeIn, staggered per particle)
3. Her name "Momo" materialises letter by letter in the center using 3D TextGeometry — each letter rises from below, fading in, with a soft glow bloom effect
4. Below her name, a fine decorative line draws itself left-to-right (1.2s)
5. Below that: "Someone left something here for you." fades in (0.8s delay)
6. A glowing orb/envelope icon pulses gently in the center
7. A CTA button fades in: "Open it 💕" — when hovered, particles orbit the button like a mini galaxy

**Interactivity:**
- Mouse/gyroscope parallax on the star field — subtle depth as she moves
- The glowing orb responds to mouse proximity (grows slightly, brightens)

**Exit Transition:**
She clicks "Open it" — the camera rushes forward toward the glowing orb as if flying into it. The orb expands into a burst of warm light that whiteouts the screen. Then ACT II begins.

**Music:**
- Genre: Ambient cinematic — soft piano, sparse strings, a sense of gentle wonder
- Suggested feel: Hans Zimmer "Time" (slow), or a lo-fi cinematic ambient track
- Volume: Starts at 0, fades in to 0.6 over 3 seconds after first interaction
- Loops seamlessly

---

### ACT II — The Gate

**Purpose:** Engagement and recognition. She plays a short quiz that proves only she knows this person. Each correct answer is a small celebration.

**Environment:**
- The mood shifts to warm — a golden hour colour palette
- Background: A soft bokeh-style environment with floating golden light particles (warm amber #C9A065 tones)
- Gentle lens flare effects that drift slowly across the scene
- The quiz appears in the center foreground — everything behind it is slightly out of focus (depth of field effect)

**Quiz Structure:**
- 3 to 5 questions (configurable). Each question is isolated — only one visible at a time
- Questions are things only Momo would know: moments, inside jokes, specific details from their relationship
- Questions appear on a floating 3D card with slight perspective rotation (face-forward but with mouse-tracking parallax tilt)
- 4 answer options float around or below the card as interactive orbs or flat rounded tiles

**Correct Answer Flow:**
1. Selected option lights up green with a subtle glow pulse
2. The card shatters into a burst of golden particles that spiral upward and disappear
3. A brief chime sound effect plays
4. 0.6s pause, then the next question slides in from the right with a spring animation

**Wrong Answer Flow:**
1. Selected option flashes red and the card shakes (CSS shake keyframe, 0.4s)
2. A gentle thud/buzz sound plays
3. Options reset — she can try again (no penalty, no blocking)
4. After 2 wrong attempts on same question, a subtle hint appears below the question in italic text

**Progress Indicator:**
- A soft horizontal progress bar at the top of the screen
- Fills from left to right as questions are answered
- Colour: warm rose-gold gradient

**Exit Transition:**
After the final question is answered correctly, the progress bar fills completely and pulses once. All the particles from all the shattered cards converge to the center and implode — then a burst of light out. The light expands, whiting out the screen. ACT III begins.

**Music:**
- Shifts from Act I's ambient to something warmer, slightly more playful
- Crossfade over 2 seconds with Act I music
- Genre: Warm acoustic, subtle beat, lighthearted but beautiful
- Could be a soft acoustic guitar piece or a lo-fi piano track with a gentle rhythm

---

### ACT III — The Reveal

**Purpose:** The emotional climax. The biggest, most cinematic moment in the experience. Everything builds to this.

**Environment:**
- Starts completely dark after the white flash transition
- Then: an explosion of light from the center — a particle burst with radial velocity, hearts, stars, petals, all launching outward from a single point
- Behind the explosion: the background resolves into a warm, glowing world — rose gold tones, soft volumetric light shafts
- Post-processing at its most expressive: bloom cranked up, chromatic aberration on the burst frame, depth of field pulling into focus

**Animation Sequence:**
1. Dark screen, 0.5s hold
2. Particle burst from center — ~500 particles exploding radially outward (hearts 💕, stars ✨, rose petals 🌸)
3. Simultaneous with burst: "Happy Anniversary," appears in large 3D text from below — rising slowly into position
4. Half a second later: "Momo." appears on the next line — the most prominent text on screen
5. Both lines have a soft 3D glow (emissive material, bloom)
6. The text settles and gently floats in place (subtle sinusoidal Y-axis movement, ±2px, 4s period)
7. Below the text: a thin decorative line draws itself, then a subtitle: "Now let me take you back... 🎞️" fades in
8. A continue button pulses gently: "I'm ready →"
9. Auto-advance after 8 seconds if she doesn't tap (with a subtle countdown ring around the button)

**Music:**
- This is the most emotionally significant musical moment
- The PEAK track — the music that represents the relationship most
- Could be: their actual couple song, or a chosen cinematic track
- Starts the moment the particle burst fires — full volume, no gradual fade in
- Should feel like a musical climax: a crescendo, a swell, an arrival
- NOTE: This track should be personally chosen by Fusco with intent

**Sound Effects:**
- The particle burst has a brief whoosh/sparkle sound effect layered over the music
- The text appearance has a very subtle resonant tone (like a singing bowl or soft chime)

---

### ACT IV — The Journey

**Purpose:** The heart of the experience. She travels through 5 to 7 memory scenes, each a distinct 3D world representing a chapter of their relationship.

**Core Navigation Model:**
- She moves between scenes using **left/right arrow buttons** or **swipe gestures** (mobile)
- Each scene is a distinct Three.js environment loaded and pre-warmed in the background
- Navigation is horizontal — like flipping through a book of worlds
- Transition between scenes: camera appears to slide through a film frame (a rectangular portal of white light) into the next scene

**Scene Architecture (per memory):**

Each scene is composed of:

1. **The Environment Layer** — a 3D background unique to this memory's emotional colour
2. **The Frame** — a floating 3D rectangular frame (like a cinema frame or polaroid, tilted slightly in 3D space) that contains the memory photo or an illustrated placeholder
3. **The Label** — a small glowing text tag floating above the frame (e.g. "The Beginning" or "Our First Date") in a warm gold colour
4. **The Title** — a larger serif headline floating just below or beside the frame
5. **The Story** — a text block that types itself out letter by letter as she arrives in the scene (typewriter effect, ~40ms per character)
6. **Ambient Objects** — small floating 3D objects or particles specific to this scene's mood (see per-scene specs below)

**Scene Navigation UI:**
- Left/right arrow indicators at the edges of the screen (minimal, semi-transparent)
- A dot-strip progress indicator at the bottom: one dot per scene, current scene's dot is lit
- A back-to-beginning button at the end (only on final scene)

**Recommended Scene Moods (Fusco to personalise):**

| Scene | Default Label | Suggested Environment | Particle/Object Type | Colour Palette |
|-------|--------------|----------------------|---------------------|----------------|
| 1 | The Beginning | Deep night sky, a sense of possibility | Stars, slow drift | Deep blue-black, gold |
| 2 | Our First Date | Warm golden hour dusk, open air | Bokeh light orbs, fireflies | Amber, warm orange |
| 3 | The Moment I Knew | Close, intimate, focused | Soft bloom light, gentle petals | Rose, cream, blush |
| 4 | Through Everything | A storm clearing to sunlight | Rain particles transitioning to sparkles | Grey to gold |
| 5 | Today | Bright, open, celebratory | Confetti, hearts | Bright rose, gold |

NOTE: Fusco can add more scenes (recommended: 5–7). Each scene should represent a real chapter of their story with a real memory, real date, and real text. The environment palette and objects should match the emotional tone of that memory.

**Within-Scene Interactivity:**
- Mouse/gyroscope parallax on the environment (parallax depth layers)
- Hovering over the photo frame zooms it slightly (1.0 → 1.05 scale, spring animation)
- Tapping the photo frame on mobile: a light box opens showing the image full-screen with a close button
- Ambient particles respond to mouse movement (subtle drift toward cursor)

**Scene-by-Scene Music:**
Each scene has its own assigned audio track. This is one of the defining features of the experience. When she moves to a new scene, the old track fades out over 2s and the new one fades in.

**Exit (to Act V):**
On the final memory scene, the right arrow changes to "Read the letter →" with a letter/envelope icon. When she taps it, the camera zooms forward into the scene's floating frame (as if entering the photo), and the transition to ACT V begins.

---

### ACT V — The Letter

**Purpose:** The most intimate phase. Quiet, close, personal. Just her and the words.

**Environment:**
- A warm, candlelit atmosphere — the feel of a quiet room late at night
- Background: a very subtle warm bokeh (de-emphasised compared to previous acts)
- Candlelight particle emitters on the lower edges — small warm amber particles drifting upward
- Film grain at slightly higher opacity than other phases — reinforcing intimacy
- The pace of everything slows down here

**Letter Reveal Animation:**
1. A paper/parchment plane materialises in the center — starting folded in 3D (using Three.js geometry animation) and unfolding into flat position
2. The paper has a slight rotation in 3D space (tilted ~5 degrees) with mouse parallax
3. Once flat: the letter text begins to appear — line by line, with a soft ink/typewriter effect
4. Each line fades in from a very slight blur to sharp clarity (as if being written)
5. The letter has a left margin ruled line and subtle horizontal lines in the background

**Music Button:**
- After the full letter is visible: a "Play Our Song 🎵" button fades in below the letter
- This opens or plays their specific song (Spotify embed, YouTube, or direct audio file)
- If a direct audio file is provided: it plays in-page with a beautiful minimal player (waveform or simple progress bar in rose-gold)

**Closing Moment:**
After the letter is fully displayed and the song is playing (or skipped), a final animation plays:
- The candlelight particles drift upward and fill the screen slowly
- A last text appears: "with love, always 🌹" in small italic serif below the letter
- The experience does not end — it simply rests here. She can stay as long as she likes.

**Music:**
- The most personal and intimate track in the experience
- This is likely their couple's song, or a piece that is deeply associated with the relationship
- Starts quietly and builds gently as the letter reveals
- No crossfade out — the music just stays, playing the full track

---

## 5. 3D & Animation Architecture

### 5.1 3D Rendering Approach

**Primary library:** Three.js accessed via React Three Fiber (R3F)
- R3F provides a React-native way to work with Three.js without losing declarative component patterns
- `@react-three/drei` provides utility components: `<Text3D>`, `<Float>`, `<Sparkles>`, `<Environment>`, `<DepthOfField>`, `<Bloom>`, `<ParticleSystem>`, etc.

**Canvas Configuration:**
```
- renderer: WebGLRenderer with antialias
- shadows: PCFSoftShadowMap
- toneMapping: ACESFilmicToneMapping (cinematic feel)
- toneMappingExposure: 1.2
- outputColorSpace: SRGBColorSpace
- pixelRatio: Math.min(window.devicePixelRatio, 2)
```

### 5.2 Post-Processing Stack

Applied using `@react-three/postprocessing` (EffectComposer):

| Effect | Purpose | Intensity |
|--------|---------|-----------|
| Bloom | Glowing particles, emissive text | Medium-High |
| DepthOfField | Cinematic focus/bokeh | Medium (background soft) |
| ChromaticAberration | Distortion on transitions | Brief, sharp on transition frames |
| Vignette | Framing, intimacy | Subtle, persistent |
| Noise (Film Grain) | Vintage film texture | Very subtle, persistent |

**Mobile post-processing:** Reduce to Bloom + Vignette only for performance.

### 5.3 Particle Systems

Each phase uses a custom particle system built with `THREE.Points` and `Float32BufferAttribute`:

**Star field (Act I):**
- Count: 2,000 (desktop) / 800 (mobile)
- Movement: Very slow sinusoidal drift + rotation
- Size: Varying, with size attenuation
- Colour: White/pale blue-white, randomized lightness

**Golden hour particles (Act II):**
- Count: 120
- Movement: Upward drift with random X oscillation
- Size: Medium, soft round texture
- Colour: Warm amber/gold #C9A065 with opacity variation

**Reveal burst (Act III):**
- Count: 500
- Movement: Explosive radial velocity outward from center on trigger, then gravity-affected fall
- Types: Mix of emoji-textured sprites (hearts, stars, petals) and plain emissive points
- Lifetime: 3s then fade to 0 opacity

**Scene ambients (Act IV):**
- Count: 60–150 per scene (varies by mood)
- Behaviour: Scene-specific (see scene specs above)

**Candlelight (Act V):**
- Count: 40
- Movement: Upward drift with slight random horizontal sway, fade out at top
- Size: Small, warm amber
- Emit position: Two clusters at lower left and lower right

### 5.4 Camera System

**Camera type:** PerspectiveCamera (FOV: 75)

**Per-phase camera behaviour:**
- Act I: Slow subtle forward drift (+Z), gentle yaw oscillation (±2°)
- Act II: Stationary with slight FOV breathe (1s period, ±1°)
- Act III: On reveal trigger — rapid zoom forward, then slow pull-back over 4 seconds
- Act IV: Per-scene — slight parallax movement tracking mouse, new scene enters with a lateral camera slide
- Act V: Very slow, almost imperceptible forward drift — as if leaning closer

**Transition camera moves:**
- Portal fly-through: Camera position animated on Z-axis by +50 units over 1.5s via GSAP to("camera.position.z", ...) with easing `power3.inOut`
- Lateral scene shift (Act IV): Camera slides on X-axis ±120 units over 0.8s, `power2.inOut`

### 5.5 GSAP Animation Strategy

GSAP handles all timeline-critical animations outside the Three.js render loop:

- Phase entrance sequences (staggered element appearance)
- Text reveal timelines (TypeWriter effect uses custom GSAP ticker)
- Card/frame enter/exit animations
- Camera movement curves
- Progress bar fills
- Button hover spring effects

```
GSAP plugins to register:
- ScrollTrigger (if scroll-based navigation is used)
- CustomEase (for bespoke transition curves)
```

---

## 6. Audio Architecture

### 6.1 Library

**Howler.js** — industry standard web audio library with:
- Cross-browser support (Web Audio API + HTML5 fallback)
- Fade in/out per sprite
- Multiple simultaneous tracks
- Spatial audio support (not used here but available)

### 6.2 Phase Audio Map

| Phase | Track Role | Genre/Mood | Duration |
|-------|-----------|------------|----------|
| Act I — Invitation | Ambient background | Cinematic ambient, piano, sparse strings | Loop (2–4 min) |
| Act II — The Gate | Warm accompaniment | Acoustic warmth, light rhythm | Loop (2–3 min) |
| Act III — Reveal | Climax | Chosen peak track — their song or emotional climax piece | Full track, 3–5 min |
| Act IV Scene 1 | Memory ambient 1 | Match Scene 1 mood | Loop or clip |
| Act IV Scene 2 | Memory ambient 2 | Match Scene 2 mood | Loop or clip |
| Act IV Scene 3 | Memory ambient 3 | Match Scene 3 mood | Loop or clip |
| Act IV Scene 4 | Memory ambient 4 | Match Scene 4 mood | Loop or clip |
| Act IV Scene 5 | Memory ambient 5 | Match Scene 5 mood | Loop or clip |
| Act V — Letter | Intimate finale | Their couple song or something deeply personal | Full track |

**Total audio tracks required: 9–12** (5 Acts + per-scene in Act IV)

### 6.3 Audio State Machine

```
GLOBAL AUDIO STATE:
  - currentTrack: string (which Howl is active)
  - masterVolume: 0.0–1.0
  - muted: boolean

TRACK TRANSITION (phaseA → phaseB):
  1. Get active Howl (phaseA)
  2. Call howl.fade(currentVol, 0, 2000)  // fade out over 2s
  3. On complete: howl.stop()
  4. Load phaseB Howl (preloaded)
  5. howl.play()
  6. howl.fade(0, targetVol, 2000)  // fade in over 2s
  Total crossfade window: ~2 seconds
```

### 6.4 Sound Effects Layer

A separate Howl sprite handles UI sound effects (short, non-looping):

| Effect | Trigger | Duration |
|--------|---------|---------|
| Quiz correct | Correct answer selected | 0.6s sparkle/chime |
| Quiz wrong | Wrong answer selected | 0.3s soft thud |
| Card shatter | Card dissolves into particles | 0.8s crystal shatter |
| Phase transition whoosh | Portal fly-through begins | 1.2s air whoosh |
| Reveal burst | Particle explosion fires | 0.5s sparkle burst |
| Text complete | Typewriter finishes a scene's text | 0.2s soft tone |

### 6.5 Browser Autoplay Policy Handling

Browsers block audio before user interaction. Strategy:
- Show a "tap anywhere to begin" overlay on first load (subtle, overlaid on the star field)
- First tap dismisses overlay AND triggers `Howler.volume(0); Howler.play()` with immediate fade in
- This overlay doubles as a loading indicator (show loading progress while audio/assets preload)
- Mobile: This overlay is essential — never attempt autoplay on mobile

### 6.6 Audio Controls

A persistent minimal control lives in the bottom-right corner across all phases:
- A single icon: 🔊 (sound on) / 🔇 (muted)
- Tap to toggle global mute (via `Howler.mute()`)
- Subtle semi-transparent button — never intrusive

### 6.7 Music Sourcing Options

Fusco has multiple options for providing music:

**Option A — Self-hosted audio files (recommended):**
- Upload MP3/OGG files to Cloudinary (free tier) or any static host
- Reference the CDN URL in the config file
- Full control over playback, looping, volume

**Option B — Spotify/YouTube links:**
- Open link in new tab when "Play Our Song" is tapped in Act V
- Simpler, but no in-page audio — the in-experience music would still need to be Option A

**Option C — YouTube embed (Act V only):**
- Embed a YouTube player (hidden or minimal) for the letter song in Act V
- Works well for a specific song they both know

**Recommendation:** Use Option A for Acts I–IV (ambient tracks — use royalty-free sources like Uppbeat, Artlist, or Pixabay Music). Use Option B or C for Act V (their actual couple song).

---

## 7. Visual Design System

### 7.1 Colour Palette

**Global base:**
- Deep Space Black (background, 3D void): `#080410`
- Warm Parchment (UI surfaces, letter): `#FAF3E8`
- Aged Paper (cards, overlays): `#F5E8CC`
- Warm Border: `#DDBF8C`

**Accent system:**
- Rose Primary: `#B5768E`
- Rose Deep: `#7E3E5E`
- Rose Light: `#EDD5DF`
- Gold Primary: `#C49A52`
- Gold Light: `#E8CFA0`
- Sepia Text: `#2E1A10`
- Mid Text: `#6B4832`

**3D emissive colours (glow, particles, text):**
- Warm white: `#FFF8F0`
- Gold glow: `#FFD98C`
- Rose glow: `#FFAAC8`
- Star white: `#E8F0FF`

**Per-act dominant colour shift:**

| Act | Primary Mood Colour | Background Register |
|-----|--------------------|--------------------|
| I | Deep blue-black → gold particles | Very dark |
| II | Amber / golden hour | Dark with warm light |
| III | White burst → rose-gold | White flash → warm |
| IV | Scene-specific (5 palettes) | Dark with coloured ambient |
| V | Candlelit amber | Dark warm |

### 7.2 Typography

**3D Display (Three.js TextGeometry):**
- Font: A bold, cinematic serif — Playfair Display Bold or Libre Baskerville Bold (converted to JSON with Facetype.js)
- Used for: "Happy Anniversary, Momo." in Act III, and her name in Act I
- Size: Viewport-relative, approximately 10–15% of screen height
- Material: MeshStandardMaterial with emissive + Bloom effect

**UI Display Headings (HTML overlay layer):**
- Font: Playfair Display (loaded via Google Fonts CDN)
- Weights: 400 italic for scene titles, 700 for critical moments
- Size scale: 2.2rem (mobile) → 3.5rem (desktop) for primary, 1.2–1.6rem for secondary

**Body / Story Text (HTML overlay layer):**
- Font: Georgia, Palatino, serif — native stack for max compatibility
- Size: 0.95–1.05rem
- Line height: 1.85–2.0
- Letter spacing: 0.02em

**Utility / Labels:**
- Font: system-ui, -apple-system, sans-serif (no load penalty)
- Used for: progress indicators, phase labels, button text, small captions
- Letter spacing: 0.12–0.18em (wide for elegance)
- Text transform: uppercase

### 7.3 Signature Element

**The Film Frame** — in Act IV (The Journey), every memory is contained in a floating 3D cinema frame. This is a 3D mesh (PlaneGeometry with frame border geometry) that:
- Floats with a gentle sinusoidal animation on Y-axis (Three.js `useFrame` or R3F `<Float>`)
- Has a physical, slightly imperfect aspect (slight Y-axis tilt, ~5°)
- Shows a sepia-tinted, film-grain-overlaid version of the memory photo
- Has film perforation holes cut along top and bottom edges (modelled in geometry or applied as a texture mask)

This element recurs as a motif in the UI across all phases — film strip decorations, perforation borders on cards, etc.

### 7.4 Animation Easing Curves

- **Entrances:** `power3.out` — quick acceleration, smooth deceleration
- **Exits:** `power2.in` — gradual build, sharp exit
- **Springs (buttons, hover):** `elastic.out(1, 0.4)` — natural spring feel
- **Camera moves:** `power3.inOut` — cinematic, smooth both ends
- **Text reveal:** Linear (typewriter needs consistent pace), ~35ms/character

---

## 8. Technical Architecture

### 8.1 Technology Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js (App Router) + TypeScript | SSR shell, file-based routing, image optimisation, deploy-ready |
| Styling | Tailwind CSS | Utility-first, co-located with JSX, purged at build |
| UI Components | shadcn/ui | Accessible, Tailwind-native component library for overlay UI |
| 3D Engine | Three.js via React Three Fiber | Industry standard; R3F gives idiomatic React integration |
| R3F Utilities | @react-three/drei | Text3D, Float, Sparkles, Environment, Preload, useProgress |
| Post-processing | @react-three/postprocessing | Bloom, DepthOfField, ChromaticAberration, Vignette, Noise |
| Animation (Timeline) | GSAP + @gsap/react | Precise timeline control, camera animation, stagger sequences |
| Animation (UI) | Framer Motion | React component enter/exit transitions, spring physics |
| Audio | Howler.js | Cross-browser Web Audio, fade/crossfade, sprite support |
| Fonts (UI) | next/font (Google Fonts) | Playfair Display — zero layout shift, self-hosted by Next.js |
| Fonts (3D) | Facetype.js JSON | Converts TTF → Three.js-compatible JSON for TextGeometry |
| Deployment | Vercel | First-class Next.js support, free tier, global CDN |

### 8.2 Project Structure

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui

> All Three.js / R3F components must be Client Components (`'use client'`). Use `next/dynamic` with `{ ssr: false }` for any component that references `window`, `WebGL`, or Howler — these cannot render on the server.

```
/
├── app/                              # Next.js App Router root
│   ├── layout.tsx                    # Root layout: fonts, metadata, global providers
│   ├── page.tsx                      # Entry point — renders <ExperienceOrchestrator />
│   ├── globals.css                   # Tailwind directives + CSS custom properties
│   └── loading.tsx                   # Next.js loading fallback (atmospheric spinner)
│
├── phases/                           # One folder per Act — each a Client Component
│   ├── Invitation/                   # Act I
│   │   ├── index.tsx                 # Phase root — composes sub-components
│   │   ├── StarField.tsx             # R3F particle star system ('use client')
│   │   └── NameReveal.tsx            # 3D TextGeometry name animation
│   ├── Gate/                         # Act II
│   │   ├── index.tsx
│   │   ├── QuizCard.tsx              # 3D floating quiz card with tilt parallax
│   │   └── AnswerOrb.tsx             # Interactive answer tiles / orbs
│   ├── Reveal/                       # Act III
│   │   ├── index.tsx
│   │   └── BurstSystem.tsx           # Radial particle burst on reveal
│   ├── Journey/                      # Act IV
│   │   ├── index.tsx
│   │   ├── SceneManager.tsx          # Preloads + transitions between memory scenes
│   │   └── scenes/
│   │       ├── Scene.tsx             # Generic scene shell (accepts theme + content)
│   │       ├── SceneEnv.tsx          # Per-scene 3D environment + ambient particles
│   │       └── MemoryFrame.tsx       # Floating 3D film frame with photo/placeholder
│   └── Letter/                       # Act V
│       ├── index.tsx
│       ├── PaperReveal.tsx           # 3D paper-unfolding animation
│       └── CandleParticles.tsx       # Upward-drifting candlelight particle emitter
│
├── components/
│   ├── ui/                           # shadcn/ui auto-generated components (do not hand-edit)
│   │   ├── button.tsx
│   │   ├── progress.tsx
│   │   ├── dialog.tsx
│   │   └── ...                       # Add others via `npx shadcn-ui add <component>`
│   ├── canvas/
│   │   ├── AppCanvas.tsx             # Root R3F <Canvas> wrapper — 'use client', ssr:false
│   │   └── PostFX.tsx                # EffectComposer: Bloom, DOF, Vignette, Noise
│   ├── layout/
│   │   ├── AudioToggle.tsx           # Persistent mute/unmute button (bottom-right)
│   │   ├── NavArrows.tsx             # Left/right scene navigation (Act IV)
│   │   ├── Overlay.tsx               # Film grain + vignette CSS overlays
│   │   ├── ProgressBar.tsx           # Quiz progress indicator (uses shadcn Progress)
│   │   └── LoadingScreen.tsx         # Pre-Act I asset loading screen
│   └── transitions/
│       └── PortalTransition.tsx      # Full-screen portal flash between Acts
│
├── hooks/
│   ├── usePhase.ts                   # Global phase state (Zustand or React context)
│   ├── useAudio.ts                   # Howler.js audio control hook
│   ├── useParallax.ts                # Mouse / DeviceOrientation parallax values
│   └── useScenePreload.ts            # Preloads next scene assets in background
│
├── lib/
│   ├── audio.ts                      # Howler.js AudioManager singleton + crossfade logic
│   ├── gsap.ts                       # GSAP registration (plugins, defaults, custom eases)
│   ├── transitions.ts                # Portal transition helpers (GSAP camera + overlay)
│   └── utils.ts                      # shadcn cn() utility + general helpers
│
├── constants/
│   ├── content.tsx                   # ← EDIT THIS: all personalised content (memories, quiz, letter)
│   ├── music.ts                      # Music track URLs + phase-to-track assignments
│   ├── design.ts                     # Design tokens (colours, easing curves, durations)
│   └── scenes.ts                     # Scene theme definitions (palettes, particle configs)
│
├── types/
│   └── index.d.ts                    # Global TypeScript types (Phase, Memory, QuizQuestion, SceneTheme, etc.)
│
├── public/
│   ├── fonts/                        # Facetype.js font JSON files for Three.js TextGeometry
│   ├── textures/                     # Particle sprites (heart, star, petal PNGs), grain texture
│   └── audio/                        # Self-hosted audio files (MP3/OGG) — optional
│
├── tailwind.config.ts                # Tailwind config — extend with design token colours
├── tsconfig.json
├── next.config.ts                    # next config: enable transpilePackages for Three.js
└── components.json                   # shadcn/ui configuration
```

**Key Next.js conventions to observe:**

`app/page.tsx` is a Server Component by default — it should only import `<ExperienceOrchestrator />` which is the Client Component root for the entire experience. All phase rendering happens client-side.

```typescript
// app/page.tsx — Server Component (no 'use client')
import dynamic from 'next/dynamic'

const ExperienceOrchestrator = dynamic(
  () => import('@/phases/ExperienceOrchestrator'),
  { ssr: false, loading: () => <LoadingScreen /> }
)

export default function Home() {
  return <ExperienceOrchestrator />
}
```

`phases/ExperienceOrchestrator.tsx` carries `'use client'` and is the phase state machine — it imports all Acts and manages the active phase, transitions, and audio lifecycle.

**shadcn/ui usage:** Only use shadcn components in the HTML overlay layer (ProgressBar, Dialog for lightbox, Button for CTAs). Never pass shadcn components into the R3F `<Canvas>` — the Canvas only accepts Three.js-compatible JSX (`<mesh>`, `<points>`, R3F components). UI overlays sit in a `<div>` positioned absolutely over the canvas using Tailwind utility classes.

### 8.3 Phase State Machine

```typescript
type Phase = 'loading' | 'invitation' | 'gate' | 'reveal' | 'journey' | 'letter';

// App.tsx holds global phase state
// Each phase component receives: onComplete: () => void
// Phase transitions are orchestrated via a transition layer that:
//   1. Fires the portal/transition animation
//   2. Crossfades audio
//   3. Unmounts old phase, mounts new phase
//   4. Triggers new phase entrance animations
```

### 8.4 Content Configuration (content.ts)

This is the single file Fusco edits to personalise the experience. No other file should need to change for content purposes.

```typescript
// /src/config/content.ts

export const CONFIG = {
  names: {
    hers: "Momo",
    yours: "Fusco",
  },

  quiz: [
    {
      question: "What was the first thing I ever said to you?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctIndex: 0,
      hint: "Think back to the very beginning..."
    },
    // ... additional questions
  ],

  memories: [
    {
      label: "The Beginning",
      title: "Where It All Started",
      story: "Your real memory text here...",
      imageUrl: null, // or "https://..."
      sceneTheme: "night",     // maps to a pre-built scene environment
      musicTrackKey: "scene1", // maps to music.ts track
    },
    // ... additional memories (5–7 recommended)
  ],

  letter: {
    body: `Dear Momo,\n\n[Your real letter here]\n\nWith love,\n${CONFIG.names.yours}`,
    musicButtonLabel: "Play Our Song 🎵",
    musicLink: null, // "https://open.spotify.com/..." or audio file URL
  },

  sceneThemes: ["night", "goldenHour", "blush", "storm", "celebration"],
};
```

### 8.5 Loading Strategy

**Phase-based lazy loading:**
- Act I assets load immediately on page load (lightweight)
- Act II assets preload during Act I
- Act III assets preload during Act II
- Act IV scene assets preload one at a time (preload next scene while current is viewed)
- Act V assets preload during Act IV

**Loading screen (before Act I):**
- Full screen dark background
- Animated film strip icon
- Progress bar filling as assets load
- "Preparing your experience..." text
- Once complete: fade out to Act I
- Audio prompt: "Tap to begin" (handles autoplay policy)

---

## 9. Content Requirements

Fusco needs to provide the following content before the app is production-ready.

### 9.1 Required Content

| Item | Type | Notes |
|------|------|-------|
| Her name | Text | ✅ "Momo" |
| Your name | Text | ✅ "Fusco" |
| Quiz questions | 3–5 objects | Question, 4 options, correct index, optional hint |
| Memory scenes | 5–7 objects | Label, title, story (100–200 words), optional image URL, scene theme |
| Love letter | Long text | Raw text, can include line breaks with \n |
| Act I music | Audio URL | Ambient/atmospheric track |
| Act II music | Audio URL | Warm/playful track |
| Act III music | Audio URL | **Most important** — peak emotional track or their song |
| Per-scene music (Act IV) | 5–7 Audio URLs | One per memory scene, ambient |
| Act V music | Audio URL/link | Their couple song or intimate track |
| Couple song link | URL | Spotify/YouTube for the "Play Our Song" button in Act V |

### 9.2 Optional Content

| Item | Type | Notes |
|------|------|-------|
| Memory photos | Image URLs | 1 per scene — hosted anywhere publicly accessible |
| Photo of her | Image URL | For Act I background or Act III reveal frame |
| Specific dates | Text | "October 2023" etc. for memory labels |

### 9.3 Content Quality Guidelines

**For memory stories:**
- Be specific. "We were at that small restaurant on the corner" beats "We went out to eat"
- Include sensory details: what it smelled like, what she was wearing, what you felt
- Write to her directly — use "you" not "she"
- Aim for 100–200 words per scene (long enough to read, short enough to feel)

**For the love letter:**
- Write it last — after you've filled in the memories
- It should reference specific things from the journey she just took
- Start with what she means to you, not with "I wanted to make this for you"
- One or two paragraphs is enough — quality beats length

---

## 10. Performance & Compatibility

### 10.1 Target Devices

| Priority | Device | Notes |
|----------|--------|-------|
| P0 | iOS Safari (iPhone) | She will almost certainly use this |
| P0 | Android Chrome (mid-range) | Second most likely |
| P1 | Desktop Chrome/Firefox | Secondary |
| P2 | Desktop Safari | Tertiary |

### 10.2 Performance Targets

| Metric | Desktop | Mobile |
|--------|---------|--------|
| First Contentful Paint | < 2s | < 3s |
| Time to Interactive | < 3s | < 4.5s |
| Canvas FPS (Act I–II) | 60fps | 30fps |
| Canvas FPS (Act III–IV) | 60fps | 30fps |
| Total bundle size | < 3MB gzipped | ← same target |

### 10.3 Mobile Adaptations

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Particle count | Full (100–2000) | Reduced (30–500) |
| Post-processing | Full stack | Bloom + Vignette only |
| 3D text | Full TextGeometry | Flat HTML overlay (optional) |
| Parallax | Mouse-based | Gyroscope (DeviceOrientation) |
| Navigation | Arrows + keyboard | Swipe gestures |
| Photo frame | Large, centered | Full-width, tap to expand |

### 10.4 iOS Safari Known Constraints

- WebGL: Supported, but memory-constrained (limit total textures)
- Web Audio API: Requires user interaction before any audio plays (handled — see §6.5)
- DeviceOrientation for parallax: Requires user permission prompt (ask gracefully)
- PostProcessing: Test carefully — bloom can cause performance issues on older devices
- Video/autoplay: If using video backgrounds, must be muted and `playsinline`

### 10.5 Accessibility Minimum

- All interactive elements reachable by keyboard (Tab + Enter)
- `prefers-reduced-motion` media query: disable particle animations and camera movement if enabled
- `prefers-color-scheme`: not applicable (fixed dark aesthetic)
- Audio toggle is always visible and operable

---

## 11. Deployment Plan

### 11.1 Recommended Approach

**Platform:** Vercel (free tier, adequate for this use case)

**Steps:**

1. Scaffold project:
```bash
npx create-next-app@latest momo-anniversary \
  --typescript --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*"
```
2. Install shadcn/ui:
```bash
npx shadcn-ui@latest init
# Select: Default style, Zinc base colour, CSS variables: yes
npx shadcn-ui@latest add button progress dialog
```
3. Install 3D + animation dependencies:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install gsap @gsap/react framer-motion howler
npm install @types/three @types/howler
```
4. Update `next.config.ts` to transpile Three.js:
```typescript
const nextConfig = {
  transpilePackages: ['three'],
}
export default nextConfig
```
5. Copy phase and component code from implementation plan
6. Fill in `constants/content.tsx` with real content
7. Fill in `constants/music.ts` with audio track URLs
8. Run locally: `npm run dev`

### 11.2 The Link

The deployed URL is what Fusco sends to Momo. Options:
- Default Vercel URL: `https://for-momo.vercel.app`
- Custom domain: Purchase `formomo.com` or similar (~$12/year on Namecheap)
- Short link: Use Bitly or a custom short link to make the URL itself feel intentional

**Recommended:** Send the link as a plain message with no explanation. No "I made you something." Just the link. Let the experience speak.

### 11.3 Timeline (June 19 Deadline)

| Day | Task |
|-----|------|
| Today (Jun 17) | PRD finalised. Fusco gathers all content: memories, quiz, letter, music |
| Jun 17 (evening) | Scaffold Vite project, install dependencies, stub out phase components |
| Jun 18 (morning) | Build Act I (Invitation) + Act III (Reveal) — these have the most impact |
| Jun 18 (afternoon) | Build Act II (Gate) + Act V (Letter) |
| Jun 18 (evening) | Build Act IV (Journey) — the memory scenes |
| Jun 18 (late) | Integrate audio, test transitions, fill in real content |
| Jun 19 (morning) | Final polish, mobile testing, deploy to Vercel |
| Jun 19 | Send the link to Momo 💕 |

---

## 12. Open Questions & Decisions

These items need decisions from Fusco before or during development:

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | How many memory scenes? | 3 minimum, 7 maximum | 5 feels complete |
| 2 | Audio hosting for Acts I–IV? | Cloudinary / Pixabay / Uppbeat / self-host | Cloudinary free tier |
| 3 | Couple song source for Act V? | Spotify link / YouTube link / MP3 upload | Spotify link (Opens app) |
| 4 | Do the quiz questions have wrong-answer gates? | Yes (must get right) / No (all proceed) | No gate — all answers proceed after 2 tries |
| 5 | Photo in Act I? | Her photo in background / no photo / abstract | Her photo (blurred, painterly) adds intimacy |
| 6 | Language? | English only | English only |
| 7 | Act III music: their song or a neutral track? | Their specific song / cinematic neutral | Their song — this is the climax |
| 8 | Mobile 3D: full R3F or simplified HTML? | Full 3D / CSS fallback | Full 3D with mobile performance limits |
| 9 | Private / unlisted URL? | Vercel default URL (obscure) / Password protected | Default Vercel URL (not indexed, private enough) |
| 10 | Should she be able to replay any phase? | Yes / No (linear only) | Yes — navigation back via a small menu in top corner |

---

*This document is a complete specification for the anniversary experience. Once content is gathered and decisions are made on the open questions, implementation can begin with this PRD as the source of truth.*

*Built with love. For Momo. — June 2026*
