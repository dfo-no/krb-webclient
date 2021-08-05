import { joiResolver } from '@hookform/resolvers/joi';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Joi from 'joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
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
  const { response } = useAppSelector((state) => state.response);
  let index: number;
  const { productId } = useAppSelector(
    (state) => state.selectedResponseProduct
  );

  const productIndex = response.products.findIndex((p) => p.id === productId);

  if (parentAnswer.type === ModelType.requirement) {
    index = response.requirementAnswers.findIndex(
      (answer) => answer.reqTextId === parentAnswer.reqTextId
    );
  } else {
    index =
      response.products.length > 0
        ? response.products[productIndex].requirementAnswers.findIndex(
            (answer) => answer.reqTextId === parentAnswer.reqTextId
          )
        : -1;
  }

  const defaultVal =
    index === -1
      ? (parentAnswer.alternative as ICheckboxQuestion)
      : (parentAnswer.type === ModelType.requirement &&
          (response.requirementAnswers[index]
            .alternative as ICheckboxQuestion)) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .alternative as ICheckboxQuestion));
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ICheckboxQuestion>({
    resolver: joiResolver(ResponseCheckBoxSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  /* const [checked, setChecked] = useState(
    defaultVal ? defaultVal.answer?.value : false
  ); */

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ICheckboxQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.alternative = post;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && productId !== null)
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
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
            name={`answer.value` as const}
            control={control}
            defaultValue={getValues(`answer.value`)}
            render={({ field }) => (
              <Switch
                {...field}
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value ? field.value : false}
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
