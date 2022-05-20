import React from 'react';
import { Typography } from '@mui/material';
import { ICheckboxQuestion } from '../../../Nexus/entities/ICheckboxQuestion';
import { ITextQuestion } from '../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../Nexus/entities/ITimeQuestion';
import { ISliderQuestion } from '../../../Nexus/entities/ISliderQuestion';
import { IPeriodDateQuestion } from '../../../Nexus/entities/IPeriodDateQuestion';
import { IFileUploadQuestion } from '../../../Nexus/entities/IFileUploadQuestion';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { useTranslation } from 'react-i18next';
import QuestionEnum from '../../../models/QuestionEnum';

interface IProps {
  question:
    | ITimeQuestion
    | ITextQuestion
    | ISliderQuestion
    | IPeriodDateQuestion
    | IFileUploadQuestion
    | ICodelistQuestion
    | ICheckboxQuestion;
}

export default function ProductQuestionAnswer({
  question
}: IProps): React.ReactElement {
  const { t } = useTranslation();

  switch (question.type) {
    case QuestionEnum.Q_TEXT:
      return (
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('No answer implemented')}
        </Typography>
      );
    case QuestionEnum.Q_CHECKBOX:
      return (
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('No answer implemented')}
        </Typography>
      );
    case QuestionEnum.Q_SLIDER:
      return (
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('No answer implemented')}
        </Typography>
      );
    case QuestionEnum.Q_CODELIST:
      return (
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('No answer implemented')}
        </Typography>
      );
    case QuestionEnum.Q_PERIOD_DATE:
      return (
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('No answer implemented')}
        </Typography>
      );
    case QuestionEnum.Q_TIME:
      return (
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('No answer implemented')}
        </Typography>
      );
  }
  return <></>;
}
