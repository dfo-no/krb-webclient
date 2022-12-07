import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import {
  IPeriodDateQuestion,
  Weekdays,
} from '../../../../Nexus/entities/IPeriodDateQuestion';
import { WeekdaysCheckboxList } from '../../../../components/WeekdaysCheckboxList/WeekdaysCheckboxList';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionAnswerPeriodDate = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IRequirementAnswer>();

  const { fields: weekdays } = useFieldArray({
    control,
    name: 'question.config.weekdays',
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const weekdaysData = [
    {
      day: Weekdays.MONDAY,
      isChecked: false,
    },
    {
      day: Weekdays.TUESDAY,
      isChecked: false,
    },
    {
      day: Weekdays.WEDNESDAY,
      isChecked: false,
    },
    {
      day: Weekdays.THURSDAY,
      isChecked: false,
    },
    {
      day: Weekdays.FRIDAY,
      isChecked: false,
    },
    {
      day: Weekdays.SATURDAYS,
      isChecked: false,
    },
    {
      day: Weekdays.SUNDAY,
      isChecked: false,
    },
  ];

  const [data, setData] = useState(weekdaysData);

  useEffect(() => {
    const undefinedWeekday = () => {
      return weekdays.find((weekday) => weekday.isChecked === undefined);
    };
    if ((!weekdays.length && item.config.isPeriod) || !!undefinedWeekday())
      setValue('question.config.weekdays', data);
  }, [weekdays.length, item.config.isPeriod, setValue, data, weekdays]);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newData = [...data];
    newData[index].isChecked = event.target.checked;
    setData(newData);
    setValue('question.config.weekdays', data);
  };

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
      {item.config.isPeriod && (
        <div className={css.WeekdaysContainer}>
          <span>{t('Available weekdays')}</span>
          <div className={css.WeekdaysContainer__checkboxes}>
            {weekdays.map((weekday, index) => {
              return (
                <WeekdaysCheckboxList
                  key={weekday.id}
                  name={`question.config.weekdays[${index}].isChecked`}
                  label={weekday.day}
                  checked={weekday.isChecked}
                  onChange={(event) => handleCheck(event, index)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerPeriodDate;
