import { joiResolver } from '@hookform/resolvers/joi';
import Slider from '@mui/material/Slider';
import Joi from 'joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
import ModelType from '../../models/ModelType';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectQuestion } from '../../store/reducers/selectedQuestion-reducer';
import {
  addAnswer,
  deleteAnswer,
  editAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  requirement: IRequirement;
}

type FormValue = {
  question: string;
  weight: number;
  variant: string;
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
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValue>({
    resolver: joiResolver(questionSchema)
  });
  const { spec } = useAppSelector((state) => state.specification);
  const [selectedVariant, setSelectedVariant] = useState(
    requirement.variants[0]
  );
  const savedQuestion = spec.requirementAnswers.find(
    (question) => question.variantId === selectedVariant.id
  );
  const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>(
    savedQuestion !== undefined ? savedQuestion.id : undefined
  );

  const { id } = useAppSelector((state) => state.selectedBank);
  const checkWeightIsPredefined = (weight: number) => {
    const predefinedValues = [10, 30, 50, 70, 90];
    return predefinedValues.includes(weight);
  };

  const setWeightState = () => {
    if (savedQuestion) {
      if (checkWeightIsPredefined(savedQuestion.weight)) return 'standard';
      return 'egendefinert';
    }
    return 'standard';
  };
  const [weightType, setWeightType] = useState(setWeightState());
  const saveAnswer = (post: FormValue) => {
    const questionIndex = selectedVariant.questions.findIndex(
      (question) => question.id === post.question
    );
    const savedWeight =
      weightType === 'standard' && post.weight > 90 ? 90 : post.weight;
    if (savedQuestion) {
      const updatedAnswer: IRequirementAnswer = { ...savedQuestion };
      updatedAnswer.weight = savedWeight;
      dispatch(editAnswer({ answer: updatedAnswer }));
    } else {
      const question = selectedVariant.questions[questionIndex];
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
      setSelectedQuestion(newAnswer.id);
    }
  };

  const selectQuestionType = () => {
    if (selectedQuestion !== undefined)
      dispatch(selectQuestion(selectedQuestion));
  };
  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.variants.find((element: IVariant) => element.id === variantId)
    );
    selectedVariant.questions.forEach((question) => {
      if (
        spec.requirementAnswers.find(
          (answer) => answer.questionId === question.id
        )
      ) {
        const index = spec.requirementAnswers.findIndex(
          (answer) => answer.questionId === question.id
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
    selectedVariant.questions.forEach((question) => {
      if (
        spec.requirementAnswers.find(
          (answer) => answer.questionId === question.id
        )
      ) {
        defaultText = question.id;
        const index = spec.requirementAnswers.findIndex(
          (answer) => answer.questionId === question.id
        );
        defaultWeight = spec.requirementAnswers[index].weight;
      }
    });
    return [defaultText, defaultWeight];
  }

  const requirementTextOptions = (req: IRequirement) => {
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
    const answers = variant.questions.map((question) => {
      return (
        <option key={question.id} value={question.id}>
          {question.type}
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
            {selectedQuestion !== undefined && (
              <Link
                onClick={selectQuestionType}
                to={`/specification/${id}/requirement/question/${selectedQuestion}`}
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
                defaultValue={savedQuestion?.weight ? savedQuestion.weight : 0}
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
              defaultValue={savedQuestion?.weight ? savedQuestion.weight : 0}
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
      {requirementTextOptions(requirement)}
      {answerOptions(selectedVariant)}
    </Container>
  );
}
