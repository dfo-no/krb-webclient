import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { ISliderQuestion } from '../../../models/ISliderQuestion';
import { RequirementAnswer } from '../../../models/RequirementAnswer';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import InputRow from '../../../Form/InputRow';
import ErrorSummary from '../../../Form/ErrorSummary';
import { SliderSchema } from '../../../Workbench/Requirement/RequirementEditor';

interface IProps {
  parentAnswer: RequirementAnswer;
}

export default function ValueForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ISliderQuestion>({
    resolver: joiResolver(SliderSchema),
    defaultValues: {
      ...(parentAnswer.alternative as ISliderQuestion)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as ISliderQuestion;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ISliderQuestion) => {
    const newAlt = {
      ...item
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAlt.config.max = post.config.max;
    newAlt.config.min = post.config.min;
    newAlt.config.step = post.config.step;
    newAlt.config.unit = post.config.unit;
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
          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
