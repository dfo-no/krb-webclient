import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
import { t } from 'i18next';

import DateUtils from './DateUtils';
import { IRequirementAnswer } from '../Nexus/entities/IRequirementAnswer';
import { ICheckboxQuestion } from '../Nexus/entities/ICheckboxQuestion';
import { ISliderQuestion } from '../Nexus/entities/ISliderQuestion';
import { ITimeQuestion } from '../Nexus/entities/ITimeQuestion';
import { IPeriodDateQuestion } from '../Nexus/entities/IPeriodDateQuestion';
import { ICodelistQuestion } from '../Nexus/entities/ICodelistQuestion';

class ValidationUtils {
  static localeMap: { [key: string]: Locale } = {
    en: enLocale,
    nb: nbLocale,
  };

  static confirmationQuestion = (requirementAnswer: IRequirementAnswer) => {
    return (
      'value' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.value
    );
  };

  static checkboxQuestion = (requirementAnswer: IRequirementAnswer) => {
    return (
      'value' in requirementAnswer.question.answer &&
      'preferedAlternative' in requirementAnswer.question.config &&
      requirementAnswer.question.answer.value ===
        requirementAnswer.question.config.preferedAlternative
    );
  };

  static sliderQuestion = (requirementAnswer: IRequirementAnswer) => {
    const answer =
      'value' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.value
        ? requirementAnswer.question.answer.value
        : 0;
    const min =
      'min' in requirementAnswer.question.config &&
      requirementAnswer.question.config.min
        ? requirementAnswer.question.config.min
        : 0;
    const max =
      'max' in requirementAnswer.question.config &&
      requirementAnswer.question.config.max
        ? requirementAnswer.question.config.max
        : null;
    const step =
      'step' in requirementAnswer.question.config &&
      requirementAnswer.question.config.step
        ? requirementAnswer.question.config.step
        : null;

    if (answer >= 0 && min >= 0 && max && step) {
      return (
        answer >= min &&
        answer <= max &&
        ((answer as number) * 100) % (step * 100) === 0
      );
    }
  };

  static textQuestion = (requirementAnswer: IRequirementAnswer) => {
    const text =
      'text' in requirementAnswer?.question?.answer &&
      requirementAnswer.question.answer.text
        ? requirementAnswer.question.answer.text.length
        : 0;
    const maxText =
      'max' in requirementAnswer.question.config &&
      requirementAnswer.question.config.max
        ? requirementAnswer.question.config.max
        : null;
    if (text > 1 && maxText) return text < maxText;
  };

  static periodDateQuestion = (requirementAnswer: IRequirementAnswer) => {
    // To Do Weeks Day Validation ?
    const periodMin =
      'periodMin' in requirementAnswer.question.config &&
      requirementAnswer.question.config.periodMin
        ? requirementAnswer.question.config.periodMin
        : 0;
    const periodMax =
      'periodMax' in requirementAnswer.question.config &&
      requirementAnswer.question.config.periodMax
        ? requirementAnswer.question.config.periodMax
        : 0;
    const fromBoundary =
      'fromBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.fromBoundary
        ? new Date(requirementAnswer.question.config.fromBoundary).getTime()
        : null;
    const toBoundary =
      'toBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.toBoundary
        ? new Date(requirementAnswer.question.config.toBoundary).getTime()
        : null;
    const fromDate =
      'fromDate' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.fromDate
        ? new Date(requirementAnswer.question.answer.fromDate).getTime()
        : null;
    const toDate =
      'toDate' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.toDate
        ? new Date(requirementAnswer.question.answer.toDate).getTime()
        : null;
    const dayInMilliseconds = 86400000;
    if (fromDate && toDate && fromBoundary && toBoundary) {
      const numberOfDays =
        (toDate - fromDate + dayInMilliseconds) / dayInMilliseconds;
      return (
        fromDate >= fromBoundary &&
        toDate <= toBoundary &&
        numberOfDays <= periodMax &&
        numberOfDays >= periodMin
      );
    } else if (fromDate && fromBoundary) {
      return fromDate >= fromBoundary;
    }
  };

