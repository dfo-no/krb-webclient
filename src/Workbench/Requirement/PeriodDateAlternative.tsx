import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BsTrashFill } from 'react-icons/bs';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { get, has } from 'lodash';
import { Requirement } from '../../models/Requirement';
import { IPeriodDateAlternative } from '../../models/IPeriodDateAlternative';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  item: IPeriodDateAlternative;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function PeriodDateAlternative({
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
          <h6>Alternative: Period Date</h6>
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
            Minimum days
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.minDays` as const
              )}
              defaultValue={item.minDays}
              isInvalid={
                !!has(
                  errors,
                  `layouts[${vIndex}].alternatives[${aIndex}].minDays` as const
                )
              }
            />

            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].minDays.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Maximum days
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.maxDays` as const
              )}
              defaultValue={item.maxDays}
              isInvalid={
                !!has(
                  errors,
                  `layouts[${vIndex}].alternatives[${aIndex}].maxDays` as const
                )
              }
            />

            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].maxDays.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            From date
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.fromDate` as const
              )}
              defaultValue={item.fromDate}
              isInvalid={
                !!has(
                  errors,
                  `layouts[${vIndex}].alternatives[${aIndex}].fromDate` as const
                )
              }
            />

            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].fromDate.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            To date
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(
                `layouts.${vIndex}.alternatives.${aIndex}.toDate` as const
              )}
              defaultValue={item.toDate}
              isInvalid={
                !!has(
                  errors,
                  `layouts[${vIndex}].alternatives[${aIndex}].toDate` as const
                )
              }
            />

            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `layouts[${vIndex}].alternatives.[${aIndex}].toDate.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
