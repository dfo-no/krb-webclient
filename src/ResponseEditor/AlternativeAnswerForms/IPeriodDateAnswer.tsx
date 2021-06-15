import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Joi from 'joi';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import ErrorSummary from '../../Form/ErrorSummary';
import ModelType from '../../models/ModelType';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import QuestionEnum from '../../models/QuestionEnum';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const PeriodDateSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
    fromDate: Joi.string().trim().allow('').required(),
    toDate: Joi.string().trim().allow('').required()
  }),
  answer: Joi.object().keys({
    date: Joi.string().trim().allow('').required()
  })
});

export default function PeriodDateAnswer({
  parentAnswer
}: IProps): ReactElement {
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

  const item = parentAnswer.alternative as IPeriodDateQuestion;
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
          <Form.Control
            as="input"
            type="hidden"
            {...register('config.fromDate')}
            isInvalid={!!errors.type}
          />
          <Form.Control
            as="input"
            type="hidden"
            {...register('config.toDate')}
            isInvalid={!!errors.type}
          />
          <Form.Group as={Row}>
            <Col sm="4">
              <Controller
                control={control}
                name={`answer.date` as const}
                render={({ field }) => (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      {...field}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="From Date"
                      minDate={item.config.fromDate}
                      maxDate={item.config.toDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                    />
                  </MuiPickersUtilsProvider>
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
