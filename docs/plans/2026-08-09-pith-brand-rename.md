# Pith Brand Rename Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the public library rename to Pith while preserving the existing `nf-*` CSS contract.

**Architecture:** Keep the implementation, CSS layers, class manifest, recipes, and public CSS selectors unchanged. Update package metadata, documentation, generated-build labels, and user-facing references from the old brand to Pith; use a non-breaking package name such as `pith-css` because `pith` is already registered on npm.

**Tech Stack:** Plain CSS, semantic HTML, browser JavaScript, Node.js ESM build scripts, npm, Lightning CSS.

---

### Task 1: Inventory the public brand references

**Files:**
- Inspect: `package.json`, `README.md`, `registry.json`, `class-manifest.json`, `scripts/`, `site/`, `docs/`, and metadata files

**Step 1:** Search for legacy brand names, package identifiers, and `NFI`.

**Step 2:** Classify matches as public branding, package/import identifiers, build-only labels, or the intentionally preserved `nf-*` contract.

**Step 3:** Confirm no `nf-*` selectors or manifest keys are changed.

### Task 2: Update package and repository-facing metadata

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `registry.json`
- Modify: `class-manifest.json`

**Step 1:** Change the package-facing name to `pith-css` where npm identity is required.

**Step 2:** Change the human-facing product name to `Pith` and describe it as a semantic, framework-agnostic web UI foundation.

**Step 3:** Preserve all `nf-*` class names, exports, recipe contracts, and CLI behavior unless a name is strictly branding-only.

### Task 3: Update generated output labels and documentation references

**Files:**
- Modify: `scripts/build-css.mjs`
- Modify: `scripts/build-pages.mjs`
- Modify: `scripts/validate-package.mjs`
- Modify: `scripts/audit-public-api.mjs`
- Modify: relevant files under `site/`, `examples/`, `recipes/`, and `docs/`

**Step 1:** Replace branding-only filenames, titles, headings, and URLs with Pith equivalents.

**Step 2:** Leave source paths and public CSS selectors stable where changing them would alter the package contract.

**Step 3:** Update import examples to the final package name only after confirming the package metadata and exports remain valid.

### Task 4: Regenerate lockfile and derived artifacts

**Files:**
- Modify: `package-lock.json` if npm metadata changes require it
- Generate: `dist/` and other ignored build outputs through existing scripts

**Step 1:** Run the repository build/test command.

**Step 2:** Inspect the diff for accidental `nf-*` or API changes.

### Task 5: Verify the non-breaking rename

**Files:**
- Test: repository test suite and package dry run

**Step 1:** Run `npm test`.

**Step 2:** Run `npm run pack:check`.

**Step 3:** Confirm package exports, recipe discovery, generated CSS size checks, and public API audits pass.

**Step 4:** Confirm the final docs state that `nf-*` remains stable until a future major release.
