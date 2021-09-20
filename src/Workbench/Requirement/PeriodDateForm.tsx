import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import DatePicker from '../../components/DatePicker/DatePicker';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { Requirement } from '../../models/Requirement';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
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
}: IProps): ReactElement {
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
        <DatePicker
          name={`variants.${vIndex}.questions.${aIndex}.config.fromDate`}
          control={control}
          errors={errors}
          label="From date"
        />
        <DatePicker
          name={`variants.${vIndex}.questions.${aIndex}.config.toDate`}
          control={control}
          errors={errors}
          label="To date"
        />
      </Card.Body>
    </Card>
  );
}
