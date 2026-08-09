---
name: native-first-ui
description: Build, refactor, and review Native-First UI interfaces with semantic HTML, small framework-agnostic CSS layers, accessible interaction contracts, mobile-first responsive structure, progressive enhancement, and restrained visual polish. Use for UI architecture, components, recipes, forms, navigation, tables, dashboards, and responsive web interfaces.
---

# Native-First UI

Build interfaces that feel inevitable: the browser should provide the semantics and behavior, the CSS should add a small amount of clear structure, and polish should make the result feel calm, responsive, and cared for.

This skill is the project’s structure, styling, accessibility, and refactoring guide. Follow the repository's `AGENTS.md` and `INTEGRATION-RULES.md` first. Use `$emil-design-eng` for independent visual polish and motion decisions.

## Operating principles

### Start with the browser

- Prefer semantic native HTML before custom components, roles, or ARIA.
- Use real links for navigation, buttons for actions, forms for submission, labels for controls, and native `dialog`, `details`, `popover`, `select`, `progress`, and table semantics when they fit.
- Add JavaScript only for behavior the native element does not provide. Keep enhancements optional, dependency-free, and explicitly marked.
- Use the existing `nf-*` contract and `data-variant` states before creating a new selector. Role-repeating classes such as `nf-button` or `nf-dialog` are not part of the public API.
- Keep product-specific composition and behavior in the consuming application layer, not in the library.

### Make the smallest coherent system

- Inspect existing tokens, element rules, patterns, recipes, and generated contracts before adding code.
- Prefer one reusable native contract over several one-off components.
- Keep CSS layers small, framework-agnostic, and understandable without a build tool.
- Do not add a dependency, abstraction, global reset, or broad selector unless the existing native contract cannot solve the problem.
- Preserve the same DOM and data model across mobile and desktop. Use media queries to add space, not to create a second interface.
- Start mobile-first. Let content wrap, long labels survive, and intrinsic sizing do the work.

### Treat accessibility as interaction quality

- Preserve visible `:focus-visible` styles and keyboard operation.
- Keep interactive controls at least 44px tall. Keep mobile text inputs at least 16px to avoid unwanted viewport zoom.
- Label every form control and connect help, validation, and error text with `aria-describedby` where appropriate.
- Announce asynchronous or changing status with `role="status"` or `aria-live="polite"`.
- Do not communicate meaning by color alone. Do not use an icon as the only action label.
- Preserve forced-colors, dark-mode, zoom, and reduced-motion behavior.

## A build or refactor workflow

1. **Orient.** Read the relevant markup, CSS layer, recipe, tests, and example. Identify the native element and existing contract that should own the behavior.
2. **State the intent.** Decide whether the change improves semantics, comprehension, feedback, spatial continuity, or visual hierarchy. If the intent is only to make something move, do not add motion yet.
3. **Model the simplest structure.** Keep content and interaction intent in semantic HTML. Use classes only for reusable composition; use attributes for state.
4. **Build the no-JavaScript path.** The primary content and native controls must remain useful when enhancement code is unavailable.
5. **Add responsive behavior.** Preserve the DOM, use logical properties, test narrow widths, long content, and 200% zoom.
6. **Add polish deliberately.** Decide whether motion is necessary, then choose properties, curve, duration, interruption behavior, and reduced-motion behavior.
7. **Add a growth case.** Update a recipe, showcase example, contract, or automated check when introducing a reusable pattern.
8. **Verify.** Run the project checks and inspect keyboard focus, narrow layouts, dark mode, forced colors, reduced motion, empty/error states, and the changed interaction.

## Motion decision framework

### First ask whether it should move

Motion is optional. Use it when it communicates one of these things:

- **Feedback:** a pressed control confirms that the input was received.
- **Spatial continuity:** a drawer or toast enters from the place it will occupy.
- **State change:** a toggle or status transition makes the new state easier to understand.
- **Prevention of a jarring change:** an occasional dialog or overlay does not appear abruptly.

Do not animate frequent keyboard-driven actions, command-palette navigation, list selection, or other interactions that users repeat constantly. Do not add motion merely because a component can move.

### Choose the implementation

- Use CSS transitions for simple, interruptible UI states.
- Use CSS animations only for predetermined, non-interactive motion.
- Use WAAPI when JavaScript must control a CSS-like animation programmatically.
- Use a spring only for gestures, momentum, interruptible physical movement, or restrained decorative tracking. Avoid bounce in ordinary product UI.
- Prefer `transform` and `opacity` for movement and presence. Avoid animating layout properties such as `height`, `width`, `margin`, and `padding` when transform or opacity can express the change.

### Choose the timing

Use a strong custom curve rather than weak default easing when the interaction benefits from a clear character:

