import React, { ReactElement, useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { Need } from '../../models/Need';
import {
  editNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { RootState } from '../../store/store';

type FormValues = {
  id: string;
  title: string;
  description: string;
};
interface IProps {
  element: Need;
}

const needSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function EditNeedForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: element.id,
      title: element.title,
      description: element.description
    },
    resolver: joiResolver(needSchema)
  });

  if (!id) {
    return <p>No project selected</p>;
  }

  const onEditNeedSubmit = (post: FormValues) => {
    dispatch(
      editNeed({
        projectId: id,
        needId: post.id,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectThunk(id));

    // Close accordion via useContext
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit((e) => onEditNeedSubmit(e))}
      autoComplete="off"
      noValidate
      validated={validated}
    >
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            name="title"
            ref={register}
            isInvalid={!!errors.title}
          />
          {errors.title && (
            <Form.Control.Feedback type="invalid">
              {errors.title.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            name="description"
            ref={register}
            isInvalid={!!errors.description}
          />
          {errors.description && (
            <Form.Control.Feedback type="invalid">
              {errors.description.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Form.Control type="hidden" name="id" ref={register} />
      <Button className="mt-2" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditNeedForm;
