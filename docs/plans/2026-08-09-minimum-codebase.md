# Minimum Codebase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce Pith to a small native-first CSS package with one showcase, a few canonical recipes, and a passing build.

**Architecture:** Keep the token and native element contracts in a small core stylesheet, with layout, form, navigation, data, overlay, and component contracts as explicit optional modules. Remove the inference engine, duplicate showcase paths, stale registry metadata, duplicate recipes, and page-local CSS. The package will expose generated CSS modules and optional behavior.js.

**Tech Stack:** Framework-free HTML/CSS, dependency-free browser behavior, Node.js, Lightning CSS.

---

### Task 1: Establish repository state

**Files:** None

**Step 1:** Inspect the current branch, remote, and worktree.

**Step 2:** Confirm no unrelated user changes are overwritten.

### Task 2: Consolidate the CSS source

**Files:**
- Modify: `src/core.css`
- Modify: `src/layout.css`
- Delete: `src/patterns.css`
- Delete: `src/components.css`

**Step 1:** Keep layout contracts in `layout.css` and remove the duplicate `patterns.css` layer.

**Step 2:** Keep `components.css` as an explicit optional library module because the showcase and recipes use its reusable surface/state contracts.

**Step 3:** Update the CSS build to emit `core.css` and explicit optional library modules.

### Task 3: Remove obsolete inference and registry machinery

**Files:**
- Modify: `package.json`
- Modify: `scripts/build-css.mjs`
- Modify: `scripts/build-pages.mjs`
- Modify: `scripts/validate-package.mjs`
- Delete: `scripts/nfi.mjs`
- Delete: `scripts/audit-css-minimality.mjs`
- Delete: `scripts/install-skills.mjs`
- Delete: `registry.json`
- Delete: `class-manifest.json`

**Step 1:** Remove nfi scripts, registry generation, and stale generated project CSS checks.

**Step 2:** Reduce package exports to core.css and optional behavior.js.

**Step 3:** Make validation check the actual remaining source and showcase files.

### Task 4: Consolidate recipes and showcase

**Files:**
- Keep: `recipes/forms`, `recipes/dialog`, `recipes/drawer`, `recipes/tabs`, `recipes/data-table`
- Delete: duplicate or low-value recipe directories
- Modify: `site/index.html`
- Modify: `site/landing.css`
- Modify: `site/showcase.js`
- Delete: root `index.html`

**Step 1:** Preserve the canonical recipe source and remove duplicate singular/plural table, dialog, and drawer folders.

**Step 2:** Make the showcase load only generated package CSS and package behavior.

**Step 3:** Keep one site build path and remove page-local landing CSS.

### Task 5: Remove stale documentation metadata

**Files:**
- Modify: `README.md`
- Modify: `INTEGRATION-RULES.md`
- Delete: stale component coverage and planning documents no longer describing the package

**Step 1:** Document the reduced package surface and install path.

**Step 2:** Remove references to nfi, missing examples, and removed exports.

### Task 6: Verify and publish

**Files:** Explicitly staged changed files only

**Step 1:** Run `npm test`, `npm run pages:build`, and `npm pack --dry-run`.

**Step 2:** Review the diff and staged file list.

**Step 3:** Commit the cleanup with a focused message.

**Step 4:** Push the current branch without force.
