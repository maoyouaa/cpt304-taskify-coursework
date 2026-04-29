# CPT304 Report Draft Template

Use this as the working draft before moving content into the final PDF.

## Section 1. App Selection (~100 words)
- Project chosen: Taskify
- Why it was selected:
  - not overly common compared with plain todo demos
  - small enough to fully audit within the coursework timeline
  - suitable for accessibility, persistence, validation, and privacy improvements
- Briefly explain why the original app needed enhancement

## Section 2. Deficiency 1: Accessibility and keyboard usability (~300 words)
### 2.1 Detection
- Which page and component failed
- Which tool found it: axe DevTools / Lighthouse
- What concrete issue was observed
- Include a figure reference

### 2.2 Literature
- Summarise the chosen W3C/WCAG source
- Explain the exact requirement or principle that guided the fix

### 2.3 Implementation
- Show old code snippet
- Show new code snippet
- Explain the logic bridge:
  - why labels, semantic headings, and focus styles solve the detected issue
- Mention result after re-test

## Section 3. Deficiency 2: State persistence (~300 words)
### 3.1 Detection
- Original dashboard was static / task data was not retained
- Manual refresh evidence

### 3.2 Literature
- Summarise MDN Web Storage guidance
- Explain why `localStorage` was suitable for this coursework app

### 3.3 Implementation
- Old static dashboard snippet
- New `task-store.mjs` persistence snippet
- Explain guarded loading, fallback defaults, and saved state after refresh

## Section 4. Deficiency 3: User feedback and system status (~300 words)
### 4.1 Detection
- Original workflow gave no action feedback
- Users could not tell whether task operations succeeded

### 4.2 Literature
- Summarise NN/g visibility of system status principle
- Explain why timely feedback matters in task systems

### 4.3 Implementation
- Old no-feedback situation
- New status banner and metrics update snippet
- Explain how success/error/reset messages improve usability

## Section 5. Deficiency 4: Input validation and safe content handling (~300 words)
### 5.1 Detection
- Original project had no robust task validation rules
- Invalid / empty / duplicate content could not be safely governed

### 5.2 Literature
- Summarise OWASP input validation guidance
- Explain allowlisting, length limits, and normalization

### 5.3 Implementation
- Old lack of validation
- New validation and normalization snippet
- Explain why plain-text rendering and controlled enums reduce risk

## Section 6. Baseline Standards Evidence (~100 words + figures)
- Figure: Vercel 7-day uptime
- Figure: Codecov >= 80%
- Figure: Lighthouse Accessibility >= 90
- Figure: Language switch
- Figure: Cookie banner
- Figure: Privacy policy

Suggested wording:
- "The enhanced system satisfies the five baseline standards through verified deployment, automated testing, bilingual support, accessibility improvement, and privacy compliance."

## Section 7. Contribution Forms
- Add the individual contribution spreadsheet
- Add PR links for each member
- Make sure commit ownership matches the spreadsheet claims

## Section 8. References
Use IEEE style.

Suggested starting references:
1. W3C, "Understanding WCAG 2.2," [Online]. Available: https://www.w3.org/WAI/WCAG22/Understanding/
2. MDN Web Docs, "Web Storage API," [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
3. Nielsen Norman Group, "Jakob's Ten Usability Heuristics," [Online]. Available: https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1-compressed.pdf
4. OWASP Foundation, "Input Validation Cheat Sheet," [Online]. Available: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html

## Snippet Advice
- Keep old/new code examples short
- Use one snippet for detection context and one snippet for the actual fix if needed
- Prefer 6-12 lines per snippet
- Use captions like:
  - Figure 1. Original unlabeled task input
  - Figure 2. Improved labeled task form with visible focus state
