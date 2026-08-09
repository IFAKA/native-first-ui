# Pith Landing Page Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reframe the Pith showcase as a product landing page that explains the value quickly, demonstrates the library early, and keeps the full documentation catalog available below.

**Architecture:** Keep the existing semantic HTML and reusable `nf-*` contracts. Add a small site-only CSS layer scoped to `.landing` for marketing hierarchy, then place a compact interactive proof section and an install CTA before the existing showcase sections.

**Tech Stack:** Semantic HTML, framework-agnostic CSS, existing Pith primitives, native controls, existing build scripts.

---

### Task 1: Improve landing-page information architecture

**Files:**
- Modify: `site/index.html`

**Steps:**
1. Update metadata and navigation labels for a product-first entry point.
2. Rewrite the hero with a clear promise, proof badges, primary install CTA, and secondary showcase CTA.
3. Add an early proof section showing a realistic native UI surface and copyable installation snippet.
4. Reframe the first supporting section around user benefits instead of inspiration references.
5. Add a lower-page install section and retain the complete showcase catalog below it.

### Task 2: Add restrained site-specific visual hierarchy

**Files:**
- Create: `site/landing.css`
- Modify: `site/index.html`

**Steps:**
1. Load the site layer after the generated Pith CSS.
2. Add mobile-first hero, proof-panel, benefit-card, CTA, and section-spacing rules.
3. Add hover/active polish only for pointer-capable devices and honor reduced motion.

### Task 3: Build and verify

**Files:**
- Generated: `.pages/`

**Steps:**
1. Run `npm test`.
2. Run `npm run pages:build`.
3. Inspect the generated page output and confirm the source remains package-valid.
