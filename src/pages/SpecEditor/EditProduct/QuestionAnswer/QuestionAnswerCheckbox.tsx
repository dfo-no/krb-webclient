import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';

const QuestionAnswerCheckbox = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <FlexColumnBox>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <YesNoSelection name={'question.answer.value'} />
    </FlexColumnBox>
  );
};

export default QuestionAnswerCheckbox;
