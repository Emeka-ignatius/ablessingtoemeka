# System Design Specification: Momo's Cinematic Anniversary Experience

**Date:** June 17, 2026  
**Status:** Approved  
**Author:** Antigravity (AI Coding Assistant) & Fusco  
**Target URL:** `https://for-momo.vercel.app` (or custom shortlink)  

---

## 1. Executive Summary & Vision

This specification details the technical architecture and layout for a private, cinematic, single-page web journey built as an anniversary gift for Momo. The experience is designed as an interactive short film structured into **5 Acts**, guiding Momo through a narrative arc of wonder, playfulness, climax, nostalgia, and intimacy.

---

## 2. Technical Stack & Key Libraries

To achieve the desired visual fidelity, continuous music flow, and smooth animations, the application will use the following stack:

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript | React shell, image optimization, file routing |
| **Styling** | Tailwind CSS + CSS Variables | Layouts, responsive design, typography styling |
| **UI Components** | shadcn/ui (Radix Primitives) | Overlay HUD widgets (buttons, progress bars, dialogs) |
| **3D Rendering** | Three.js via React Three Fiber (R3F) | Declarative WebGL rendering, camera control |
| **3D Utilities** | `@react-three/drei` | `<Points>`, `<Float>`, `<Sparkles>`, `<Preload>` utilities |
| **Post-Processing** | `@react-three/postprocessing` | Bloom, Vignette, Noise effects for cinematic texture |
| **Timelines & Camera** | GSAP (GreenSock) + `@gsap/react` | Multi-step animations, 3D camera travel coordinates |
| **UI Transitions** | Framer Motion | Fade-ins, slide-ins, and exit animations for HTML elements |
| **Audio** | Howler.js | Web Audio API player, cross-act persistence, volume controls |

---

## 3. Global State Machine

A simple global state store (using React Context or Zustand) coordinates the active view state across the 3D Canvas and the HTML overlay layers:

```typescript
type Phase = 'loading' | 'invitation' | 'gate' | 'reveal' | 'journey' | 'letter';

interface ExperienceState {
  activePhase: Phase;
  isTransitioning: boolean;       // Blocks user inputs during camera travels
  userInteracted: boolean;        // Required for browser autoplay bypass
  isMuted: boolean;               // Global volume flag
  currentQuestionIndex: number;   // Act II progress
  currentSceneIndex: number;      // Act IV memory scene index (0 to 4)
  unlockedFullNavigation: boolean;// Unlocked once Act V is reached
  setPhase: (phase: Phase) => void;
  nextScene: () => void;
  prevScene: () => void;
  setMute: (mute: boolean) => void;
}
```

---

## 4. 3D Coordinates & Canvas Layout

All 3D components exist within a single persistent `<AppCanvas />` wrapping the page. To keep scenes visually isolated, components are laid out along the X-axis:

*   **Act I (Invitation):** `X = 0, Y = 0, Z = 0`
*   **Act II (The Gate):** `X = 150, Y = 0, Z = 0`
*   **Act III (The Reveal):** `X = 300, Y = 0, Z = 0`
*   **Act IV (The Journey):** `X = 450` to `950` (spaced by `125` units per scene), `Y = 0, Z = 0`
*   **Act V (The Letter):** `X = 1100, Y = 0, Z = 0`

A `<CameraManager />` listens to `activePhase` and `currentSceneIndex`, executing smooth GSAP camera translations along the X and Z axes to move Momo through the environments.

---

## 5. Act-by-Act Specifications & Assets

### Act I: The Invitation
*   **3D Scene:** A deep-space void with a slow-drifting star field (2,000 particles).
*   **Higgsfield Asset:** A highly blurred, painterly photo of Momo mapped onto a distant background plane, fading softly behind the stars to introduce immediate intimacy.
*   **UI Overlay:** Logo/Name ("Momo"), a thin gold divider, subtitle, and a pulsing "Open it 💕" button.
*   **Audio:** Complete silence (or extremely quiet ambient wind hum). Clicking "Open it" activates the `userInteracted` flag.
*   **Transition:** Camera zooms rapidly forward into a central glowing portal (`Z` position from `10` to `-20`), followed by a full-screen whiteout.

