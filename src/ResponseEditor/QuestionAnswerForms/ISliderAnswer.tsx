import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledSlider from '../../Form/ControlledSlider';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  ISliderQuestion,
  SliderQuestionAnswerSchema
} from '../../Nexus/entities/ISliderQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function ISliderAnswer({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );
  let index: number;

  const question = parentAnswer.question as ISliderQuestion;

  const ResponseSliderSchema = RequirementAnswerSchema.keys({
    question: SliderQuestionAnswerSchema.keys({
      answer: Joi.object().keys({
        value: Joi.number()
          .min(question.config.min)
          .max(question.config.max)
          .required(),
        point: Joi.number().required()
      })
    })
  });

  const productIndex = response.products.findIndex(
    (p) => p.id === selectedResponseProduct.id
  );

  if (parentAnswer.type === ModelType.requirement) {
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

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IRequirementAnswer>({
    resolver: joiResolver(ResponseSliderSchema),
    defaultValues: parentAnswer
  });

  const sliderQuestion = parentAnswer.question as ISliderQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const saveValues = (post: IRequirementAnswer) => {
    if (post.type === ModelType.requirement)
      dispatch(addRequirementAnswer(post));
    if (post.type === ModelType.product && selectedResponseProduct)
      dispatch(
        addProductAnswer({
          answer: post,
          productId: selectedResponseProduct.id
        })
      );
  };

  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Slider</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Row className="w-50 m-3">
            <ControlledSlider
              min={sliderQuestion.config.min}
              max={sliderQuestion.config.max}
              unit={sliderQuestion.config.unit}
              step={sliderQuestion.config.step}
              marks={[]}
              control={control}
              name={`question.answer.value` as const}
              error={get(errors, `answer.value`) as FieldError}
            />
          </Row>
          <Button type="submit">{t('save')}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
