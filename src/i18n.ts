import {
  format as formatDate,
  formatDistance,
  formatRelative,
  isDate,
} from 'date-fns';
import { enUS as en, nb } from 'date-fns/locale';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const locales: { [index: string]: Locale } = { nb, en };

i18n
  .use(Backend)
  .use(LanguageDetector)

  .use(initReactI18next)
  .init({
    ignoreJSONStructure: false,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    defaultNS: 'common',
    keySeparator: '.',
    lng: 'nb',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: (value, format, lng = 'en') => {
        if (!lng) {
          return value;
        }
        if (!format) {
          return value;
        }
        if (isDate(value)) {
          const locale = locales[lng];
          if (format === 'relative')
            return formatRelative(value, new Date(), { locale });
          if (format === 'ago')
            return formatDistance(value, new Date(), {
              locale,
              addSuffix: true,
            });
          return formatDate(value, format, { locale });
        }
        return value;
      },
    },
    resources: {
      en: {
        translation: {
          projectTitleTooShort: 'Project title too short',
          projectRefNotUuid: 'Project ref not UUID',
          needTitleTooShort: 'Need title too short',
          requirementTitleTooShort: 'Requirement title too short',
          needRefNotUuid: 'Need ref not UUID',
          requirementRefNotUuid: 'Requirement ref not UUID',
          requirementVariantRefNotUuid: 'Requirement variant ref not UUID',
          requirementVariantTitleTooShort:
            'Requirement variant title too short',
          requirementVariantTextTooShort:
            'Requirement variant requirement text too short',
          requirementVariantInstructionTooShort:
            'Requirement variant instruction too short',
        },
      },
      // add translations for other languages here
    },
  });

export default i18n;
