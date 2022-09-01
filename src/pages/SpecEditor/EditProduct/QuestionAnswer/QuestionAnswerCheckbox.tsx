import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';

const QuestionAnswerCheckbox = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <YesNoSelection name={'question.answer.value'} />
    </div>
  );
};

export default QuestionAnswerCheckbox;
