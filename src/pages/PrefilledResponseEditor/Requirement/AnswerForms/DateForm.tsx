import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../../../Nexus/Joi/CustomJoi';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import ErrorSummary from '../../../../Form/ErrorSummary';
import {
  addAnswer,
  removeAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from '../../Product/AnswerForms/AnswerUtils';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../../Nexus/entities/IRequirementAnswer';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../../../Nexus/entities/IPeriodDateQuestion';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
}

export const PeriodDateSchema = RequirementAnswerSchema.keys({
  question: PeriodDateAnswerSchema.keys({
    answer: CustomJoi.object().keys({
      fromDate: CustomJoi.string().allow(null).required(),
      toDate: CustomJoi.string().allow(null).required(),
      point: CustomJoi.number().required()
    })
  })
});

export default function DateForm({
  answer,
  existingAnswer
}: IProps): React.ReactElement {
  const determinedAnswer = existingAnswer || answer;
  const methods = useForm<IRequirementAnswer>({
    resolver: joiResolver(PeriodDateSchema),
    defaultValues: determinedAnswer
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const question = determinedAnswer.question as IPeriodDateQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const onSubmit = (post: IRequirementAnswer): void => {
    dispatch(addAnswer(post));
  };

  const handleResetQuestion = (elemId: string): void => {
    dispatch(removeAnswer(elemId));
  };

  const isValueSet = (answerId: string): boolean => {
    return !!prefilledResponse.requirementAnswers.find(
      (a) => a.id === answerId
    );
  };

  return (
    <div>
      <h5>
        {
          AnswerUtils.getVariantText(
            determinedAnswer.requirement,
            determinedAnswer.variantId
          )[0]
        }
      </h5>
      <h6>
        <small className="text-muted">
          {
            AnswerUtils.getVariantText(
              determinedAnswer.requirement,
              determinedAnswer.variantId
            )[1]
          }
        </small>
      </h6>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          key={question.id}
          className="mt-4"
        >
          {!question.config.isPeriod && (
            <Form.Label>Select a date within the boundaries</Form.Label>
          )}

          <Col sm="2">
            <DateCtrl name={`question.answer.fromDate` as const} />
          </Col>
          {question.config.isPeriod && (
            <Col sm="2">
              <DateCtrl name={`question.answer.toDate` as const} />
            </Col>
          )}
          <div className="d-flex justify-content-end">
            {isValueSet(answer.id) ? (
              <Badge bg="success" className="mx-2">
                Set
              </Badge>
            ) : (
              <Badge bg="warning" className="mx-2">
                Not set
              </Badge>
            )}

            <Button type="submit" variant="primary">
              {t('Save')}
            </Button>
            <Button
              type="button"
              variant="warning"
              onClick={() => handleResetQuestion(answer.id)}
            >
              {t('Reset')}
            </Button>
          </div>
          <ErrorSummary errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </div>
  );
}
