import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../Nexus/entities/ICheckboxQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../store/reducers/response-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function ICheckBoxAnswerForm({
  parentAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  let index: number;
  const { selectedResponseProduct } = useAppSelector(
    (state) => state.selectedResponseProduct
  );

  const productIndex = response.products.findIndex(
    (p) => p.id === selectedResponseProduct.id
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

  const defaultVal =
    index === -1
      ? (parentAnswer.question as ICheckboxQuestion)
      : (parentAnswer.type === ModelType.requirement &&
          (response.requirementAnswers[index].question as ICheckboxQuestion)) ||
        (parentAnswer.type === ModelType.product &&
          (response.products[0].requirementAnswers[index]
            .question as ICheckboxQuestion));
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICheckboxQuestion>({
    resolver: joiResolver(CheckboxQuestionAnswerSchema),
    defaultValues: {
      ...defaultVal
    }
  });

  const q = defaultVal as ICheckboxQuestion;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const saveValues = (post: ICheckboxQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = post;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addRequirementAnswer(newAnswer));
    if (newAnswer.type === ModelType.product && selectedResponseProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedResponseProduct.id
        })
      );
  };

  const checkIfPreferedAlternative = (value: string) => {
    if (value === 'Yes' && q.config.preferedAlternative === true) {
      return <b>Yes</b>;
    } else if (value === 'No' && q.config.preferedAlternative === false) {
      return <b>No</b>;
    }
    return <>{value}</>;
  };

  return (
    <Card className="m-3 ">
      <Card.Header>
        <h6>Question: Yes/No</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Group>
            <Form.Label>
              <input
                {...register('answer.value')}
                type="radio"
                value="true"
                id="true"
                className="m-3"
              />
              {checkIfPreferedAlternative('Yes')}
            </Form.Label>
            <Form.Label>
              <input
                {...register('answer.value')}
                type="radio"
                value="false"
                id="false"
                className="m-3"
              />
              {checkIfPreferedAlternative('No')}
            </Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('save')}
          </Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
