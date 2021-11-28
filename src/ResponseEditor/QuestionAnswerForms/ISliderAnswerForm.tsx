import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledSlider from '../../Form/ControlledSlider';
import ErrorSummary from '../../Form/ErrorSummary';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function ISliderAnswerForm({
  parentAnswer
}: IProps): React.ReactElement {
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<IRequirementAnswer>({
    resolver: joiResolver(RequirementAnswerSchema),
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
              error={get(errors, `question.answer.value`) as FieldError}
            />
          </Row>
          {/* TODO: This is a terrible hack! .point is not set by defaultValues, and does not even exist in the reducer
          Replace during FormProvider change */}
          <input type="text" {...register('question.answer.point')} value={0} />

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
