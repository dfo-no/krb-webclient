import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DateCtrl from '../../../FormProvider/DateCtrl';
import { IPrefilledResponseProduct } from '../../../models/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../../Nexus/entities/IPeriodDateQuestion';
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

export default function ProductDateForm({
  answer,
  product,
  existingAnswer
}: IProps): React.ReactElement {
  const methods = useForm<IRequirementAnswer>({
    resolver: joiResolver(PeriodDateAnswerSchema),
    defaultValues: answer
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const determinedAnswer = existingAnswer || answer;

  const question = determinedAnswer.question as IPeriodDateQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

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

  return (
    <div>
      <h5>{getVariantText(answer.requirement, answer.variantId)[0]}</h5>
      <h6>
        <small className="text-muted">
          {getVariantText(answer.requirement, answer.variantId)[1]}
        </small>
      </h6>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        key={question.id}
        className="mt-4"
      >
        {!question.config.isPeriod && (
          <Form.Label>Select a date within the boundaries</Form.Label>
        )}

        <Col sm="2">
          <DateCtrl name={`question.answer.fromDate` as const} />
        </Col>
        {question.config.isPeriod && (
          <Col sm="2">
            <DateCtrl name={`question.answer.toDate` as const} />
          </Col>
        )}
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
      </form>
    </div>
  );
}
