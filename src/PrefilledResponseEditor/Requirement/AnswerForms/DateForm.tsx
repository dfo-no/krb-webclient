import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledDate from '../../../Form/ControlledDate';
import ErrorSummary from '../../../Form/ErrorSummary';
import {
  IPeriodDateQuestion,
  PeriodDateQuestionAnswerSchema
} from '../../../models/IPeriodDateQuestion';
import { IRequirement } from '../../../models/IRequirement';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addAnswer,
  removeAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

interface IProps {
  answer: IRequirementAnswer;
}

export const PeriodDateSchema = RequirementAnswerSchema.keys({
  question: PeriodDateQuestionAnswerSchema.keys({
    answer: Joi.object().keys({
      date: Joi.date().iso().raw().required(),
      point: Joi.number().required()
    })
  })
});

export default function DateForm({ answer }: IProps): React.ReactElement {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IRequirementAnswer>({
    resolver: joiResolver(PeriodDateSchema),
    defaultValues: answer
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const question = answer.question as IPeriodDateQuestion;
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
      <h5>{getVariantText(answer.requirement, answer.variantId)[0]}</h5>
      <h6>
        <small className="text-muted">
          {getVariantText(answer.requirement, answer.variantId)[1]}
        </small>
      </h6>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        key={question.id}
        className="mt-4"
      >
        <ControlledDate
          control={control}
          name={`question.answer.date` as const}
          error={get(errors, `answer.date`) as FieldError}
          label={t('Select date')}
        />
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
      </Form>
      <ErrorSummary errors={errors} />
    </div>
  );
}
