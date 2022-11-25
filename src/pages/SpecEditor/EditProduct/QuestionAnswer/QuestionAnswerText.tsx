import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';

const QuestionAnswerText = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Instruction')}</Typography>
      <TextAreaCtrl
        className={css.QuestionFlex__textAreaCtrl}
        name={'question.answer.text'}
        placeholder={t('Answer')}
        rows={3}
        color={'var(--text-primary-color)'}
      />
    </div>
  );
};

export default QuestionAnswerText;
