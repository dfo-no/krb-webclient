import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import css from '../QuestionContent.module.scss';

const QuestionAnswerConfirmation = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <div className={css.HorizontalContent}>
        <CheckboxCtrl name={'question.answer.value'} />
        <Typography>{t('Confirm')}</Typography>
      </div>
    </div>
  );
};

export default QuestionAnswerConfirmation;
