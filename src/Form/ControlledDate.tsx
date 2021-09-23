import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format } from 'date-fns';
import React from 'react';
import Form from 'react-bootstrap/Form';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { DATETIME_ISO8601UTC } from '../common/Constants';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
}

const ControlledDate = <T extends FieldValues>({
  name,
  control,
  error
}: Props<T>): React.ReactElement => {
  const renderLabel = (date: MaterialUiPickersDate | null) =>
    date === null ? '' : format(date, 'dd.MM.yyyy');

  return (
    <Form.Group controlId={name}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <KeyboardDatePicker
            margin="normal"
            id="date-picker"
            format={DATETIME_ISO8601UTC}
            labelFunc={renderLabel}
            label="Date picker dialog"
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            variant="dialog"
            value={field.value}
          />
        )}
      />
    </Form.Group>
  );
};

export default ControlledDate;
