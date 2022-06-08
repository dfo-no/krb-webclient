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
import { QuestionVariant } from '../../../enums';

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

  const noAnswer = (): React.ReactElement => {
    return (
      <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
        {t('No answer implemented')}
      </Typography>
    );
  };

  switch (question.type) {
    case QuestionVariant.Q_TEXT:
      return noAnswer();
    case QuestionVariant.Q_CHECKBOX:
      return noAnswer();
    case QuestionVariant.Q_SLIDER:
      return noAnswer();
    case QuestionVariant.Q_CODELIST:
      return noAnswer();
    case QuestionVariant.Q_PERIOD_DATE:
      return noAnswer();
    case QuestionVariant.Q_TIME:
      return noAnswer();
  }
  return <></>;
}
