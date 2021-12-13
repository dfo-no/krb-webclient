import { get } from 'lodash';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label?: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
}

const TextCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Form.Group controlId={name} as={Row}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Form.Control {...register(name)} isInvalid={!!get(errors, name)} />
        <FormControl.Feedback type="invalid">
          {get(errors, name)?.message ?? ''}
        </FormControl.Feedback>
      </Col>
    </Form.Group>
  );
};
export default TextCtrl;

TextCtrl.defaultProps = {
  label: '',
  type: 'text'
};
