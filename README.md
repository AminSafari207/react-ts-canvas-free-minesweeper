# Canvas‑Free Minesweeper (React + TypeScript)

A modern, canvas‑free implementation of the classic **Minesweeper** game built with React and TypeScript.

The project prioritizes **clarity, correctness, and maintainable UI architecture** over premature optimization or flashy abstractions. It is designed as a real frontend codebase, not a demo or tutorial, this codebase is meant to be read.

---

## Tech Stack

### Core

- **React 19**
- **TypeScript**
- **Vite**

### UI & Styling

- **Material UI (MUI v5)**
- **Emotion**
- Centralized theme utilities, transitions, and layout primitives

### State Management

- **Zustand**
  - Stores for minefield cells, game metadata, timer, and modal system
  - Shallow selectors to reduce unnecessary re‑renders

### Rendering & Interaction

- DOM‑based grid (no `<canvas>`)
- Touch‑aware input handling (tap, long‑press, pan)
- Zoom / pan support using `react-zoom-pan-pinch`

---

## Features

- Fully playable Minesweeper
- Light / dark theme with persisted preference
- Touch‑friendly interactions (long‑press to flag, drag to pan)

---

## Project Structure (Selected Highlights)

The structure reflects **responsibility‑driven design**, not folder vanity.

### `shared/`

- **layouts/** – Structural containers (background, top bar, content)
- **background/** – Visual background layer isolated from game logic
- **providers/** – Application bootstrapping
- **store/** – Small, focused Zustand stores
- **utils/**
- **transition/**

### `core/`

- **game/** – Pure game logic
- **theme/** – Theme and color‑mode management
- **modal/** – Modal system

### `features/minefield/`

- Board, grid, and cell behavior
- Long‑press detection
- Zoom / pan coordination
- Skeleton loading state

---

## Getting Started

### Requirements

- **Node.js 22.22.0** (Node 18+ should also work)
- **npm**

### Install dependencies

```bash
npm install --legacy-peer-deps
```

### Run development server

```bash
npm run dev
```

App runs at `http://localhost:5502`

---

## Design Decisions Worth Noting

- **Virtualization Adds Complexity Without Solving the Bottleneck**  
  For a 30×30 board, grid virtualization adds moving parts without meaningful gains. The dominant limitation is GPU fill‑rate on mobile, not DOM node count.

- **Why not Canvas or Web Workers**  
  A canvas‑based renderer combined with Web Workers could push performance significantly further, especially for very large boards or extreme update rates.

  This project intentionally avoids that approach. Using standard DOM rendering keeps interaction handling, layout, and state transitions explicit and debuggable, and better reflects real‑world frontend constraints.

  The goal here is not to maximize raw throughput, but to demonstrate control over state, rendering, and interaction without hiding complexity behind a canvas.

---

## License


This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.
