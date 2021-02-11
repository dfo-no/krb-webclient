import React, { ReactElement, useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import Utils from '../../common/Utils';
import { Need } from '../../models/Need';
import { addNeed, putProjectThunk } from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { AccordionContext } from './AccordionContext';

type FormValues = {
  projectId: number;
  tittel: string;
  beskrivelse: string;
};

const needSchema = yup.object().shape({
  id: yup.number().required(),
  tittel: yup.string().required(),
  beskrivelse: yup.string().required()
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

  const onNewNeedSubmit = (post: FormValues) => {
    const need: Need = {
      id: Utils.getRandomNumber(),
      tittel: post.tittel,
      beskrivelse: post.beskrivelse,
      requirements: []
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
      onSubmit={handleSubmit(onNewNeedSubmit)}
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
            name="tittel"
            ref={register}
            isInvalid={!!errors.tittel}
          />
          {errors.tittel && (
            <Form.Control.Feedback type="invalid">
              {errors.tittel?.message}
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
            name="beskrivelse"
            ref={register}
            isInvalid={!!errors.beskrivelse}
          />
          {errors.beskrivelse && (
            <Form.Control.Feedback type="invalid">
              {errors.beskrivelse.message}
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
