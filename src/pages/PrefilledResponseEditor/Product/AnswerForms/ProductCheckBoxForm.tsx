import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import React, { ReactElement } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../../../Nexus/Joi/CustomJoi';
import ErrorSummary from '../../../../Form/ErrorSummary';
import {
  addProductAnswer,
  removeProductAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from './AnswerUtils';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../../../Nexus/entities/ICheckboxQuestion';
import { IPrefilledResponseProduct } from '../../../../Nexus/entities/IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../../Nexus/entities/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
  product: IPrefilledResponseProduct;
}

const ProductCheckBoxForm = ({
  answer,
  existingAnswer,
  product
}: IProps): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || answer;
  const question = determinedAnswer.question as ICheckboxQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  // Override default schema with values set in config.
  const ProductCheckboxSchema = RequirementAnswerSchema.keys({
    question: CheckboxQuestionAnswerSchema.keys({
      answer: CustomJoi.object().keys({
        value: CustomJoi.boolean().required(),
        point: CustomJoi.number().required()
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

  const onSubmit = (post: IRequirementAnswer): void => {
    dispatch(addProductAnswer({ answer: post, productId: product.id }));
  };

  const handleResetQuestion = (elemId: string, productId: string): void => {
    dispatch(removeProductAnswer({ answerId: elemId, productId }));
  };

  const checkIfPreferedAlternative = (value: string): ReactElement => {
    if (value === 'Yes' && question.config.preferedAlternative) {
      return <b>Yes</b>;
    } else if (value === 'No' && !question.config.preferedAlternative) {
      return <b>No</b>;
    }
    return <>{value}</>;
  };

  return (
    <div>
      <h5>
        {AnswerUtils.getVariantText(answer.requirement, answer.variantId)[0]}
      </h5>
      <h6>
        <small className="text-muted">
          {AnswerUtils.getVariantText(answer.requirement, answer.variantId)[1]}
        </small>
      </h6>
      <form
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
          {AnswerUtils.isValueSet(product.id, answer.id, prefilledResponse) ? (
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
            onClick={() => handleResetQuestion(answer.id, product.id)}
          >
            {t('Reset')}
          </Button>
        </div>
        <ErrorSummary errors={errors} />
      </form>
    </div>
  );
};

export default ProductCheckBoxForm;
