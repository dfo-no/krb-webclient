import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CodelistCtrl from '../../../../FormProvider/CodelistCtrl';
import CustomJoi from '../../../../Nexus/Joi/CustomJoi';
import ErrorSummary from '../../../../Form/ErrorSummary';
import {
  addAnswer,
  removeAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from '../../Product/AnswerForms/AnswerUtils';
import {
  CodelistQuestionAnswerSchema,
  ICodelistQuestion
} from '../../../../Nexus/entities/ICodelistQuestion';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../../Nexus/entities/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
}
export const ResponseCodelistSchema = RequirementAnswerSchema.keys({
  question: CodelistQuestionAnswerSchema.keys({
    answer: CustomJoi.object().keys({
      codes: CustomJoi.array().items(CustomJoi.string()).min(1).required(),
      point: CustomJoi.number().required()
    })
  })
});

export default function CodelistForm({
  answer,
  existingAnswer
}: IProps): React.ReactElement {
  const determinedAnswer = existingAnswer || answer;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const question = determinedAnswer.question as ICodelistQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const methods = useForm<IRequirementAnswer>({
    resolver: joiResolver(ResponseCodelistSchema),
    defaultValues: determinedAnswer
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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          key={question.id}
          className="mt-4"
        >
          <CodelistCtrl
            name="question.answer.codes"
            codelists={prefilledResponse.bank.codelist}
          />
          <div className="d-flex justify-content-end">
            {isValueSet(answer.id) ? (
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
              onClick={() => handleResetQuestion(answer.id)}
            >
              {t('Reset')}
            </Button>
          </div>
        </form>
        <ErrorSummary errors={methods.formState.errors} />
      </FormProvider>
    </div>
  );
}
