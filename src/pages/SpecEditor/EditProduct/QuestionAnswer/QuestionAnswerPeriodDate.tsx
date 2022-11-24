import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionAnswerPeriodDate = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();

  const fromDateLabel = `${item.config.isPeriod ? t('From') : t('Date')}`;

  const toDateLabel = t('To');

  return (
    <div className={css.QuestionDateAndTime}>
      <DateCtrl
        label={fromDateLabel}
        name={'question.answer.fromDate'}
        color={'var(--text-primary-color)'}
      />
      {item.config.isPeriod && (
        <DateCtrl
          label={toDateLabel}
          name={'question.answer.toDate'}
          color={'var(--text-primary-color)'}
        />
      )}
    </div>
  );
};

export default QuestionAnswerPeriodDate;
