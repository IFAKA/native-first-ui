# Native-First UI Project Rules

Use `$native-first-ui` for all interface work. Use `$emil-design-eng` for visual polish, interaction details, and motion decisions.

- Prefer semantic native HTML before custom components or ARIA.
- Keep the DOM and data model the same on mobile and desktop.
- Start mobile-first; use desktop media queries only to add available space.
- Keep the reusable CSS layers small and framework-agnostic.
- Preserve visible `:focus-visible`, 44px touch targets, labels, keyboard operation, and `aria-live` status.
- Add growth cases to the example or tests when adding a reusable pattern.
- Do not add icons as the only label for an action.
- Do not add animation without a clear purpose; follow `$emil-design-eng` for motion.
