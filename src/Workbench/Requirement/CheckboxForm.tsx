import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { Requirement } from '../../models/Requirement';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  item: ICheckboxQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function CheckboxForm({
  register,
  remove,
  item,
  vIndex,
  aIndex
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>
          Alternative: Yes/No{' '}
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
        <Row className="w-50">
          <Col>
            <Form.Label>Angi prosentvis poeng for ja</Form.Label>
            <Form.Control
              as="input"
              type="number"
              className="w-25"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.weightTrue` as const
              )}
              defaultValue={item.config.weightTrue}
            />
          </Col>
          <Col>
            <Form.Label>Angi prosentvis poeng for nei</Form.Label>
            <Form.Control
              as="input"
              type="number"
              className="w-25"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.weightFalse` as const
              )}
              defaultValue={item.config.weightFalse}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
