import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import { ITextQuestion } from '../../../models/ITextQuestion';
import ErrorSummary from '../../../Form/ErrorSummary';
import { TextSchema } from '../../../Workbench/Requirement/RequirementEditor';
import ModelType from '../../../models/ModelType';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function TextForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITextQuestion>({
    resolver: joiResolver(TextSchema),
    defaultValues: {
      ...(parentAnswer.alternative as ITextQuestion)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as ITextQuestion;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === ModelType.product) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ITextQuestion) => {
    const newAlt = {
      ...item
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAlt.config.max = post.config.max;
    newAnswer.alternative = newAlt;

    if (newAnswer.type === ModelType.requirement)
      dispatch(editAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && productId !== null)
      dispatch(editProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Text</h6>
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
          <Form.Control
            as="input"
            {...register('config.max')}
            isInvalid={!!errors.config?.max}
            type="number"
          />

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