```css
--nf-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--nf-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--nf-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

- Button press: 100–160ms.
- Tooltip or small popover: 125–200ms.
- Dropdown or select: 150–250ms.
- Dialog or drawer: normally 200–300ms; use longer only when the spatial explanation requires it.
- Entering UI: usually ease-out so feedback starts immediately.
- On-screen movement: usually ease-in-out.
- Constant motion: linear.
- Never use `ease-in` for ordinary UI entry or feedback.
- Never use `transition: all`; name the properties being transitioned.

### Interaction details

- Give pressable controls subtle `:active` feedback, normally `scale(.97)` to `scale(.98)`, without harming focus or touch behavior.
- Never enter from `scale(0)`. Use a visible shape such as `scale(.97)` with opacity when scale is appropriate.
- Use `@starting-style` for supported native entry states; otherwise use a small explicit state contract.
- Make anchored popovers originate near their trigger with `transform-origin`; centered modal dialogs may remain centered.
- Prefer transitions over keyframes for states that can be triggered repeatedly or interrupted.
- Gate hover-only motion behind `(hover: hover) and (pointer: fine)`.
- Use percentage translations when hiding an element by its own size, such as `translateY(100%)` for a drawer.
- Keep enter and exit behavior intentional. Exits are often shorter; deliberate actions may fill slowly while release or cancellation should respond quickly.
- Do not block interaction while decorative stagger is running. Keep stagger intervals short, usually 30–80ms.

### Gestures

Only add gesture behavior when the product genuinely needs it. For drawers or dismissible surfaces:

- capture the pointer after a drag begins;
- ignore additional touch points;
- apply friction at boundaries instead of an abrupt invisible wall;
- use velocity as well as distance for dismissal, so a quick flick can succeed;
- keep the interaction usable with keyboard and assistive technology.

## Reduced motion

Reduced motion means fewer and gentler animations, not a broken interface. Keep opacity or color changes when they aid comprehension; remove movement and position changes.

```css
@media (prefers-reduced-motion: reduce) {
  .thing { transition-duration: 0ms; animation: none; }
}
```

For JavaScript-driven motion, detect the preference and use an immediate state change. Also respect reduced motion for smooth scrolling, carousels, drawers, and any future gesture implementation.

## Component-specific quality bar

- **Buttons:** readable text, native button semantics, visible focus, 44px target, disabled state, and subtle press feedback.
- **Forms:** visible labels, useful autocomplete/input types, connected help and errors, 16px mobile inputs, and status announcements.
- **Dialogs and drawers:** native `dialog`, sensible focus behavior, Escape/light dismissal where appropriate, origin-aware drawer motion, and a no-motion path.
- **Popovers and menus:** anchored origin, keyboard access, explicit labels, and no forced animation for frequent actions.
- **Tabs:** native buttons with correct `aria-selected`, roving tab index, keyboard arrows, and immediate selection for keyboard navigation.
- **Toasts and async feedback:** explicit status text, interruptible enter/exit behavior when animated, pause timers when the page is hidden, and provide an undo or confirmation path for destructive work.
- **Tables and dense content:** preserve table semantics, captions, scopes, readable overflow, and visible focus for scroll regions.
- **Loading and empty states:** explain what is happening, what happened, and what the user can do next. Do not rely on a decorative spinner alone.

## Refactoring rules

Before changing a UI rule, answer:

1. What native behavior or existing contract is being preserved?
2. What user-visible problem does the change solve?
3. Can the same result be achieved with less DOM, CSS, JavaScript, or configuration?
4. Does the change work without enhancement code and at narrow widths?
5. Does it preserve focus, keyboard behavior, labels, status announcements, forced colors, and reduced motion?

Do not refactor for novelty. Consolidate only when the result becomes easier to understand, more reusable, or more correct. Keep application overrides prefixed and outside the library source. Override `--nf-*` tokens in the application layer rather than changing library tokens for one product.

## Review format

When reviewing UI code, always use a markdown table with `Before`, `After`, and `Why` columns. Include file and line references when available. Review semantics, DOM shape, responsive behavior, accessibility, visual hierarchy, motion purpose, performance, and reduced motion—not animation alone.

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 160ms var(--nf-ease-out)` | Names the intentional property and gives immediate feedback |
| Custom clickable `div` | Native `<button>` | Restores keyboard, focus, and platform behavior |
| Popover scales from center | `transform-origin` follows the trigger | Preserves spatial continuity |
| `scrollBy({ behavior: "smooth" })` for every user | Smooth scrolling only when motion is allowed; instant otherwise | Respects user preference and keeps repeated actions responsive |
| Product-specific rule in the library | Prefixed application-layer rule or token override | Protects the reusable, framework-agnostic contract |

Do not claim strict compliance from static inspection alone. Distinguish between what the code proves, what automated checks prove, and what still needs keyboard, responsive, reduced-motion, or real-device verification.

## Verification

After interface changes, run the project checks, normally:

```bash
npm test
```

For meaningful interaction changes, also use the showcase or local example to verify keyboard operation, narrow layouts, long labels, 200% zoom, dark mode, forced colors, reduced motion, and empty/error states. Test touch gestures on real hardware when gestures are introduced.