### Act II: The Gate
*   **3D Scene:** A warm amber, golden-hour environment with glowing bokeh particles.
*   **Higgsfield Asset:** A slow-motion, warm golden-hour light leak video loop mapped to the background.
*   **UI Overlay:** A 3-to-5 question interactive quiz with relationship trivia.
*   **Quiz Logic:** Wrong answers trigger a soft thud sound and shake the card. After 2 incorrect attempts on the same question, a helpful hint is displayed below. The user is not hard-locked.
*   **Audio:** Silent/minimal background ambient.
*   **Transition:** Upon the final correct answer, the progress bar pulses, all particles implode to the center, and the screen whites out.

### Act III: The Reveal (The Climax)
*   **3D Scene:** The whiteout fades to show a dark void that immediately explodes into a massive radial burst of particles (hearts, stars, petals).
*   **Text:** Large 3D serif text rises from below, reading: "Happy Anniversary, Momo."
*   **Audio:** The user's custom personal song bursts in at full volume (`volume: 0.8`) with a fast 0.5s fade-in. This track will play continuously and seamlessly for the remainder of the experience.
*   **Transition:** A "Let's go back... 🎞️" button pulses in, auto-advancing to Act IV after 8 seconds.

### Act IV: The Journey (5 Memory Scenes)
*   **3D Scene:** A carousel of 5 distinct environments spaced out laterally. Each environment displays a floating 3D polaroid-style "Film Frame" containing a memory placeholder.
*   **Higgsfield Assets:** Each memory scene incorporates custom environment loops matching the emotional tone (e.g., starry night, warm dusk, rain transitioning to sparkles).
*   **UI Overlay:** Left and right arrow controls (supporting swipe gestures on mobile) and a bottom dot-indicator. A typewriter script renders the memory story letter-by-letter as she arrives at each scene.
*   **Placeholders:** The codebase will initialize with 5 placeholder configs (labels, dates, text, and mock images) so Fusco can easily fill in real content later.
*   **Transition:** The final memory scene displays "Read the letter →". Clicking it slides the camera forward through the film frame to transition to Act V.

### Act V: The Letter
*   **3D Scene:** A warm, candlelit room aesthetic with flickering candlelight particles drifting up from the bottom edges.
*   **Higgsfield Asset:** A close-up video of a warm, flickering candle flame reflecting onto aged parchment.
*   **UI Overlay:** A virtual scrollable parchment paper containing the personalized love letter, fading in line-by-line.
*   **Navigation Upgrade:** Once this phase is reached, a minimal "Memory Map" menu is unlocked in the corner, allowing Momo to jump back and re-live any memory scene.

---

## 6. Audio Architecture (Single Song Flow)

*   **Autoplay Guard:** Prompt Momo to tap the screen upon loading.
*   **Act I & II:** Silence to build anticipation.
*   **Act III (The Climax):** The single custom song starts playing via a single Howler.js Howl instance.
*   **Act IV & V:** The song plays continuously. WebGL scene shifts do not trigger track reloads or crossfades.
*   **Mute HUD:** A floating button is available in the bottom-right corner to toggle `Howler.mute()`.

---

## 7. Performance & Mobile Optimizations

To ensure the experience runs smoothly on mobile Safari and Android Chrome, the application will automatically:
1.  Detect mobile devices upon initialization.
2.  Reduce particle counts by 70%.
3.  Disable heavy post-processing effects (Depth of Field, Chromatic Aberration) and retain only a lightweight Bloom.
4.  Replace complex Three.js 3D TextGeometry with high-performance HTML/CSS overlays styled with Playfair Display.
5.  Prompt gracefully for device orientation permissions if iOS is detected, enabling gyro-driven parallax.
