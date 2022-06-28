import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { ReactElement, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionAnswerPeriodDate = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IRequirementAnswer>();

  const useFromDate = useWatch({ name: 'question.answer.fromDate', control });
  const useToDate = useWatch({ name: 'question.answer.toDate', control });

  useEffect(() => {
    setValue('question.config.fromBoundary', useFromDate);
  }, [useFromDate, setValue]);

  useEffect(() => {
    setValue('question.config.toBoundary', useToDate);
  }, [useToDate, setValue]);

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
