import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
import Joi from 'joi';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { addReqAns } from '../../store/reducers/response-reducer';
import { RootState } from '../../store/store';
import ErrorSummary from '../../Form/ErrorSummary';
import QuestionEnum from '../../models/QuestionEnum';

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
    unit: Joi.string().required()
  }),
  answer: Joi.object().keys({
    value: Joi.number().min(0).max(1000000000).required()
  })
});

export default function ISliderAnswer({ parentAnswer }: IProps): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const index = response.requirementAnswers.findIndex(
    (answer) => answer.reqTextId === parentAnswer.reqTextId
  );
  const defaultVal =
    index === -1
      ? (parentAnswer.alternative as ISliderQuestion)
      : (response.requirementAnswers[index].alternative as ISliderQuestion);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ISliderQuestion>({
    resolver: joiResolver(ResponseSliderSchema),
    defaultValues: {
      ...defaultVal
    }
  });
  const sliderQuestion = parentAnswer.alternative as ISliderQuestion;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const saveValues = (post: ISliderQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.alternative = post;
    dispatch(addReqAns(newAnswer));
  };

  const marks = [
    {
      value: sliderQuestion.config.min,
      label: `${sliderQuestion.config.min} ${sliderQuestion.config.unit}`
    },
    {
      value: sliderQuestion.config.max,
      label: `${sliderQuestion.config.max} ${sliderQuestion.config.unit}`
    }
  ];

  function valuetext(input: number) {
    return `${input}${sliderQuestion.config.unit}`;
  }
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
            render={({ field }) => (
              <Slider
                className=""
                {...field}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={sliderQuestion.config.step}
                min={sliderQuestion.config.min}
                max={sliderQuestion.config.max}
                marks={marks}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                valueLabelDisplay="auto"
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
