import { joiResolver } from '@hookform/resolvers/joi';
import Slider from '@material-ui/core/Slider';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IOption } from '../../../models/IOption';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../../models/ISliderQuestion';
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

export default function ISliderInfoAnswer({
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

  const defaultVal =
    index === -1
      ? (question as ISliderQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].alternative as ISliderQuestion)) ||
        (type === 'info' &&
          (spec.products[productIndex].requirementAnswers[index]
            .alternative as ISliderQuestion));
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

  const sliderQuestion = question as ISliderQuestion;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ISliderQuestion) => {
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
