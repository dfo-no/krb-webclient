import { joiResolver } from '@hookform/resolvers/joi';
import { has, toPath } from 'lodash';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  ITextQuestion,
  TextQuestionSchema
} from '../../Nexus/entities/ITextQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function TextForm({ parentAnswer }: IProps): React.ReactElement {
  const { register, handleSubmit, formState } = useForm<ITextQuestion>({
    resolver: joiResolver(TextQuestionSchema),
    defaultValues: {
      ...(parentAnswer.question as ITextQuestion)
    }
  });
  const { errors } = formState;
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();

  if (
    !selectedSpecificationProduct &&
    parentAnswer.type === ModelType.product
  ) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ITextQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  const hasError = (str: string) => {
    let retVal = null;
    const path = toPath(str);
    if (has(errors, path)) {
      retVal = true;
    } else {
      retVal = false;
    }
    return retVal;
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Text</h6>
        <form onSubmit={handleSubmit(saveValues)}>
          <Form.Label>Maks lengde</Form.Label>
          <Form.Control
            as="input"
            disabled
            {...register('config.max')}
            isInvalid={!!hasError('config.max')}
            type="number"
          />

          <ErrorSummary errors={errors} />
        </form>
      </Card.Body>
    </Card>
  );
}
