import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import TimeCtrl from '../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  ITimeQuestion,
  TimeAnswerSchema
} from '../../Nexus/entities/ITimeQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function TimeAnswerForm({
  parentAnswer
}: IProps): React.ReactElement {
  const question = parentAnswer.question as ITimeQuestion;
  const methods = useForm<ITimeQuestion>({
    resolver: joiResolver(TimeAnswerSchema),
    defaultValues: question
  });

  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const saveValues = (post: ITimeQuestion) => {
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
                  Select period of maximum length {question.config.periodHours}{' '}
                  hours -{question.config.periodMinutes} minutes
                </Form.Label>
              )}
              {!question.config.isPeriod && (
                <Form.Label>Select a date within the boundaries</Form.Label>
              )}

              <Col sm="2">
                <TimeCtrl
                  name={`answer.fromTime` as const}
                  minTime={
                    question.config.fromBoundary !== null
                      ? question.config.fromBoundary
                      : ''
                  }
                  maxTime={
                    question.config.toBoundary !== null
                      ? question.config.toBoundary
                      : ''
                  }
                />
              </Col>
              {question.config.isPeriod && (
                <Col sm="2">
                  <TimeCtrl
                    name={`answer.toTime` as const}
                    minTime={
                      question.config.fromBoundary !== null
                        ? question.config.fromBoundary
                        : ''
                    }
                    maxTime={
                      question.config.toBoundary !== null
                        ? question.config.toBoundary
                        : ''
                    }
                  />
                </Col>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              {t('save')}
            </Button>
            <ErrorSummary errors={methods.formState.errors} />
          </form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
