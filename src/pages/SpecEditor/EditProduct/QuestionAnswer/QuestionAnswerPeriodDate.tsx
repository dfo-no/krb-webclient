import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionAnswerPeriodDate = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionGrid}>
      <Typography className={css.FullRow} variant={'smBold'}>
        {t('Answer')}
      </Typography>
      <DateCtrl name={'question.answer.fromDate'} />
      {item.config.isPeriod && (
        <div className={css.Arrow}>
          <ArrowForwardIcon />
        </div>
      )}
      {item.config.isPeriod && <DateCtrl name={'question.answer.toDate'} />}
    </div>
  );
};

export default QuestionAnswerPeriodDate;
