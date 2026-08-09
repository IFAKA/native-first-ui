# Mobile action bars

Use a semantic `footer` with `.nf-mobile-actions` for the primary completion action in a task flow such as a questionnaire, checkout, or editor.

On narrow screens the footer stays at the bottom of the scroll context, includes safe-area padding, and gives its links or buttons a comfortable thumb-sized width. On larger screens it returns to normal document flow and aligns actions to the end. Keep the footer inside the same form or page content so the DOM and keyboard order stay consistent.

Keep status text outside the footer when it describes validation or async work. Use `aria-live="polite"` for status updates, and make sure the consuming page leaves enough content space when it uses a fixed action bar instead of this sticky pattern.
