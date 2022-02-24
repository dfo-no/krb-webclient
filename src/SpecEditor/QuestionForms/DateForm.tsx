import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
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
import DateScoreArray from './DateScores';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function DateForm({ parentAnswer }: IProps): React.ReactElement {
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
          <form onSubmit={methods.handleSubmit(saveValues)}>
            <Form.Group as={Row}>
              <Col sm="4">
                <DateCtrl name={`config.fromBoundary` as const} />
              </Col>
            </Form.Group>
            <Form.Group>
              <Col>
                <DateCtrl name={`config.toBoundary` as const} />
              </Col>
            </Form.Group>
            {question.config.isPeriod && (
              <Row>
                <Col sm={2}>
                  <Form.Label>Minimum lengde: </Form.Label>
                  <Form.Control
                    as="input"
                    type="number"
                    {...methods.register(`config.periodMin`)}
                  />
                </Col>
                <Col sm={2}>
                  <Form.Label>Maximum lengde: </Form.Label>
                  <Form.Control
                    as="input"
                    type="number"
                    {...methods.register(`config.periodMax`)}
                  />
                </Col>
              </Row>
            )}
            <DateScoreArray
              control={methods.control}
              register={methods.register}
            />
            <ErrorSummary errors={methods.formState.errors} />
            <Button variant="primary" type="submit">
              {t('save')}
            </Button>
          </form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
