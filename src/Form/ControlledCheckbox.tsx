import Switch from '@mui/material/Switch';
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
}

const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  error
}: Props<T>): React.ReactElement => {
  return (
    <Form.Group controlId={name}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch
            {...field}
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value ? field.value : false}
          />
        )}
      />
      <Form.Control type="hidden" isInvalid={!!error} />
      <FormControl.Feedback type="invalid">
        {error?.message}
      </FormControl.Feedback>
    </Form.Group>
  );
};

export default ControlledCheckbox;
