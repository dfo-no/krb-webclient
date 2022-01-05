import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import DateCtrl from '../../FormProvider/DateCtrl';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../Nexus/entities/IPeriodDateQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function PeriodDateAnswerForm({
  parentAnswer
}: IProps): React.ReactElement {
  const question = parentAnswer.question as IPeriodDateQuestion;
  const methods = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(PeriodDateAnswerSchema),
    defaultValues: question
  });

  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const saveValues = (post: IPeriodDateQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };

    newAnswer.question = post;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Question: Date </h6>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(saveValues)}>
            <Form.Group as={Row}>
              <Form.Label>Boundary from - to</Form.Label>
              <Col sm="6">
                <DateCtrl name={`config.fromBoundary` as const} />
              </Col>
              <Col sm="6">
                <DateCtrl name={`config.toBoundary` as const} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Periode from - to</Form.Label>
              <Col sm="6">
                <DateCtrl name={`answer.fromDate` as const} />
              </Col>
              {question.config.isPeriod && (
                <Col sm="6">
                  <DateCtrl name={`answer.toDate` as const} />
                </Col>
              )}
            </Form.Group>

            <Button type="submit">{t('save')}</Button>
            <ErrorSummary errors={methods.formState.errors} />
          </Form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
