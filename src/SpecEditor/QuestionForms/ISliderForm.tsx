import { joiResolver } from '@hookform/resolvers/joi';
import { has, toPath } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import {
  ISliderQuestion,
  SliderQuestionSchema
} from '../../models/ISliderQuestion';
import ModelType from '../../models/ModelType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function ValueForm({
  parentAnswer
}: IProps): React.ReactElement {
  const { register, handleSubmit, formState } = useForm<ISliderQuestion>({
    resolver: joiResolver(SliderQuestionSchema),
    defaultValues: {
      ...(parentAnswer.question as ISliderQuestion)
    }
  });

  const { errors } = formState;
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (
    !selectedSpecificationProduct &&
    parentAnswer.type === ModelType.product
  ) {
    return <p>No product selected</p>;
  }

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

  const saveValues = (post: ISliderQuestion) => {
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

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            {...register('config.min')}
            isInvalid={hasError('config.min')}
            type="number"
          />

          <Form.Control
            as="input"
            {...register('config.max')}
            isInvalid={hasError('config.max')}
            type="number"
          />

          <Form.Control
            as="input"
            {...register('config.step')}
            isInvalid={hasError('config.step')}
            type="number"
          />

          <Form.Control
            as="input"
            {...register('config.unit')}
            isInvalid={hasError('config.unit')}
          />

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
