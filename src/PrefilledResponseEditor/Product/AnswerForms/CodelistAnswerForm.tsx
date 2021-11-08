import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../../Form/ErrorSummary';
import { ICodelistQuestion } from '../../../models/ICodelistQuestion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { PrefilledResponseProduct } from '../../../models/PrefilledResponseProduct';
import QuestionEnum from '../../../models/QuestionEnum';
import { Requirement } from '../../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProductAnswer,
  removeProductAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

interface IProps {
  answer: IRequirementAnswer;
  product: PrefilledResponseProduct;
}
export const ResponseCodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  }),
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string()).min(1).required()
  })
});
export const ResponseSingleCodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  }),
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string()).max(1).required()
  })
});
export default function ProductCodelistAnswer({
  answer,
  product
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const question = answer.question as ICodelistQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const resolver = question.config.multipleSelect
    ? ResponseCodelistSchema
    : ResponseSingleCodelistSchema;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRequirementAnswer>({
    resolver: joiResolver(resolver),
    defaultValues: answer
  });

  const onSubmit = (post: IRequirementAnswer) => {
    dispatch(addProductAnswer({ answer: post, productId: product.id }));
  };

  const handleResetQuestion = (elemId: string, productId: string) => {
    dispatch(removeProductAnswer({ answerId: elemId, productId }));
  };

  const getVariantText = (requirement: Requirement, variantId: string) => {
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
  const codelistIndex = prefilledResponse.bank.codelist.findIndex(
    (list) => list.id === question.config.codelist
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

  const codelist = prefilledResponse.bank.codelist[codelistIndex];
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
        <Form.Control
          as="select"
          multiple
          {...register(`question.answer.codes` as const)}
        >
          {codelist.codes.map((element) => (
            <option key={element.id} value={element.id}>
              {element.title}
            </option>
          ))}
        </Form.Control>
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
        <ErrorSummary errors={get(errors, `question.answer.value`)} />
      </Form>
    </div>
  );
}
