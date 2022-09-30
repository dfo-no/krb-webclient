import { t } from 'i18next';

import DateUtils from './DateUtils';
import { IBank } from '../Nexus/entities/IBank';
import { ICheckboxQuestion } from '../Nexus/entities/ICheckboxQuestion';
import { ICodelist } from '../Nexus/entities/ICodelist';
import { ICodelistQuestion } from '../Nexus/entities/ICodelistQuestion';
import { IConfirmationQuestion } from '../Nexus/entities/IConfirmationQuestion';
import { IFileUploadQuestion } from '../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../Nexus/entities/IPeriodDateQuestion';
import { ISliderQuestion } from '../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../Nexus/entities/ITimeQuestion';
import { IRequirementAnswer } from '../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../Nexus/enums';

class TextUtils {
  static getAnswerText = (
    reqAnswer: IRequirementAnswer,
    bank: IBank
  ): string => {
    switch (reqAnswer.question.type) {
      case QuestionVariant.Q_CHECKBOX:
        return TextUtils.getCheckboxAnswer(reqAnswer.question);
      case QuestionVariant.Q_CODELIST:
        return TextUtils.getCodelistAnswer(reqAnswer.question, bank);
      case QuestionVariant.Q_CONFIRMATION:
        return TextUtils.getConfirmationAnswer(reqAnswer.question);
      case QuestionVariant.Q_FILEUPLOAD:
        return TextUtils.getFileUploadAnswer(reqAnswer.question);
      case QuestionVariant.Q_PERIOD_DATE:
        return TextUtils.getDateAnswer(reqAnswer.question);
      case QuestionVariant.Q_SLIDER:
        return TextUtils.getSliderAnswer(reqAnswer.question);
      case QuestionVariant.Q_TEXT:
        return TextUtils.getTextAnswer(reqAnswer.question);
      case QuestionVariant.Q_TIME:
        return TextUtils.getTimeAnswer(reqAnswer.question);
    }
    return '';
  };

  static getConfigText = (
    reqAnswer: IRequirementAnswer,
    bank: IBank
  ): string => {
    switch (reqAnswer.question.type) {
      case QuestionVariant.Q_CHECKBOX:
        return TextUtils.getCheckboxConfig(reqAnswer.question);
      case QuestionVariant.Q_CODELIST:
        return TextUtils.getCodelistConfig(reqAnswer.question, bank);
      case QuestionVariant.Q_CONFIRMATION:
        return TextUtils.getConfirmationConfig(reqAnswer.question);
      case QuestionVariant.Q_FILEUPLOAD:
        return TextUtils.getFileUploadConfig(reqAnswer.question);
      case QuestionVariant.Q_PERIOD_DATE:
        return TextUtils.getDateConfig(reqAnswer.question);
      case QuestionVariant.Q_SLIDER:
        return TextUtils.getSliderConfig(reqAnswer.question);
      case QuestionVariant.Q_TEXT:
        return TextUtils.getTextConfig();
      case QuestionVariant.Q_TIME:
        return TextUtils.getTimeConfig(reqAnswer.question);
    }
  };

  private static getCodesText = (
    codes: string[],
    codelist: ICodelist
  ): string => {
    return codes
      .reduce((accumulator, codeId) => {
        const foundCode = codelist.codes.find((code) => codeId === code.id);
        if (foundCode) {
          accumulator.push(foundCode.title);
        }
        return accumulator;
      }, [] as string[])
      .join(', ');
  };

  private static getCheckboxAnswer = (question: ICheckboxQuestion): string => {
    return question.answer.value ? t('Yes') : t('No');
  };

  private static getConfirmationAnswer = (
    question: IConfirmationQuestion
  ): string => {
    return question.answer.value ? t('Confirmed') : t('Not confirmed');
  };

  private static getSliderAnswer = (question: ISliderQuestion): string => {
    return `${question.answer.value} ${question.config.unit}`;
  };

  private static getTextAnswer = (question: ITextQuestion): string => {
    return question.answer.text;
  };

  private static getCodelistAnswer = (
    question: ICodelistQuestion,
    bank: IBank
  ): string => {
    const codelistId = question.config.codelist;
    const codelist = bank.codelist.find((cl) => cl.id === codelistId);
    if (codelist) {
      return TextUtils.getCodesText(question.answer.codes, codelist);
    }
    return '';
  };

  private static getDateAnswer = (question: IPeriodDateQuestion): string => {
    if (question.config.isPeriod && question.answer.toDate) {
      return `${DateUtils.prettyFormatDate(
        question.answer.fromDate
      )} - ${DateUtils.prettyFormatDate(question.answer.toDate)}`;
    }
    return DateUtils.prettyFormatDate(question.answer.fromDate);
  };

