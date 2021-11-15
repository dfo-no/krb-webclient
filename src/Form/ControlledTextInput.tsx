import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
}

const ControlledTextInput = <T extends FieldValues>({
  name,
  control,
  error
}: IProps<T>): React.ReactElement => {
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
