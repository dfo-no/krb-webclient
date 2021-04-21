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
import Utils from '../../common/Utils';
import { IVariant } from '../../models/IVariant';
import { Requirement } from '../../models/Requirement';
import {
  addProductAnswer,
  deleteProductAnswer
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { selectAlternative } from '../../store/reducers/selectedAlternative-reducer';

interface IProps {
  requirement: Requirement;
  productId: string;
}

type FormValue = {
  alternative: string;
  weight: number;
};

const alternativeSchema = Joi.object().keys({
  alternative: Joi.string().required(),
  weight: Joi.number().integer().min(1).required(),
  layout: Joi.string()
});

export default function ProductRequirementAnswer({
  requirement,
  productId
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(alternativeSchema)
  });
  const { spec } = useSelector((state: RootState) => state.specification);
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const [selectedLayout, setSelectedLayout] = useState(requirement.layouts[0]);
  const specProduct = Utils.ensure(
    spec.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
  );
  const savedAlternative = specProduct.requirementAnswers.find(
    (alt) => alt.reqTextId === selectedLayout.id
  );
  const [selectedAlternative, setSelectedAlternative] = useState<
    string | undefined
  >(savedAlternative !== undefined ? savedAlternative.id : undefined);
  const saveAnswer = (post: FormValue) => {
    const alternativeIndex = selectedLayout.alternatives.findIndex(
      (alt) => alt.id === post.alternative
    );
    const alternative = selectedLayout.alternatives[alternativeIndex];
    const newAnswer = {
      id: uuidv4(),
      alternativeId: post.alternative,
      weight: post.weight,
      reqTextId: selectedLayout.id,
      alternative,
      type: 'product'
    };
    dispatch(addProductAnswer({ answer: newAnswer, productId }));
    setSelectedAlternative(newAnswer.id);
  };

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.layouts.find((element: IVariant) => element.id === variantId)
    );
    selectedLayout.alternatives.forEach((alternative) => {
      if (
        specProduct.requirementAnswers.find(
          (answer) => answer.alternativeId === alternative.id
        )
      ) {
        const index = specProduct.requirementAnswers.findIndex(
          (answer) => answer.alternativeId === alternative.id
        );
        dispatch(
          deleteProductAnswer({
            answer: specProduct.requirementAnswers[index].id,
            productId: specProduct.id
          })
        );
      }
    });
    setSelectedLayout(variant);
  }

  function findDefaultRequirementText(): string {
    let defaultText = requirement.layouts[0].id;
    requirement.layouts.forEach((layout) => {
      if (
        specProduct.requirementAnswers.find(
          (answer) => answer.reqTextId === layout.id
        )
      ) {
        defaultText = layout.id;
      }
    });
    return defaultText;
  }

  function findDefaultAnswerOption(): [string, number] {
    let defaultText = selectedLayout.alternatives[0].id;
    let defaultWeight = 0;
    selectedLayout.alternatives.forEach((alternative) => {
      if (
        specProduct.requirementAnswers.find(
          (answer) => answer.alternativeId === alternative.id
        )
      ) {
        defaultText = alternative.id;
        const index = specProduct.requirementAnswers.findIndex(
          (answer) => answer.alternativeId === alternative.id
        );
        defaultWeight = specProduct.requirementAnswers[index].weight;
      }
    });
    return [defaultText, defaultWeight];
  }

  const reqTextOptions = (req: Requirement) => {
    const reqText = req.layouts.map((layout) => {
      if (req.layouts.length === 1) {
        return <p>{layout.requirementText}</p>;
      }
      return (
        <option key={layout.id} value={layout.id}>
          {layout.requirementText}
        </option>
      );
    });

    return (
      <Col>
        {requirement.layouts.length > 1 && (
          <Form.Control
            as="select"
            name="layout"
            ref={register}
            onChange={handleChange}
            defaultValue={findDefaultRequirementText()}
          >
            {reqText}
          </Form.Control>
        )}
        {requirement.layouts.length <= 1 && (
          <p>{requirement.layouts[0].requirementText}</p>
        )}
      </Col>
    );
  };

  const answerOptions = (layout: IVariant) => {
    const answers = layout.alternatives.map((alternative) => {
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
              name="alternative"
              ref={register}
              defaultValue={findDefaultAnswerOption()[0]}
            >
              {answers}
            </Form.Control>
          </Row>
          <Row>
            <Form.Label>Weight:</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              ref={register}
              defaultValue={findDefaultAnswerOption()[1]}
              isInvalid={!!errors.weight}
            />
            {errors.weight && (
              <Form.Control.Feedback type="invalid">
                {errors.weight?.message}
              </Form.Control.Feedback>
            )}
          </Row>
          <Row>
            <Button type="submit" className="mt-2">
              Save
            </Button>
            {selectedAlternative !== undefined && (
              <Link
                onClick={() => dispatch(selectAlternative(selectedAlternative))}
                to={`/speceditor/${id}/product/${productId}/alternative/${selectedAlternative}`}
              >
                <Button className="mt-2 ml-2">Edit Alternative</Button>
              </Link>
            )}
          </Row>
        </Col>
      </Form>
    );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          {reqTextOptions(requirement)}
          {answerOptions(selectedLayout)}
        </Row>
      </Card.Body>
    </Card>
  );
}
