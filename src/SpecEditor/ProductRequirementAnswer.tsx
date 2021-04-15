import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../common/Utils';
import { IVariant } from '../models/IVariant';
import { Requirement } from '../models/Requirement';
import { addProductAnswer } from '../store/reducers/spesification-reducer';
import { RootState } from '../store/store';
import { SpecificationProduct } from '../models/SpecificationProduct';

type InputProps = {
  requirement: Requirement;
  productId: string;
};

type FormValue = {
  alternative: string;
  weight: number;
};

export default function ProductRequirementAnswer({
  requirement,
  productId
}: InputProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { spec } = useSelector((state: RootState) => state.specification);
  const [selectedLayout, setSelectedLayout] = useState(requirement.layouts[0]);
  const saveAnswer = (post: FormValue) => {
    const newAnswer = {
      id: uuidv4(),
      alternativeId: post.alternative,
      weight: post.weight,
      reqTextId: selectedLayout.id
    };
    dispatch(addProductAnswer({ answer: newAnswer, productId }));
  };

  function handleChange(event: any) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.layouts.find((element: IVariant) => element.id === variantId)
    );
    setSelectedLayout(variant);
  }

  const specProduct = Utils.ensure(
    spec.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
  );

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
            />
          </Row>
          <Row>
            <Button type="submit" className="mt-2">
              Save
            </Button>
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
