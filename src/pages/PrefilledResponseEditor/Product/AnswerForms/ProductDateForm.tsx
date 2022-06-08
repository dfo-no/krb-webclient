import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DateCtrl from '../../../../FormProvider/DateCtrl';
import {
  addProductAnswer,
  removeProductAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from './AnswerUtils';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IPrefilledResponseProduct } from '../../../../models/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
  product: IPrefilledResponseProduct;
}

export default function ProductDateForm({
  answer,
  existingAnswer,
  product
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

  const onSubmit = (post: IRequirementAnswer): void => {
    dispatch(addProductAnswer({ answer: post, productId: product.id }));
  };

  const handleResetQuestion = (elemId: string, productId: string): void => {
    dispatch(removeProductAnswer({ answerId: elemId, productId }));
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
      </form>
    </div>
  );
}
