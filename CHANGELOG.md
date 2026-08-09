# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and releases use semantic versioning.

## [Unreleased]

### Added

- Repository contribution, security, and release guidance.
- Continuous integration for package validation and publish dry runs.
- A GitHub Pages showcase built from the generated CSS distribution.

### Fixed

- Prevented the local example server from serving files outside the project.

### Changed

- Removed catalog-only CSS contracts from the public package.
- Removed the custom dialog behavior module; use native `<dialog>` forms and modern `commandfor`/`command` invokers.
- Removed the redundant `nf-disclosure` and `nf-meter` contracts; use `<details>`/`<summary>` and `<progress>` directly.
