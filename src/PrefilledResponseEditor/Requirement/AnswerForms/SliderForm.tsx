import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomJoi from '../../../common/CustomJoi';
import SliderCtrl from '../../../FormProvider/SliderCtrl';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import {
  ISliderQuestion,
  SliderQuestionAnswerSchema
} from '../../../Nexus/entities/ISliderQuestion';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addAnswer,
  removeAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

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

  const isValueSet = (answerId: string) => {
    let value = false;

    const index = prefilledResponse.requirementAnswers.findIndex(
      (e) => e.id === answerId
    );
    if (index !== -1) {
      value = true;
    }
    return value;
  };

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
  const stepAmount =
    (question.config.max - question.config.min) / question.config.step;

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
