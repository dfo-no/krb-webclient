import React from 'react';
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
}

const ControlledTextInput = <T extends FieldValues>({
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
          <Form.Control type="text" {...field} isInvalid={!!error} />
        )}
      />
      <FormControl.Feedback type="invalid">
        {error?.message}
      </FormControl.Feedback>
    </Form.Group>
  );
};

export default ControlledTextInput;
