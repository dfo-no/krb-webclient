import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { get } from 'lodash';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../../../common/CustomJoi';
import ErrorSummary from '../../../../Form/ErrorSummary';
import {
  addProductAnswer,
  removeProductAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from './AnswerUtils';
import {
  CodelistQuestionAnswerSchema,
  ICodelistQuestion
} from '../../../../Nexus/entities/ICodelistQuestion';
import { IPrefilledResponseProduct } from '../../../../models/IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
  product: IPrefilledResponseProduct;
}
export const ResponseCodelistSchema = RequirementAnswerSchema.keys({
  question: CodelistQuestionAnswerSchema.keys({
    answer: CustomJoi.object().keys({
      codes: CustomJoi.array().items(CustomJoi.string()).min(1).required()
    })
  })
});

export const ResponseSingleCodelistSchema = RequirementAnswerSchema.keys({
  question: CodelistQuestionAnswerSchema.keys({
    answer: CustomJoi.object().keys({
      codes: CustomJoi.array().items(CustomJoi.string()).max(1).required()
    })
  })
});

export default function ProductCodelistForm({
  answer,
  existingAnswer,
  product
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || answer;
  const question = determinedAnswer.question as ICodelistQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRequirementAnswer>({
    resolver: joiResolver(ResponseCodelistSchema),
    defaultValues: answer
  });

  const onSubmit = (post: IRequirementAnswer): void => {
    dispatch(addProductAnswer({ answer: post, productId: product.id }));
  };

  const handleResetQuestion = (elemId: string, productId: string): void => {
    dispatch(removeProductAnswer({ answerId: elemId, productId }));
  };

  const codelistIndex = prefilledResponse.bank.codelist.findIndex(
    (list) => list.id === question.config.codelist
  );

  const codelist = prefilledResponse.bank.codelist[codelistIndex];

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
        <ErrorSummary errors={get(errors, `question.answer.value`)} />
      </form>
    </div>
  );
}
