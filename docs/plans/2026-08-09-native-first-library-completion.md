# Pith Library Completion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the package a complete, reusable native-HTML-first foundation and make its workbench prove the public contracts under realistic states and scale.

**Architecture:** Keep HTML semantics as the API and CSS contracts as small layers: tokens, native element defaults, layout patterns, and reusable components. Use JavaScript only for behavior the browser cannot provide declaratively, and keep the workbench’s custom CSS limited to catalog chrome and inspection surfaces.

**Tech Stack:** Framework-free HTML, CSS cascade layers, vanilla JavaScript, Node package validation, local example server.

---

### Task 1: Define the public contract surface

**Files:**
- Modify: `README.md`
- Modify: `src/tokens.css`
- Modify: `src/elements.css`

Document and support the native controls, typography, links, selection, focus, disabled, invalid, readonly, placeholder, and forced-colors contracts needed by application pages.

### Task 2: Complete reusable layout and component contracts

**Files:**
- Modify: `src/patterns.css`
- Modify: `src/components.css`

Add only broadly reusable contracts for navigation, buttons, cards, alerts, forms, tables, dialogs, loading, empty, pagination, and responsive application shells. Preserve native semantics and 44px interaction targets.

### Task 3: Build a complete native-first workbench

**Files:**
- Modify: `examples/index.html`

Use the library contracts for the entire semantic workbench structure. Add representative examples for navigation, actions, cards/alerts, forms, tables, layouts, dialogs, loading/empty/error states, and long-content growth. Keep catalog-only CSS local and minimal.

### Task 4: Verify package and browser behavior

**Files:**
- Modify: `scripts/validate-package.mjs` only if new public markers require validation

Run package validation, pack inspection, local serving, and browser-level checks for narrow layouts, keyboard focus, dialog behavior, live status, and large table content.
