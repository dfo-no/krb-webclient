import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SliderSelect from '../../components/SliderSelect';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  CheckboxQuestionSchema,
  ICheckboxQuestion
} from '../../Nexus/entities/ICheckboxQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function CheckBoxForm({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const dispatch = useAppDispatch();
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  let index: number;

  const productIndex = response.products.findIndex(
    (p) => p.id === selectedSpecificationProduct.id
  );

  if (parentAnswer.type === ModelType.requirement) {
    index = response.requirementAnswers.findIndex(
      (answer) => answer.variantId === parentAnswer.variantId
    );
  } else {
    index =
      response.products.length > 0
        ? response.products[productIndex].requirementAnswers.findIndex(
            (answer) => answer.variantId === parentAnswer.variantId
          )
        : -1;
  }

  const defaultValues =
    index === -1
      ? (parentAnswer.question as ICheckboxQuestion)
      : (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as ICheckboxQuestion)) ||
        (response.requirementAnswers[index].question as ICheckboxQuestion);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ICheckboxQuestion>({
    resolver: joiResolver(CheckboxQuestionSchema),
    defaultValues: {
      ...defaultValues
    }
  });

  const [pointsForNonPreferred, setPointsForNonPreffered] = useState(
    defaultValues.config.pointsNonPrefered > 0
  );

  const saveValues = (post: ICheckboxQuestion) => {
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

  const { t } = useTranslation();
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Question: Yes/No</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Row>
            <Col>
              <Form.Label>Foretrukket alternativ</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                {...register(`config.preferedAlternative` as const)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Col>
          </Row>
          <Form.Check
            checked={pointsForNonPreferred}
            onChange={(e) => setPointsForNonPreffered(e.target.checked)}
            label="Gi prosentandel poeng for ikke-foretrukket alternativ"
          />
          <Row className="ml-3">
            <Col sm={4}>
              {pointsForNonPreferred && (
                <SliderSelect
                  name={`config.pointsNonPrefered` as const}
                  control={control}
                  errors={errors}
                  min={0}
                  max={100}
                  step={10}
                  label="Oppgi poeng"
                  marks={[
                    {
                      value: 1,

                      label: '1'
                    },
                    {
                      value: 100,

                      label: '100'
                    }
                  ]}
                />
              )}
            </Col>
          </Row>
          <Button type="submit">{t('save')}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
