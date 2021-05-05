import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { has, get } from 'lodash';

import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { Requirement } from '../../models/Requirement';
import { IValueAlternative } from '../../models/IValueAlternative';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  item: IValueAlternative;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function Value({
  remove,
  register,
  formState: { errors },
  item,
  vIndex,
  aIndex
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
            onClick={() => remove(aIndex)}
          >
            <BsTrashFill />
          </Button>
        </Row>
        <Form.Control
          as="input"
          type="hidden"
          {...register(`layouts.${vIndex}.alternatives.${aIndex}.id` as const)}
          defaultValue={item.id}
        />

        <Form.Control
          as="input"
          type="hidden"
          {...register(
            `layouts.${vIndex}.alternatives.${aIndex}.type` as const
          )}
          defaultValue={item.type}
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Minimum
          </Form.Label>
          <Col sm="4">
            <Form.Control
              as="input"
              type="text"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.min` as const
              )}
              defaultValue={item.min}
              isInvalid={
                !!has(errors, `layouts[${vIndex}].alternatives[${aIndex}].min`)
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].min.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Maximum
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.max` as const
              )}
              defaultValue={item.max}
              isInvalid={
                !!has(errors, `layouts[${vIndex}].alternatives[${aIndex}].max`)
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].max.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Step
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.step` as const
              )}
              defaultValue={item.step}
              isInvalid={
                !!has(errors, `layouts[${vIndex}].alternatives[${aIndex}].step`)
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].step.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Unit
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.unit` as const
              )}
              defaultValue={item.unit}
              isInvalid={
                !!has(errors, `layouts[${vIndex}].alternatives[${aIndex}].unit`)
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].unit.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
