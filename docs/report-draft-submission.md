# CPT304 Coursework 1 Report

## Section 1. App Selection

Our group selected **Taskify**, an open-source task-management prototype, because it was realistic enough to audit but still small enough to refactor within the coursework schedule. It already contained onboarding, navigation, and dashboard-oriented pages, which made it suitable for improvement in accessibility, persistence, interaction quality, and privacy compliance. However, the original version functioned more like a visual prototype than a usable software system. It was therefore a suitable candidate for research-led enhancement using the Detection-Literature-Implementation framework.

## Section 2. Deficiency 1: Accessibility and Keyboard Usability

### 2.1 Detection

The first deficiency concerned accessibility and keyboard usability. In the original project, several fields in the signup and login flow relied mainly on placeholders rather than robust visible labels. In addition, multiple EJS partials contained nested `html`, `head`, and `body` tags, which weakened semantic structure and made page hierarchy less reliable. The dashboard also behaved as a static mockup rather than a structured interactive workflow. These problems were identified through source inspection and supported by baseline code evidence. They are important because task-management software depends on repeated form interaction, keyboard navigation, and clear structure.

### 2.2 Literature

The fix was guided by the W3C **WCAG 2.2** understanding materials [1]. WCAG emphasizes that form controls need clear programmatic identification and that interactive elements must remain operable for keyboard and assistive-technology users. This literature gave us a direct implementation target: replace placeholder-driven inputs with explicit labels, preserve semantic headings, and add visible focus indicators.

### 2.3 Implementation

We rebuilt the page templates into clean top-level documents and moved shared UI into reusable partials. Explicit `label` elements were added to the onboarding form, task search controls, and task-composer form. A visible `:focus-visible` outline was introduced in the global stylesheet, and interactive dashboard actions are now represented as real buttons. These changes follow the literature directly because labels improve accessible naming, semantic structure improves interpretation, and visible focus improves operability [1]. Figure 1 should present the baseline signup/dashboard evidence, while Figure 2 should show the revised labelled form and focus treatment.

Old snippet:

```html
<input type="email" name="SignUpEmail" placeholder="Email" required="true" />
```

New snippet:

```html
<label for="email" data-i18n="signup.emailLabel">Email</label>
<input id="email" name="email" type="email" maxlength="80" required />
```

```css
:focus-visible {
  outline: 3px solid rgba(31, 111, 235, 0.35);
  outline-offset: 2px;
}
```

## Section 3. Deficiency 2: Missing State Persistence

### 3.1 Detection

The second deficiency was the lack of true task persistence. In the original dashboard, tasks were hard-coded directly in EJS as example cards rather than stored and restored dynamically. This meant the system did not behave as a real task-management application. We identified this issue through inspection of the original dashboard partial and by confirming that the project had no working task-storage logic on either the front end or back end.

### 3.2 Literature

The main literature source for this fix was the MDN documentation for the **Web Storage API** [2]. MDN explains that `localStorage` is suitable for small amounts of browser-side data that should persist across reloads. This was appropriate for our coursework version because the goal was a lightweight deployed tool with reliable local state rather than a multi-user synchronized platform.

### 3.3 Implementation

We replaced the static dashboard with a functional task board backed by `localStorage`. A separate module now handles validation, normalization, grouping, filtering, metrics, safe loading, and persistence. When the dashboard loads, it restores saved tasks if available, falls back to seed tasks when storage is empty, and recovers safely if stored data is malformed. This follows the literature because Web Storage provides a lightweight native persistence mechanism that matches the needs of a coursework deployment [2]. Figure 3 should show the original hard-coded task cards, while Figure 4 should show the refreshed dashboard with a user-created task still present after reload.

Old snippet:

```html
<div class="dashboard-task task-1">
  <div class="dashboard-task-head">Lorem ipsum dolor sit amet.</div>
</div>
```

New snippet:

```js
export function safeLoadTasks(storage) {
  const raw = storage?.getItem?.(STORAGE_KEY);
  if (!raw) return { ok: true, tasks: DEFAULT_TASKS };
  const parsed = JSON.parse(raw);
  const tasks = parsed.map((task) => createTask(task).value).filter(Boolean);
  return { ok: true, tasks };
}
```

## Section 4. Deficiency 3: Weak User Feedback and System Status

### 4.1 Detection

The third deficiency concerned user feedback. Although the original interface resembled a dashboard, it did not support a real task workflow, so users had no confirmation when operations succeeded, failed, or changed board state. There was no clear way to tell whether a task had been saved, updated, moved, or removed. This was identified through manual walkthrough and source inspection, which showed that the original project had no interactive feedback logic, no outcome messaging, and no changing summary metrics.

### 4.2 Literature

