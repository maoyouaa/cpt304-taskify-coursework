# CPT304 Report Figure Placement Guide

Use this file while assembling `report.pdf`. It maps each figure number to the evidence file, the report section, and the exact point where the figure should be inserted.

## Figure Placement Order

1. **Figure 1. Baseline Taskify dashboard partial showing nested document tags and weak control semantics.**
   - Insert in: `Section 2.1 Detection`
   - Place after the paragraph describing nested `html`, `head`, and `body` tags.
   - Source:
     - capture from the original baseline repository code view, or
     - use a code screenshot of `views/partials/dashboard/dashboard-cards.ejs`
   - Status: ready now via `baseline-signup.png` and `baseline-dashboard-code.png`

2. **Figure 2. Revised labelled form controls with explicit labels and visible keyboard focus styling.**
   - Insert in: `Section 2.3 Implementation`
   - Place after the paragraph introducing explicit labels and `:focus-visible`.
   - Source:
     - a new screenshot of the current signup or dashboard form with keyboard focus visible
   - Status: ready now via `revised-focus-form.png`

3. **Figure 3. Original static dashboard cards in the baseline Taskify version.**
   - Insert in: `Section 3.1 Detection`
   - Place after the paragraph describing hard-coded example cards.
   - Source:
     - capture from the original baseline `dashboard-cards.ejs`
   - Status: ready now via `baseline-dashboard.png`

4. **Figure 4. Revised dashboard after refresh with a user-created task preserved.**
   - Insert in: `Section 3.3 Implementation`
   - Place after the paragraph describing `localStorage` persistence.
   - Source:
     - take a fresh screenshot after creating a task and refreshing the page
   - Status: ready now via `persistence-after-refresh.png`

5. **Figure 5. Revised dashboard showing confirmation feedback after saving a task.**
   - Insert in: `Section 4.3 Implementation`
   - Place after the paragraph describing outcome messages and updated metrics.
   - Source:
     - take a fresh screenshot with the visible confirmation banner
   - Status: ready now via `save-confirmation.png`

6. **Figure 6. Validation outcome when invalid or duplicate task input is submitted.**
   - Insert in: `Section 5.3 Implementation`
   - Place after the paragraph describing validation and duplicate prevention.
   - Source:
     - take a fresh screenshot of the invalid-title or duplicate-task warning
   - Status: ready now via `validation-duplicate-warning.png`

7. **Figure 7. Vercel deployment history showing more than 7 consecutive live days.**
   - Insert in: `Section 6 Baseline Standards Evidence`
   - Place in the first sentence discussing deployment evidence.
   - Source:
     - Vercel dashboard deployment history with dates visible
   - Status: blocked until after `2026-05-06 17:07 GMT+0800`

8. **Figure 8. Codecov result showing test coverage above 80%.**
   - Insert in: `Section 6 Baseline Standards Evidence`
   - Place after the sentence reporting coverage above 95%.
   - Source:
     - Codecov project page or badge screenshot
   - Status: blocked on GitHub workflow permissions and Codecov upload

9. **Figure 9. Lighthouse Accessibility audit score above 90 on the deployed site.**
   - Insert in: `Section 6 Baseline Standards Evidence`
   - Place after the sentence reporting the Lighthouse score of 96.
   - Source:
     - [lighthouse-report.png](D:/codeFinal/project/cpt304/Taskify/docs/evidence/lighthouse-report.png)
   - Status: ready now

10. **Figure 10. Dashboard interface in English.**
    - Insert in: `Section 6 Baseline Standards Evidence`
    - Place after the sentence introducing language-switch evidence.
    - Source:
      - [dashboard-en.png](D:/codeFinal/project/cpt304/Taskify/docs/evidence/dashboard-en.png)
    - Status: ready now

11. **Figure 11. Dashboard interface in Chinese.**
    - Insert in: `Section 6 Baseline Standards Evidence`
    - Place directly after Figure 10 for side-by-side comparison if the layout allows.
    - Source:
      - [dashboard-zh.png](D:/codeFinal/project/cpt304/Taskify/docs/evidence/dashboard-zh.png)
    - Status: ready now

12. **Figure 12. First-visit cookie banner in the enhanced Taskify system.**
    - Insert in: `Section 6 Baseline Standards Evidence`
    - Place after the sentence discussing legal-compliance evidence.
    - Source:
      - [cookie-banner.png](D:/codeFinal/project/cpt304/Taskify/docs/evidence/cookie-banner.png)
    - Status: ready now

13. **Figure 13. Dedicated privacy policy page in the enhanced Taskify system.**
    - Insert in: `Section 6 Baseline Standards Evidence`
    - Place immediately after Figure 12.
    - Source:
      - [privacy-page.png](D:/codeFinal/project/cpt304/Taskify/docs/evidence/privacy-page.png)
    - Status: ready now

## Assembly Notes

- Keep captions directly below each figure in the form `Figure N. Caption sentence.`
- For Figures 10 and 11, use the same crop region so the language change is obvious.
- For Figures 4, 5, and 6, capture the dashboard at desktop width so task form labels and messages remain readable.
- For code screenshots from the original baseline, crop tightly around the evidence rather than capturing the full editor window.

## Minimum Missing Items Before Final PDF

- Figure 7 Vercel 7-day uptime screenshot
- Figure 8 Codecov screenshot
