import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { get } from 'lodash';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import ControlledSlider from '../../Form/ControlledSlider';
import ErrorSummary from '../../Form/ErrorSummary';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { ModelType } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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

  // if step amount is greater than 10, slider is converted to inputfield
  const stepAmount =
    (sliderQuestion.config.max - sliderQuestion.config.min) /
    sliderQuestion.config.step;

  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Value</h6>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(saveValues)}>
          <Row className="w-50 m-3">
            <Form.Label>Angi verdi ({sliderQuestion.config.unit})</Form.Label>
            {stepAmount <= 10 && (
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
            )}
            {stepAmount > 10 && (
              <Form.Control
                type="number"
                min={sliderQuestion.config.min}
                max={sliderQuestion.config.max}
                {...register(`question.answer.value`)}
              />
            )}
          </Row>
          <Button variant="primary" type="submit">
            {t('Save')}
          </Button>
          <ErrorSummary errors={errors} />
        </form>
      </Card.Body>
    </Card>
  );
}
