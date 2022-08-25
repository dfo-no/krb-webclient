import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../../../Nexus/Joi/CustomJoi';
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
  ITextQuestion,
  TextQuestionAnswerSchema
} from '../../../../Nexus/entities/ITextQuestion';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
}

export default function TextForm({
  answer,
  existingAnswer
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || answer;
  const question = determinedAnswer.question as ITextQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  // Override default schema with values set in config.
  const ProductTextSchema = RequirementAnswerSchema.keys({
    question: TextQuestionAnswerSchema.keys({
      answer: CustomJoi.object().keys({
        text: CustomJoi.string().required(),
        point: CustomJoi.number().required()
      })
    })
  });

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<IRequirementAnswer>({
    defaultValues: determinedAnswer,
    resolver: joiResolver(ProductTextSchema)
  });

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        key={question.id}
        className="mt-4"
      >
        <Form.Control as="textarea" {...register('question.answer.text')} />
        <div className="d-flex justify-content-end">
          {isValueSet(determinedAnswer.id) ? (
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
            onClick={() => handleResetQuestion(determinedAnswer.id)}
          >
            {t('Reset')}
          </Button>
        </div>
      </form>
      <ErrorSummary errors={errors} />
    </div>
  );
}
