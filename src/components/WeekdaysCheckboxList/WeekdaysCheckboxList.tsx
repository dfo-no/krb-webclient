import React from 'react';
import { FormControl, FormLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

import css from './WeekdaysCheckboxList.module.scss';

interface IProps {
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (event: any) => void;
}

export const WeekdaysCheckboxList = ({
  name,
  label,
  checked,
  onChange,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();
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
