import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../common/Utils';
import { IVariant } from '../models/IVariant';
import { Requirement } from '../models/Requirement';
import { addAnswer } from '../store/reducers/spesification-reducer';

type InputProps = {
  requirement: Requirement;
};

type FormValue = {
  alternative: string;
  weight: number;
};

export default function RequirementAnswer({
  requirement
}: InputProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [selectedLayout, setSelectedLayout] = useState(requirement.layouts[0]);
  const saveAnswer = (post: FormValue) => {
    const newAnswer = {
      id: uuidv4(),
      alternativeId: post.alternative,
      weight: post.weight
    };
    dispatch(addAnswer({ answer: newAnswer }));
  };

  function handleChange(event: any) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.layouts.find((element: IVariant) => element.id === variantId)
    );
    setSelectedLayout(variant);
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
            <Form.Control as="select" name="answer" ref={register}>
              {answers}
            </Form.Control>
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