  static timeQuestion = (requirementAnswer: IRequirementAnswer) => {
    const fromTimeBoundary =
      'fromBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.fromBoundary
        ? new Date(requirementAnswer.question.config.fromBoundary).getTime()
        : null;
    const toTimeBoundary =
      'toBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.toBoundary
        ? new Date(requirementAnswer.question.config.toBoundary).getTime()
        : null;
    const fromTime =
      'fromTime' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.fromTime
        ? new Date(requirementAnswer.question.answer.fromTime).getTime()
        : null;
    const toTime =
      'toTime' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.toTime
        ? new Date(requirementAnswer.question.answer.toTime).getTime()
        : null;
    const timePeriodMax =
      'timePeriodMax' in requirementAnswer.question.config
        ? requirementAnswer.question.config.timePeriodMax
        : null;
    if (
      fromTime &&
      toTime &&
      fromTimeBoundary &&
      toTimeBoundary &&
      timePeriodMax
    ) {
      const timePeriodMaxToDay = new Date(timePeriodMax);
      const timePeriodMaxToMinutes =
        timePeriodMaxToDay.getHours() * 60 + timePeriodMaxToDay.getMinutes();
      const timePeriodDifferenceToDay = new Date(toTime - fromTime);
      const timePeriodDifferenceToMinutes =
        timePeriodDifferenceToDay.getHours() * 60 -
        60 +
        timePeriodDifferenceToDay.getMinutes();
      return (
        fromTime >= fromTimeBoundary &&
        toTime <= toTimeBoundary &&
        timePeriodDifferenceToMinutes <= timePeriodMaxToMinutes
      );
    } else if (fromTime && fromTimeBoundary && toTimeBoundary) {
      return fromTime >= fromTimeBoundary && fromTime <= toTimeBoundary;
    }
  };

  static codelistMandatoryQuestion = (
    requirementAnswer: IRequirementAnswer
  ) => {
    const configCodes =
      'codes' in requirementAnswer.question.config &&
      requirementAnswer.question.config.codes.length > 0
        ? requirementAnswer.question.config.codes
        : null;
    const answerCodes =
      'codes' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.codes.length > 0
        ? requirementAnswer.question.answer.codes
        : null;

    const mandatoryCodes = configCodes?.filter((code) => code.mandatory);

    const mandatoryAnswered = mandatoryCodes?.filter((code) =>
      answerCodes?.includes(code.code)
    );

    return (
      mandatoryAnswered && mandatoryAnswered?.length === mandatoryCodes?.length
    );
  };

  static codelistOptionalQuestion = (requirementAnswer: IRequirementAnswer) => {
    const optionalCodeMinAmount =
      'optionalCodeMinAmount' in requirementAnswer.question.config &&
      requirementAnswer.question.config.optionalCodeMinAmount
        ? requirementAnswer.question.config.optionalCodeMinAmount
        : 0;
    const optionalCodeMaxAmount =
      'optionalCodeMaxAmount' in requirementAnswer.question.config &&
      requirementAnswer.question.config.optionalCodeMaxAmount
        ? requirementAnswer.question.config.optionalCodeMaxAmount
        : 0;
    const configCodes =
      'codes' in requirementAnswer.question.config &&
      requirementAnswer.question.config.codes.length > 0
        ? requirementAnswer.question.config.codes
        : null;
    const answerCodes =
      'codes' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.codes.length > 0
        ? requirementAnswer.question.answer.codes
        : null;

    const optionalCodes = configCodes?.filter((code) => !code.mandatory);
    const optionalAnswered = optionalCodes?.filter((code) =>
      answerCodes?.includes(code.code)
    );

    return (
      optionalAnswered &&
      optionalAnswered?.length >= optionalCodeMinAmount &&
      optionalAnswered?.length <= optionalCodeMaxAmount
    );
  };

