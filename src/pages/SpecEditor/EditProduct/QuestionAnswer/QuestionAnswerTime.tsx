import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { ReactElement, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';

interface IProps {
  item: ITimeQuestion;
}

const QuestionAnswerTime = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IRequirementAnswer>();

  const useFromTime = useWatch({ name: 'question.answer.fromTime', control });
  const useToTime = useWatch({ name: 'question.answer.toTime', control });

  useEffect(() => {
    setValue('question.config.fromBoundary', useFromTime);
  }, [useFromTime, setValue]);

  useEffect(() => {
    setValue('question.config.toBoundary', useToTime);
  }, [useToTime, setValue]);

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
