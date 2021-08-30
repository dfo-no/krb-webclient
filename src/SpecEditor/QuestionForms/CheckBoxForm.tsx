import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SliderSelect from '../../components/DatePicker/Slider';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}
const CheckboxSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CHECKBOX).required(),
  config: Joi.object().keys({
    weightTrue: Joi.number().min(1).max(100),
    weightFalse: Joi.number().min(0).max(100)
  })
});

export default function CheckBoxForm({ parentAnswer }: IProps): ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const dispatch = useAppDispatch();
  const { productId } = useAppSelector(
    (state) => state.selectedResponseProduct
  );
  let index: number;

  const productIndex = response.products.findIndex((p) => p.id === productId);

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

  const defaultVal =
    index === -1
      ? (parentAnswer.question as ICheckboxQuestion)
      : (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as ICheckboxQuestion)) ||
        (response.requirementAnswers[index].question as ICheckboxQuestion);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ICheckboxQuestion>({
    resolver: joiResolver(CheckboxSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const [pointsForNonPreferred, setPointsForNonPreffered] = useState(
    defaultVal.config.weightFalse > 0 && defaultVal.config.weightTrue > 0
  );

  const [preferedAlternative, setPreferedAlternative] = useState(
    defaultVal.config.weightTrue > defaultVal.config.weightFalse
      ? 'true'
      : 'false'
  );
  const saveValues = (post: ICheckboxQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    if (preferedAlternative === 'false') {
      const newQuestion = {
        ...post
      };
      newQuestion.config.weightFalse = 100;
      newAnswer.question = newQuestion;
    } else {
      newAnswer.question = post;
    }

    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && productId !== null)
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
  };

  const { t } = useTranslation();
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="m-1 d-flex justify-content-between">
          <h6>Question: Yes/No</h6>
        </Row>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Row>
            <Col>
              <Form.Label>Foretrukket alternativ</Form.Label>
            </Col>
            <Col>
              <Form.Control
                onChange={(e) => setPreferedAlternative(e.target.value)}
                as="select"
                defaultValue={preferedAlternative}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Col>
          </Row>
          <Form.Check
            checked={pointsForNonPreferred}
            onChange={(e) => setPointsForNonPreffered(e.target.checked)}
            label="Gi poeng for ikke-foretrukket alternativ"
          />
          {pointsForNonPreferred && (
            <SliderSelect
              name={
                preferedAlternative === 'true'
                  ? (`config.weightFalse` as const)
                  : (`config.weightTrue` as const)
              }
              control={control}
              errors={errors}
              min={0}
              max={100}
              step={10}
              label="Oppgi poeng"
            />
          )}

          <Button type="submit">{t('save')}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
