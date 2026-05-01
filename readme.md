# CPT304 Taskify Coursework Upgrade

This repository is a coursework adaptation of the upstream Taskify project.

- Upstream source: `https://github.com/sptin2002/Taskify`
- Coursework repository: `https://github.com/maoyouaa/cpt304-taskify-coursework`
- Live deployment: `https://cpt304-taskify-coursework.vercel.app`

The current version refactors the original prototype into a coursework-ready Express application with:

- accessible labelled forms and keyboard focus styling
- persistent browser-side task storage
- English and Chinese interface switching
- cookie consent and a dedicated privacy policy page
- automated tests, coverage reporting, and GitHub Actions CI

## Routes

- `/` landing page
- `/dashboard` task board
- `/signup` onboarding
- `/privacy` privacy policy

## Quick Start

```bash
npm install
npm start
```

## Test Commands

```bash
npm test
npm run coverage
```

Current local coverage is above 95%. The GitHub Actions workflow is enabled in `.github/workflows/ci.yml`.

## Coursework Evidence

Evidence files for the report are stored in `docs/evidence/`.

Useful supporting documents:

- `docs/report-draft-submission.md`
- `docs/evidence-status.md`
- `docs/report-figure-placement.md`
- `docs/figure-captions.md`

## Notes

- Vercel uptime evidence must be captured after the deployment has remained live for 7+ consecutive days.
- Codecov screenshot evidence is still pending because the current public badge is not yet returning a final percentage.
