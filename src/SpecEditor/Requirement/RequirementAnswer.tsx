import React, { ReactElement, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Joi, { alternatives } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { IVariant } from '../../models/IVariant';
import { Requirement } from '../../models/Requirement';
import {
  addAnswer,
  deleteAnswer
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import { selectAlternative } from '../../store/reducers/selectedAlternative-reducer';

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
  layout: Joi.string()
});

export default function RequirementAnswer({
  requirement
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(alternativeSchema)
  });
  const [selectedLayout, setSelectedLayout] = useState(requirement.layouts[0]);
  const [selectedAlternative, setSelectedAlternative] = useState(
    requirement.layouts[0].alternatives[0].id
  );
  const { spec } = useSelector((state: RootState) => state.specification);
  const { id } = useSelector((state: RootState) => state.selectedBank);
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
      alternative
    };
    dispatch(addAnswer({ answer: newAnswer }));
    setSelectedAlternative(newAnswer.id);
  };

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const variantId = event.target.value;
    const variant = Utils.ensure(
      requirement.layouts.find((element: IVariant) => element.id === variantId)
    );
    selectedLayout.alternatives.forEach((alternative) => {
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
    setSelectedLayout(variant);
  }

  function findDefaultRequirementText(): string {
    let defaultText = requirement.layouts[0].id;
    requirement.layouts.forEach((layout) => {
      if (
        spec.requirementAnswers.find((answer) => answer.reqTextId === layout.id)
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
    const reqText = req.layouts.map((layout) => {
      if (req.layouts.length === 1) {
        return <p key={layout.id}>{layout.requirementText}</p>;
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
            <Form.Group>
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
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit" className="mt-2">
              Save
            </Button>
            <Link
              onClick={() => dispatch(selectAlternative(selectedAlternative))}
              to={`/speceditor/${id}/requirement/alternative/${selectedAlternative}`}
            >
              <Button className="mt-2 ml-2">Edit Alternative</Button>
            </Link>
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
