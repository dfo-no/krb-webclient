import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../../../common/CustomJoi';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import {
  addAnswer,
  removeAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from '../../Product/AnswerForms/AnswerUtils';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../../models/IRequirementAnswer';
import {
  ISliderQuestion,
  SliderQuestionAnswerSchema
} from '../../../../Nexus/entities/ISliderQuestion';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
}

export default function SliderForm({
  answer,
  existingAnswer
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || answer;
  const question = determinedAnswer.question as ISliderQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  // Override default schema with values set in config.
  const ProductSliderSchema = RequirementAnswerSchema.keys({
    question: SliderQuestionAnswerSchema.keys({
      answer: CustomJoi.object().keys({
        value: CustomJoi.number()
          .min(question.config.min)
          .max(question.config.max)
          .required(),
        point: CustomJoi.number().required()
      })
    })
  });

  const methods = useForm<IRequirementAnswer>({
    defaultValues: determinedAnswer,
    resolver: joiResolver(ProductSliderSchema)
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

  const stepAmount =
    (question.config.max - question.config.min) / question.config.step;

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
          <Form.Label>Angi verdi ({question.config.unit})</Form.Label>
          {stepAmount <= 10 && (
            <SliderCtrl
              name="question.answer.value"
              min={question.config.min}
              max={question.config.max}
              unit={question.config.unit}
              step={question.config.step}
              marks={[]}
            />
          )}
          {stepAmount > 10 && (
            <Form.Control
              type="number"
              min={question.config.min}
              max={question.config.max}
              name="question.answer.value"
            />
          )}
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
              onClick={() => {
                handleResetQuestion(determinedAnswer.id);
                methods.reset();
              }}
            >
              {t('Reset')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
