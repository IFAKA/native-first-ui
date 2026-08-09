# shadcn Component Contracts Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the generic Native-First UI workbench expose exactly the requested shadcn-style component names and provide a concrete native HTML contract for every one.

**Architecture:** Keep the existing catalog as the single public inventory. The workbench will render every catalog slug, including native equivalents and application-owned patterns, while the validator checks that each slug has a concrete definition rather than a fallback placeholder. Recipe family names remain internal organization only.

**Tech Stack:** Framework-free HTML, CSS cascade layers, vanilla JavaScript, Node package validation.

---

### Task 1: Add the missing concrete contracts

**Files:**
- Modify: `examples/index.html`
- Modify: `src/components.css`

Add native `details`/`summary` markup for Accordion and an intrinsic aspect-ratio media frame. Remove the workbench exclusion and generic fallback behavior.

### Task 2: Lock the public inventory

**Files:**
- Modify: `scripts/validate-package.mjs`
- Modify: `docs/SHADCN-COVERAGE.md`

Validate the exact requested slug set, require every slug to have a concrete workbench definition, and document that family labels are not public component names.

### Task 3: Verify the package

**Files:**
- Generated: `dist/*.css`

Run the package test and build checks, then inspect the resulting workbench inventory and examples for missing definitions.
