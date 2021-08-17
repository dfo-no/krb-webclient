import { joiResolver } from '@hookform/resolvers/joi';
import Slider from '@material-ui/core/Slider';
import Joi from 'joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { IOption } from '../../models/IOption';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IVariant } from '../../models/IVariant';
import ModelType from '../../models/ModelType';
import { Requirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { selectAlternative } from '../../store/reducers/selectedAlternative-reducer';
import {
  addProductAnswer,
  deleteProductAnswer,
  editProductAnswer
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';

interface IProps {
  requirement: Requirement;
  productId: string;
}

type FormValue = {
  question: string;
  weight: number;
};

const questionSchema = Joi.object().keys({
  question: Joi.string().required(),
  weight: Joi.number().integer().min(1).required(),
  variant: Joi.string()
});
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

export default function ProductRequirementAnswer({
  requirement,
  productId
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(questionSchema)
  });
  const { spec } = useSelector((state: RootState) => state.specification);
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const [selectedVariant, setSelectedVariant] = useState(
    requirement.variants[0]
  );
  const specProduct = Utils.ensure(
    spec.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
  );
  const savedQuestion = specProduct.requirementAnswers.find(
    (alt) => alt.variantId === selectedVariant.id
  );
  const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>(
    savedQuestion !== undefined ? savedQuestion.id : undefined
  );

  const checkWeightIsPredefined = (weight: number) => {
    const predefinedValues = [10, 30, 50, 70, 90];
    return predefinedValues.includes(weight);
  };
  const setWeightState = () => {
    if (savedQuestion) {
      if (checkWeightIsPredefined(savedQuestion.weight)) {
        return 'standard';
      }
      return 'egendefinert';
    }
    return 'standard';
  };
  const [weightType, setWeightType] = useState(setWeightState());
  const saveAnswer = (post: FormValue) => {
    const questionIndex = selectedVariant.questions.findIndex(
      (alt) => alt.id === post.question
    );
    const question = selectedVariant.questions[questionIndex];
    const savedWeight =
      weightType === 'standard' && post.weight > 90 ? 90 : post.weight;
    if (savedQuestion) {
      const updatedAnswer: IRequirementAnswer = { ...savedQuestion };
      updatedAnswer.weight = savedWeight;
      dispatch(editProductAnswer({ answer: updatedAnswer, productId }));
    } else {
      const newAnswer = {
        id: uuidv4(),
        questionId: post.question,
        weight: post.weight,
        variantId: selectedVariant.id,
        question,
        requirement,
        type: ModelType.product
      };
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
      setSelectedQuestion(newAnswer.id);
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.variants.find((element: IVariant) => element.id === variantId)
    );
    selectedVariant.questions.forEach((alternative) => {
      if (
        specProduct.requirementAnswers.find(
          (answer) => answer.questionId === alternative.id
        )
      ) {
        const index = specProduct.requirementAnswers.findIndex(
          (answer) => answer.questionId === alternative.id
        );
        dispatch(
          deleteProductAnswer({
            answer: specProduct.requirementAnswers[index].id,
            productId: specProduct.id
          })
        );
      }
    });
    setSelectedVariant(variant);
  }

  const selectQuestion = () => {
    if (selectedQuestion !== undefined)
      dispatch(selectAlternative(selectedQuestion));
  };
  function findDefaultRequirementText(): string {
    let defaultText = requirement.variants[0].id;
    requirement.variants.forEach((variant) => {
      if (
        specProduct.requirementAnswers.find(
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
        specProduct.requirementAnswers.find(
          (answer) => answer.questionId === question.id
        )
      ) {
        defaultText = question.id;
        const index = specProduct.requirementAnswers.findIndex(
          (answer) => answer.questionId === question.id
        );
        defaultWeight = specProduct.requirementAnswers[index].weight;
      }
    });
    return [defaultText, defaultWeight];
  }

  const reqTextOptions = (req: Requirement) => {
    const reqText = req.variants.map((variant) => {
      if (req.variants.length === 1) {
        return <p>{variant.requirementText}</p>;
      }
      if (variant.useProduct) {
        return (
          <option key={variant.id} value={variant.id}>
            {variant.requirementText}
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
            onChange={handleChange}
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
        <Row className="w-50">
          <Col className="p-0">
            <Form.Control
              as="select"
              {...register('question')}
              defaultValue={findDefaultAnswerOption()[0]}
            >
              {answers}
            </Form.Control>
          </Col>
          <Col className="p-0">
            {selectedQuestion !== undefined && (
              <Link
                onClick={selectQuestion}
                to={`/speceditor/${id}/product/${productId}/question/${selectedQuestion}`}
              >
                <Button className="ml-2">Configure Question</Button>
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <b>Vektingstype: </b>
        </Row>
        <Row>
          <Form.Check className="p-0" formNoValidate>
            <input
              type="radio"
              name="standard"
              id="standard"
              checked={weightType === 'standard'}
              onChange={() => setWeightType('standard')}
            />
          </Form.Check>
          <p className="ml-1">Standard</p>
          <Form.Check formNoValidate>
            <input
              type="radio"
              name="egendefinert"
              id="egendefinert"
              checked={weightType === 'egendefinert'}
              onChange={() => setWeightType('egendefinert')}
            />
          </Form.Check>
          <p className="ml-1">Egendefinert</p>
        </Row>
        <Row>
          {weightType === 'egendefinert' && (
            <Form.Group>
              <Form.Label>{t('weighting')}:</Form.Label>
              <Form.Control
                type="number"
                defaultValue={savedQuestion?.weight ? savedQuestion.weight : 0}
                min={0}
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
                  className="mt-4 w-50"
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
        <Row>
          <Button type="submit" className="mt-2">
            {t('save')}
          </Button>
        </Row>
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
