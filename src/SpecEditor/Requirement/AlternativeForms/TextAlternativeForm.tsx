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
import { RequirementAnswer } from '../../../models/RequirementAnswer';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import { ITextAlternative } from '../../../models/ITextAlternative';
import ErrorSummary from '../../../Form/ErrorSummary';

const textSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('text').required(),
  max: Joi.number().required(),
  text: Joi.string().trim().max(Joi.ref('max')).required()
});

interface IProps {
  parentAnswer: RequirementAnswer;
}

type FormValues = {
  text: string;
  max: number;
};

export default function TextForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(textSchema),
    defaultValues: {
      ...(parentAnswer.alternative as ITextAlternative)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as ITextAlternative;
  const dispatch = useDispatch();

  if (!productId && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: FormValues) => {
    const newAlt = {
      ...item,
      max: post.max,
      text: post.text
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.alternative = newAlt;

    if (newAnswer.type === 'requirement')
      dispatch(editAnswer({ answer: newAnswer }));
    if (newAnswer.type === 'product' && productId !== null)
      dispatch(editProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Text</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            type="hidden"
            {...register('id')}
            isInvalid={!!errors.id}
          />

          <Form.Control
            as="input"
            type="hidden"
            {...register('type')}
            isInvalid={!!errors.type}
          />
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Text
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="input"
                {...register('text')}
                isInvalid={!!errors.text}
              />
              {errors.text && (
                <Form.Control.Feedback type="invalid">
                  {errors.text.message}
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
                {...register('max')}
                isInvalid={!!errors.max}
              />
              {errors.max && (
                <Form.Control.Feedback type="invalid">
                  {errors.max.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>

          <Button type="submit"> Save</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
