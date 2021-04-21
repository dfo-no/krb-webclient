import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { IValueAlternative } from '../../../models/IValueAlternative';
import { RequirementAnswer } from '../../../models/RequirementAnswer';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';

const valueSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('value').required(),
  step: Joi.number().min(0).max(1000000000).required(),
  min: Joi.number().min(0).max(1000000000).required(),
  max: Joi.number().min(0).max(1000000000).required(),
  unit: Joi.string().required()
});

interface IProps {
  parentAnswer: RequirementAnswer;
}

type FormValues = {
  max: number;
  min: number;
  step: number;
  unit: string;
};

export default function ValueForm({ parentAnswer }: IProps): ReactElement {
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(valueSchema),
    defaultValues: {
      ...(parentAnswer.alternative as IValueAlternative)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as IValueAlternative;
  const dispatch = useDispatch();

  if (!productId && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: FormValues) => {
    const newAlt = {
      ...item
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAlt.max = post.max;
    newAlt.min = post.min;
    newAlt.step = post.step;
    newAlt.unit = post.unit;
    newAnswer.alternative = newAlt;

    if (newAnswer.type === 'requirement')
      dispatch(editAnswer({ answer: newAnswer }));
    if (newAnswer.type === 'product' && productId !== null)
      dispatch(editProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            type="hidden"
            name="id"
            ref={register}
            isInvalid={!!errors.id}
          />

          <Form.Control
            as="input"
            type="hidden"
            name="type"
            ref={register}
            isInvalid={!!errors.type}
          />
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Minimum
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="number"
                name="min"
                ref={register}
                isInvalid={!!errors.min}
              />
              {errors.min && (
                <Form.Control.Feedback type="invalid">
                  {errors.min.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Maximum
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="number"
                name="max"
                ref={register}
                isInvalid={!!errors.max}
              />
              {errors.max && (
                <Form.Control.Feedback type="invalid">
                  {errors.max.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Step
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="step"
                ref={register}
                isInvalid={!!errors.step}
              />
              {errors.step && (
                <Form.Control.Feedback type="invalid">
                  {errors.step.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Unit
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="input"
                name="unit"
                ref={register}
                // defaultValue={item.unit}
                isInvalid={!!errors.unit}
              />
              {errors.unit && (
                <Form.Control.Feedback type="invalid">
                  {errors.unit.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Button type="submit"> Save</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
