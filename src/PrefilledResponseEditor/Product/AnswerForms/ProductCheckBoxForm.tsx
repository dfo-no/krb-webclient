import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IPrefilledResponseProduct } from '../../../models/IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../../Nexus/entities/ICheckboxQuestion';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProductAnswer,
  removeProductAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

interface IProps {
  answer: IRequirementAnswer;
  product: IPrefilledResponseProduct;
  existingAnswer: IRequirementAnswer | null;
}

const ProductCheckBoxForm = ({
  answer,
  product,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || answer;
  const question = determinedAnswer.question as ICheckboxQuestion;
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
  const ProductCheckboxSchema = RequirementAnswerSchema.keys({
    question: CheckboxQuestionAnswerSchema.keys({
      answer: Joi.object().keys({
        value: Joi.boolean().required(),
        point: Joi.number().required()
      })
    })
  });

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<IRequirementAnswer>({
    defaultValues: answer,
    resolver: joiResolver(ProductCheckboxSchema)
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
  const checkIfPreferedAlternative = (value: string) => {
    if (value === 'Yes' && question.config.preferedAlternative === true) {
      return <b>Yes</b>;
    } else if (
      value === 'No' &&
      question.config.preferedAlternative === false
    ) {
      return <b>No</b>;
    }
    return <>{value}</>;
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
        <Form.Group>
          <Form.Label>
            <input
              {...register('question.answer.value')}
              type="radio"
              value="true"
              id="true"
              className="m-3"
            />
            {checkIfPreferedAlternative('Yes')}
          </Form.Label>
          <Form.Label>
            <input
              {...register('question.answer.value')}
              type="radio"
              value="false"
              id="false"
              className="m-3"
            />
            {checkIfPreferedAlternative('No')}
          </Form.Label>
        </Form.Group>
        <div className="d-flex justify-content-end">
          {isValueSet(product.id, answer.id) ? (
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
            onClick={() => handleResetQuestion(answer.id, product.id)}
          >
            {t('Reset')}
          </Button>
        </div>
        <ErrorSummary errors={errors} />
      </Form>
    </div>
  );
};

export default ProductCheckBoxForm;
