export enum ErrorMessage {
  VAL_DATE_ONLY = 'Dato må være fylt ut',
  VAL_DATE_MIN = 'Dato kan ikke være før {{#limit}}',
  VAL_DATE_MAX = 'Dato kan ikke være etter {{#limit}}',
  VAL_DATE_UNIQUE = 'Dato kan ikke være like',
  VAL_DATE_NUMBER_UNIQUE = 'Antall dager kan ikke være like',
  VAL_DATE_TO = 'Til må være senere enn fra',
  VAL_NUMBER_BASE = 'Må være et tall',
  VAL_NUMBER_INT = 'Må være et positivt heltall',
  VAL_NUMBER_MIN = 'Kan ikke være mindre enn {{#limit}}',
  VAL_NUMBER_MAX = 'Kan ikke være større enn {{#limit}}',
  VAL_NUMBER_CHECK = 'Varighet i antall dager må være innen den angitte datoperioden',
  VAL_NUMBER_SLIDER_MAX = 'Overskrider forksjell mellom maks og min ({{#limit}})',
  VAL_VALUE_UNIQUE = 'Verdi kan ikke være like',
  VAL_NUMBER_CODE_MIN = 'Må være minimum 1',
  VAL_NUMBER_CODE_DISCOUNT_MIN = 'Må være minimum 0',
  VAL_NUMBER_CODE_UNIQUE = 'Noe har gått galt med skjemaet. 2 like koder er funnet i skjemaet',
  VAL_TIME_ONLY = 'Tidspunkt må være fylt ut',
  VAL_TIME_BASE = 'Tidspunkt må ha en verdi',
  VAL_NUMBER_MINUTE_MAX = 'Må være mindre enn 60',
  VAL_NUMBER_HOUR_MAX = 'Må være mindre enn 24',
  VAL_TIME_MIN = 'Tidspunkt kan ikke være før {{#limit}}',
  VAL_TIME_MAX = 'Tidspunkt kan ikke være etter {{#limit}}',
  VAL_TIME_TO = 'Til må være senere enn fra',
  VAL_TIME_PERIOD_MIN = 'Høyeste tidspunkt må være senere enn laveste tidspunkt',
  VAL_TIME_UNIQUE = 'Tidspunkt kan ikke være like',
  VAL_STRING_MAX = 'Lengde på tekst må være mindre enn {{#limit}} tegn',
}
