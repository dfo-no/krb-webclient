import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { get, has } from 'lodash';
import { Requirement } from '../../models/Requirement';
import { ITimeQuestion } from '../../models/ITimeQuestion';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  item: ITimeQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function TimeForm({
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
          <h6>Alternative: Time</h6>
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
          {...register(`variants.${vIndex}.questions.${aIndex}.id` as const)}
          defaultValue={item.id}
        />
        <Form.Control
          as="input"
          type="hidden"
          {...register(`variants.${vIndex}.questions.${aIndex}.type` as const)}
          defaultValue={item.type}
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            From time
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.fromTime` as const
              )}
              defaultValue={item.config.fromTime}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.fromTime` as const
                )
              }
            />

            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.fromTime.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            To time
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.toTime` as const
              )}
              defaultValue={item.config.toTime}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.toTime` as const
                )
              }
            />

            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.toTime.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
