import { joiResolver } from '@hookform/resolvers/joi';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IPeriodDateQuestion } from '../../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import ModelType from '../../../models/ModelType';
import {
  addAnswer,
  addProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import { PeriodDateSchema } from '../../../Workbench/Requirement/RequirementEditor';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function PeriodDateForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(PeriodDateSchema),
    defaultValues: {
      ...(parentAnswer.alternative as IPeriodDateQuestion)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === ModelType.product) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: IPeriodDateQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.alternative = post;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && productId !== null)
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            type="hidden"
            {...register('id')}
            isInvalid={!!errors.id}
          />

          <Form.Control
            as="input"
            type="hidden"
            {...register('type')}
            isInvalid={!!errors.type}
          />
          <Form.Group as={Row}>
            <Col sm="4">
              <Controller
                control={control}
                name={`config.fromDate` as const}
                render={({ field }) => (
                  <KeyboardDatePicker
                    {...field}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={t('From date')}
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
                name={`config.toDate` as const}
                render={({ field }) => (
                  <KeyboardDatePicker
                    {...field}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={t('To date')}
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

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
