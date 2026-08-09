# Contributing

Thanks for helping make Pith a dependable foundation for accessible web interfaces.

## Before opening a pull request

- Keep the public API semantic and framework-agnostic.
- Prefer native HTML and CSS before adding JavaScript or ARIA.
- Preserve visible `:focus-visible` styles, keyboard operation, and 44px touch targets.
- Add or update a workbench fixture when changing a reusable contract.
- Update the README and changelog when behavior or public exports change.
- Run `npm test` and `npm run pack:check` locally.

## Pull requests

Use a focused title such as `feat: add a disclosure pattern` or `fix: preserve focus on dialog close`.
Describe the user-facing behavior, accessibility implications, browser considerations, and verification performed.

Small, focused pull requests are easier to review and safer to release.
