import { joiResolver } from '@hookform/resolvers/joi';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { Requirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: Requirement;
}

export const ResponseCodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_TEXT).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  }),
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string()).required()
  })
});

export default function DateInfoAnswer({
  question,
  type,
  reqTextId,
  requirement
}: IProps): ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { productId } = useAppSelector((state) => state.selectedSpecProduct);
  let index: number;

  const productIndex = spec.products.findIndex((p) => p.id === productId);

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
      ? (question as IPeriodDateQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].question as IPeriodDateQuestion)) ||
        (type === 'info' &&
          (spec.products[productIndex].requirementAnswers[index]
            .question as IPeriodDateQuestion));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(ResponseCodelistSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const dateQuestion = question as IPeriodDateQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: any) => {
    const newAns = {
      ...post
    };
    const newDate = post.answer.date.toISOString();
    newAns.answer.date = newDate;
    if (index === -1) {
      const newAnswer: IRequirementAnswer = {
        id: uuidv4(),
        questionId: post.id,
        weight: 1,
        variantId: reqTextId,
        requirement,
        question: newAns,
        type: ModelType.requirement
      };
      dispatch(addAnswer({ answer: newAnswer }));
    } else {
      const answer = spec.requirementAnswers[index];
      answer.question = newAns;
      dispatch(addAnswer({ answer }));
    }
  };
  return (
    <Col className="p-0 m-0 w-50">
      <p>Hvilekn dato skal varene leveres</p>
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
          {...register('config.fromDate')}
          isInvalid={!!errors.type}
        />
        <Form.Control
          as="input"
          type="hidden"
          {...register('config.toDate')}
          isInvalid={!!errors.type}
        />
        <Form.Group as={Row}>
          <Col sm="4">
            <Controller
              name={`answer.date` as const}
              control={control}
              defaultValue={dateQuestion.config.fromDate}
              render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  variant="inline"
                  minDate={dateQuestion.config.fromDate}
                  maxDate={dateQuestion.config.toDate}
                  format="dd/MM/yyyy"
                  label={t('Select date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  {...rest}
                />
              )}
            />
          </Col>
        </Form.Group>
        <Button className="mt-2" type="submit">
          {t('save')}
        </Button>
        <ErrorSummary errors={errors} />
      </Form>
    </Col>
  );
}
