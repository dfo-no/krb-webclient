import React, { ReactElement, useContext, useState } from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import {
  editNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { AccordionContext } from './AccordionContext';

type FormValues = {
  id: string;
  tittel: string;
  beskrivelse: string;
};
interface IProps {
  project: Bank;
  need: Need;
}

function EditNeedForm(props: IProps): ReactElement {
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: props.need.id,
      tittel: props.need.tittel,
      beskrivelse: props.need.beskrivelse
    }
  });

  const onEditNeedSubmit = (post: FormValues) => {
    dispatch(
      editNeed({
        projectId: props.project.id,
        needId: +post.id,
        tittel: post.tittel,
        beskrivelse: post.beskrivelse
      })
    );
    dispatch(putProjectThunk(props.project.id));

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
            name="tittel"
            ref={register({
              required: { value: true, message: 'Required' },
              minLength: {
                value: 2,
                message: 'Minimum 2 characters'
              }
            })}
            isInvalid={!!errors.tittel}
          />
          {errors.tittel && (
            <Form.Control.Feedback type="invalid">
              {errors.tittel.message}
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
            ref={register({
              required: { value: true, message: 'Required' },
              minLength: {
                value: 2,
                message: 'Minimum 2 characters'
              }
            })}
            isInvalid={!!errors.beskrivelse}
          />
          {errors.beskrivelse && (
            <Form.Control.Feedback type="invalid">
              {errors.beskrivelse.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Form.Control type="hidden" name="id" ref={register}></Form.Control>
      <Button className="mt-2" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditNeedForm;
