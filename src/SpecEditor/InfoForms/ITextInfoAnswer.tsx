import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import CustomJoi from '../../common/CustomJoi';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
}

export const ResponseCodelistSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  type: CustomJoi.string().equal(QuestionEnum.Q_TEXT).required(),
  config: CustomJoi.object().keys({
    codelist: CustomJoi.string().required(),
    multipleSelect: CustomJoi.boolean().required()
  }),
  answer: CustomJoi.object().keys({
    codes: CustomJoi.array().items(CustomJoi.string()).required()
  })
});

export default function TextInfoAnswer({
  question,
  type,
  reqTextId,
  requirement
}: IProps): React.ReactElement {
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
        <form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            {...register('answer.text')}
            maxLength={textQuestion.config.max}
          />

          <Button variant="primary" type="submit">
            {t('save')}
          </Button>
          <ErrorSummary errors={errors} />
        </form>
      </Card.Body>
    </Card>
  );
}
