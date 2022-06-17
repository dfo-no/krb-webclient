import { t } from 'i18next';

import { ICheckboxQuestion } from '../Nexus/entities/ICheckboxQuestion';
import { ICode } from '../Nexus/entities/ICode';
import { ICodelistQuestion } from '../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../Nexus/entities/IPeriodDateQuestion';
import { ISliderQuestion } from '../Nexus/entities/ISliderQuestion';
import { ISpecification } from '../Nexus/entities/ISpecification';
import { ITimeQuestion } from '../Nexus/entities/ITimeQuestion';
import { Parentable } from '../models/Parentable';

class TextUtils {
  static getCheckboxAnswer = (question: ICheckboxQuestion): string => {
    return question.answer.value ? t('Yes') : t('No');
  };

  static getSliderAnswer = (question: ISliderQuestion): string => {
    return `${question.answer.value} ${question.config.unit}`;
  };

  static getCheckboxConfig = (question: ICheckboxQuestion): string => {
    const preferedAlternative = question.config.preferedAlternative;
    const pointsNonPrefered = question.config.pointsNonPrefered;
    return `${preferedAlternative ? t('Yes') : t('No')} 100 ${t('score')}, ${
      preferedAlternative ? t('No') : t('Yes')
    } ${pointsNonPrefered} ${t('score')}`;
  };

  static getSliderConfig = (question: ISliderQuestion): string => {
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

  static getTextConfig = (): string => {
    return t('No configuration');
  };

  static getCodelistConfig = (
    question: ICodelistQuestion,
    specification: ISpecification
  ): string => {
    const optionalCodeMinAmount = question.config.optionalCodeMinAmount;
    const optionalCodeMaxAmount = question.config.optionalCodeMaxAmount;
    const mandatory = question.config.mandatoryCodes;
    const optional = question.config.optionalCodes;
    const codelistId = question.config.codelist;
    const codelist = specification.bank.codelist.find(
      (cl) => cl.id === codelistId
    );
    if (!codelist) {
      return '';
    }
    const optionalText = optional
      .map((codeId) => codelist.codes.find((code) => code.id === codeId))
      .filter((item): item is Parentable<ICode> => !!item)
      .map((code) => code.title)
      .join(', ');
    const mandatoryText = mandatory
      .map((codeId) => codelist.codes.find((code) => code.id === codeId))
      .filter((item): item is Parentable<ICode> => !!item)
      .map((code) => code.title)
      .join(', ');
    if (mandatory.length === 0 && optional.length === 0) {
      return t('No codes selected');
    }
    return `${
      mandatory.length > 0 ? `${t('Mandatory codes')}: ${mandatoryText}, ` : ''
    } ${
      optional.length > 0
        ? `${t('Optional codes')}: ${t(
            'Minimum'
          )}: ${optionalCodeMinAmount}, ${t(
            'Maximum'
          )}: ${optionalCodeMaxAmount}, ${t('Codes')}: ${optionalText}`
        : ''
    }`;
  };

  static getDateConfig = (question: IPeriodDateQuestion): string => {
    const from = question.config.fromBoundary;
    const to = question.config.toBoundary;
    const isPeriod = question.config.isPeriod;
    const min = question.config.periodMin;
    const max = question.config.periodMax;
    return `${from ? `${t('From')}: ${from}` : ''} ${
      to ? `, ${t('To')}: ${to}` : ''
    } ${isPeriod ? `, ${t('Minimum')}: ${min}, ${t('Maximum')}: ${max}` : ''}`;
  };

  static getTimeConfig = (question: ITimeQuestion): string => {
    const from = question.config.fromBoundary;
    const to = question.config.toBoundary;
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

  static getFileUploadConfig = (question: IFileUploadQuestion): string => {
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
