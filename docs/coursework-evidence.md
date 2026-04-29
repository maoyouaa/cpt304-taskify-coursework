# CPT304 Coursework Evidence Map

This file maps the implemented changes to the coursework's four deficiencies and five baseline standards.

## 1. Recommended Four Deficiencies

### Deficiency A: Accessibility and keyboard usability
- **Original problem**
  - The original project used decorative or incomplete forms and navigation with weak labeling, invalid partial structure, and no reliable focus treatment.
  - Example source evidence from the original fork:
    - `views/signup.ejs` used placeholders as the main label mechanism.
    - many partials included full nested `html/head/body` documents, which made semantic structure messy.
- **Implemented fix**
  - Rebuilt page structure into valid documents with shared partials.
  - Added explicit `label` elements for search, task form, signup, and login flows.
  - Added visible `:focus-visible` styling in `static/styles/main.css`.
  - Kept keyboard-accessible buttons and semantic headings across dashboard columns.
- **Current evidence locations**
  - `views/dashboard/dashboard.ejs`
  - `views/signup.ejs`
  - `views/partials/site-header.ejs`
  - `static/styles/main.css`
- **Detection tools to use in report**
  - Lighthouse Accessibility audit
  - axe DevTools
- **Suggested literature**
  - W3C WCAG 2.2 Understanding docs: [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)

### Deficiency B: Missing state persistence
- **Original problem**
  - The original dashboard was a static mockup. Tasks were hard-coded into EJS and did not persist after interaction or refresh.
- **Implemented fix**
  - Added browser-side storage using `localStorage`.
  - Added safe loading, persistence, grouping, filtering, and metrics logic for tasks.
  - Added graceful recovery when stored data is malformed.
- **Current evidence locations**
  - `static/js/modules/task-store.mjs`
  - `static/js/dashboard.js`
- **Detection tools to use in report**
  - Manual refresh test
  - Code inspection screenshot of the old static dashboard versus new storage-backed logic
- **Suggested literature**
  - MDN Web Storage API: [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

### Deficiency C: Weak user feedback and unclear task actions
- **Original problem**
  - The original project did not have a working task workflow, so users had no save/update/delete feedback and no clear action outcomes.
- **Implemented fix**
  - Added status messages for save, update, delete, reset, local persistence failure, malformed storage recovery, and task state transitions.
  - Added clear action buttons for edit, delete, start, complete, and reset.
  - Added dashboard metrics so users can immediately see system state after interaction.
- **Current evidence locations**
  - `static/js/dashboard.js`
  - `views/dashboard/dashboard.ejs`
- **Detection tools to use in report**
  - Manual walkthrough screenshots before/after action
  - DOM inspection / browser screenshot of visible feedback banners
- **Suggested literature**
  - Nielsen Norman Group, Visibility of System Status summary: [Jakob's Ten Usability Heuristics](https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1-compressed.pdf)

### Deficiency D: Weak input validation and unsafe task content handling
- **Original problem**
  - The original project had no meaningful task input validation because the dashboard was static.
  - Forms relied on thin front-end constraints and did not define safe normalized task content rules.
- **Implemented fix**
  - Added normalization of whitespace.
  - Added title-required validation.
  - Added maximum lengths for title, details, and owner.
  - Restricted status and priority to approved values.
  - Stored and rendered task content as plain text rather than HTML injection.
  - Added duplicate-task detection.
- **Current evidence locations**
  - `static/js/modules/task-store.mjs`
  - `static/js/dashboard.js`
- **Detection tools to use in report**
  - Manual invalid-input attempts
  - Code comparison old vs new
- **Suggested literature**
  - OWASP Cheat Sheet: [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

## 2. Baseline Standards Status

### Live uptime
- **Code status**: ready
- **Remaining work**:
  - push fork to GitHub
  - deploy to Vercel
  - keep production live for 7+ consecutive days
- **Evidence required**:
  - Vercel deployment log screenshot with dates visible

### Test coverage >= 80%
- **Code status**: complete locally
- **Current evidence**
  - `npm run coverage`
  - current local coverage is above 95%
- **Remaining work**:
  - push to GitHub
  - configure `CODECOV_TOKEN`
  - collect Codecov badge / PR screenshot

### Accessibility >= 90
- **Code status**: prepared
- **Remaining work**:
  - run Lighthouse on deployed site
  - capture final score screenshot
  - optionally tune any contrast or heading issues if Lighthouse finds them

### Internationalization
- **Code status**: complete
- **Current evidence**
  - EN / 中文 toggle in header
  - translation strings in `static/js/modules/i18n.mjs`
- **Evidence required**:
  - screenshot in both languages

### Legal compliance
- **Code status**: complete
- **Current evidence**
  - cookie banner partial
  - privacy policy page
- **Evidence required**:
  - first-visit cookie banner screenshot
  - privacy page screenshot

## 3. Screenshots to Capture
- Home page in English
- Dashboard in English
- Dashboard in Chinese
- Cookie banner visible on first visit
- Privacy policy page
- Lighthouse Accessibility score
- Codecov badge / coverage page
- Vercel deployment history with 7-day uptime
- One axe or Lighthouse defect screenshot from the original version if possible

## 4. Immediate Next Steps
1. Push this code to your group fork.
2. Deploy to Vercel immediately.
3. Run Lighthouse and axe on the deployed dashboard.
4. Start drafting report sections using `docs/report-template.md`.
