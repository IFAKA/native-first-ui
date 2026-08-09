# CSS minimality audit

This audit is conservative: it checks generated demo coverage and duplicate declaration groups. Shared element rules remain valid even when they are not component-class selectors.

- Public recipes audited: 11
- Native component classes used: 16
- Missing declarations: 0
- Unused component selectors: 14
- Duplicate declaration groups: 6

## Missing declarations

None.

## Unused component selectors

- `.nf-container`
- `.nf-readable`
- `.nf-grid`
- `.nf-page`
- `.nf-sidebar`
- `.nf-section`
- `.nf-content`
- `.nf-center`
- `.nf-split`
- `.nf-skip-link`
- `.nf-toggle`
- `.nf-toggle-control`
- `.nf-skeleton`
- `.nf-scroll-area`

## Duplicate declaration groups

- :where(p, li, dd), :where(label)
  - `overflow-wrap: anywhere`
- :where(button)[data-variant="primary"], :where(a)[data-variant="primary"]
  - `background: var(--nf-color-accent);border-color: var(--nf-color-accent);color: var(--nf-color-accent-ink)`
- :where(button)[data-variant="danger"], :where(a)[data-variant="danger"]
  - `background: var(--nf-color-danger);border-color: var(--nf-color-danger);color: var(--nf-color-on-danger)`
- :where(a, button, input, select, summary, textarea):focus-visible, .nf-toggle input:focus-visible + .nf-toggle-control, .nf-scroll-area:focus-visible
  - `box-shadow: var(--nf-focus-ring);outline-offset: 3px;outline: 2px solid var(--nf-color-accent)`
- :where(fieldset), .nf-content
  - `min-width: 0`
- :where(button), .nf-toggle-control::before
  - `transition-duration: 0ms`
