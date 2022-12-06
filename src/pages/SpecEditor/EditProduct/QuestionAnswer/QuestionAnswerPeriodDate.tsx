import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { WeekdaysCheckboxList } from '../../../../components/WeekdaysCheckboxList/WeekdaysCheckboxList';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionAnswerPeriodDate = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();

  const fromDateLabel = `${item.config.isPeriod ? t('From') : t('Date')}`;

  const toDateLabel = t('To');

  return (
    <div className={css.QuestionDateAndTimePeriod}>
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
      {/* {item.config.isPeriod && (*/}
      {/*  <div className={css.WeekdaysContainer}>*/}
      {/*    <span>{t('Available weekdays')}</span>*/}
      {/*    <WeekdaysCheckboxList*/}
      {/*      name={''}*/}
      {/*      label={''}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/* )}*/}
    </div>
  );
};

export default QuestionAnswerPeriodDate;
