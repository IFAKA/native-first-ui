# Tables

This is the native-first equivalent of shadcn's Table/Data Table family: use a real `<table>` for relational data, a caption, scoped headers, labelled focusable scrolling, real links for row destinations, and native form controls for filtering. Keep the table in the DOM at narrow widths. Sorting, server pagination, and filtering state belong to the application; a header button is an explicit hook for that behavior, not fake client-side sorting.

The fragment is intentionally copyable HTML. It does not require React, Tailwind, a table runtime, or catalog-only CSS.
