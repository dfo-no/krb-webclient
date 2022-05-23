import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import CustomJoi from '../../common/CustomJoi';
import ErrorSummary from '../../Form/ErrorSummary';
import QuestionVariant from '../../models/QuestionVariant';
import SliderSelect from '../../components/SliderSelect';
import { addAnswer } from '../../store/reducers/spesification-reducer';
import { IMark } from '../../Nexus/entities/IMark';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { ModelType } from '../../enums';
import { QuestionType } from '../../models/QuestionType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
}

export const ResponseSliderSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  type: CustomJoi.string().equal(QuestionVariant.Q_SLIDER).required(),
  config: CustomJoi.object().keys({
    step: CustomJoi.number().min(0).max(1000000000).required(),
    min: CustomJoi.number().min(0).max(1000000000).required(),
    max: CustomJoi.number().min(0).max(1000000000).required(),
    unit: CustomJoi.string().disallow(null, '').required()
  }),
  answer: CustomJoi.object().keys({
    value: CustomJoi.number().min(0).max(1000000000).required()
  })
});

export default function ISliderInfoAnswer({
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
      ? (question as ISliderQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].question as ISliderQuestion)) ||
        (spec.products[productIndex].requirementAnswers[index]
          .question as ISliderQuestion);
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

  const sliderQuestion = question as ISliderQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ISliderQuestion) => {
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

  const marks: IMark[] = [
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
    <Col className="p-0 m-0 w-50">
      <p>Hvor langt unna kan lokalsjonen være? </p>
      <form className="mt-3" onSubmit={handleSubmit(saveValues)}>
        <SliderSelect
          label=""
          control={control}
          errors={errors}
          name={`answer.value` as const}
          step={sliderQuestion.config.step}
          min={sliderQuestion.config.min}
          max={sliderQuestion.config.max}
          marks={marks}
          key={sliderQuestion.id}
        />

        <Button variant="primary" type="submit">
          {t('Save')}
        </Button>
        <ErrorSummary errors={errors} />
      </form>
    </Col>
  );
}
