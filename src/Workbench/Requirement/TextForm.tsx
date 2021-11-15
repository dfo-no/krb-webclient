import { get, has } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import { IRequirement } from '../../models/IRequirement';
import { ITextQuestion } from '../../models/ITextQuestion';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
  item: ITextQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function TextForm({
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
          Alternative: Text
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
            Max
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.max` as const
              )}
              defaultValue={item.config.max}
              isInvalid={
                !!has(
                  errors,
                  `variants.${vIndex}.questions.${aIndex}.config.max` as const
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants.${vIndex}.questions.${aIndex}.config.max.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
