import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { CONSENT_COOKIE, parseConsentCookie, serialiseConsent, shouldShowBanner } from "../static/js/modules/consent.mjs";
import { DEFAULT_LOCALE, getStoredLocale, t, translatePage } from "../static/js/modules/i18n.mjs";

test("falls back to english locale", () => {
  const storage = { getItem: () => "unknown" };
  assert.equal(getStoredLocale(storage), DEFAULT_LOCALE);
  assert.equal(t("zh", "nav.dashboard"), "任务板");
  assert.equal(t("fr", "nav.dashboard"), "Dashboard");
});

test("translates page text and placeholders", () => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <button data-lang-switch="en"></button>
        <button data-lang-switch="zh"></button>
        <span data-i18n="nav.home"></span>
        <input data-i18n-placeholder="dashboard.searchPlaceholder" />
      </body>
    </html>
  `);

  translatePage(dom.window.document, "zh");

  assert.equal(dom.window.document.documentElement.lang, "zh");
  assert.equal(dom.window.document.querySelector("[data-i18n='nav.home']").textContent, "首页");
  assert.equal(dom.window.document.querySelector("input").getAttribute("placeholder"), "搜索标题或详情");
  assert.equal(dom.window.document.querySelector("[data-lang-switch='zh']").getAttribute("aria-pressed"), "true");
});

test("parses and serialises cookie consent", () => {
  const serialised = serialiseConsent("accept");
  assert.match(serialised, new RegExp(`${CONSENT_COOKIE}=accept`));
  assert.equal(parseConsentCookie(`${CONSENT_COOKIE}=reject; other=value`), "reject");
});

test("shows the banner only when there is no prior consent", () => {
  assert.equal(shouldShowBanner(""), true);
  assert.equal(shouldShowBanner(`${CONSENT_COOKIE}=necessary`), false);
});
