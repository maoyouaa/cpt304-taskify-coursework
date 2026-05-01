# Evidence Status

## Confirmed project URLs

- GitHub repository: https://github.com/maoyouaa/cpt304-taskify-coursework
- Live deployment: https://cpt304-taskify-coursework.vercel.app

## Evidence already captured

- Baseline signup screenshot:
  - `docs/evidence/baseline-signup.png`
- Baseline dashboard screenshot:
  - `docs/evidence/baseline-dashboard.png`
- Baseline signup code screenshot:
  - `docs/evidence/baseline-signup-code.png`
- Baseline dashboard code screenshot:
  - `docs/evidence/baseline-dashboard-code.png`
- English dashboard screenshot:
  - `docs/evidence/dashboard-en.png`
- Chinese dashboard screenshot:
  - `docs/evidence/dashboard-zh.png`
- Revised focus screenshot:
  - `docs/evidence/revised-focus-form.png`
- Save confirmation screenshot:
  - `docs/evidence/save-confirmation.png`
- Duplicate validation screenshot:
  - `docs/evidence/validation-duplicate-warning.png`
- Persistence after refresh screenshot:
  - `docs/evidence/persistence-after-refresh.png`
- Cookie banner screenshot:
  - `docs/evidence/cookie-banner.png`
- Privacy policy screenshot:
  - `docs/evidence/privacy-page.png`
- Lighthouse report files:
  - `docs/evidence/lighthouse.report.json`
  - `docs/evidence/lighthouse.report.html`
  - `docs/evidence/lighthouse-report.png`
- Vercel deployment inspect output:
  - `docs/evidence/vercel-inspect.txt`

## Figure-ready evidence available now

- Figure 1:
  - `docs/evidence/baseline-signup.png`
  - `docs/evidence/baseline-dashboard-code.png`
- Figure 2:
  - `docs/evidence/revised-focus-form.png`
- Figure 3:
  - `docs/evidence/baseline-dashboard.png`
- Figure 4:
  - `docs/evidence/persistence-after-refresh.png`
- Figure 5:
  - `docs/evidence/save-confirmation.png`
- Figure 6:
  - `docs/evidence/validation-duplicate-warning.png`
- Figure 9:
  - `docs/evidence/lighthouse-report.png`
- Figure 10:
  - `docs/evidence/dashboard-en.png`
- Figure 11:
  - `docs/evidence/dashboard-zh.png`
- Figure 12:
  - `docs/evidence/cookie-banner.png`
- Figure 13:
  - `docs/evidence/privacy-page.png`

## Verified metrics

- Lighthouse Accessibility score: **96**
- Local coverage: **95.39%**
- Live deployment status: **Ready**
- Deployment alias: `https://cpt304-taskify-coursework.vercel.app`
- First production deployment time:
  - `Wed Apr 29 2026 17:07:10 GMT+0800`

## Not yet fully satisfied

### Vercel 7-day uptime evidence
- Current status:
  - Deployment is live, but it has only just been created.
- Coursework reality:
  - A valid 7-day screenshot cannot exist yet.
- What to do later:
  - revisit the Vercel deployment history after 7+ consecutive days
  - take a dashboard screenshot from the Vercel project page or deployment history with dates visible

### Codecov screenshot / badge
- Current status:
  - Local coverage is ready and above the threshold.
  - `.github/workflows/ci.yml` exists locally.
- Actual blocker:
  - GitHub rejected the workflow push because the active GitHub token still does not have `workflow` scope.
- What to do later:
  - refresh `gh` authentication with `workflow` scope
  - push `.github/workflows/ci.yml`
  - add `CODECOV_TOKEN` to repository Actions secrets
  - rerun CI and capture the Codecov page or badge

## Fast assembly reference

- Use `docs/report-draft-submission.md` as the main report text.
- Use `docs/figure-captions.md` for caption wording.
- Use `docs/report-figure-placement.md` for figure order, source files, and missing-item tracking.

## Recommended report wording

- For Lighthouse:
  - "The deployed Taskify system achieved a Lighthouse Accessibility score of 96, exceeding the coursework requirement of 90+."
- For deployment:
  - "The system has been deployed to Vercel and is publicly accessible at https://cpt304-taskify-coursework.vercel.app. At the time of writing, the deployment is live and ready; the 7-day uptime evidence should be captured after the deployment has remained stable for the required duration."
- For coverage:
  - "Local automated tests currently report 95.39% coverage. Codecov integration is configured in the repository workflow and should be finalized once GitHub workflow permissions are refreshed."
