# AI Project Handoff

This file is a compact handoff for a new AI agent with no prior context. It describes the current state of the CPT304 coursework project, what has already been completed, what is still missing, and which facts must not be misrepresented.

## 1. Project Identity

- Local repo path: `D:\codeFinal\project\cpt304\Taskify`
- Coursework repo: `https://github.com/maoyouaa/cpt304-taskify-coursework`
- Live deployment: `https://cpt304-taskify-coursework.vercel.app`
- Upstream source referenced in the report: `https://github.com/sptin2002/Taskify`
- Current date context when this handoff was written: `2026-05-01`

## 2. Coursework Goal

The project is being prepared for a CPT304 submission targeting a stable `70+` standard, not a speculative top-mark claim.

The chosen app is `Taskify`, adapted into a coursework-ready web app with:

- accessibility fixes
- persistent task storage
- English/Chinese i18n
- cookie consent
- privacy policy page
- automated tests and coverage
- Vercel deployment

## 3. What Has Already Been Implemented

The implementation itself is largely complete.

Main completed work:

- functional task dashboard
- browser-side persistence using `localStorage`
- English and Chinese language toggle
- cookie consent banner with saved choice
- privacy policy page
- input validation and duplicate prevention
- user feedback/status messaging
- accessibility improvements such as explicit labels and visible keyboard focus
- automated test suite
- coverage reporting
- GitHub Actions workflow

## 4. Current Verified Metrics

These values were actually checked and may be quoted as current facts:

- Lighthouse Accessibility score: `96`
- Local test coverage: `95.39%`
- Live deployment status: ready
- First recorded production deployment time:
  - `Wed Apr 29 2026 17:07:10 GMT+0800`
- Latest successful GitHub Actions run:
  - `25212197798`

## 5. Evidence Already Captured

Evidence files are under `docs/evidence/`.

Important captured screenshots/files:

- `baseline-signup.png`
- `baseline-dashboard.png`
- `baseline-signup-code.png`
- `baseline-dashboard-code.png`
- `revised-focus-form.png`
- `save-confirmation.png`
- `validation-duplicate-warning.png`
- `persistence-after-refresh.png`
- `dashboard-en.png`
- `dashboard-zh.png`
- `cookie-banner.png`
- `privacy-page.png`
- `lighthouse-report.png`
- `lighthouse.report.html`
- `lighthouse.report.json`
- `vercel-inspect.txt`

These cover most report figures except the remaining blocked items described below.

## 6. Report Status

Main report file:

- `docs/report-draft-submission.md`

Supporting assembly files:

- `docs/evidence-status.md`
- `docs/report-figure-placement.md`
- `docs/figure-captions.md`
- `docs/contribution-template.md`

Report status:

- the submission draft has already been compressed into the required range
- current word count is about `1568`
- the report wording has already been adjusted to match the real project status

## 7. Repository / Metadata Status

Already cleaned:

- `readme.md` now describes the coursework version instead of the noisy original upstream README
- `package.json` now points to the coursework repository URLs instead of the old unrelated repo metadata

Recent relevant commits:

- `919d49e` `docs: clean coursework repository metadata`
- `7a4a9e3` `docs: align evidence status with live ci results`
- `d37b796` `ci: fix test glob for github actions`
- `8571434` `ci: enable codecov oidc upload`
- `8561d33` `ci: restore codecov workflow`

## 8. CI / GitHub Actions Status

GitHub workflow permissions were previously a blocker but are now resolved.

Important facts:

- GitHub auth was refreshed with `workflow` scope
- `.github/workflows/ci.yml` is restored and active
- the CI workflow now runs successfully on the coursework repository
- the test glob issue in `package.json` was fixed from `tests/**/*.test.mjs` to `tests/*.test.mjs`

This means GitHub Actions is no longer the current blocker.

## 9. Remaining Blockers

There are two honest remaining gaps before the coursework evidence set is fully closed.

### 9.1 Vercel 7-day uptime evidence

This cannot be fabricated yet.

Reason:

- the first production deployment time is `Apr 29 2026 17:07:10 GMT+0800`
- therefore a valid 7-day uptime screenshot cannot exist until after `May 6 2026 17:07 GMT+0800`

Required later action:

- open the Vercel project / deployment history
- capture a screenshot with visible dates and the live production URL

### 9.2 Codecov screenshot evidence

Important nuance:

- GitHub Actions is green
- but Codecov visual proof is **not** fully closed

What actually happened:

- the workflow reached the Codecov upload step
- Codecov upload attempts hit repeated `HTTP 500` responses from Codecov's ingest endpoint
- because `fail_ci_if_error: false` is set, GitHub Actions still shows success
- the public Codecov badge currently returns `unknown`

Therefore:

- do **not** claim that the Codecov evidence is already complete
- do **not** claim that a real public coverage percentage is already visible on Codecov

## 10. Safe Truthful Submission Position

A truthful summary at this moment is:

- implementation is complete enough for a 70+ submission base
- most screenshots and report evidence already exist
- GitHub Actions and local coverage proof are available
- two evidence items remain incomplete due to external timing/service conditions:
  - Vercel 7-day uptime screenshot
  - Codecov public percentage screenshot

## 11. Recommended Next Actions

If a future AI agent continues this work, use this order:

1. Check repo status:
   - `git status --short`
2. Reconfirm tests:
   - `npm.cmd test`
   - `npm.cmd run coverage`
3. Reconfirm latest GitHub Actions status:
   - `gh run list -R maoyouaa/cpt304-taskify-coursework --limit 5`
   - `gh run view 25212197798 -R maoyouaa/cpt304-taskify-coursework`
4. Recheck Codecov:
   - open badge URL
   - open Codecov project page
   - if still `unknown`, either wait or switch to token-based setup
5. After `2026-05-06 17:07 GMT+0800`, capture the Vercel 7-day uptime screenshot
6. Update:
   - `docs/evidence-status.md`
   - `docs/report-figure-placement.md`
   - `docs/report-draft-submission.md`

## 12. Files to Read First

If time is limited, read these in order:

1. `docs/ai-handoff.md`
2. `docs/evidence-status.md`
3. `docs/report-draft-submission.md`
4. `docs/report-figure-placement.md`

## 13. Things a New AI Must Not Get Wrong

- Do not say the project is fully submission-ready without qualification.
- Do not claim the 7-day uptime proof already exists.
- Do not claim Codecov shows a final public coverage percentage yet.
- Do not invent multi-person PR history or fake contribution evidence.
- Do not revert unrelated work; the repo has already been intentionally adjusted for coursework submission.
- Do not confuse the coursework repo with the upstream source repo.

## 14. Short Bottom Line

The project is technically in good shape and already meets most of the 70+ target. The main remaining work is evidence closure, especially:

- Vercel 7-day uptime screenshot after the required date
- Codecov screenshot once Codecov returns a real public result

Until those are captured, the project should be described as `mostly complete, with two evidence items still pending`.
