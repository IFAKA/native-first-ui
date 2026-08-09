# Pith agent rules

Use semantic HTML first: element → native state/ARIA → parent context → sibling relationship → registered utility → component contract.

Only documented `nf-*` contracts are public. Do not add role-repeating classes such as `.nf-button`, arbitrary values, inline styles, or custom selectors in managed UI files. Theme consumers may override `--nf-*` tokens only. Prefer `form > label`, `nav > a`, `fieldset > legend`, `:has(:invalid)`, and native disclosure/dialog/popover behavior before adding a class.
