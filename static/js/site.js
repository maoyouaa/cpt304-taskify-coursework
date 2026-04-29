import {
  DEFAULT_LOCALE,
  getStoredLocale,
  setStoredLocale,
  translatePage,
} from "./modules/i18n.mjs";
import {
  parseConsentCookie,
  serialiseConsent,
  shouldShowBanner,
} from "./modules/consent.mjs";

function applyLocale(locale) {
  translatePage(document, locale);
  setStoredLocale(window.localStorage, locale);
}

function bindLanguageToggle() {
  const locale = getStoredLocale(window.localStorage) || DEFAULT_LOCALE;
  applyLocale(locale);

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLocale(button.dataset.langSwitch || DEFAULT_LOCALE);
      window.dispatchEvent(new CustomEvent("taskify:locale-change", { detail: button.dataset.langSwitch }));
    });
  });
}

function bindCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) {
    return;
  }

  banner.hidden = !shouldShowBanner(document.cookie);

  banner.querySelectorAll("[data-consent-action]").forEach((button) => {
    button.addEventListener("click", () => {
      document.cookie = serialiseConsent(button.dataset.consentAction || "necessary");
      banner.hidden = true;
    });
  });

  const currentConsent = parseConsentCookie(document.cookie);
  if (currentConsent) {
    banner.hidden = true;
  }
}

bindLanguageToggle();
bindCookieBanner();