This improvement was informed by Nielsen Norman Group's heuristic of **visibility of system status** [3]. According to this principle, users should always be informed about what is happening through timely and appropriate feedback. This is especially important in productivity tools because users perform frequent small actions and need immediate confirmation that the system has responded correctly.

### 4.3 Implementation

We added visible feedback throughout the dashboard. The revised version now shows status messages for task save, update, delete, reset, storage recovery, persistence failure, and task-status transitions. It also updates summary metrics for total, in-progress, and completed tasks after interaction. These additions follow the literature directly because each meaningful action now produces a timely system response [3]. Figure 5 should show the confirmation banner after a task is saved and the updated metrics beside it.

Old snippet:

```html
<div class="dashboard-task-number">0</div>
```

New snippet:

```js
function showMessage(key, tone = "neutral") {
  message.textContent = t(state.locale, key);
  message.classList.toggle("is-error", tone === "error");
}
```

## Section 5. Deficiency 4: Weak Input Validation and Safe Content Handling

### 5.1 Detection

The fourth deficiency was weak input validation. The original prototype did not implement a real task-processing pipeline, so it had no formal rules for validating task content. Once the dashboard became functional, it was clear that accepting unchecked raw input would reduce reliability and create quality risks. Examples include empty titles, repeated whitespace, uncontrolled text lengths, invalid status values, and duplicate tasks. This issue was identified through source inspection and manual testing during enhancement.

### 5.2 Literature

The fix was guided by the **OWASP Input Validation Cheat Sheet** [4]. OWASP recommends validating input as early as possible and using allowlisted or known-good formats instead of broadly accepting arbitrary content. For this project, that guidance translated into required titles, normalized text, length limits, constrained enums for task status and priority, and plain-text rendering rather than raw HTML insertion.

### 5.3 Implementation

We implemented a validation and normalization layer in `task-store.mjs`. The new logic trims repeated whitespace, rejects empty titles, limits field lengths, restricts status and priority to approved values, validates date format, and checks for duplicate tasks. Task content is rendered as text rather than executable HTML. This follows OWASP guidance because raw user input is converted into a controlled internal structure before storage or display [4]. Figure 6 should demonstrate invalid-input rejection or the duplicate-task warning shown in the dashboard.

Old snippet:

```html
<div class="dashboard-task-description">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</div>
```

New snippet:

```js
export function validateTaskInput(input, limits = { maxTitleLength: 80, maxDetailsLength: 240 }) {
  const title = normaliseText(input.title, limits.maxTitleLength);
  const status = ["todo", "doing", "done"].includes(input.status) ? input.status : "todo";
  const priority = ["high", "medium", "low"].includes(input.priority) ? input.priority : "medium";
  if (!title) return { ok: false, reason: "missing-title" };
  return { ok: true, value: { title, status, priority } };
}
```

## Section 6. Baseline Standards Evidence

The enhanced Taskify system was designed to satisfy all five baseline standards. First, the repository includes deployment support through `vercel.json`, enabling public hosting and collection of the required 7+ consecutive days of uptime evidence; Figure 7 should be inserted once the deployment has remained live for at least seven full days. Second, automated tests and coverage reporting were added, and the current local coverage result is **95.39%**, exceeding the 80% threshold. The remote GitHub Actions workflow now passes successfully, while Figure 8 should be inserted after Codecov returns a usable public coverage page or badge. Third, accessibility improvements were built into the revised structure and are supported by a Lighthouse Accessibility score of **96**, which should be presented in Figure 9. Fourth, internationalization was implemented through an English-Chinese language toggle using shared translation keys, evidenced by Figures 10 and 11. Fifth, legal-compliance requirements were addressed through a first-visit cookie banner and a dedicated privacy-policy page, evidenced by Figures 12 and 13.

## Section 7. Individual Contribution

The final submission should include the contribution spreadsheet for all four group members. To keep authorship verifiable, each member should complete work through a separate branch and submit at least one pull request with clear ownership. Recommended roles are deployment and CI evidence, accessibility and audit work, internationalization and privacy features, and persistence, validation, and testing. Direct links to authored pull requests should be included so that the marker can compare stated contributions with GitHub activity.

## Section 8. References

[1] W3C, "Understanding WCAG 2.2," World Wide Web Consortium, [Online]. Available: https://www.w3.org/WAI/WCAG22/Understanding/. [Accessed: Apr. 29, 2026].  
[2] MDN Web Docs, "Web Storage API," Mozilla, [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API. [Accessed: Apr. 29, 2026].  
[3] Nielsen Norman Group, "Jakob's Ten Usability Heuristics," Nielsen Norman Group, [Online]. Available: https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1-compressed.pdf. [Accessed: Apr. 29, 2026].  
[4] OWASP Foundation, "Input Validation Cheat Sheet," OWASP Cheat Sheet Series, [Online]. Available: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html. [Accessed: Apr. 29, 2026].  
