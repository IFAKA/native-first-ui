# Native-First UI

[![CI](https://github.com/IFAKA/native-first-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/IFAKA/native-first-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An HTML-first CSS contract library for SaaS apps, ecommerce, dashboards, landing pages, and internal tools. It has one entry-point stylesheet and no runtime dependency.

Native-First UI keeps the browser's native HTML semantics intact, then adds a compact set of responsive, accessible contracts for real product surfaces.

### Size at a glance

The complete bundled stylesheet is **about 2.6 KB compressed**. The npm package is **about 7.3 KB** and has **0 runtime dependencies**.

These are practical rounded sizes for the published package. Individual layer imports are available when an application needs less than the complete contract.

## Live showcase

The [Native-First UI showcase](https://ifaka.github.io/native-first-ui/) is built with this library. It demonstrates native forms, buttons, navigation, responsive layouts, dense tables, alerts, loading states, disclosure, and dialogs in one working page.

It is intentionally a real HTML page rather than a component screenshot: inspect the markup, resize the viewport, navigate by keyboard, and open the native dialog.

## Install

```bash
npm install native-first-ui
```

```css
@import "native-first-ui/core.css";
```

The package also exports `tokens.css`, `elements.css`, `patterns.css`, and `components.css`.

Use `core.css` for the complete contract, or import only the layers your page needs:

```css
@import "native-first-ui/tokens.css";
@import "native-first-ui/elements.css";
@import "native-first-ui/components.css";
```

`core.css` is the bundled one-request entry point. The individual exports are also minified and let your build include only selected CSS layers when you do not need the complete contract.

## Agent workflow

Choose semantic HTML → choose the closest `nf-` contract → compose layout patterns → customize CSS variables → add custom CSS only when no library contract exists.

Native HTML remains the API. Classes add layout, states, and visual consistency; they do not replace element semantics.

### Integration rules

The repository includes [AGENTS.md](./AGENTS.md) and [INTEGRATION-RULES.md](./INTEGRATION-RULES.md) for teams and coding agents. They are kept out of the published npm package.

## Reusable contracts

| Contract | Use with | Use when | Mobile behavior |
| --- | --- | --- | --- |
| `nf-container` | any flow element | Center page content with a readable maximum | Full width with a small gutter |
| `nf-page`, `nf-page-header` | `main`, `header` | Establish an application page and its heading/actions | Header wraps |
| `nf-stack` | any flow element | Vertical rhythm | One column at every width |
| `nf-cluster` | `div`, `nav`, `footer` | Wrapping inline actions or metadata | Items wrap naturally |
| `nf-grid` | `section`, `div` | Responsive cards or fields | Auto-fit columns collapse |
| `nf-sidebar` | `div`, `main` | Sidebar plus content layout | Becomes one column |
| `nf-section`, `nf-split`, `nf-center` | any flow element | Section rhythm, split headers, and centered states | Wraps or stacks naturally |
| `nf-navigation` | `nav` | Links and native `details` menus | Links wrap; menus stay within viewport |
| `nf-link`, `nf-link-muted` | `<a>` | Consistent text-link emphasis | Labels wrap and remain keyboard reachable |
| `nf-button`, `nf-button-primary`, `nf-button-danger`, `nf-button-quiet` | `<button>` or `<a>` | Default, primary, destructive, or quiet actions | At least 44px tall and labels wrap |
| `nf-card` | `article`, `section` | Bounded surface containing related content | Width is intrinsic |
| `nf-badge` | `span` | Compact status or category label | Long values wrap |
| `nf-alert` | `aside`, `div` | Persistent info, success, warning, or error message | Content reflows |
| `nf-form`, `nf-field`, `nf-help`, `nf-error` | `<form>`, `<fieldset>` | Forms and validation copy | Fields remain single-column by default |
| `nf-table-scroll`, `nf-table` | labelled `div`, `<table>` | Dense data that cannot reflow | Scrolls horizontally in its labelled region |
| `nf-dialog` | `<dialog>` | Confirmation or focused short task | Constrained to viewport |
| `nf-loading`, `nf-skeleton`, `nf-empty` | status region or section | Loading, placeholder, and no-result states | Preserve a useful minimum area |
| `nf-pagination` | `nav` | Paginated collections | Controls wrap without breaking the page |

Common states use native attributes: `disabled`, `required`, `aria-invalid="true"`, `aria-describedby`, `aria-current="page"`, `data-tone="success|warning|danger|info"`, and `aria-live="polite"` for changing status.

## Examples

```html
<main class="nf-page">
  <div class="nf-container">
    <header class="nf-page-header">
      <div class="nf-stack" data-gap="sm">
        <p class="nf-help">Workspace</p>
        <h1>Projects</h1>
      </div>
      <button class="nf-button-primary" type="button">Create project</button>
    </header>
    <section class="nf-grid" aria-label="Project summary">
      <article class="nf-card"><h2>Active</h2><p>24 projects</p></article>
      <article class="nf-card"><h2>Completed</h2><p>108 projects</p></article>
    </section>
  </div>
</main>
```

### Native dialogs

Use the browser's native dialog behavior. For current browsers, a button can invoke a dialog declaratively:

```html
<button class="nf-button-danger" commandfor="delete-dialog" command="show-modal">Delete project</button>
<dialog id="delete-dialog" class="nf-dialog" aria-labelledby="delete-title">
  <form method="dialog" class="nf-stack">
    <p id="delete-title"><strong>Delete project?</strong></p>
    <div class="nf-cluster">
      <button class="nf-button" value="cancel">Cancel</button>
      <button class="nf-button-danger" value="confirm">Delete</button>
    </div>
  </form>
</dialog>
```

For non-modal menus, hints, and anchored transient UI, use the native Popover API with `popover`, `popovertarget`, and `popovertargetaction`. Use `details`/`summary` when a disclosure is sufficient.

## Recipes

- SaaS dashboard: `.nf-page` + `.nf-page-header` + `.nf-sidebar` + `.nf-grid` + `.nf-card`.
- Ecommerce product page: `.nf-page` + `.nf-grid` for media/details, `.nf-badge` for stock, `.nf-button-primary` for purchase, and `.nf-alert` for fulfillment notices.
- Landing page: `.nf-container` + `.nf-stack` for the hero, `.nf-cluster` for calls to action, and `.nf-grid` for feature cards.
- Admin panel: `.nf-sidebar` + `.nf-navigation` + `.nf-page-header` + `.nf-table-scroll`/`.nf-table`.
- Settings form: `.nf-form` + `.nf-field`, explicit `<label>` elements, `.nf-help`, and `.nf-error` linked with `aria-describedby`.
- Data-heavy workspace: a labelled, focusable `.nf-table-scroll` around `.nf-table`; keep filters in an `.nf-cluster` and announce async updates with `aria-live="polite"`.

## Customization and conformance

Override the `--nf-*` variables in your own layer for branding. The defaults include light/dark themes, forced-colors borders, visible focus, and 44px controls. The example at `examples/index.html` composes the public contracts with native HTML; it is not a separate catalog component system.

```bash
npm test
npm run serve
```
