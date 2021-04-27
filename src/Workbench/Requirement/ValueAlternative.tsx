import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import { InputProps } from '../../models/InputProps';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
}

export default function Value({
  remove,
  register,
  formState: { errors },
  item,
  vIx,
  aIx
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="m-1 d-flex justify-content-between">
          <h6>Alternative: Value</h6>
          <Button
            className="mb-3"
            type="button"
            variant="danger"
            onClick={() => remove(aIx)}
          >
            <BsTrashFill />
          </Button>
        </Row>
        <Form.Control
          as="input"
          type="hidden"
          {...register(`layouts[${vIx}].alternatives[${aIx}].id`)}
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
          {...register(`layouts[${vIx}].alternatives[${aIx}].type`)}
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
              {...register(`layouts[${vIx}].alternatives[${aIx}].min`)}
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
              {...register(`layouts[${vIx}].alternatives[${aIx}].max`)}
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
              {...register(`layouts[${vIx}].alternatives[${aIx}].step`)}
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
              {...register(`layouts[${vIx}].alternatives[${aIx}].unit`)}
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
