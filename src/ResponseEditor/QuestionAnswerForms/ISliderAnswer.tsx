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
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const ResponseSliderSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_SLIDER).required(),
  config: Joi.object().keys({
    step: Joi.number().min(0).max(1000000000).required(),
    min: Joi.number().min(0).max(1000000000).required(),
    max: Joi.number().min(0).max(1000000000).required(),
    unit: Joi.string().disallow(null, '').required()
  }),
  answer: Joi.object().keys({
    value: Joi.number().min(0).max(1000000000).required()
  })
});

export default function ISliderAnswer({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );
  let index: number;

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

  const defaultVal =
    index === -1
      ? (parentAnswer.question as ISliderQuestion)
      : (parentAnswer.type === ModelType.requirement &&
          (response.requirementAnswers[index].question as ISliderQuestion)) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as ISliderQuestion));
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ISliderQuestion>({
    resolver: joiResolver(ResponseSliderSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const sliderQuestion = parentAnswer.question as ISliderQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const saveValues = (post: ISliderQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && selectedResponseProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
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
              name="answer.value"
              error={get(errors, `answer.value`) as FieldError}
            />
          </Row>
          <Button type="submit">{t('save')}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
