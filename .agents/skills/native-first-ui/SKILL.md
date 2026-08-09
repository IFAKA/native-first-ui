---
name: native-first-ui
description: Build production-ready, scalable web interfaces with semantic native HTML, mobile-first responsive structure, minimal CSS, accessible interaction contracts, and restrained Emil-style polish. Use when creating or refactoring any web app UI, design system, component library, navigation, forms, tables, dashboards, or responsive layouts where Tailwind or a large component dependency should be avoided.
---

# Native-First UI

Use semantic HTML as the component API. Add CSS for consistency and layout. Add JavaScript only when native HTML cannot provide the required behavior.

Use this skill together with `$emil-design-eng` when the user requests polished interaction, animation, or visual refinement. Emil's skill governs whether motion should exist and how it should feel; this skill governs structure, styling boundaries, and scalability.

## Workflow

1. Inspect the existing project conventions, routes, components, CSS entry points, and `AGENTS.md` before editing.
2. Identify the smallest semantic HTML structure that expresses the feature.
3. Prefer native elements: `a`, `button`, `form`, `input`, `select`, `textarea`, `fieldset`, `details`, `summary`, `dialog`, `table`, lists, headings, and landmarks.
4. Establish or reuse a small CSS foundation before adding page-specific rules.
5. Build mobile-first. Use the same DOM, data model, and interaction model at every viewport; desktop media queries may add columns, inline grouping, and available space only.
6. Test growth cases before declaring the work complete: long labels, nested items, empty/error states, dense data, 200% zoom, keyboard-only use, narrow widths, and forced colors.

## CSS Architecture

Keep these boundaries:

- `tokens.css`: spacing, sizing, readable widths, and other design tokens.
- `globals.css`: reset and document-level defaults only.
- `elements.css`: native element contracts, focus-visible treatment, control sizing, and disabled states.
- `core.css`: reusable layout/navigation/form/table contracts independent of product content.
- page or feature styles: application-specific visual composition.

Keep the core layer small. Do not add a generic component rule just because one screen needs it. Prefer a native element or a composable pattern such as `.stack`, `.cluster`, `.content-readable`, or a locally named feature class.

Use cascade layers when the project has multiple CSS sources:

```css
@layer reset, tokens, elements, patterns, components, utilities;
```

Avoid Tailwind or another utility framework unless the user explicitly chooses it. Do not recreate a full component library with hundreds of classes.

## Responsive Contracts

- Start with a one-column, narrow-screen layout.
- Use `min()`, `max()`, `clamp()`, `minmax()`, wrapping, and intrinsic sizing before device-specific breakpoints.
- Keep page-level overflow hidden only when a deliberate scroll region owns the overflow; do not hide broken layouts.
- Wrap long words and labels with `overflow-wrap: anywhere` where needed.
- Give controls at least a 44px hit target on touch layouts.
- Make tables scroll inside an explicitly labelled/focusable wrapper when they cannot reflow.
- Keep desktop and mobile navigation driven by the same typed data. Use native `details`/`summary` for nested disclosure unless an application requirement needs enhanced behavior.

## Accessibility Contracts

- Preserve native semantics before adding ARIA.
- Label every form control or provide an explicit accessible name.
- Keep keyboard focus visible with `:focus-visible`.
- Use `aria-live` for asynchronous status changes.
- Use `aria-current="page"` for the current navigation link.
- Do not use icons as the only label for an action.
- Respect reduced motion and never animate keyboard-heavy interactions merely for decoration.

## Emil-Style Polish

Only add motion when it communicates state, spatial relationship, feedback, or prevents a jarring change. Prefer CSS transitions for simple interruptible UI. Animate specific properties, keep common UI motion under 300ms, use ease-out for entry, and never animate from `scale(0)`. Add subtle `:active` feedback to pressable custom controls only when it does not harm accessibility or native behavior.

Polish hierarchy, spacing, typography, borders, and states before adding decoration. Prefer system typography and crisp restrained surfaces. Every visual detail must support comprehension or feedback.

## Validation

Before handoff, run the project's available lint, typecheck, unit, build, and browser tests. If browser execution is blocked by the environment, report that separately from application failures. Add a growth/conformance route or tests for reusable systems, not just a screenshot of the happy path.

Do not claim the result is a complete design-system library unless it has documented public APIs, package boundaries, compatibility policy, accessibility tests, and release validation.
