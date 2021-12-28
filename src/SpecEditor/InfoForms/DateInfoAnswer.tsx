import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledDate from '../../Form/ControlledDate';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer } from '../../store/reducers/spesification-reducer';

interface IProps {
  question: QuestionType;
  type: string;
  reqTextId: string;
  requirement: IRequirement;
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
      ? (question as IPeriodDateQuestion)
      : (type === 'requirement' &&
          (spec.requirementAnswers[index].question as IPeriodDateQuestion)) ||
        (type === 'info' &&
          (spec.products[productIndex].requirementAnswers[index]
            .question as IPeriodDateQuestion));
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(ResponseCodelistSchema),
    defaultValues: {
      ...defaultVal
    }
  });

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
        <Form.Group as={Row}>
          <Col sm="4">
            {/*             <Controller
              name={`answer.date` as const}
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  variant="inline"
                  minDate={dateQuestion.config.fromDate}
                  maxDate={dateQuestion.config.toDate}
                  format={DATETIME_ISO8601UTC}
                  label={t('Select date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  {...rest}
                />
              )}
            /> */}

            {/* // TODO: missing support for minDate and maxDate */}
            <ControlledDate
              control={control}
              name={`answer.date` as const}
              error={get(errors, `answer.date`) as FieldError}
              label={t('Select date')}
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
