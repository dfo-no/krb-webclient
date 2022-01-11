import { joiResolver } from '@hookform/resolvers/joi';
import Alert from '@mui/material/Alert/Alert';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  FileUploadAnswerSchema,
  IFileUploadQuestion
} from '../../Nexus/entities/IFileUploadQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addRequirementAnswer } from '../../store/reducers/response-reducer';
import { addProductAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function FileUploadAnswerForm({
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
      ? (parentAnswer.question as IFileUploadQuestion)
      : (response.requirementAnswers[index].question as IFileUploadQuestion) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as IFileUploadQuestion));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFileUploadQuestion>({
    resolver: joiResolver(FileUploadAnswerSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (!selectedResponseProduct && parentAnswer.type === ModelType.product) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: IFileUploadQuestion) => {
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
        <h6>Alternative: FileUpload</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Alert severity="error">Not implemented yet!</Alert>
          {/* TODO: This is a terrible hack! .point is not set by defaultValues, and does not even exist in the reducer
          Replace during FormProvider change */}
          <input type="hidden" {...register('answer.point')} value={0} />

          <Button disabled type="submit">
            {t('save')}
          </Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
