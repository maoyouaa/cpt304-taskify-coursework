# CPT304 Coursework 1 Report Draft

## Section 1. App Selection

Our group selected **Taskify**, an open-source task management prototype, because it was suitable for research-led enhancement without being either too simple or too complex. Compared with very small demonstration projects, Taskify provided multiple realistic user-facing workflows such as onboarding, navigation, dashboards, and task presentation. At the same time, it remained small enough for a full audit, refactor, and deployment within the coursework schedule. The original version also exposed clear weaknesses in accessibility, persistence, feedback, and input handling, which made it appropriate for the Detection-Literature-Implementation framework. Therefore, Taskify gave us a practical opportunity to transform a visually attractive but incomplete prototype into a more responsible and evidence-backed software system.

## Section 2. Deficiency 1: Accessibility and Keyboard Usability

### 2.1 Detection

The first deficiency concerned accessibility and keyboard usability. During inspection of the original source code, we found that several form fields relied mainly on placeholders rather than robust visible labels, especially in the original signup and login flow. In addition, the original project contained multiple EJS partials with nested `html`, `head`, and `body` tags, which weakened semantic page structure and made the markup harder for assistive technologies to interpret correctly. The original dashboard was also a static mockup rather than a structured interactive workflow. These weaknesses were identified through manual source-code review and should be supported in the final submission by a Lighthouse Accessibility screenshot and an axe DevTools issue capture from the baseline version. In a task-management system, such problems are significant because users need to navigate forms, filters, and actions repeatedly; unclear structure or weak focus behavior can make the system difficult for keyboard-only or screen-reader users.

### 2.2 Literature

To address this issue, we used the W3C WCAG 2.2 understanding materials as the main literature source. WCAG emphasizes that interface components must be perceivable and operable, and that form controls need clear programmatic identification. This guidance is relevant because visible labels, logical heading structure, and strong keyboard focus are not merely cosmetic improvements; they are part of accessible interaction design. The literature also helped us avoid superficial fixes. Instead of only changing appearance, WCAG gave us a clear technical direction: use explicit labels, meaningful headings, semantic grouping, and visible focus treatment so that the system can be interpreted consistently by browsers, screen readers, and keyboard users.

### 2.3 Implementation

We rebuilt the page structure into clean top-level templates and moved shared navigation, footer, and cookie UI into reusable partials. Explicit `label` elements were added to the onboarding form, task search, and task-composer controls. We also introduced a visible `:focus-visible` outline in the global stylesheet to improve keyboard navigation. On the dashboard, task areas are now grouped under semantic headings and user actions such as save, edit, delete, and status change are represented as real buttons. This implementation was directly informed by the WCAG literature: labels improve accessible naming, semantic headings improve document understanding, and visible focus indicators improve operability. For the final report, Figure X should show the original placeholder-driven form, while Figure Y should show the revised labeled task form and dashboard controls. After final testing, the post-fix Lighthouse and axe results should be inserted here as evidence of improvement.

## Section 3. Deficiency 2: Missing State Persistence

### 3.1 Detection

The second deficiency was the absence of true state persistence. In the original Taskify dashboard, tasks were not created, stored, or restored dynamically. Instead, the dashboard rendered hard-coded example cards directly in EJS. This meant that the application behaved as a static prototype rather than a real task-management system. We identified this problem by inspecting `dashboard-cards.ejs`, where task cards appeared only as fixed markup with sample text, and by confirming that the project contained no meaningful task storage logic in either front-end scripts or active server-side routes. From a user perspective, this is a serious weakness because planning software is expected to retain data between interactions and page refreshes.

### 3.2 Literature

We used the MDN documentation for the **Web Storage API** to guide the fix. MDN explains that `localStorage` is suitable for small amounts of browser-side data that should persist across reloads in the same client environment. This was an appropriate choice for our coursework version because the target system is a lightweight deployed application rather than a multi-user production platform with synchronized accounts. The literature also supported safe serialization, controlled reading of stored values, and recovery when stored data is malformed. Therefore, the source provided both the technical mechanism and the reasoning for choosing a browser-native persistence layer.

### 3.3 Implementation

To solve this deficiency, we replaced the static dashboard with a working task board backed by `localStorage`. A dedicated module, `task-store.mjs`, now handles validation, normalization, grouping, filtering, metrics, safe loading, and persistence. When the dashboard loads, it attempts to restore saved tasks from storage; if no saved data exists, it loads a small seed board, and if malformed data is encountered, it falls back gracefully instead of crashing. This design was based on the literature because Web Storage is lightweight, built into the browser, and suitable for client-side state retention in a coursework deployment. In the report, the old code snippet should show the original hard-coded task cards, while the new snippet should show `safeLoadTasks(...)` or `persistTasks(...)`. Figure Z should demonstrate that a newly created task remains visible after refreshing the page, proving that the state now persists correctly.

## Section 4. Deficiency 3: Weak User Feedback and System Status

### 4.1 Detection

The third deficiency concerned feedback and visibility of system status. The original Taskify interface looked like a dashboard, but because it did not support a real task workflow, users received no confirmation when operations succeeded, failed, or changed the board state. There was no reliable way to tell whether a task had been saved, updated, removed, or moved between categories. This was identified through manual walkthrough and source inspection, which showed that the original project had no working state-change logic, no form outcome messaging, and no dynamic summary metrics. In interactive systems, especially productivity tools, this is a usability problem because users need immediate confirmation that the software has responded to their actions.

