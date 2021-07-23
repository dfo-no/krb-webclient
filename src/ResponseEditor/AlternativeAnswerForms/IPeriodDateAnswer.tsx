import { joiResolver } from '@hookform/resolvers/joi';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ErrorSummary from '../../Form/ErrorSummary';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';
import { RootState } from '../../store/store';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const PeriodDateSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required()
  }),
  answer: Joi.object().keys({
    date: Joi.date().raw().required()
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

  const saveValues = (post: any) => {
    const newAnswer = {
      ...parentAnswer
    };

    const newAns = {
      ...post
    };
    const newDate = post.answer.date.toISOString();
    newAns.answer.date = newDate;
    newAnswer.alternative = newAns;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && productId !== null)
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Question: Date </h6>
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
                name={`answer.date` as const}
                control={control}
                defaultValue={item.config.fromDate}
                render={({ field: { ref, ...rest } }) => (
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    variant="inline"
                    minDate={item.config.fromDate}
                    maxDate={item.config.toDate}
                    format="dd/MM/yyyy"
                    label={t('Select date')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    {...rest}
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
