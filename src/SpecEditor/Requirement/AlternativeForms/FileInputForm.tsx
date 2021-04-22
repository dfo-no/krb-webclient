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
import { IFileUploadAlternative } from '../../../models/IFileUploadAlternative';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';

const fileUploadSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('fileUpload').required(),
  fileEndings: Joi.string().allow('')
});

interface IProps {
  parentAnswer: RequirementAnswer;
}

type FormValues = {
  fileEndings: string;
};

export default function FileInputForm({ parentAnswer }: IProps): ReactElement {
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(fileUploadSchema),
    defaultValues: {
      ...(parentAnswer.alternative as IFileUploadAlternative)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as IFileUploadAlternative;
  const dispatch = useDispatch();

  if (!productId && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: FormValues) => {
    const newAlt = {
      ...item,
      fileEndings: post.fileEndings
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
              Text
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="input"
                name="fileEndings"
                ref={register}
                isInvalid={!!errors.fileEndings}
              />
              {errors.fileEndings && (
                <Form.Control.Feedback type="invalid">
                  {errors.fileEndings.message}
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
