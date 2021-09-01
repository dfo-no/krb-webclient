import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ITextQuestion } from '../../models/ITextQuestion';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { Requirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: Requirement;
}

export const ResponseCodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_TEXT).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  }),
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string()).required()
  })
});

export default function TextInfoAnswer({
  question,
  type,
  reqTextId,
  requirement
}: IProps): ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  let index: number;

  const productIndex = spec.products.findIndex(
    (p) => p.id === selectedSpecificationProduct.id
  );

  if (type === 'requirement') {
    index = spec.requirementAnswers.findIndex(
      (answer: IRequirementAnswer) => answer.question.id === question.id
    );
  } else {
    index =
      spec.products.length > 0
        ? spec.products[productIndex].requirementAnswers.findIndex(
            (answer: IRequirementAnswer) => answer.question.id === question.id
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (question as ITextQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].question as ITextQuestion)) ||
        (type === 'info' &&
          (spec.products[productIndex].requirementAnswers[index]
            .question as ITextQuestion));
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITextQuestion>({
    resolver: joiResolver(ResponseCodelistSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const textQuestion = question as ITextQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ITextQuestion) => {
    if (index === -1) {
      const newAnswer: IRequirementAnswer = {
        id: uuidv4(),
        questionId: post.id,
        weight: 1,
        variantId: reqTextId,
        requirement,
        question: post,
        type: ModelType.requirement
      };
      dispatch(addAnswer({ answer: newAnswer }));
    } else {
      const answer = spec.requirementAnswers[index];
      answer.question = post;
      dispatch(addAnswer({ answer }));
    }
  };
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Text</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            {...register('answer.text')}
            maxLength={textQuestion.config.max}
          />

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
