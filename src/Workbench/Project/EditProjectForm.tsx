import React, { ReactElement, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Bank } from '../../models/Bank';

import {
  editProject,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';

interface IProps {
  project: Bank;
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormInput = {
  title: string;
  description: string;
};

const projectSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required()
});

export default function EditProjectForm({
  project,
  toggleShow
}: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(projectSchema)
  });

  if (!id) {
    return <p>No project selected</p>;
  }

  const onEditProjectSubmit = (post: FormInput) => {
    dispatch(
      editProject({
        projectId: project.id,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectThunk(id));
    toggleShow(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onEditProjectSubmit)}
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
                defaultValue={project.title}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
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
                defaultValue={project.description}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Row>
            <Button className="mt-2  ml-3" type="submit">
              Save
            </Button>
            <Button
              className="mt-2 ml-3 btn-warning"
              onClick={() => toggleShow(false)}
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
