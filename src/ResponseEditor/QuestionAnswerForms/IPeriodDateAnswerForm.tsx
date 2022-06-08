import Button from '@mui/material/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import ErrorSummary from '../../Form/ErrorSummary';
import DateCtrl from '../../FormProvider/DateCtrl';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ModelType } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
          <form onSubmit={methods.handleSubmit(saveValues)}>
            <Form.Group as={Row}>
              {question.config.isPeriod && (
                <Form.Label>
                  Select period of length {question.config.periodMin} -
                  {question.config.periodMax} days
                </Form.Label>
              )}
              {!question.config.isPeriod && (
                <Form.Label>Select a date within the boundaries</Form.Label>
              )}

              <Col sm="2">
                <DateCtrl
                  name={`answer.fromDate` as const}
                  minDate={
                    question.config.fromBoundary !== null
                      ? question.config.fromBoundary
                      : ''
                  }
                  maxDate={
                    question.config.toBoundary !== null
                      ? question.config.toBoundary
                      : ''
                  }
                />
              </Col>
              {question.config.isPeriod && (
                <Col sm="2">
                  <DateCtrl
                    name={`answer.toDate` as const}
                    minDate={
                      question.config.fromBoundary !== null
                        ? question.config.fromBoundary
                        : ''
                    }
                    maxDate={
                      question.config.toBoundary !== null
                        ? question.config.toBoundary
                        : ''
                    }
                  />
                </Col>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              {t('Save')}
            </Button>
            <ErrorSummary errors={methods.formState.errors} />
          </form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
