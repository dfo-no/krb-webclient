import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { IValueAlternative } from '../../../models/IValueAlternative';

const valueSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('value').required(),
  step: Joi.number().min(0).max(1000000000).required(),
  min: Joi.number().min(0).max(1000000000).required(),
  max: Joi.number().min(0).max(1000000000).required(),
  unit: Joi.string().required()
});

interface IProps {
  item: IValueAlternative;
}

export default function ValueForm({ item }: IProps): ReactElement {
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(valueSchema)
  });
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form.Control
          as="input"
          type="hidden"
          name="id"
          ref={register}
          defaultValue={item.id}
          isInvalid={!!errors.id}
        />

        <Form.Control
          as="input"
          type="hidden"
          name="type"
          ref={register}
          defaultValue={item.type}
          isInvalid={!!errors.type}
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Minimum
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name="min"
              ref={register}
              defaultValue={item.min}
              isInvalid={!!errors.min}
            />
            {errors.min && (
              <Form.Control.Feedback type="invalid">
                {errors.min.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Maximum
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name="max"
              ref={register}
              defaultValue={item.max}
              isInvalid={!!errors.max}
            />
            {errors.max && (
              <Form.Control.Feedback type="invalid">
                {errors.max.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Step
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              name="step"
              ref={register}
              defaultValue={item.step}
              isInvalid={!!errors.step}
            />
            {errors.step && (
              <Form.Control.Feedback type="invalid">
                {errors.step.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Unit
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              name="unit"
              ref={register}
              defaultValue={item.unit}
              isInvalid={!!errors.unit}
            />
            {errors.unit && (
              <Form.Control.Feedback type="invalid">
                {errors.unit.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
