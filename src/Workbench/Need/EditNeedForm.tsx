import React, { ReactElement, useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import {
  editNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { AccordionContext } from './AccordionContext';

type FormValues = {
  id: string;
  title: string;
  description: string;
};
interface IProps {
  project: Bank;
  need: Need;
}

const needSchema = yup.object().shape({
  id: yup.number().required(),
  tittel: yup.string().required(),
  beskrivelse: yup.string().required()
});

function EditNeedForm({ project, need }: IProps): ReactElement {
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: need.id,
      title: need.title,
      description: need.description
    },
    resolver: yupResolver(needSchema)
  });

  const onEditNeedSubmit = (post: FormValues) => {
    dispatch(
      editNeed({
        projectId: project.id,
        needId: post.id,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectThunk(project.id));

    // Close accordion via useContext
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit(onEditNeedSubmit)}
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