  static checkboxQuestionValidationMsg = (question: ICheckboxQuestion) => {
    const preferedAlternative =
      'preferedAlternative' in question.config &&
      question.config.preferedAlternative;
    const answerWith = preferedAlternative ? t('common.Yes') : t('common.No');
    return (
      t('These are absolute requirements that must be answered with') +
      answerWith
    );
  };

  static confirmationQuestionValidationMsg = () => {
    return t('This is an absolute requirement and must be answered');
  };

  static textQuestionValidationMsg = () => {
    return t('This is an absolute requirement and must therefore be confirmed');
  };

  static sliderQuestionValidationMsg = (
    question: ISliderQuestion,
    isInfoText?: boolean
  ) => {
    const min = question.config.min;
    const max = question.config.max;
    const step = question.config.step;
    return (
      (isInfoText
        ? t('Enter value between')
        : t(
            'This is an absolute requirement and must be answered with a value between'
          )) +
      min +
      t('And') +
      max +
      t('for the whole') +
      step
    );
  };

  static periodDateQuestionValidationMsg = (
    question: IPeriodDateQuestion,
    isInfoText?: boolean
  ) => {
    const periodMin = question.config.periodMin;
    const periodMax = question.config.periodMax;
    const fromBoundary = question.config.fromBoundary;
    const toBoundary = question.config.toBoundary;
    const isPeriod = question.config.isPeriod;

    if (isPeriod)
      return (
        (isInfoText
          ? t('Enter date period on')
          : t(
              'This is an absolute requirement and must be answered with a date range'
            )) +
        periodMin +
        t(' To ') +
        periodMax +
        t('days in between') +
        DateUtils.prettyFormatDateError(fromBoundary) +
        t('And') +
        DateUtils.prettyFormatDateError(toBoundary)
      );
    else {
    }
    return (
      (isInfoText
        ? t('Enter value between')
        : t(
            'This is an absolute requirement and must be answered with a date between'
          )) +
      DateUtils.prettyFormatDateError(fromBoundary) +
      t('And') +
      DateUtils.prettyFormatDateError(toBoundary)
    );
  };

  static timeQuestionValidationMsg = (
    question: ITimeQuestion,
    isInfoText?: boolean
  ) => {
    const timePeriodMax = question.config.timePeriodMax;
    const fromBoundary = question.config.fromBoundary;
    const toBoundary = question.config.toBoundary;
    const isPeriod = question.config.isPeriod;

    if (isPeriod && timePeriodMax) {
      const timePeriodMaxToHours = new Date(timePeriodMax).getHours();
      return (
        (isInfoText
          ? t('Enter time period on')
          : t(
              'This is an absolute requirement and must be answered with a time frame'
            )) +
        timePeriodMaxToHours +
        t('hours between') +
        DateUtils.prettyFormatTime(fromBoundary) +
        t('And') +
        DateUtils.prettyFormatTime(toBoundary)
      );
    } else {
    }
    return (
      (isInfoText
        ? t('Enter value between')
        : t(
            'This is an absolute requirement and must be answered with a time between'
          )) +
      DateUtils.prettyFormatTime(fromBoundary) +
      t('And') +
      DateUtils.prettyFormatTime(toBoundary)
    );
  };

  static codelistOptionalValidationMsg = (question: ICodelistQuestion) => {
    const optionalCodeMinAmount = question.config.optionalCodeMinAmount;
    const optionalCodeMaxAmount = question.config.optionalCodeMaxAmount;
    return (
      t('Choose between') +
      optionalCodeMinAmount +
      t('And') +
      optionalCodeMaxAmount +
      t('optional options')
    );
  };

  static codelistMandatoryValidationMsg = () => {
    return t('All mandatory options must be confirmed');
  };
}

export default ValidationUtils;
