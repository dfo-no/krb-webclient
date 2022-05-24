import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import ErrorSummary from '../../../Form/ErrorSummary';
import TimeScoreArray from './TimeScoreArray';
import TimeCtrl from '../../../FormProvider/TimeCtrl';
import {
  addAnswer,
  addProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import {
  ITimeQuestion,
  TimeSpecSchema
} from '../../../Nexus/entities/ITimeQuestion';
import { ModelType } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function DateForm({ parentAnswer }: IProps): React.ReactElement {
  const question = parentAnswer.question as ITimeQuestion;

  const methods = useForm<ITimeQuestion>({
    resolver: joiResolver(TimeSpecSchema),
    defaultValues: question
  });

  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (
    !selectedSpecificationProduct &&
    parentAnswer.type === ModelType.product
  ) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ITimeQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
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
        <h6>Alternative: Time </h6>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(saveValues)}>
            <Form.Group as={Row}>
              <Col sm="4">
                <TimeCtrl name={`config.fromBoundary` as const} />
              </Col>
            </Form.Group>
            <Form.Group>
              <Col>
                <TimeCtrl name={`config.toBoundary` as const} />
              </Col>
            </Form.Group>
            {question.config.isPeriod && (
              <Row>
                <Col sm={2}>
                  <Form.Label>Period Length hours </Form.Label>
                  <Form.Control
                    as="input"
                    type="number"
                    {...methods.register(`config.periodHours`)}
                  />
                </Col>
                <Col sm={2}>
                  <Form.Label>Period Length minutes </Form.Label>
                  <Form.Control
                    as="input"
                    type="number"
                    {...methods.register(`config.periodMinutes`)}
                  />
                </Col>
              </Row>
            )}
            <TimeScoreArray
              control={methods.control}
              register={methods.register}
            />
            <ErrorSummary errors={methods.formState.errors} />
            <Button variant="primary" type="submit">
              {t('Save')}
            </Button>
          </form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
