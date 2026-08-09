# Mobile Action Bar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a reusable, thumb-reachable mobile action-bar contract for task completion flows such as questionnaires.

**Architecture:** Extend the core layout layer with a semantic footer pattern that is sticky on narrow screens and returns to normal document flow on larger screens. Provide a copyable recipe and showcase example so consuming apps can use the same DOM across viewports.

**Tech Stack:** Framework-agnostic CSS, semantic HTML, existing native-first-ui registry/build scripts.

---

### Task 1: Add the layout contract

**Files:**
- Modify: src/layout.css
- Modify: registry.json
- Generate: class-manifest.json

**Steps:**
1. Add .nf-mobile-actions with safe-area padding, a surface background, border, and sticky bottom positioning on mobile.
2. Reset it to normal flow and an end-aligned cluster on desktop.
3. Register the class and regenerate the manifest.

### Task 2: Add the recipe and showcase growth case

**Files:**
- Create: recipes/mobile-actions/snippet.html
- Create: recipes/mobile-actions/README.md
- Create: recipes/mobile-actions/metadata.json
- Modify: recipes/catalog.json
- Modify: examples/index.html
- Modify: scripts/validate-package.mjs

**Steps:**
1. Add a questionnaire-style form using a semantic fieldset, native radios, labelled status, and a sticky footer.
2. Document the mobile/desktop behavior and content-bottom spacing guidance.
3. Register the recipe and include it in package validation.
4. Add the pattern to the showcase’s layout example.

### Task 3: Verify and publish

**Steps:**
1. Run npm test and inspect the diff.
2. Explicitly stage only the changed files.
3. Commit the focused change.
4. Push the current main branch to origin.
