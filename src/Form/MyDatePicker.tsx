import * as React from 'react';
import { Controller, FieldErrors, UseFormReturn } from 'react-hook-form';
import DayJsUtils from '@date-io/dayjs';
import { FormControl, FormHelperText } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { ReactElement } from 'react';

interface InputProps extends Pick<UseFormReturn, 'control'> {
  errors: FieldErrors;
  name: string;
}

interface IProps {
  control: any;
  errors: FieldErrors;
  name: string;
}

export default function MyDatePicker({
  control,
  errors,
  name
}: IProps): ReactElement {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <FormControl error={!!errors[name]}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker"
              label="Date picker dialog"
              format="dd.MM.yyyy"
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              {...rest}
            />
            {errors.birthDate && (
              <FormHelperText id="date-picker-error-text">
                {errors[name].message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </MuiPickersUtilsProvider>
  );
}
