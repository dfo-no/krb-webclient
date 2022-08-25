import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';

interface IProps {
  item: ITimeQuestion;
}

const QuestionAnswerTime = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionGrid}>
      <Typography className={css.FullRow} variant={'smBold'}>
        {t('Answer')}
      </Typography>
      <TimeCtrl name={'question.answer.fromTime'} />
      {item.config.isPeriod && (
        <div className={css.Arrow}>
          <ArrowForwardIcon />
        </div>
      )}
      {item.config.isPeriod && <TimeCtrl name={'question.answer.toTime'} />}
    </div>
  );
};

export default QuestionAnswerTime;
