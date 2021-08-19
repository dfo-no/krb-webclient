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
              name={
                `variants.${vIndex}.questions.${aIndex}.config.fromDate` as const
              }
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  variant="inline"
                  format="dd/MM/yyyy"
                  label={t('From date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  {...rest}
                />
              )}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Col>
            <Controller
              name={
                `variants.${vIndex}.questions.${aIndex}.config.toDate` as const
              }
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  variant="inline"
                  format="dd/MM/yyyy"
                  label={t('To date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  {...rest}
                />
              )}
            />
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
