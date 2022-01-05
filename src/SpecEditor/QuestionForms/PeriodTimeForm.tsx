import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DateCtrl from '../../FormProvider/DateCtrl';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  IPeriodDateQuestion,
  PeriodDateSpecSchema
} from '../../Nexus/entities/IPeriodDateQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function PeriodDateForm({
  parentAnswer
}: IProps): React.ReactElement {
  const question = parentAnswer.question as IPeriodDateQuestion;

  const methods = useForm<IPeriodDateQuestion>({
    resolver: joiResolver(PeriodDateSpecSchema),
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

  const saveValues = (post: IPeriodDateQuestion) => {
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
        <h6>Alternative: Date </h6>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(saveValues)}>
            <Form.Group as={Row}>
              <Col sm="4">
                <DateCtrl name={`config.fromBoundary` as const} />
              </Col>
            </Form.Group>
            {question.config.isPeriod && (
              <Form.Group>
                <Col>
                  <DateCtrl name={`config.toBoundary` as const} />
                </Col>
              </Form.Group>
            )}
            <Button type="submit">{t('save')}</Button>
          </Form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
