declare module 'vanilla-cookieconsent' {
  interface CookieValue {
    categories: {
      necessary: boolean;
      analytics: boolean;
    };
  }

  interface CookieConsentCallbackParam {
    cookie: CookieValue;
  }

  interface CookieConsentConfig {
    categories: {
      necessary: {
        enabled: boolean;
        readOnly: boolean;
      };
      analytics: {
        enabled: boolean;
      };
    };
    language: {
      default: string;
      translations: {
        [key: string]: {
          consentModal: {
            title: string;
            description: string;
            acceptAllBtn: string;
            acceptNecessaryBtn: string;
            showPreferencesBtn: string;
          };
          preferencesModal: {
            title: string;
            acceptAllBtn: string;
            acceptNecessaryBtn: string;
            savePreferencesBtn: string;
            closeIconLabel: string;
            sections: Array<{
              title: string;
              description: string;
              linkedCategory?: string;
            }>;
          };
        };
      };
    };
    onFirstConsent?: (param: CookieConsentCallbackParam) => void;
    onConsentChange?: (param: CookieConsentCallbackParam) => void;
  }

  export function run(config: CookieConsentConfig): void;
}
