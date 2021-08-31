import { joiResolver } from '@hookform/resolvers/joi';
import Slider from '@material-ui/core/Slider';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { IOption } from '../../models/IOption';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
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

export default function ISliderAnswer({ parentAnswer }: IProps): ReactElement {
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
    register,
    control,
    handleSubmit,
    getValues,
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

  const marks: IOption[] = [
    {
      value: sliderQuestion.config.min,
      label: `${sliderQuestion.config.min} ${sliderQuestion.config.unit}`
    },
    {
      value: sliderQuestion.config.max,
      label: `${sliderQuestion.config.max} ${sliderQuestion.config.unit}`
    }
  ];

  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Slider</h6>
      </Card.Header>
      <Card.Body>
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
            {...register('config.min')}
            isInvalid={!!errors.config?.min}
          />
          <Form.Control
            as="input"
            type="hidden"
            {...register('config.max')}
            isInvalid={!!errors.config?.max}
          />
          <Form.Control
            as="input"
            type="hidden"
            {...register('config.step')}
            isInvalid={!!errors.config?.step}
          />
          <Form.Control
            as="input"
            type="hidden"
            {...register('config.unit')}
            isInvalid={!!errors.config?.unit}
          />
          <Controller
            control={control}
            name={`answer.value` as const}
            defaultValue={
              getValues(`answer.value` as const) ? (`answer.value` as const) : 0
            }
            render={({ field }) => (
              <Slider
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                step={sliderQuestion.config.step}
                min={sliderQuestion.config.min}
                max={sliderQuestion.config.max}
                marks={marks}
              />
            )}
          />
          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
