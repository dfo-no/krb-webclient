import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomJoi from '../../../common/CustomJoi';
import ErrorSummary from '../../../Form/ErrorSummary';
import TimeCtrl from '../../../FormProvider/TimeCtrl';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addAnswer,
  removeAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

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

export default function TimeForm({
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

  const onSubmit = (post: IRequirementAnswer) => {
    dispatch(addAnswer(post));
  };

  const handleResetQuestion = (elemId: string) => {
    dispatch(removeAnswer(elemId));
  };

  const getVariantText = (requirement: IRequirement, variantId: string) => {
    const variantIndex = requirement.variants.findIndex(
      (v) => v.id === variantId
    );
    let tuple: [string, string] = ['', ''];
    if (variantIndex !== -1) {
      tuple = [
        requirement.variants[variantIndex].requirementText,
        requirement.variants[variantIndex].instruction
      ];
    }
    return tuple;
  };

  const isValueSet = (answerId: string) => {
    let value = false;
    const reqIndex = prefilledResponse.requirementAnswers.findIndex(
      (e) => e.id === answerId
    );
    if (reqIndex !== -1) {
      value = true;
    }
    return value;
  };

  return (
    <div>
      <h5>
        {
          getVariantText(
            determinedAnswer.requirement,
            determinedAnswer.variantId
          )[0]
        }
      </h5>
      <h6>
        <small className="text-muted">
          {
            getVariantText(
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
            <TimeCtrl name={`question.answer.fromDate` as const} />
          </Col>
          {question.config.isPeriod && (
            <Col sm="2">
              <TimeCtrl name={`question.answer.toDate` as const} />
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
              {t('save')}
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
