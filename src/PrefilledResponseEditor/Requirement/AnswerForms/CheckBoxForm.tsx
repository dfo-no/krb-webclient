import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomJoi from '../../../common/CustomJoi';
import ErrorSummary from '../../../Form/ErrorSummary';
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
  addAnswer,
  removeAnswer
} from '../../../store/reducers/PrefilledResponseReducer';

interface IProps {
  answer: IRequirementAnswer;
  existingAnswer: IRequirementAnswer | null;
}

export default function CheckBoxForm({
  answer,
  existingAnswer
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const determinedAnswer = existingAnswer || answer;
  const question = determinedAnswer.question as ICheckboxQuestion;
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

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

  // Override default schema with values set in config.
  const CheckboxSchema = RequirementAnswerSchema.keys({
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
    defaultValues: determinedAnswer,
    resolver: joiResolver(CheckboxSchema)
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
          {isValueSet(determinedAnswer.id) ? (
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
            onClick={() => handleResetQuestion(determinedAnswer.id)}
          >
            {t('Reset')}
          </Button>
        </div>
      </form>
      <ErrorSummary errors={errors} />
    </div>
  );
}
