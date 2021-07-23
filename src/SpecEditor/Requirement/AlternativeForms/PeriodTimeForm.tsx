import { joiResolver } from '@hookform/resolvers/joi';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Joi, { string } from 'joi';
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
  IAnswerBase,
  IConfigBase,
  IQuestionBase
} from '../../../models/Question';
import QuestionEnum from '../../../models/QuestionEnum';
import {
  addAnswer,
  addProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const PeriodDateSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
    fromDate: Joi.string().trim().allow('').required(),
    toDate: Joi.string().trim().allow('').required()
  })
});

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
          <Form.Group as={Row}>
            <Col sm="4">
              <Controller
                name={`config.fromDate` as const}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    variant="inline"
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
          <Form.Group>
            <Col>
              <Controller
                name={`config.toDate` as const}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    variant="inline"
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
