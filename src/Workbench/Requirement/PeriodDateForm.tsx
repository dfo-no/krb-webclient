import { KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  Control,
  Controller,
  FormState,
  UseFormRegister
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
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
  formState: { errors },
  item,
  vIndex,
  aIndex
}: IProps): ReactElement {
  const { t } = useTranslation();
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
          <Col>
            <Controller
              control={control}
              name={
                `variants.${vIndex}.questions.${aIndex}.config.fromDate` as const
              }
              render={({ field }) => (
                <KeyboardDatePicker
                  {...field}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label={t('From date')}
                  defaultValue={new Date(item.config.fromDate)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Col>
            <Controller
              control={control}
              name={
                `variants.${vIndex}.questions.${aIndex}.config.toDate` as const
              }
              render={({ field }) => (
                <KeyboardDatePicker
                  {...field}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label={t('To date')}
                  defaultValue={new Date(item.config.toDate)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
