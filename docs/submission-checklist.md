# CPT304 Submission Checklist

Use this checklist in order. It is optimized for getting from the current local build to a submission-ready coursework package.

## A. GitHub and Branch Evidence
- Create the group fork repository.
- Push the current local code to the fork.
- Create at least 3 to 4 feature branches so contribution history is visible:
  - `fix/a11y-form-focus`
  - `feat/i18n-cookie-privacy`
  - `fix/persistence-validation`
  - `test/coverage-ci`
- Open PRs from those branches into `main`.
- Make sure each PR description includes:
  - what changed
  - why it changed
  - old vs new code snippet
  - screenshot or preview evidence
- Save each PR link for Section 7 and the contribution spreadsheet.

## B. Deployment and 7-Day Uptime
- Import the GitHub fork into Vercel.
- Confirm the build works using the included `vercel.json`.
- Keep `main` as the deployed production branch.
- Do not leave the deployment until the final week; it must stay live for 7+ consecutive days.
- After 7 days, capture:
  - production URL
  - deployment history with dates visible
  - one screenshot showing the live dashboard

## C. Codecov and Coverage Evidence
- Create a Codecov account or sign in with GitHub.
- Connect the forked repository.
- Add `CODECOV_TOKEN` under GitHub repository `Settings -> Secrets and variables -> Actions`.
- Push a commit or PR so `.github/workflows/ci.yml` runs.
- Confirm Codecov receives `coverage/lcov.info`.
- Add the Codecov badge to the README if desired.
- Capture:
  - Codecov project page or PR comment
  - visible coverage percentage >= 80%

## D. Accessibility Evidence
- Run Lighthouse on the deployed dashboard page:
  - open the live site
  - press `F12`
  - open the Lighthouse tab
  - select `Accessibility`
  - run the audit on Desktop
- Run axe DevTools on the original baseline if possible, or document the issue from source inspection if the original version cannot be hosted cleanly.
- Capture:
  - final Lighthouse Accessibility score
  - at least one issue detection screenshot or log
- If the score is below 90:
  - check color contrast
  - check heading order
  - check button names and form labels
  - check image `alt` behavior

## E. Internationalization Evidence
- Open the dashboard in English and capture a screenshot.
- Switch to Chinese and capture the same region again.
- Make sure the screenshots clearly show:
  - navigation labels
  - dashboard title
  - task form labels

## F. Legal Compliance Evidence
- Open the site in a clean browser state or clear cookies.
- Capture the first-visit cookie banner.
- Open `/privacy` and capture the privacy policy page.

## G. Report Assembly
- Use `docs/report-template.md` as the structure.
- Use `docs/deficiency-drafts.md` as your starting wording.
- Replace placeholders with:
  - exact tool names
  - exact scores
  - figure numbers
  - final URLs
- Keep the report near 1,500 words excluding code snippets and forms.
- Use:
  - body text in 12pt Calibri or Arial
  - Level 1 headings in 14pt bold
  - code in monospaced font such as Consolas 10pt

## H. Final ZIP Contents
- `report.pdf`
- `github-url.txt`
- `live-url.txt`
- `individual-contribution.xlsx`

## I. Current Status vs Remaining Work

### Already ready locally
- working app
- dashboard functionality
- i18n
- cookie banner
- privacy policy
- local tests
- local coverage above 95%
- CI workflow and deployment config

### Still to complete externally
- GitHub fork push
- PR history
- Vercel live deployment
- 7-day uptime proof
- Codecov proof
- Lighthouse screenshot
- final report PDF
- contribution spreadsheet