  private static getTimeAnswer = (question: ITimeQuestion): string => {
    if (question.config.isPeriod && question.answer.toTime) {
      return `${DateUtils.prettyFormatTime(
        question.answer.fromTime
      )} - ${DateUtils.prettyFormatTime(question.answer.toTime)}`;
    }
    return DateUtils.prettyFormatTime(question.answer.fromTime);
  };

  private static getFileUploadAnswer = (
    question: IFileUploadQuestion
  ): string => {
    return question.answer.files.join(', ');
  };

  private static getCheckboxConfig = (question: ICheckboxQuestion): string => {
    const preferedAlternative = question.config.preferedAlternative;
    const pointsNonPrefered = question.config.pointsNonPrefered;
    return `${preferedAlternative ? t('Yes') : t('No')} 100 ${t('Score')}, ${
      preferedAlternative ? t('No') : t('Yes')
    } ${pointsNonPrefered} ${t('Score')}`;
  };

  private static getConfirmationConfig = (
    question: IConfirmationQuestion
  ): string => {
    const pointsUnconfirmed = question.config.pointsUnconfirmed;
    return `${t('Score for confirmed')}: 100 ${t(
      'Score for unconfirmed'
    )}: ${pointsUnconfirmed}`;
  };

  private static getSliderConfig = (question: ISliderQuestion): string => {
    const config = question.config;
    const scoreValues = config.scoreValues
      .map((sv) => `${sv.value}: ${sv.score}`)
      .join(', ');
    return `${t('Minimum')}: ${config.min}, ${t('Maximum')}: ${config.max}, ${t(
      'Step'
    )}: ${config.step}, ${t('Unit')}: ${config.unit}, ${t(
      'Scorevalues'
    )}: ${scoreValues}`;
  };

  private static getTextConfig = (): string => {
    return t('No configuration');
  };

  private static getCodelistConfig = (
    question: ICodelistQuestion,
    bank: IBank
  ): string => {
    const optionalCodeMinAmount = question.config.optionalCodeMinAmount;
    const optionalCodeMaxAmount = question.config.optionalCodeMaxAmount;
    const codes = question.config.codes;
    const codelistId = question.config.codelist;
    const codelist = bank.codelist.find((cl) => cl.id === codelistId);
    if (!codelist) {
      return '';
    }
    if (codes.length === 0) {
      return t('No codes selected');
    }
    return `${t('Minimum')}: ${optionalCodeMinAmount}, ${t(
      'Maximum'
    )}: ${optionalCodeMaxAmount} ${t('Codes')}: ${TextUtils.getCodesText(
      codes.map((codeSelection) => codeSelection.code),
      codelist
    )}`;
  };

  private static getDateConfig = (question: IPeriodDateQuestion): string => {
    const from = DateUtils.prettyFormatDate(question.config.fromBoundary);
    const to = DateUtils.prettyFormatDate(question.config.toBoundary);
    const isPeriod = question.config.isPeriod;
    const min = question.config.periodMin;
    const max = question.config.periodMax;
    return `${from ? `${t('From')}: ${from}` : ''} ${
      to ? `, ${t('To')}: ${to}` : ''
    } ${isPeriod ? `, ${t('Minimum')}: ${min}, ${t('Maximum')}: ${max}` : ''}`;
  };

  private static getTimeConfig = (question: ITimeQuestion): string => {
    const from = DateUtils.prettyFormatTime(question.config.fromBoundary);
    const to = DateUtils.prettyFormatTime(question.config.toBoundary);
    const isPeriod = question.config.isPeriod;
    const minutes = question.config.periodMinutes;
    const hours = question.config.periodHours;
    return `${from ? `${t('From')}: ${from}` : ''} ${
      to ? `, ${t('To')}: ${to}` : ''
    } ${
      isPeriod
        ? `, ${t('Period')}: ${t('Minutes')}: ${minutes}, ${t(
            'Hours'
          )}: ${hours}`
        : ''
    }`;
  };

  private static getFileUploadConfig = (
    question: IFileUploadQuestion
  ): string => {
    const filetypes = question.config.fileEndings.join(', ');
    const template = question.config.template;
    const uploadInSpec = question.config.uploadInSpec;
    const allowMultipleFiles = question.config.allowMultipleFiles;
    return `${t('Filetypes')}: ${filetypes}, ${t('Template')}: ${template}, ${
      uploadInSpec ? t('Upload in specification') : ''
    }, ${allowMultipleFiles ? t('Allow multiple files') : ''}`;
  };
}

export default TextUtils;
