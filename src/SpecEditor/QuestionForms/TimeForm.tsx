import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import TimeCtrl from '../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  ITimeQuestion,
  TimeSpecSchema
} from '../../Nexus/entities/ITimeQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';
import TimeScoreArray from './TimeScoreArray';

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
          <Form onSubmit={methods.handleSubmit(saveValues)}>
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
            <Button type="submit">{t('save')}</Button>
          </Form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
