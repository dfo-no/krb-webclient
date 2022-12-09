import React, { ChangeEvent, useEffect } from 'react';
import { FormControl, FormLabel } from '@mui/material';
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import css from './WeekdaysCheckboxList.module.scss';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { weekdaysData } from '../../Nexus/entities/WeekdaysData';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface IProps {
  item: IPeriodDateQuestion;
  control: Control<IRequirementAnswer, any>;
  setValue: (name: any, value: any) => void;
}

interface ICheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const WeekdaysCheckboxList = ({
  item,
  control,
  setValue,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext<IRequirementAnswer>();

  const { fields: weekdays, update: updateWeekdays } = useFieldArray({
    control,
    name: 'question.config.weekdays',
  });

  useEffect(() => {
    const undefinedWeekday = () => {
      return weekdays.find((weekday) => weekday.isChecked === undefined);
    };
    if ((!weekdays.length && item.config.isPeriod) || !!undefinedWeekday())
      setValue('question.config.weekdays', weekdaysData);
  }, [weekdays.length, item.config.isPeriod, setValue, weekdays]);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (setValue) {
      setValue('question.config.weekdays', weekdays);
    }
    updateWeekdays(index, {
      id: weekdaysData[index].id,
      day: weekdaysData[index].day,
      isChecked: event.target.checked,
    });
  };

  const WeekdaysCheckbox = ({
    name,
    label,
    checked,
    onChange,
  }: ICheckboxProps): React.ReactElement => {
    return (
      <FormControl error={!!get(errors, name)}>
        <Controller
          name={name}
          render={({ field }) => (
            <div className={css.Weekdays}>
              <input
                type="checkbox"
                id={`checkbox_${field.name}`}
                {...field}
                value={field.value}
                checked={checked}
                onChange={onChange}
              />
              <label htmlFor={`checkbox_${field.name}`}>{label}</label>
            </div>
          )}
        />
        {!!get(errors, name) && (
          <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
        )}
      </FormControl>
    );
  };

  return (
    <div className={css.WeekdaysContainer}>
      <span>{t('Available weekdays')}</span>
      <div className={css.WeekdaysContainer__checkboxes}>
        {weekdays.map((weekday, index) => {
          return (
            <WeekdaysCheckbox
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
  );
};
