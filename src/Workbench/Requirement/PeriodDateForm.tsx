import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {
  Control,
  FieldError,
  FormState,
  UseFormRegister
} from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import ControlledDate from '../../Form/ControlledDate';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { IRequirement } from '../../models/Requirement';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
  item: IPeriodDateQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function PeriodDateForm({
  remove,
  register,
  control,
  item,
  vIndex,
  aIndex,
  formState
}: IProps): React.ReactElement {
  const { errors } = formState;

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>
          Alternative: Period Date
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
        <ControlledDate
          control={control}
          name={`variants.${vIndex}.questions.${aIndex}.config.fromDate`}
          error={
            get(
              errors,
              `variants.${vIndex}.questions.${aIndex}.config.fromDate`
            ) as FieldError
          }
          label=""
        />
        <ControlledDate
          control={control}
          name={`variants.${vIndex}.questions.${aIndex}.config.toDate`}
          error={
            get(
              errors,
              `variants.${vIndex}.questions.${aIndex}.config.toDate`
            ) as FieldError
          }
          label=""
        />
      </Card.Body>
    </Card>
  );
}
