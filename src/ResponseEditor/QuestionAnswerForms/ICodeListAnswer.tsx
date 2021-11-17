import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import QuestionEnum from '../../models/QuestionEnum';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
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
export default function ICodelistAnswer({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  let index: number;
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );
  const productIndex = response.products.findIndex(
    (p) => p.id === selectedResponseProduct.id
  );
  const item = parentAnswer.question as ICodelistQuestion;

  if (parentAnswer.type === 'requirement') {
    index = response.requirementAnswers.findIndex(
      (answer) => answer.variantId === parentAnswer.variantId
    );
  } else {
    index =
      response.products.length > 0
        ? response.products[productIndex].requirementAnswers.findIndex(
            (answer) => answer.variantId === parentAnswer.variantId
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (parentAnswer.question as ICodelistQuestion)
      : (parentAnswer.type === 'requirement' &&
          (response.requirementAnswers[index].question as ICodelistQuestion)) ||
        (parentAnswer.type === 'product' &&
          (response.products[0].requirementAnswers[index]
            .question as ICodelistQuestion));
  const resolver = item.config.multipleSelect
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const saveValues = (post: ICodelistQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;
    if (newAnswer.type === 'requirement')
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === 'product' && selectedResponseProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedResponseProduct.id
        })
      );
  };

  const codelistIndex = response.spesification.bank.codelist.findIndex(
    (list) => list.id === item.config.codelist
  );

  const codelist = response.spesification.bank.codelist[codelistIndex];
  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Codelist</h6>
      </Card.Header>
      <Card.Body>
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
          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
