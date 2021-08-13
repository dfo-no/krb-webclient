import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { ITextQuestion } from '../../../models/ITextQuestion';
import ModelType from '../../../models/ModelType';
import {
  addAnswer,
  addProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import { TextSchema } from '../../../Workbench/Requirement/RequirementEditor';

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
      ...(parentAnswer.question as ITextQuestion)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === ModelType.product) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ITextQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && productId !== null)
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
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
