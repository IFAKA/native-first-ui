# Pith — a tiny CSS framework for semantic HTML

[![CI](https://github.com/IFAKA/pith/actions/workflows/ci.yml/badge.svg)](https://github.com/IFAKA/pith/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Pith is a tiny, framework-agnostic CSS framework for semantic HTML, accessible UI, and responsive layouts. Build product-grade interfaces with zero runtime dependencies and optional recipes when you need more.

You keep the browser’s strengths—real links, buttons, forms, tables, lists, `dialog`, `details`, and `popover`—and get responsive layout, visible focus, resilient control states, and locally owned recipes.

```text
semantic HTML → tiny CSS contracts → local recipes
```

The default package entry point is `core.css`. It has no runtime dependency, keeps application shells full-width, and does not require a component naming convention.

## Current status

The Pith refactor is implemented and validated locally. The current release surface includes:

- `core.css` as the default package export;
- optional `layout.css`, `forms.css`, `navigation.css`, `data.css`, `overlays.css`, and `components.css` modules;
- the small public layout vocabulary `nf-container`, `nf-readable`, `nf-stack`, `nf-cluster`, and `nf-grid`;
- native element and state contracts, including visible focus, 44px touch targets, 16px mobile inputs, reduced motion, dark mode, and forced colors;
- framework-agnostic recipes for dialog, drawer, data table, menu, tabs, forms, navigation, alerts, and feedback;
- a single interactive GitHub Pages showcase with copyable HTML and in-page navigation.

The library is intentionally small and opinionated. Its automated suite validates the package contract, CSS transformation, and size budgets.

## Benchmarks

Measured from the current generated distribution on the development machine:

| Artifact | Raw | Gzip | Brotli |
| --- | ---: | ---: | ---: |
| `core.css` | 4,905 B | 1,470 B | 1,223 B |
| `layout.css` | 1,283 B | 547 B | 463 B |
| `forms.css` | 663 B | 302 B | 239 B |
| `navigation.css` | 618 B | 333 B | 255 B |
| `data.css` | 600 B | 303 B | 262 B |
| `overlays.css` | 1,375 B | 515 B | 434 B |
The npm package has zero runtime dependencies. Optional layers are shipped separately so consumers can load only what their markup needs.

### Comparable CSS gzip sizes

This comparison uses direct CSS distributions only. Pith is measured as its core stylesheet; the other figures are full or default framework distributions.

| Project | Gzip | README |
| --- | ---: | --- |
| [**Pith**](https://ifaka.github.io/pith/) | **1.47 KB** | [README](https://github.com/IFAKA/pith#readme) |
| [Milligram](https://milligram.io/) | ≈2 KB | [README](https://github.com/milligram/milligram#readme) |
| [Pure.css](https://pure-css.github.io/) | ≈3.5 KB | [README](https://github.com/pure-css/pure#readme) |
| [Bootstrap](https://getbootstrap.com/) | ≈28 KB | [README](https://github.com/twbs/bootstrap#readme) |
| [Bulma](https://bulma.io/) | 77.8 KB | [README](https://github.com/jgthms/bulma#readme) |

The Bulma figure comes from [Bundlephobia](https://bundlephobia.com/); the other comparison figures are linked from the project documentation or published size notes.

## Why this project exists

Pith combines lessons from several excellent projects instead of pretending to replace them:

- [Lit](https://lit.dev/) and [Min](https://mincss.com/) inspire byte discipline and a small surface area.
- [New.css](https://newcss.net/) inspires classless semantic defaults that make plain HTML useful immediately.
- [Milligram](https://milligram.io/) inspires practical controls, forms, typography, and a usable baseline.
- [Pure.css](https://pure-css.github.io/) inspires modular CSS that can be selected instead of shipped wholesale.
- [shadcn/ui](https://ui.shadcn.com/) inspires local ownership: recipes are copied into the project, remain editable, and do not become a hidden runtime dependency.
- Product-quality interaction guidance informs the interaction, content, accessibility, loading, error, and responsive quality bar.
- Motion stays restrained: it has a purpose, press feedback is responsive, transitions are interruptible, and reduced motion is respected.

Pith gives you the rare combination: a tiny generated payload, real browser semantics, accessible defaults, responsive primitives, and code your team owns. It is faster to adopt than a full component ecosystem, more capable than a bare classless stylesheet, and more durable than a UI layer that hides the markup and behavior from your product code.

## Live showcase

Visit the [Pith GitHub Pages showcase](https://ifaka.github.io/pith/). It is one complete, prioritized, interactive page—not a collection of disconnected screenshots—with:

- foundations and native HTML;
- buttons, forms, validation, and controls;
- feedback, loading, and empty states;
- layout and surfaces;
- navigation, menus, breadcrumbs, and pagination;
- dialogs, drawers, popovers, and tabs;
- tables, badges, and readable data;
- optional comboboxes and command palettes.

Click the controls, submit the form, change the range, switch tabs, open the dialog/menu/command palette, resize the viewport, test keyboard focus, and inspect the source. The same page is available locally with `npm run serve`.

## Install

```bash
npm install pith-css
```

```css
@import "pith-css/core.css";
```

The package root exports `core.css`. Optional contracts are available explicitly:

```css
@import "pith-css/layout.css";
@import "pith-css/forms.css";
@import "pith-css/navigation.css";
@import "pith-css/data.css";
@import "pith-css/overlays.css";
@import "pith-css/components.css";
```

The dependency-free `behavior.js` module is available for recipes that need progressive enhancement. Native controls remain usable without it.

## Public API

Native HTML remains the identity of the system:

```html
<main class="nf-readable">
  <form class="nf-stack">
    <label>
      Email
      <input type="email" name="email" autocomplete="email" required />
      <small>We will send the receipt here.</small>
    </label>
    <button type="submit" data-variant="primary">Save</button>
  </form>
</main>
```

Use native state and attributes first, then approved variants and the small layout vocabulary. There are no role-repeating public classes such as `nf-button`, `nf-input`, `nf-card`, or `nf-dialog`.

The core includes readable typography, links, buttons, form controls, labels, fieldsets, validation, lists, tables, code, media, visible `:focus-visible`, grouped `:focus-within`, 44px targets, mobile input sizing, light/dark tokens, reduced motion, and forced-colors support.

## Recipes

Recipes are copyable HTML in `recipes/`. They keep product-specific markup and behavior in the consuming project while using the same native-first contracts as the library.

## Theme and application boundary

Brand the system by overriding tokens in your own layer:

```css
@layer theme {
  :root {
    --nf-color-accent: #6d28d9;
    --nf-color-accent-strong: #5b21b6;
    --nf-color-accent-ink: #ffffff;
    --nf-radius-md: 0.75rem;
  }
}
```

Keep product-specific composition and behavior local. Use real links for destinations, labels for controls, `aria-live="polite"` for asynchronous status, and confirmation or undo for destructive actions.

The Pith brand is new, but the `nf-*` CSS contract remains stable and will not change until a future major release.

### Follow-up: migrate the CSS contract

In a future major release, evaluate renaming the `nf-*` selectors and `--nf-*` tokens to Pith-prefixed names. Treat this as a separate breaking-change task with a migration guide, compatibility period, codemod or equivalent upgrade aid, updated recipes, and a fresh public API audit. Keep `nf-*` unchanged until that work is explicitly planned and released.

## Development

```bash
npm test
npm run serve
npm run pages:build
npm run pack:check
```

`npm test` builds the generated contract, compiles the package, audits the public API, validates the package, checks sizes, and audits CSS minimality. `pages:build` prepares the GitHub Pages artifact in `.pages/`.

## License

MIT. See [LICENSE](LICENSE).
