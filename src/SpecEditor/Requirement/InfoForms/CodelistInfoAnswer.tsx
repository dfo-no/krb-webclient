import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../../Form/ErrorSummary';
import { ICodelistQuestion } from '../../../models/ICodelistQuestion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import ModelType from '../../../models/ModelType';
import QuestionEnum from '../../../models/QuestionEnum';
import { QuestionType } from '../../../models/QuestionType';
import { addAnswer } from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
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
  reqTextId
}: IProps): ReactElement {
  const { spec } = useSelector((state: RootState) => state.specification);
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  let index: number;

  const productIndex = spec.products.findIndex((p) => p.id === productId);

  if (type === 'requirement') {
    index = spec.requirementAnswers.findIndex(
      (answer: IRequirementAnswer) => answer.alternative.id === question.id
    );
  } else {
    index =
      spec.products.length > 0
        ? spec.products[productIndex].requirementAnswers.findIndex(
            (answer: IRequirementAnswer) =>
              answer.alternative.id === question.id
          )
        : -1;
  }

  const setDefaultVal = () => {
    if (index === -1) return question as ICodelistQuestion;
    if (type === 'requirement')
      return spec.requirementAnswers[index].alternative as ICodelistQuestion;
    return spec.products[productIndex].requirementAnswers[index]
      .alternative as ICodelistQuestion;
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

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ICodelistQuestion) => {
    if (index === -1) {
      const newAnswer: IRequirementAnswer = {
        id: uuidv4(),
        alternativeId: post.id,
        weight: 1,
        reqTextId,
        alternative: post,
        type: ModelType.requirement
      };
      dispatch(addAnswer({ answer: newAnswer }));
    } else {
      const answer = spec.requirementAnswers[index];
      answer.alternative = post;
      dispatch(addAnswer({ answer }));
    }
  };
  const codelistIndex = spec.bank.codelist.findIndex(
    (list) => list.id === codelistQuestion.config.codelist
  );

  const codelist = spec.bank.codelist[codelistIndex];
  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Codelist</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control as="input" type="hidden" {...register('id')} />
          <Form.Control as="input" type="hidden" {...register('type')} />
          <Form.Control type="hidden" {...register('config.codelist')} />
          <Form.Control
            type="hidden"
            {...register(`config.multipleSelect` as const)}
          />
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
          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
