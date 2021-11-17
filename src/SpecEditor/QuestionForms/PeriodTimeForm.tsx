import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledDate from '../../Form/ControlledDate';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';
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

export default function PeriodDateForm({
  parentAnswer
}: IProps): React.ReactElement {
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
              <ControlledDate
                control={control}
                name={`config.fromDate` as const}
                error={get(errors, `config.fromDate`) as FieldError}
                label={t('Select date')}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Col>
              <ControlledDate
                control={control}
                name={`config.toDate` as const}
                error={get(errors, `config.toDate`) as FieldError}
                label={t('Select date')}
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
