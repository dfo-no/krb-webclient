import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { get } from 'lodash';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import ControlledSlider from '../../../../Form/ControlledSlider';
import CustomJoi from '../../../../common/CustomJoi';
import {
  addProductAnswer,
  removeProductAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from './AnswerUtils';
import { IPrefilledResponseProduct } from '../../../../models/IPrefilledResponseProduct';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
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
  elem: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
  product: IPrefilledResponseProduct;
}

const ProductSliderForm = ({
  elem,
  existingAnswer,
  product
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || elem;
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<IRequirementAnswer>({
    defaultValues: elem,
    resolver: joiResolver(ProductSliderSchema)
  });

  const onSubmit = (post: IRequirementAnswer): void => {
    dispatch(addProductAnswer({ answer: post, productId: product.id }));
  };

  const handleResetQuestion = (elemId: string, productId: string): void => {
    dispatch(removeProductAnswer({ answerId: elemId, productId }));
  };

  const getVariantText = (
    requirement: IRequirement,
    variantId: string
  ): [string, string] => {
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

  // if step amount is greater than 10, slider is converted to inputfield
  const stepAmount =
    (question.config.max - question.config.min) / question.config.step;

  return (
    <div>
      <h5>{getVariantText(elem.requirement, elem.variantId)[0]}</h5>
      <h6>
        <small className="text-muted">
          {getVariantText(elem.requirement, elem.variantId)[1]}
        </small>
      </h6>
      <form
        onSubmit={handleSubmit(onSubmit)}
        key={question.id}
        className="mt-4"
      >
        <Form.Label>Angi verdi ({question.config.unit})</Form.Label>
        {stepAmount <= 10 && (
          <ControlledSlider
            min={question.config.min}
            max={question.config.max}
            unit={question.config.unit}
            step={question.config.step}
            marks={[]}
            control={control}
            name={`question.answer.value` as const}
            error={get(errors, `question.answer.value`) as FieldError}
          />
        )}
        {stepAmount > 10 && (
          <Form.Control
            type="number"
            min={question.config.min}
            max={question.config.max}
            {...register(`question.answer.value`)}
          />
        )}
        <div className="d-flex justify-content-end">
          {AnswerUtils.isValueSet(product.id, elem.id, prefilledResponse) ? (
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
            onClick={() => handleResetQuestion(elem.id, product.id)}
          >
            {t('Reset')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductSliderForm;
