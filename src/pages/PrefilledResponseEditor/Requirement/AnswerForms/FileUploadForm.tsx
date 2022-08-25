import Alert from '@mui/material/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../../../Nexus/Joi/CustomJoi';
import ErrorSummary from '../../../../Form/ErrorSummary';
import {
  addAnswer,
  removeAnswer
} from '../../../../store/reducers/PrefilledResponseReducer';
import { AnswerUtils } from '../../Product/AnswerForms/AnswerUtils';
import {
  FileUploadAnswerSchema,
  IFileUploadQuestion
} from '../../../../Nexus/entities/IFileUploadQuestion';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../../Nexus/entities/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

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
        {
          AnswerUtils.getVariantText(
            determinedAnswer.requirement,
            determinedAnswer.variantId
          )[0]
        }
      </h5>
      <h6>
        <small className="text-muted">
          {
            AnswerUtils.getVariantText(
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
              {t('Save')}
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
