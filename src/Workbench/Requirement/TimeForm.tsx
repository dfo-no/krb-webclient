import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  Control,
  FieldError,
  FormState,
  UseFormRegister
} from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import ControlledCheckbox from '../../Form/ControlledCheckbox';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';

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
  control,
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
        <Row>
          <Col sm={1}>
            <Form.Label>Inkluder Periode</Form.Label>
          </Col>
          <Col>
            <ControlledCheckbox
              control={control}
              name={`variants.${vIndex}.questions.${aIndex}.config.isPeriod`}
              error={
                get(
                  errors,
                  `variants.${vIndex}.questions.${aIndex}.config.isPeriod`
                ) as FieldError
              }
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
