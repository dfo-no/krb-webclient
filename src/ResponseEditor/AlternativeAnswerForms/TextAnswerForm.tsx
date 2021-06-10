import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { RootState } from '../../store/store';
import { ITextQuestion } from '../../models/ITextQuestion';
import ErrorSummary from '../../Form/ErrorSummary';
import { addRequirementAnswer } from '../../store/reducers/response-reducer';
import QuestionEnum from '../../models/QuestionEnum';
import { addProductAnswer } from '../../store/reducers/spesification-reducer';
import ModelType from '../../models/ModelType';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const ResponseTextSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_TEXT).required(),
  config: Joi.object().keys({
    max: Joi.number().required().min(0)
  }),
  answer: Joi.object().keys({
    text: Joi.string().disallow(null, '').required()
  })
});

export default function ITextAnswer({ parentAnswer }: IProps): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const { productId } = useSelector(
    (state: RootState) => state.selectedResponseProduct
  );
  let index: number;

  const productIndex = response.products.findIndex((p) => p.id === productId);

  if (parentAnswer.type === ModelType.requirement) {
    index = response.requirementAnswers.findIndex(
      (answer) => answer.reqTextId === parentAnswer.reqTextId
    );
  } else {
    index =
      response.products.length > 0
        ? response.products[productIndex].requirementAnswers.findIndex(
            (answer) => answer.reqTextId === parentAnswer.reqTextId
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (parentAnswer.alternative as ITextQuestion)
      : (response.requirementAnswers[index].alternative as ITextQuestion) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .alternative as ITextQuestion));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITextQuestion>({
    resolver: joiResolver(ResponseTextSchema),
    defaultValues: {
      ...defaultVal
    }
  });
  const item = parentAnswer.alternative as ITextQuestion;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === ModelType.product) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ITextQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.alternative = post;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
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
            type="hidden"
            {...register('config.max')}
            isInvalid={!!errors.config?.max}
          />
          <Form.Control
            as="input"
            {...register('answer.text')}
            maxLength={item.config.max}
          />

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
