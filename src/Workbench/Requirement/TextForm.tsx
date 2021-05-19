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
import { ITextQuestion } from '../../models/ITextQuestion';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
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
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="m-1 d-flex justify-content-between">
          <h6>Alternative: Text</h6>
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
          {...register(`variants.${vIndex}.alternatives.${aIndex}.id` as const)}
          defaultValue={item.id}
        />

        <Form.Control
          as="input"
          type="hidden"
          {...register(
            `variants.${vIndex}.alternatives.${aIndex}.type` as const
          )}
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
                `variants.${vIndex}.alternatives.${aIndex}.config.max` as const
              )}
              defaultValue={item.config.max}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].alternatives[${aIndex}].config.max` as const
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].alternatives.[${aIndex}].config.max.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
