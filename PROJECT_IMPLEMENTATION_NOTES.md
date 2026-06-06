# Project Implementation Notes

This file stores implementation details for this project (icons, UI patterns, setup steps, and future notes).

## Packages

- `@fortawesome/angular-fontawesome`
- `@fortawesome/free-solid-svg-icons`
- `@fortawesome/free-regular-svg-icons`
- `@fortawesome/free-brands-svg-icons`
- `@ng-bootstrap/ng-bootstrap`
- `bootstrap`
- `@popperjs/core`

## Component Pattern (Standalone)

1. Import icons in the component TS file:
   - `import { faEye, faTrash, ... } from '@fortawesome/free-solid-svg-icons';`
2. Import Font Awesome component:
   - `import { FaIconComponent } from '@fortawesome/angular-fontawesome';`
3. Add `FaIconComponent` in the component `imports` array.
4. Expose icons as class properties:
   - `faEye = faEye;`
   - `faTrash = faTrash;`

## HTML Pattern

- Basic usage:
  - `<fa-icon [icon]="faEye"></fa-icon>`
- With dynamic condition:
  - `<fa-icon [icon]="searchRecord() ? faXmark : faMagnifyingGlass"></fa-icon>`
- With model-driven icon:
  - `<fa-icon [icon]="tab.icon"></fa-icon>`

## Quick Checklist Before Implementation

- Confirm `FaIconComponent` exists in the target component imports.
- Confirm every icon used in HTML is declared in TS.
- Keep naming same as HRMS style (`faXmark`, `faMagnifyingGlass`, etc.).
- Use `<fa-icon>` only (not mixed icon systems in same component unless required).

## Next Step When User Says "Apply"

Follow this exact order in target component:

1. TS imports
2. `imports: [FaIconComponent, ...]`
3. icon class properties
4. HTML `<fa-icon [icon]="...">`

## Color Scheme and Button Style (HRMS Match)

- Theme color: `#ed9e42`
- Primary text: `#000000`
- Secondary text: `#3d3d3d`
- Light background: `#ffffff`
- Border light: `#f5f5f5`
- Input border: `#ededed`

Implemented in `src/styles.css`:

- Bootstrap CSS import
- Global CSS variables (`:root`) based on HRMS palette
- Font setup (`Open Sans`, `Maven Pro`)
- HRMS-style button classes:
  - `.btn-primary`
  - `.btn-secondary`
  - `.login-btn`

Also added HRMS-style base classes:

- Inputs:
  - `.input-primary`
  - `.input-secondary`
- Select:
  - `.select-primary`
- Forms layout:
  - `.basicforms-wrap`
  - `.inputwrap`
  - `.formsfooter`
- Tables and pagination:
  - `.tablewrap`
  - `.filter-pagin-wrap`

## Professional Cleanup Standards

- Keep root component minimal and production-ready (no Angular placeholder markup).
- Use meaningful property names:
  - Prefer `appName` over generic/demo names like `title`.
- Avoid duplicate/extra render blocks:
  - Single `<router-outlet>` in root shell.
- Keep styles centralized in `src/styles.css` for shared design tokens and common UI classes.
- Prefer reusable class names already defined in global styles (`.btn-primary`, `.input-secondary`, `.tablewrap`, etc.) before adding new ones.

## Permanent Development Rules (User Preference)

- Do not write comments during coding.
- Follow professional code standards and naming conventions.
- Use Angular 19 standalone approach consistently.
- Avoid duplicate and unnecessary code.
- Implement only what the user explicitly asks for in that message (or step); do not expand scope, add screens, navigation, or refactors “on your own.”
- CSS: put reusable / shared styles in `src/styles.css`; anything specific to one component stays in that component’s stylesheet. Use global classes from HTML only when they are defined in `styles.css`.

## App header buttons (do not regress)

- **Account** (`app-header` + `.btn-primary`): hover, focus-visible, and active must follow the same pattern as `src/styles.css` on `.btn-primary:hover` — `background: none`, text and border `var(--theme-color)`. Do not switch to a filled “darker orange” hover in the header.
- **Alerts** (`btn-outline-secondary` in the header): keep Bootstrap’s default look and hover; do not add custom outline-secondary rules unless the user asks. Toolbar-only tweaks stay in `.app-header .btn` (size, no min-width), not theme overrides on Alerts.
