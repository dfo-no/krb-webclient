import React, { ReactElement, useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import { Need } from '../../models/Need';
import { addNeed, putProjectThunk } from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { AccordionContext } from './AccordionContext';

type FormValues = {
  title: string;
  description: string;
};

const needSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

function NewNeedForm(): ReactElement {
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(needSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);

  if (!id) {
    return <div>Loading NeedForm</div>;
  }

  const onNewNeedSubmit = (post: any) => {
    const need: Need = {
      // TODO: remove uuidv4, this should be CosmosDB's task (perhaps by reference)
      id: uuidv4(),
      title: post.title,
      description: post.description,
      requirements: [],
      needs: [],
      type: 'need'
    };
    dispatch(addNeed({ id, need }));
    dispatch(putProjectThunk(id));
    // reset the form
    reset();
    // Close accordion via useContext
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit((e) => onNewNeedSubmit(e))}
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
          />
          {errors.description && (
            <Form.Control.Feedback type="invalid">
              {errors.description.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Button className="mt-2" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default NewNeedForm;
