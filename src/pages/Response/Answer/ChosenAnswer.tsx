import React from 'react';
import { t } from 'i18next';
import { Typography } from '@mui/material';

import theme from '../../../theme';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { QuestionVariant } from '../../../enums';

interface IProps {
  requirementAnswer: IRequirementAnswer;
}

export default function ChosenAnswer({
  requirementAnswer
}: IProps): React.ReactElement {
  switch (requirementAnswer.question.type) {
    case QuestionVariant.Q_CHECKBOX:
      const value = requirementAnswer.question.answer.value;
      return (
        <Typography variant={'smBold'} color={theme.palette.gray500.main}>
          {`${t('Answer')}: ${value ? t('Yes') : t('No')}`}
        </Typography>
      );
    case QuestionVariant.Q_TEXT:
    case QuestionVariant.Q_SLIDER:
    case QuestionVariant.Q_CODELIST:
    case QuestionVariant.Q_PERIOD_DATE:
    case QuestionVariant.Q_TIME:
    case QuestionVariant.Q_FILEUPLOAD:
    default:
      return (
        <Typography variant={'smBold'} color={theme.palette.primary.main}>
          {`${t('Answer')}: ${t(requirementAnswer.question.type)}`}
        </Typography>
      );
  }
}
