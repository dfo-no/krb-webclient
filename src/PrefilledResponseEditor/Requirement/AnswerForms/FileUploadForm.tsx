import { joiResolver } from '@hookform/resolvers/joi';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomJoi from '../../../common/CustomJoi';
import ErrorSummary from '../../../Form/ErrorSummary';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import {
  FileUploadAnswerSchema,
  IFileUploadQuestion
} from '../../../Nexus/entities/IFileUploadQuestion';
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

const FileUploadSchema = RequirementAnswerSchema.keys({
  question: FileUploadAnswerSchema.keys({
    answer: CustomJoi.object().keys({
      files: CustomJoi.array().items(CustomJoi.string()).min(1).required(),
      point: CustomJoi.number().required()
    })
  })
});

export default function FileUploadForm({
  answer,
  existingAnswer
}: IProps): React.ReactElement {
  const determinedAnswer = existingAnswer || answer;
  const methods = useForm<IRequirementAnswer>({
    defaultValues: determinedAnswer,
    resolver: joiResolver(FileUploadSchema)
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const question = determinedAnswer.question as IFileUploadQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

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
    const reqIndex = prefilledResponse.requirementAnswers.findIndex(
      (e) => e.id === answerId
    );
    if (reqIndex !== -1) {
      value = true;
    }
    return value;
  };

  return (
    <div>
      <h5>
        {
          getVariantText(
            determinedAnswer.requirement,
            determinedAnswer.variantId
          )[0]
        }
      </h5>
      <h6>
        <small className="text-muted">
          {
            getVariantText(
              determinedAnswer.requirement,
              determinedAnswer.variantId
            )[1]
          }
        </small>
      </h6>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} key={question.id}>
          <Alert severity="error">Not implemented yet!</Alert>
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

            <Button type="submit" variant="primary" disabled>
              {t('save')}
            </Button>
            <Button
              variant="primary"
              onClick={() => handleResetQuestion(answer.id)}
              disabled
            >
              {t('Reset')}
            </Button>
          </div>
          <ErrorSummary errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </div>
  );
}
