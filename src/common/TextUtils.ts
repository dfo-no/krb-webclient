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

type ChosenConfig = {
  option: string;
  value: string;
};

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
  ): ChosenConfig[] => {
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
    return [];
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
    return question.answer.value ? t('common.Yes') : t('common.No');
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

  private static setChosenConfigs = (
    chosenConfig: ChosenConfig[],
    option: string,
    value: string
  ) => {
    if (value && option)
      chosenConfig.push({
        option: option,
        value: value,
      });
    return chosenConfig;
  };

  private static getCheckboxConfig = (
    question: ICheckboxQuestion
  ): ChosenConfig[] => {
    const preferedAlternative = question.config.preferedAlternative;
    const pointsNonPrefered = question.config.pointsNonPrefered;
    const chosenConfig: ChosenConfig[] = [];
    TextUtils.setChosenConfigs(
      chosenConfig,
      `${preferedAlternative ? t('common.Yes') : t('common.No')}`,
      `100 ${t('Score')}`
    );
    TextUtils.setChosenConfigs(
      chosenConfig,
      `${preferedAlternative ? t('common.No') : t('common.Yes')}`,
      `${pointsNonPrefered} ${t('Score')}`
    );
    return chosenConfig;
  };

  private static getConfirmationConfig = (
    question: IConfirmationQuestion
  ): ChosenConfig[] => {
    const pointsUnconfirmed = question.config.pointsUnconfirmed;
    const chosenConfig: ChosenConfig[] = [];
    TextUtils.setChosenConfigs(chosenConfig, t('Score for confirmed'), '100');
    TextUtils.setChosenConfigs(
      chosenConfig,
      t('Discount'),
      `${pointsUnconfirmed}`
    );
    return chosenConfig;
  };

  private static getSliderConfig = (
    question: ISliderQuestion
  ): ChosenConfig[] => {
    const config = question.config;
    const scoreValues = config.scoreValues
      .map((sv) => `${sv.value}: ${sv.score}`)
      .join(', ');
    const chosenConfig: ChosenConfig[] = [];
    TextUtils.setChosenConfigs(chosenConfig, t('Minimum'), `${config.min}`);
    TextUtils.setChosenConfigs(chosenConfig, t('Maximum'), `${config.max}`);
    TextUtils.setChosenConfigs(chosenConfig, t('Step'), `${config.step}`);
    TextUtils.setChosenConfigs(chosenConfig, t('Unit'), `${config.unit}`);
    TextUtils.setChosenConfigs(chosenConfig, t('Scorevalues'), scoreValues);
    return chosenConfig;
  };

  private static getTextConfig = (): ChosenConfig[] => {
    return [
      {
        option: `${t('Chosen')}`,
        value: `${t('No configuration')}`,
      },
    ];
  };

  private static getCodelistConfig = (
    question: ICodelistQuestion,
    bank: IBank
  ): ChosenConfig[] => {
    const optionalCodeMinAmount = question.config.optionalCodeMinAmount;
    const optionalCodeMaxAmount = question.config.optionalCodeMaxAmount;
    const codes = question.config.codes;
    const codelistId = question.config.codelist;
    const codelist = bank.codelist.find((cl) => cl.id === codelistId);
    const chosenConfig: ChosenConfig[] = [];
    if (!codelist) {
      return [];
    }
    if (codes.length === 0) {
      TextUtils.setChosenConfigs(
        chosenConfig,
        t('Codes'),
        t('No codes selected')
      );
      return chosenConfig;
    }
    TextUtils.setChosenConfigs(
      chosenConfig,
      t('Minimum'),
      `${optionalCodeMinAmount}`
    );
    TextUtils.setChosenConfigs(
      chosenConfig,
      t('Maximum'),
      `${optionalCodeMaxAmount}`
    );
    TextUtils.setChosenConfigs(
      chosenConfig,
      t('Codes'),
      `${TextUtils.getCodesText(
        codes.map((codeSelection) => codeSelection.code),
        codelist
      )}`
    );
    return chosenConfig;
  };

  private static getDateConfig = (
    question: IPeriodDateQuestion
  ): ChosenConfig[] => {
    const from = DateUtils.prettyFormatDate(question.config.fromBoundary);
    const to = DateUtils.prettyFormatDate(question.config.toBoundary);
    const isPeriod = question.config.isPeriod;
    const min = question.config.periodMin;
    const max = question.config.periodMax;
    const chosenConfig: ChosenConfig[] = [];
    TextUtils.setChosenConfigs(chosenConfig, t('From'), from);
    TextUtils.setChosenConfigs(chosenConfig, t('To'), to);
    if (isPeriod)
      TextUtils.setChosenConfigs(chosenConfig, t('Minimum'), `${min}`);
    if (isPeriod)
      TextUtils.setChosenConfigs(chosenConfig, t('Maximum'), `${max}`);
    return chosenConfig;
  };

  private static getTimeConfig = (question: ITimeQuestion): ChosenConfig[] => {
    const from = DateUtils.prettyFormatTime(question.config.fromBoundary);
    const to = DateUtils.prettyFormatTime(question.config.toBoundary);
    const isPeriod = question.config.isPeriod;
    const minutes = question.config.periodMinutes;
    const hours = question.config.periodHours;
    const chosenConfig: ChosenConfig[] = [];
    TextUtils.setChosenConfigs(chosenConfig, t('From'), from);
    TextUtils.setChosenConfigs(chosenConfig, t('To'), to);
    if (isPeriod)
      TextUtils.setChosenConfigs(
        chosenConfig,
        t('Period'),
        `${t('Minutes')}: ${minutes}, ${t('Hours')}: ${hours}`
      );
    return chosenConfig;
  };

  private static getFileUploadConfig = (
    question: IFileUploadQuestion
  ): ChosenConfig[] => {
    const filetypes = question.config.fileEndings.join(', ');
    const template = question.config.template;
    const uploadInSpec = question.config.uploadInSpec;
    const allowMultipleFiles = question.config.allowMultipleFiles;
    const chosenConfig: ChosenConfig[] = [];
    TextUtils.setChosenConfigs(chosenConfig, t('Filetypes'), filetypes);
    if (template)
      TextUtils.setChosenConfigs(chosenConfig, t('Template'), template);
    if (uploadInSpec && allowMultipleFiles)
      TextUtils.setChosenConfigs(
        chosenConfig,
        t('Upload in specification'),
        t('Allow multiple files')
      );
    return chosenConfig;
  };
}

export default TextUtils;
