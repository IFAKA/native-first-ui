# Native-First UI Integration Rules

Use these rules when adding interface code to a project that uses Native-First UI.

## Required

- Use semantic native HTML before custom components or ARIA.
- Use the existing `nf-*` contract before writing a new UI rule.
- Import `native-first-ui/core.css` once, unless using the individual layer exports intentionally.
- Keep the DOM and data model the same on mobile and desktop.
- Start mobile-first and preserve visible `:focus-visible` styles.
- Keep interactive controls at least 44px tall.
- Label every form control and connect help or error text with `aria-describedby`.
- Use `aria-live` for asynchronous status updates.
- Add a growth case to the examples or tests when adding a reusable pattern.

## Do not

- Do not add Tailwind, Bootstrap, or another UI component library without an explicit project decision.
- Do not replace native elements with a custom component when the native element provides the required behavior.
- Do not add global resets or broad selectors that override the library's element layer.
- Do not override `--nf-*` tokens in the library source; override them in the application layer.
- Do not remove focus outlines, keyboard behavior, or forced-colors support. If you add motion, provide a reduced-motion path.
- Do not add an icon as the only label for an action.
- Do not add animation without a clear purpose.

## Custom CSS boundary

Application-specific CSS is allowed when no existing contract fits. Keep it in an application layer after the library layers and use a product-specific prefix. Do not modify files inside `node_modules/native-first-ui`.

```css
@layer reset, tokens, elements, patterns, components, app;

@import "native-first-ui/core.css";

@layer app {
  .app-project-hero { /* product-specific composition */ }
}
```

## Verification

Run the project's checks after interface changes. At minimum, verify keyboard operation, narrow layouts, long labels, 200% zoom, empty and error states, dark mode, and reduced motion.
