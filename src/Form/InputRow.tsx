import * as React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { ReactElement } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { has, get } from 'lodash';

interface IProps {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  labelWidth?: number;
  controlWidth?: number;
}

function InputRow({
  control,
  errors,
  name,
  label,
  type,
  labelWidth,
  controlWidth
}: IProps): ReactElement {
  const errorTmp = `${name}.message`;
  const errorArrayPath = errorTmp.split('.');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onBlur, onChange } }) => (
        <Form.Group as={Row}>
          <Form.Label column sm={labelWidth}>
            {label}
          </Form.Label>
          <Col sm={controlWidth}>
            <Form.Control
              as="input"
              type={type}
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              isInvalid={has(errors, name)}
            />
            {has(errors, name) && (
              <Form.Control.Feedback type="invalid">
                {get(errors, errorArrayPath)}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
      )}
    />
  );
}

InputRow.defaultProps = {
  type: 'input',
  labelWidth: 2,
  controlWidth: 10
};

export default InputRow;
