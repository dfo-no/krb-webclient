import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';

const QuestionAnswerText = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <TextAreaCtrl
        name={'question.answer.text'}
        placeholder={t('Answer')}
        rows={3}
      />
    </div>
  );
};

export default QuestionAnswerText;
