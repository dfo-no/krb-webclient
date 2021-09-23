import { joiResolver } from '@hookform/resolvers/joi';
import Slider from '@material-ui/core/Slider';
import Joi from 'joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { IOption } from '../../models/IOption';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IVariant } from '../../models/IVariant';
import ModelType from '../../models/ModelType';
import { Requirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAlternative } from '../../store/reducers/selectedAlternative-reducer';
import {
  addAnswer,
  deleteAnswer,
  editAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  requirement: Requirement;
}

type FormValue = {
  question: string;
  weight: number;
};
const marks: IOption[] = [
  {
    value: 10,
    label: `Lav`
  },
  {
    value: 30,
    label: ``
  },
  {
    value: 50,
    label: `Middels`
  },
  {
    value: 70,
    label: ``
  },
  {
    value: 90,
    label: `Høy`
  }
];

const questionSchema = Joi.object().keys({
  question: Joi.string().required(),
  weight: Joi.number().integer().min(1).required(),
  variant: Joi.string()
});

export default function RequirementAnswer({
  requirement
}: IProps): ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(questionSchema)
  });
  const { spec } = useAppSelector((state) => state.specification);
  const [selectedVariant, setSelectedVariant] = useState(
    requirement.variants[0]
  );
  const savedAlternative = spec.requirementAnswers.find(
    (alt) => alt.variantId === selectedVariant.id
  );
  const [selectedAlternative, setSelectedAlternative] = useState<
    string | undefined
  >(savedAlternative !== undefined ? savedAlternative.id : undefined);

  const { id } = useAppSelector((state) => state.selectedBank);
  const checkWeightIsPredefined = (weight: number) => {
    const predefinedValues = [10, 30, 50, 70, 90];
    return predefinedValues.includes(weight);
  };

  const setWeightState = () => {
    if (savedAlternative) {
      if (checkWeightIsPredefined(savedAlternative.weight)) return 'standard';
      return 'egendefinert';
    }
    return 'standard';
  };
  const [weightType, setWeightType] = useState(setWeightState());
  const saveAnswer = (post: FormValue) => {
    const alternativeIndex = selectedVariant.questions.findIndex(
      (alt) => alt.id === post.question
    );
    const savedWeight =
      weightType === 'standard' && post.weight > 90 ? 90 : post.weight;
    if (savedAlternative) {
      const updatedAnswer: IRequirementAnswer = { ...savedAlternative };
      updatedAnswer.weight = savedWeight;
      dispatch(editAnswer({ answer: updatedAnswer }));
    } else {
      const question = selectedVariant.questions[alternativeIndex];
      const newAnswer: IRequirementAnswer = {
        id: uuidv4(),
        questionId: post.question,
        weight: savedWeight,
        variantId: selectedVariant.id,
        question,
        requirement,
        type: ModelType.requirement
      };
      dispatch(addAnswer({ answer: newAnswer }));
      setSelectedAlternative(newAnswer.id);
    }
  };

  const selectAlt = () => {
    if (selectedAlternative !== undefined)
      dispatch(selectAlternative(selectedAlternative));
  };
  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.variants.find((element: IVariant) => element.id === variantId)
    );
    selectedVariant.questions.forEach((alternative) => {
      if (
        spec.requirementAnswers.find(
          (answer) => answer.questionId === alternative.id
        )
      ) {
        const index = spec.requirementAnswers.findIndex(
          (answer) => answer.questionId === alternative.id
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
          (answer) => answer.variantId === variant.id
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
          (answer) => answer.questionId === alternative.id
        )
      ) {
        defaultText = alternative.id;
        const index = spec.requirementAnswers.findIndex(
          (answer) => answer.questionId === alternative.id
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
      if (variant.useSpesification) {
        return (
          <option key={variant.id} value={variant.id}>
            {t(variant.requirementText)}
          </option>
        );
      }
      return <></>;
    });

    return (
      <Row>
        {requirement.variants.length > 1 && (
          <Form.Control
            as="select"
            {...register('variant')}
            onChange={() => handleChange}
            defaultValue={findDefaultRequirementText()}
          >
            {reqText}
          </Form.Control>
        )}
        {requirement.variants.length <= 1 && (
          <p>{requirement.variants[0].requirementText}</p>
        )}
      </Row>
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
        <Row>
          <Col sm={3}>
            <Form.Control
              as="select"
              {...register('question')}
              defaultValue={findDefaultAnswerOption()[0]}
            >
              {answers}
            </Form.Control>
          </Col>
          <Col sm={3}>
            {selectedAlternative !== undefined && (
              <Link
                onClick={selectAlt}
                to={`/specification/${id}/requirement/question/${selectedAlternative}`}
              >
                <Button className="ml-4">Configure question</Button>
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <b>Vektingstype: </b>
        </Row>
        <Row>
          <Col sm={2}>
            <Form.Check className="p-0" formNoValidate>
              <input
                type="radio"
                name="standard"
                id="standard"
                className="m-3"
                checked={weightType === 'standard'}
                onChange={() => setWeightType('standard')}
              />
              <Form.Check.Label>Standard</Form.Check.Label>
            </Form.Check>
          </Col>
          <Col sm={2}>
            <Form.Check formNoValidate>
              <input
                type="radio"
                name="egendefinert"
                id="egendefinert"
                className="m-3"
                checked={weightType === 'egendefinert'}
                onChange={() => setWeightType('egendefinert')}
              />
              <Form.Check.Label>Egendefinert</Form.Check.Label>
            </Form.Check>
          </Col>
        </Row>
        <Row>
          {weightType === 'egendefinert' && (
            <Form.Group>
              <Form.Label>{t('weighting')}:</Form.Label>
              <Form.Control
                type="number"
                defaultValue={
                  savedAlternative?.weight ? savedAlternative.weight : 0
                }
                min={0}
                className="w-25"
                {...register('weight' as const)}
                isInvalid={!!errors.weight}
              />
              {errors.weight && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}
          {weightType === 'standard' && (
            <Controller
              control={control}
              name={'weight' as const}
              defaultValue={
                savedAlternative?.weight ? savedAlternative.weight : 0
              }
              render={({ field }) => (
                <Slider
                  className="mt-4 mb-4 w-25"
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  step={20}
                  min={10}
                  max={90}
                  marks={marks}
                  valueLabelDisplay="auto"
                />
              )}
            />
          )}
        </Row>
        <Col className="p-0 d-flex justify-content-end">
          <Button type="submit">{t('save')}</Button>
        </Col>

        <ErrorSummary errors={errors} />
      </Form>
    );
  };

  return (
    <Container fluid className="mt-4">
      {reqTextOptions(requirement)}
      {answerOptions(selectedVariant)}
    </Container>
  );
}
