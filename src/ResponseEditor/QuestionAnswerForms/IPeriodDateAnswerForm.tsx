import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ControlledDate from '../../Form/ControlledDate';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  IPeriodDateQuestion,
  PeriodDateQuestionAnswerSchema
} from '../../Nexus/entities/IPeriodDateQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function PeriodDateAnswerForm({
  parentAnswer
}: IProps): React.ReactElement {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(PeriodDateQuestionAnswerSchema),
    defaultValues: {
      ...(parentAnswer.question as IPeriodDateQuestion)
    }
  });

  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const saveValues = (post: IPeriodDateQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };

    newAnswer.question = post;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Question: Date </h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Group as={Row}>
            <Col sm="4">
              {/* <Controller
                name={`answer.date` as const}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    variant="inline"
                    minDate={item.config.fromDate}
                    maxDate={item.config.toDate}
                    format={DATETIME_ISO8601UTC}
                    label={t('Select date')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    {...rest}
                  />
                )}
              /> */}
              {/*  TODO: missing support for potensial minDate and maxDate */}
              <ControlledDate
                control={control}
                name={`answer.date` as const}
                error={get(errors, `answer.date`) as FieldError}
                label={t('Select date')}
              />
            </Col>
          </Form.Group>
          {/* TODO: This input is a terrible RHF hack! .point is not set by defaultValues, and does not even exist in the reducer
          Replace during FormProvider change */}
          <input type="text" {...register('answer.point')} value={0} />

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
