# Native-First UI

An HTML-first CSS component library for SaaS apps, ecommerce, dashboards, landing pages, and internal tools. It has one entry-point stylesheet, no runtime dependency, and a small optional behavior module.

## Install

```bash
npm install native-first-ui
```

```css
@import "native-first-ui/core.css";
```

The package also exports `tokens.css`, `elements.css`, `patterns.css`, `components.css`, and optional `behavior.js`.

## Agent workflow

Choose semantic HTML → choose the closest `nf-` contract → compose layout patterns → customize CSS variables → add custom CSS only when no library contract exists.

Native HTML remains the API. Classes add layout, states, and visual consistency; they do not replace element semantics.

## Canonical catalog

| Contract | Use with | Use when | Mobile behavior |
| --- | --- | --- | --- |
| `nf-container` | any flow element | Center page content with a readable maximum | Full width with a small gutter |
| `nf-page`, `nf-page-header` | `main`, `header` | Establish an application page and its heading/actions | Header wraps |
| `nf-stack` | any flow element | Vertical rhythm | One column at every width |
| `nf-cluster` | `div`, `nav`, `footer` | Wrapping inline actions or metadata | Items wrap naturally |
| `nf-grid` | `section`, `div` | Responsive cards or fields | Auto-fit columns collapse |
| `nf-sidebar` | `div`, `main` | Sidebar plus content layout | Becomes one column |
| `nf-navigation` | `nav` | Links and native `details` menus | Links wrap; menus stay within viewport |
| `nf-button`, `nf-button-primary`, `nf-button-danger` | `<button>` or `<a>` | Default, primary, or destructive actions | At least 44px tall and labels wrap |
| `nf-card` | `article`, `section` | Bounded surface containing related content | Width is intrinsic |
| `nf-badge` | `span` | Compact status or category label | Long values wrap |
| `nf-alert` | `aside`, `div` | Persistent info, success, warning, or error message | Content reflows |
| `nf-form`, `nf-field`, `nf-help`, `nf-error` | `<form>`, `<fieldset>` | Forms and validation copy | Fields remain single-column by default |
| `nf-table-scroll`, `nf-table` | labelled `div`, `<table>` | Dense data that cannot reflow | Scrolls horizontally in its labelled region |
| `nf-dialog` | `<dialog>` | Confirmation or focused short task | Constrained to viewport |
| `nf-loading`, `nf-empty` | status region or section | Loading and no-result states | Preserve a useful minimum area |

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

### Dialog behavior

Native dialogs work without JavaScript when opened by application code. For declarative controls, import the optional module:

```html
<button class="nf-button-danger" data-nf-dialog-open="delete-dialog">Delete project</button>
<dialog id="delete-dialog" class="nf-dialog" aria-labelledby="delete-title">
  <form method="dialog" class="nf-stack">
    <p id="delete-title"><strong>Delete project?</strong></p>
    <p data-nf-dialog-status class="nf-help" aria-live="polite"></p>
    <div class="nf-cluster">
      <button class="nf-button" value="cancel">Cancel</button>
      <button class="nf-button-danger" value="confirm">Delete</button>
    </div>
  </form>
</dialog>
<script type="module" src="/node_modules/native-first-ui/src/behavior.js"></script>
```

The module provides open/close controls, Escape-to-close, a polite dialog status, and focus restoration. It is not a component runtime.

## Recipes

- SaaS dashboard: `.nf-page` + `.nf-page-header` + `.nf-sidebar` + `.nf-grid` + `.nf-card`.
- Ecommerce product page: `.nf-page` + `.nf-grid` for media/details, `.nf-badge` for stock, `.nf-button-primary` for purchase, and `.nf-alert` for fulfillment notices.
- Landing page: `.nf-container` + `.nf-stack` for the hero, `.nf-cluster` for calls to action, and `.nf-grid` for feature cards.
- Admin panel: `.nf-sidebar` + `.nf-navigation` + `.nf-page-header` + `.nf-table-scroll`/`.nf-table`.
- Settings form: `.nf-form` + `.nf-field`, explicit `<label>` elements, `.nf-help`, and `.nf-error` linked with `aria-describedby`.
- Data-heavy workspace: a labelled, focusable `.nf-table-scroll` around `.nf-table`; keep filters in an `.nf-cluster` and announce async updates with `aria-live="polite"`.

## Customization and conformance

Override the `--nf-*` variables in your own layer for branding. The defaults include light/dark themes, forced-colors borders, reduced-motion rules, visible focus, and 44px controls. The workbench at `examples/index.html` includes desktop/mobile previews, long labels, empty/loading/error/success states, dialog behavior, dark mode, and a 500-row growth fixture.

```bash
npm test
npm run serve
```
