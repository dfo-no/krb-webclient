import Alert from '@mui/material/Alert/Alert';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorSummary from '../../Form/ErrorSummary';
import { addRequirementAnswer } from '../../store/reducers/response-reducer';
import { addProductAnswer } from '../../store/reducers/spesification-reducer';
import {
  FileUploadAnswerSchema,
  IFileUploadQuestion
} from '../../Nexus/entities/IFileUploadQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ModelType } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
        <form onSubmit={handleSubmit(saveValues)}>
          <Alert severity="error">Not implemented yet!</Alert>
          <Button variant="primary" disabled type="submit">
            {t('Save')}
          </Button>
          <ErrorSummary errors={errors} />
        </form>
      </Card.Body>
    </Card>
  );
}
