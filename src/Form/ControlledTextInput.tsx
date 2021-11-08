import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  label?: string;
}

const ControlledTextInput = <T extends FieldValues>({
  name,
  control,
  error,
  label
}: Props<T>): React.ReactElement => {
  if (!label) {
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
  }

  return (
    <Form.Group controlId={name} as={Row}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
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
      </Col>
    </Form.Group>
  );
};

export default ControlledTextInput;

ControlledTextInput.defaultProps = {
  label: ''
};
