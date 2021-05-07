import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { IValueAlternative } from '../../../models/IValueAlternative';
import { RequirementAnswer } from '../../../models/RequirementAnswer';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import InputRow from '../../../Form/InputRow';
import ErrorSummary from '../../../Form/ErrorSummary';

const valueSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('value').required(),
  step: Joi.number().min(0).max(1000000000).required(),
  min: Joi.number().min(0).max(1000000000).required(),
  max: Joi.number().min(0).max(1000000000).required(),
  unit: Joi.string().required()
});

interface IProps {
  parentAnswer: RequirementAnswer;
}

type FormValues = {
  id: string;
  type: string;
  max: number;
  min: number;
  step: number;
  unit: string;
};

export default function ValueForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: joiResolver(valueSchema),
    defaultValues: {
      ...(parentAnswer.alternative as IValueAlternative)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as IValueAlternative;
  const dispatch = useDispatch();

  if (!productId && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: FormValues) => {
    const newAlt = {
      ...item
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAlt.max = post.max;
    newAlt.min = post.min;
    newAlt.step = post.step;
    newAlt.unit = post.unit;
    newAnswer.alternative = newAlt;

    if (newAnswer.type === 'requirement')
      dispatch(editAnswer({ answer: newAnswer }));
    if (newAnswer.type === 'product' && productId !== null)
      dispatch(editProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            type="hidden"
            {...register('id')}
            isInvalid={!!errors.id}
          />

          <Form.Control
            as="input"
            type="hidden"
            {...register('type')}
            isInvalid={!!errors.type}
          />
          <InputRow
            control={control}
            errors={errors}
            name="min"
            label="Minimum"
            type="number"
          />

          <InputRow
            control={control}
            errors={errors}
            name="max"
            label="Maximum"
            type="number"
          />

          <InputRow
            control={control}
            errors={errors}
            name="step"
            label="Step"
            type="number"
          />
          <InputRow
            control={control}
            errors={errors}
            name="unit"
            label="Unit"
            type="number"
          />
          <Button type="submit"> Save</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