### 4.2 Literature

This deficiency was addressed using Nielsen Norman Group's heuristic of **visibility of system status**. According to this principle, users should always be informed about what is happening through timely and appropriate feedback. This literature is especially relevant to task-management interfaces because they involve many small but frequent interactions: saving, editing, resetting, filtering, or updating the status of a task. Without clear feedback, users may repeat actions unnecessarily, mistrust the system, or misinterpret whether data has been stored. The heuristic therefore offered a strong rationale for adding system-status cues rather than assuming that the interface would be self-explanatory.

### 4.3 Implementation

We implemented visible status feedback throughout the dashboard. The upgraded version now shows outcome messages for task save, update, delete, reset, storage recovery, and local persistence failure. It also updates dashboard metrics for total tasks, tasks in progress, and completed tasks immediately after user interaction. The task cards provide explicit action buttons for edit, delete, start, complete, and reset transitions, which makes workflow state changes more obvious. This implementation follows the literature directly because each meaningful user action now produces a corresponding and timely response in the interface. In the final report, the original state can be described as lacking any true interactive feedback, while the new code snippet should show the `showMessage(...)` logic or the `status-banner` structure. A screenshot of the confirmation banner after saving a task should be used as figure evidence.

## Section 5. Deficiency 4: Weak Input Validation and Safe Content Handling

### 5.1 Detection

The fourth deficiency was weak input validation and unsafe content handling. The original Taskify prototype did not implement a real task-processing pipeline, so it had no formal rules for validating task content. Once the dashboard became functional, it was clear that accepting arbitrary raw input without normalization or constraints would reduce data quality and increase risk. Examples include empty or whitespace-only titles, inconsistent status values, uncontrolled text lengths, and duplicate task records. This issue was identified through manual testing and code inspection, especially when comparing the original static project with the upgraded interactive workflow. A real task-management system requires predictable rules for task creation rather than relying on users to always provide clean input.

### 5.2 Literature

To guide the fix, we used the **OWASP Input Validation Cheat Sheet**. OWASP recommends validating input as early as possible and using allowlists or known-good formats rather than broadly accepting content and attempting to repair it later. For this project, that guidance translated into several practical design decisions: the task title should be mandatory, text should be normalized and length-limited, enumerated fields such as priority and status should be constrained to valid values, and rendered task data should remain plain text rather than inserted as executable HTML. The literature was helpful because it turned a general quality issue into a disciplined validation strategy.

### 5.3 Implementation

We introduced a validation and normalization layer in `task-store.mjs`. The new logic trims repeated whitespace, rejects empty titles, limits the lengths of title, details, and owner fields, restricts status and priority to allowlisted values, validates date format, and checks for duplicate tasks. When data is displayed, it is rendered through text nodes rather than injected as raw HTML, which reduces the chance of creating an unsafe rendering path. This implementation follows OWASP guidance because it transforms raw user input into a controlled internal structure before saving or displaying it. In the report, the "before" side should emphasize the absence of validation logic in the original task flow, while the "after" side should show the `validateTaskInput(...)` or `createTask(...)` implementation. A useful figure would demonstrate rejection of an empty title or show the dashboard after duplicate-prevention logic is triggered.

## Section 6. Baseline Standards Evidence

The enhanced Taskify system was designed to satisfy all five coursework baseline standards. First, the repository now includes deployment support through `vercel.json`, allowing the project to be hosted publicly and monitored for the required 7+ consecutive days of uptime. Second, automated tests were added using Node's built-in test runner together with coverage reporting, and the current local coverage result is above 95%, exceeding the 80% threshold. Third, accessibility improvements were built into the revised structure and should be validated through a final Lighthouse Accessibility audit above 90. Fourth, internationalization was implemented through an English-Chinese language toggle with shared translation keys. Fifth, legal-compliance requirements were addressed through a first-visit cookie banner and a dedicated privacy-policy page. In the final PDF, this section should reference figures for Vercel uptime, Codecov coverage, Lighthouse score, language switching, the cookie banner, and the privacy page.

## Section 7. Individual Contribution

The final submission should include the individual contribution spreadsheet for all four group members. To ensure that contribution claims remain verifiable, each member should work through a separate branch and submit at least one pull request with clear task ownership. Recommended task allocation is as follows: one member manages deployment and CI evidence, one handles accessibility and audit screenshots, one handles internationalization and privacy-related features, and one handles persistence, validation, and test coverage. The report should also include direct links to each member's authored pull requests so that the marker can cross-reference claimed work against GitHub activity.

## Section 8. References

[1] W3C, "Understanding WCAG 2.2," [Online]. Available: https://www.w3.org/WAI/WCAG22/Understanding/  
[2] MDN Web Docs, "Web Storage API," [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API  
[3] Nielsen Norman Group, "Jakob's Ten Usability Heuristics," [Online]. Available: https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1-compressed.pdf  
[4] OWASP Foundation, "Input Validation Cheat Sheet," [Online]. Available: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html  
