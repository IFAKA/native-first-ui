# Component coverage

Pith is not a React port of shadcn/ui. It provides copyable HTML recipes with native browser behavior and optional enhancement. This matrix keeps the comparison explicit. The names below are the current components listed in the [official shadcn/ui catalog](https://ui.shadcn.com/docs/components).

## Coverage is tracked as data

The complete current shadcn index is tracked in [`recipes/catalog.json`](../recipes/catalog.json). Each entry identifies whether this project provides a copyable recipe, a native equivalent, an optional enhancement, or an application integration.

The exact public component inventory is the 64 slugs in `recipes/catalog.json`; every slug has a concrete workbench contract in `examples/index.html`. The per-component source mapping and adaptation status live in [`COMPONENT-TRACKER.md`](./COMPONENT-TRACKER.md). The core recipe families are copyable from `recipes/`: buttons, forms, cards, alerts, navigation, dialogs, tables/data-table structure, tabs, menus, drawers, and feedback. These use native equivalents where possible: `details`, `dialog`, `popover`, `form`, `input`, `select`, `datalist`, `table`, `progress`, links, and labelled landmarks.

## Intentionally outside the core CSS framework

Carousel, Chart, Message Scroller, Resizable, rich data-grid behavior beyond semantic tables, and rich-text/editor integrations remain application integrations. The framework does not claim React/Tailwind implementation parity; it provides the same copy/paste ownership model for the native HTML interaction families and documents where application behavior is required.

## Naming differences

Recipe family labels are implementation groupings, not additional public component names. “Menu” means a contextual action surface. “Navigation” means links that change location. They are deliberately separate recipes. Tabs require `behavior.js` for arrow-key state management; menus and dialogs use native Popover/Dialog APIs where the browser supports them.
