# Native Contract Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove library contracts that recreate native HTML behavior and make the example page use only reusable native-first contracts.

**Architecture:** Keep semantic HTML as the public API. Retain small tokens, native element defaults, responsive layout patterns, and reusable application states; remove catalog chrome and custom dialog wiring from the package. The example will compose the remaining contracts and native elements directly.

**Tech Stack:** Framework-free HTML, cascade-layered CSS, optional vanilla JavaScript only for example inspection behavior, Node package validation.

---

### Task 1: Remove redundant package contracts

**Files:** `src/components.css`, `src/behavior.js`, `package.json`, `README.md`

Remove disclosure, progress, catalog chrome, and custom dialog data-attribute behavior from the public package. Keep visual dialog styling and reusable application states.

### Task 2: Recompose the example

**Files:** `examples/index.html`

Replace catalog-specific `nf-*` classes with semantic HTML and reusable layout/state contracts. Use native `details`, `dialog`, `progress`, and standard form/table elements.

### Task 3: Update public contract documentation

**Files:** `README.md`, `INTEGRATION-RULES.md`, `CHANGELOG.md`

Document the smaller contract set and native replacements, including the modern dialog/popover path and the fact that the package does not provide catalog chrome.

### Task 4: Validate

Run `npm test` and `npm run pack:check`; inspect the example source for removed public classes and verify no removed behavior selectors remain.
