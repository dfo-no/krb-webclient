import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomJoi from '../../../common/CustomJoi';
import ErrorSummary from '../../../Form/ErrorSummary';
import CodelistCtrl from '../../../FormProvider/CodelistCtrl';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import {
  CodelistQuestionAnswerSchema,
  ICodelistQuestion
} from '../../../Nexus/entities/ICodelistQuestion';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addAnswer,
  removeAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

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

export const ResponseSingleCodelistSchema = RequirementAnswerSchema.keys({
  question: CodelistQuestionAnswerSchema.keys({
    answer: CustomJoi.object().keys({
      codes: CustomJoi.array().items(CustomJoi.string()).max(1).required(),
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

  return (
    <div>
      <h5>{getVariantText(answer.requirement, answer.variantId)[0]}</h5>
      <h6>
        <small className="text-muted">
          {getVariantText(answer.requirement, answer.variantId)[1]}
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
