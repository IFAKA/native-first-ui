# Component Workbench Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the example page into a single-file, Storybook-like workbench for exercising Pith patterns under realistic scale and accessibility stress.

**Architecture:** Keep the product dependency-free and framework-agnostic. Use semantic HTML for the workbench shell and controls, a small page-local CSS layer for the dark inspection UI, and a compact data-driven script for navigation, search, viewport toggles, state presets, and component rendering.

**Tech Stack:** One standalone HTML file, modern CSS, vanilla JavaScript, existing native-first CSS contracts.

---

### Task 1: Build the workbench shell

**Files:**
- Modify: `examples/index.html`

Create the sidebar catalog, top utility bar, responsive preview frame, status rail, and inspector panel. Preserve skip links, landmarks, keyboard focus, and mobile reflow.

### Task 2: Add representative scale fixtures

**Files:**
- Modify: `examples/index.html`

Add data-driven examples for navigation, tables, forms, overlays, loading/error/empty states, long-content growth, and a 500-row stress view. Include deliberate edge-case labels and a11y notes.

### Task 3: Add live workbench interactions

**Files:**
- Modify: `examples/index.html`

Implement search, catalog selection, theme toggle, viewport presets, density toggle, state presets, row-count stress control, copyable fixture markup, and live status announcements. Keep interactions native and avoid dependencies.

### Task 4: Verify package and browser behavior

**Files:**
- Test: `npm test`
- Test: `npm run serve`

Run package validation, serve the example locally, inspect it in a browser at desktop and narrow widths, and verify keyboard navigation plus the stress fixture.
