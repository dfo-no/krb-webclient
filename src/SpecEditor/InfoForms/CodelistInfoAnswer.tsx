import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomJoi from '../../common/CustomJoi';
import ErrorSummary from '../../Form/ErrorSummary';
import ModelType from '../../models/ModelType';
import QuestionVariant from '../../models/QuestionVariant';
import { addAnswer } from '../../store/reducers/spesification-reducer';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { QuestionType } from '../../models/QuestionType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
}

export const ResponseCodelistSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  type: CustomJoi.string().equal(QuestionVariant.Q_CODELIST).required(),
  config: CustomJoi.object().keys({
    codelist: CustomJoi.string().required(),
    multipleSelect: CustomJoi.boolean().required()
  }),
  answer: CustomJoi.object().keys({
    codes: CustomJoi.array().items(CustomJoi.string()).min(1).required()
  })
});
export const ResponseSingleCodelistSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  type: CustomJoi.string().equal(QuestionVariant.Q_CODELIST).required(),
  config: CustomJoi.object().keys({
    codelist: CustomJoi.string().required(),
    multipleSelect: CustomJoi.boolean().required()
  }),
  answer: CustomJoi.object().keys({
    codes: CustomJoi.array().items(CustomJoi.string()).max(1).required()
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICodelistQuestion>({
    resolver: joiResolver(ResponseCodelistSchema),
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
      <form onSubmit={handleSubmit(saveValues)}>
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
        <Button variant="primary" type="submit">
          {t('Save')}
        </Button>
        <ErrorSummary errors={errors} />
      </form>
    </Col>
  );
}
