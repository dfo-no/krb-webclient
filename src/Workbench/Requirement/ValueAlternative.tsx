import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { InputProps } from '../../models/InputProps';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
}

export default function Value({
  register,
  errors,
  item,
  vIx,
  aIx
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form.Control
          as="input"
          type="hidden"
          name={`layouts[${vIx}].alternatives[${aIx}].id`}
          ref={register}
          defaultValue={item.id}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].id
            )
          }
        />

        <Form.Control
          as="input"
          type="hidden"
          name={`layouts[${vIx}].alternatives[${aIx}].type`}
          ref={register}
          defaultValue={item.type}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].type
            )
          }
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Minimum
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name={`layouts[${vIx}].alternatives[${aIx}].min`}
              ref={register}
              defaultValue={item.min}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].min
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].min && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].min.message}
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
              name={`layouts[${vIx}].alternatives[${aIx}].max`}
              ref={register}
              defaultValue={item.max}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].max
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].max && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].max.message}
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
              name={`layouts[${vIx}].alternatives[${aIx}].step`}
              ref={register}
              defaultValue={item.step}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].step
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].step && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].step.message}
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
              name={`layouts[${vIx}].alternatives[${aIx}].unit`}
              ref={register}
              defaultValue={item.unit}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].unit
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].unit && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].unit.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
