# Repository Readiness Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish a professional baseline for publishing and maintaining Pith as a small, accessible, dependency-free package.

**Architecture:** Keep the package runtime-free and framework-agnostic. Add repository governance and CI around the existing validator, and harden only the local example tooling needed for safe development.

**Tech Stack:** npm package metadata, Node.js scripts, GitHub Actions, Markdown governance documents.

---

### Task 1: Add repository hygiene and governance

**Files:** `.gitignore`, `.npmrc`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`

Add safe local ignore rules, public-package defaults, contributor expectations, security reporting guidance, community standards, and release history.

### Task 2: Add package quality metadata and CI

**Files:** `package.json`, `.github/workflows/ci.yml`

Expose discoverability metadata, verify the package with the existing test suite, and ensure the packed artifact contains only intended public files.

### Task 3: Harden local tooling

**Files:** `scripts/serve-example.mjs`, `scripts/validate-package.mjs`

Prevent path traversal in the example server and validate package metadata plus the publish dry run.

### Task 4: Verify the release baseline

**Commands:** `npm test`, `npm run pack:check`, `npm pack --dry-run`

Confirm the repository is internally consistent and the package can be inspected before publishing.
