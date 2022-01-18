import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  ITextQuestion,
  TextQuestionAnswerSchema
} from '../../Nexus/entities/ITextQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addRequirementAnswer } from '../../store/reducers/response-reducer';
import { addProductAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function ITextAnswerForm({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );
  let index: number;

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
      ? (parentAnswer.question as ITextQuestion)
      : (response.requirementAnswers[index].question as ITextQuestion) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as ITextQuestion));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITextQuestion>({
    resolver: joiResolver(TextQuestionAnswerSchema),
    defaultValues: {
      ...defaultVal
    }
  });
  const item = parentAnswer.question as ITextQuestion;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (!selectedResponseProduct && parentAnswer.type === ModelType.product) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ITextQuestion) => {
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
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Text</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            {...register('answer.text')}
            maxLength={item.config.max}
          />
          {/* TODO: This is a terrible hack! .point is not set by defaultValues, and does not even exist in the reducer
          Replace during FormProvider change */}
          <input type="text" {...register('answer.point')} value={0} />

          <Button variant="primary" type="submit">
            {t('save')}
          </Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
