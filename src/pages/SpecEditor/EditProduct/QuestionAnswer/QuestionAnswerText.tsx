import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';

const QuestionAnswerText = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <FlexColumnBox>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <TextAreaCtrl
        name={'question.answer.text'}
        placeholder={t('Answer')}
        rows={10}
      />
    </FlexColumnBox>
  );
};

export default QuestionAnswerText;
