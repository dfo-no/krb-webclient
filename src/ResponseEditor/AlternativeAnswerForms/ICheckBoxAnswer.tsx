import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { addRequirementAnswer } from '../../store/reducers/response-reducer';
import { RootState } from '../../store/store';
import ErrorSummary from '../../Form/ErrorSummary';
import QuestionEnum from '../../models/QuestionEnum';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export const ResponseCheckBoxSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CHECKBOX).required(),
  answer: Joi.object().keys({
    value: Joi.boolean().required()
  })
});

export default function ICheckBoxAnswer({
  parentAnswer
}: IProps): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const index = response.requirementAnswers.findIndex(
    (answer) => answer.reqTextId === parentAnswer.reqTextId
  );
  const defaultVal =
    index === -1
      ? (parentAnswer.alternative as ICheckboxQuestion)
      : (response.requirementAnswers[index].alternative as ICheckboxQuestion);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ICheckboxQuestion>({
    resolver: joiResolver(ResponseCheckBoxSchema),
    defaultValues: {
      ...defaultVal
    }
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log(defaultVal);
  const saveValues = (post: ISliderQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.alternative = post;
    dispatch(addRequirementAnswer(newAnswer));
  };

  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Yes/No</h6>
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
          <Controller
            control={control}
            name={`answer.value` as const}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
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
