import { get } from 'lodash';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label?: string;
}
/**
 * @see Checkbox vs Toggle Switch
 * https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8
 */
const SwitchCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Form.Group controlId={name} as={Row}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Controller
          name={name}
          render={({ field }) => (
            <Form.Check
              type="switch"
              {...field}
              isInvalid={!!get(errors, name)}
              checked={field.value}
            />
          )}
        />
        <Form.Control type="hidden" isInvalid={!!get(errors, name)} />
        <FormControl.Feedback type="invalid">
          {get(errors, name)?.message ?? ''}
        </FormControl.Feedback>
      </Col>
    </Form.Group>
  );
};

export default SwitchCtrl;

SwitchCtrl.defaultProps = {
  label: ''
};
