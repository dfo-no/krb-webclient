import { get, has } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import { ITimeQuestion } from '../../models/ITimeQuestion';
import { IRequirement } from '../../models/Requirement';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
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
}: IProps): React.ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>
          Alternative: Time
          <Button
            className="mb-3"
            type="button"
            variant="danger"
            onClick={() => remove(aIndex)}
          >
            <BsTrashFill />
          </Button>
        </h6>

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
