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
import { DATETIME_ISO8601UTC } from '../../common/Constants';
import ErrorSummary from '../../Form/ErrorSummary';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const PeriodDateSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
    fromDate: Joi.alternatives([
      Joi.date().iso(),
      Joi.string().valid('')
    ]).required(),
    toDate: Joi.alternatives([
      Joi.date().iso(),
      Joi.string().valid('')
    ]).required()
  })
});

export default function PeriodDateForm({ parentAnswer }: IProps): ReactElement {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(PeriodDateSchema),
    defaultValues: {
      ...(parentAnswer.question as IPeriodDateQuestion)
    }
  });

  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (
    !selectedSpecificationProduct &&
    parentAnswer.type === ModelType.product
  ) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: IPeriodDateQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;
    const serialized: IRequirementAnswer = JSON.parse(
      JSON.stringify(newAnswer)
    );
    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: serialized }));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        addProductAnswer({
          answer: serialized,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Date </h6>
        <Form onSubmit={handleSubmit(saveValues)}>
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
                    format={DATETIME_ISO8601UTC}
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
                    format={DATETIME_ISO8601UTC}
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
