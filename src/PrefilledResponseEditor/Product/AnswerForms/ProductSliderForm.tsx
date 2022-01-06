import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledSlider from '../../../Form/ControlledSlider';
import { IPrefilledResponseProduct } from '../../../models/IPrefilledResponseProduct';
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
  addProductAnswer,
  removeProductAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

interface IProps {
  elem: IRequirementAnswer;
  product: IPrefilledResponseProduct;
  existingAnswer: IRequirementAnswer | null;
}

const ProductSliderForm = ({
  elem,
  product,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || elem;
  const question = determinedAnswer.question as ISliderQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const isValueSet = (productId: string, answerId: string) => {
    let value = false;

    const productIndex = prefilledResponse.products.findIndex(
      (entity) => entity.id === productId
    );
    if (productIndex !== -1) {
      const reqIndex = prefilledResponse.products[
        productIndex
      ].requirementAnswers.findIndex((e) => e.id === answerId);
      if (reqIndex !== -1) {
        value = true;
      }
    }
    return value;
  };

  // Override default schema with values set in config.
  const ProductSliderSchema = RequirementAnswerSchema.keys({
    question: SliderQuestionAnswerSchema.keys({
      answer: Joi.object().keys({
        value: Joi.number()
          .min(question.config.min)
          .max(question.config.max)
          .required(),
        point: Joi.number().required()
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

  const onSubmit = (post: IRequirementAnswer) => {
    dispatch(addProductAnswer({ answer: post, productId: product.id }));
  };

  const handleResetQuestion = (elemId: string, productId: string) => {
    dispatch(removeProductAnswer({ answerId: elemId, productId }));
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
      <Form
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
          {isValueSet(product.id, elem.id) ? (
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
            onClick={() => handleResetQuestion(elem.id, product.id)}
          >
            {t('Reset')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductSliderForm;
