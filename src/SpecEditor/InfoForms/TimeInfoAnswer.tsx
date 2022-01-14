import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import TimeCtrl from '../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { QuestionType } from '../../models/QuestionType';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import {
  ITimeQuestion,
  TimeAnswerSchema
} from '../../Nexus/entities/ITimeQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  q: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
}

export default function TimeInfoAnswer({
  q,
  type,
  reqTextId,
  requirement
}: IProps): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  let index: number;

  const productIndex = spec.products.findIndex(
    (p) => p.id === selectedSpecificationProduct.id
  );

  if (type === 'requirement') {
    index = spec.requirementAnswers.findIndex(
      (answer: IRequirementAnswer) => answer.question.id === q.id
    );
  } else {
    index =
      spec.products.length > 0
        ? spec.products[productIndex].requirementAnswers.findIndex(
            (answer: IRequirementAnswer) => answer.question.id === q.id
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (q as ITimeQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].question as ITimeQuestion)) ||
        (spec.products[productIndex].requirementAnswers[index]
          .question as ITimeQuestion);
  const {
    handleSubmit,
    formState: { errors }
  } = useForm<ITimeQuestion>({
    resolver: joiResolver(TimeAnswerSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const question = q as ITimeQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ITimeQuestion) => {
    if (index === -1) {
      const newAnswer: IRequirementAnswer = {
        id: uuidv4(),
        questionId: post.id,
        weight: 1,
        variantId: reqTextId,
        requirement,
        question: post,
        type: ModelType.requirement
      };
      dispatch(addAnswer({ answer: newAnswer }));
    } else {
      const answer = spec.requirementAnswers[index];
      answer.question = post;
      dispatch(addAnswer({ answer }));
    }
  };

  return (
    <Col className="p-0 m-0 w-50">
      <Form className="mt-3" onSubmit={handleSubmit(saveValues)}>
        <Form.Group as={Row}>
          {question.config.isPeriod && (
            <Form.Label>
              Select period of maximum length {question.config.periodHours}
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
        <ErrorSummary errors={errors} />
      </Form>
    </Col>
  );
}
