import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledCheckbox from '../../Form/ControlledCheckbox';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../Nexus/entities/ICheckboxQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function ICheckBoxAnswer({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  let index: number;
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );

  const productIndex = response.products.findIndex(
    (p) => p.id === selectedResponseProduct.id
  );

  if (parentAnswer.type === ModelType.requirement) {
    index = response.requirementAnswers.findIndex(
      (answer) => answer.variantId === parentAnswer.variantId
    );
  } else {
    index =
      response.products.length > 0
        ? response.products[productIndex].requirementAnswers.findIndex(
            (answer) => answer.variantId === parentAnswer.variantId
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (parentAnswer.question as ICheckboxQuestion)
      : (parentAnswer.type === ModelType.requirement &&
          (response.requirementAnswers[index].question as ICheckboxQuestion)) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as ICheckboxQuestion));
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICheckboxQuestion>({
    resolver: joiResolver(CheckboxQuestionAnswerSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ICheckboxQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && selectedResponseProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedResponseProduct.id
        })
      );
  };

  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Yes/No</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(saveValues)}>
          <ControlledCheckbox
            name={`answer.value` as const}
            control={control}
            error={get(errors, `answer.value`) as FieldError}
          />
          {/* TODO: This input is a terrible RHF hack! .point is not set by defaultValues, and does not even exist in the reducer
          Replace during FormProvider change */}
          <input type="text" {...register('answer.point')} value={0} />

          <Button type="submit">{t('save')}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
