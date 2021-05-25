import React, { ReactElement, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import { IVariant } from '../../models/IVariant';
import { Requirement } from '../../models/Requirement';
import {
  addAnswer,
  deleteAnswer
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import { selectAlternative } from '../../store/reducers/selectedAlternative-reducer';
import ErrorSummary from '../../Form/ErrorSummary';

interface IProps {
  requirement: Requirement;
}

type FormValue = {
  alternative: string;
  weight: number;
};

const alternativeSchema = Joi.object().keys({
  alternative: Joi.string().required(),
  weight: Joi.number().integer().min(1).required(),
  variant: Joi.string()
});

export default function RequirementAnswer({
  requirement
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(alternativeSchema)
  });
  const { spec } = useSelector((state: RootState) => state.specification);
  const [selectedVariant, setSelectedVariant] = useState(
    requirement.variants[0]
  );
  const savedAlternative = spec.requirementAnswers.find(
    (alt) => alt.reqTextId === selectedVariant.id
  );
  const [selectedAlternative, setSelectedAlternative] = useState<
    string | undefined
  >(savedAlternative !== undefined ? savedAlternative.id : undefined);

  const { id } = useSelector((state: RootState) => state.selectedBank);
  const saveAnswer = (post: FormValue) => {
    const alternativeIndex = selectedVariant.questions.findIndex(
      (alt) => alt.id === post.alternative
    );
    const alternative = selectedVariant.questions[alternativeIndex];
    const newAnswer = {
      id: uuidv4(),
      alternativeId: post.alternative,
      weight: post.weight,
      reqTextId: selectedVariant.id,
      alternative,
      type: 'requirement'
    };
    dispatch(addAnswer({ answer: newAnswer }));
    setSelectedAlternative(newAnswer.id);
  };

  const selectAlt = () => {
    if (selectedAlternative !== undefined)
      dispatch(selectAlternative(selectedAlternative));
  };
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.variants.find((element: IVariant) => element.id === variantId)
    );
    selectedVariant.questions.forEach((alternative) => {
      if (
        spec.requirementAnswers.find(
          (answer) => answer.alternativeId === alternative.id
        )
      ) {
        const index = spec.requirementAnswers.findIndex(
          (answer) => answer.alternativeId === alternative.id
        );
        dispatch(deleteAnswer({ answer: spec.requirementAnswers[index].id }));
      }
    });
    setSelectedVariant(variant);
  }

  function findDefaultRequirementText(): string {
    let defaultText = requirement.variants[0].id;
    requirement.variants.forEach((variant) => {
      if (
        spec.requirementAnswers.find(
          (answer) => answer.reqTextId === variant.id
        )
      ) {
        defaultText = variant.id;
      }
    });
    return defaultText;
  }

  function findDefaultAnswerOption(): [string, number] {
    let defaultText = selectedVariant.questions[0].id;
    let defaultWeight = 0;
    selectedVariant.questions.forEach((alternative) => {
      if (
        spec.requirementAnswers.find(
          (answer) => answer.alternativeId === alternative.id
        )
      ) {
        defaultText = alternative.id;
        const index = spec.requirementAnswers.findIndex(
          (answer) => answer.alternativeId === alternative.id
        );
        defaultWeight = spec.requirementAnswers[index].weight;
      }
    });
    return [defaultText, defaultWeight];
  }

  const reqTextOptions = (req: Requirement) => {
    const reqText = req.variants.map((variant) => {
      if (req.variants.length === 1) {
        return <p key={variant.id}>{variant.requirementText}</p>;
      }
      if (variant.use_Spesification) {
        return (
          <option key={variant.id} value={variant.id}>
            {variant.requirementText}
          </option>
        );
      }
      return <></>;
    });

    return (
      <Col>
        {requirement.variants.length > 1 && (
          <Form.Control
            as="select"
            {...register('variant')}
            onChange={handleChange}
            defaultValue={findDefaultRequirementText()}
          >
            {reqText}
          </Form.Control>
        )}
        {requirement.variants.length <= 1 && (
          <p>{requirement.variants[0].requirementText}</p>
        )}
      </Col>
    );
  };

  const answerOptions = (variant: IVariant) => {
    const answers = variant.questions.map((alternative) => {
      return (
        <option key={alternative.id} value={alternative.id}>
          {alternative.type}
        </option>
      );
    });
    return (
      <Form onSubmit={handleSubmit(saveAnswer)} autoComplete="off">
        <Col>
          <Row>
            <Form.Control
              as="select"
              {...register('alternative')}
              defaultValue={findDefaultAnswerOption()[0]}
            >
              {answers}
            </Form.Control>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                type="number"
                {...register('weight')}
                defaultValue={findDefaultAnswerOption()[1]}
                isInvalid={!!errors.weight}
              />
              {errors.weight && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit" className="mt-2">
              {t('save')}
            </Button>
            {selectedAlternative !== undefined && (
              <Link
                onClick={selectAlt}
                to={`/speceditor/${id}/requirement/alternative/${selectedAlternative}`}
              >
                <Button className="mt-2 ml-2">Edit Alternative</Button>
              </Link>
            )}
          </Row>
        </Col>
        <ErrorSummary errors={errors} />
      </Form>
    );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          {reqTextOptions(requirement)}
          {answerOptions(selectedVariant)}
        </Row>
      </Card.Body>
    </Card>
  );
}
