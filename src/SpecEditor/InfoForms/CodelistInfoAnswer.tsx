import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { IRequirement } from '../../models/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
}

export const ResponseCodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  }),
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string()).min(1).required()
  })
});
export const ResponseSingleCodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  }),
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string()).max(1).required()
  })
});

export default function CodelistInfoAnswer({
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

  const setDefaultVal = () => {
    if (index === -1) return question as ICodelistQuestion;
    if (type === 'requirement')
      return spec.requirementAnswers[index].question as ICodelistQuestion;
    return spec.products[productIndex].requirementAnswers[index]
      .question as ICodelistQuestion;
  };

  const defaultVal: ICodelistQuestion = setDefaultVal();

  const resolver = defaultVal.config.multipleSelect
    ? ResponseCodelistSchema
    : ResponseSingleCodelistSchema;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICodelistQuestion>({
    resolver: joiResolver(resolver),
    defaultValues: {
      ...defaultVal
    }
  });

  const codelistQuestion = question as ICodelistQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ICodelistQuestion) => {
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
  const codelistIndex = spec.bank.codelist.findIndex(
    (list) => list.id === codelistQuestion.config.codelist
  );

  const codelist = spec.bank.codelist[codelistIndex];
  return (
    <Col className="p-0 m-0 w-50">
      <p>Hvilke koder skal kreves? </p>
      <Form onSubmit={handleSubmit(saveValues)}>
        <Form.Control
          as="select"
          multiple
          {...register(`answer.codes` as const)}
        >
          {codelist.codes.map((element) => (
            <option key={element.id} value={element.id}>
              {element.title}
            </option>
          ))}
        </Form.Control>
        <Button className="mt-2" type="submit">
          {t('save')}
        </Button>
        <ErrorSummary errors={errors} />
      </Form>
    </Col>
  );
}
