import React from 'react';
import { t } from 'i18next';
import { Typography } from '@mui/material';

import theme from '../../../theme';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { QuestionVariant } from '../../../enums';
import { useAppSelector } from '../../../store/hooks';

interface IProps {
  requirementAnswer: IRequirementAnswer;
}

export default function ChosenAnswer({
  requirementAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const getText = (): string => {
    switch (requirementAnswer.question.type) {
      case QuestionVariant.Q_CHECKBOX:
        const checkboxValue = requirementAnswer.question.answer.value;
        return `${t('Answer')}: ${checkboxValue ? t('Yes') : t('No')}`;
      case QuestionVariant.Q_SLIDER:
        const sliderValue = requirementAnswer.question.answer.value;
        const sliderUnit = requirementAnswer.question.config.unit;
        return `${t('Answer')}: ${sliderValue} ${sliderUnit}`;
      case QuestionVariant.Q_TEXT:
        const text = requirementAnswer.question.answer.text;
        return `${t('Answer')}: ${text}`;
      case QuestionVariant.Q_CODELIST:
        const codelistId = requirementAnswer.question.config.codelist;
        const codelist = response.specification.bank.codelist.find(
          (cl) => cl.id === codelistId
        );
        if (codelist) {
          const codes = requirementAnswer.question.answer.codes
            .reduce((accumulator, codeId) => {
              const foundCode = codelist.codes.find(
                (code) => codeId === code.id
              );
              if (foundCode) {
                accumulator.push(foundCode.title);
              }
              return accumulator;
            }, [] as string[])
            .join(', ');
          return `${t('Answer')}: ${codes}`;
        }
        return '';
      case QuestionVariant.Q_PERIOD_DATE:
      case QuestionVariant.Q_TIME:
      case QuestionVariant.Q_FILEUPLOAD:
      default:
        return `${t('Answer')}: ${t(requirementAnswer.question.type)}`;
    }
  };
  return (
    <Typography variant={'smBold'} color={theme.palette.gray500.main}>
      {getText()}
    </Typography>
  );
}
