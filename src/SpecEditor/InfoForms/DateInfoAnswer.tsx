import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import ErrorSummary from '../../Form/ErrorSummary';
import DateCtrl from '../../FormProvider/DateCtrl';
import { addAnswer } from '../../store/reducers/spesification-reducer';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../Nexus/entities/IPeriodDateQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ModelType } from '../../enums';
import { QuestionType } from '../../models/QuestionType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
}

export default function DateInfoAnswer({
  question,
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
      (answer: IRequirementAnswer) => answer.question.id === question.id
    );
  } else {
    index =
      spec.products.length > 0
        ? spec.products[productIndex].requirementAnswers.findIndex(
            (answer: IRequirementAnswer) => answer.question.id === question.id
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (question as IPeriodDateQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].question as IPeriodDateQuestion)) ||
        (type === 'info' &&
          (spec.products[productIndex].requirementAnswers[index]
            .question as IPeriodDateQuestion));
  const {
    handleSubmit,
    formState: { errors }
  } = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(PeriodDateAnswerSchema),
    defaultValues: {
      ...defaultVal
    }
  });
  const q = question as IPeriodDateQuestion;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveValues = (post: any) => {
    const newAns = {
      ...post
    };
    const newDate = post.answer.date.toISOString();
    newAns.answer.date = newDate;
    if (index === -1) {
      const newAnswer: IRequirementAnswer = {
        id: uuidv4(),
        questionId: post.id,
        weight: 1,
        variantId: reqTextId,
        requirement,
        question: newAns,
        type: ModelType.requirement
      };
      dispatch(addAnswer({ answer: newAnswer }));
    } else {
      const answer = spec.requirementAnswers[index];
      answer.question = newAns;
      dispatch(addAnswer({ answer }));
    }
  };
  return (
    <Col className="p-0 m-0 w-50">
      <p>Hvilekn dato skal varene leveres</p>
      <form onSubmit={handleSubmit(saveValues)}>
        <Form.Group as={Row}>
          {q.config.isPeriod && (
            <Form.Label>
              Select period of length {q.config.periodMin} -{q.config.periodMax}{' '}
              days
            </Form.Label>
          )}
          {!q.config.isPeriod && (
            <Form.Label>Select a date within the boundaries</Form.Label>
          )}

          <Col sm="2">
            <DateCtrl
              name={`answer.fromDate` as const}
              minDate={
                q.config.fromBoundary !== null ? q.config.fromBoundary : ''
              }
              maxDate={q.config.toBoundary !== null ? q.config.toBoundary : ''}
            />
          </Col>
          {q.config.isPeriod && (
            <Col sm="2">
              <DateCtrl
                name={`answer.toDate` as const}
                minDate={
                  q.config.fromBoundary !== null ? q.config.fromBoundary : ''
                }
                maxDate={
                  q.config.toBoundary !== null ? q.config.toBoundary : ''
                }
              />
            </Col>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {t('Save')}
        </Button>
        <ErrorSummary errors={errors} />
      </form>
    </Col>
  );
}
