import React, { ReactElement, useContext, useState } from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Utils } from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { putProjectThunk } from '../../store/reducers/project-reducer';
import { AccordionContext } from './AccordionContext';

type FormValues = {
  tittel: string;
  beskrivelse: string;
};
interface IProps {
  project: Bank;
}

function NewNeedForm(props: IProps): ReactElement {
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { register, handleSubmit, reset, errors } = useForm();

  const onNewNeedSubmit = (post: FormValues, e: any) => {
    const need: Need = {
      id: Utils.getRandomNumber(),
      tittel: post.tittel,
      beskrivelse: post.beskrivelse,
      requirements: []
    };
    // TODO: Black magic here. Must be a better way
    let clonedProject = { ...props.project };
    clonedProject.needs = [...clonedProject.needs, need];
    dispatch(putProjectThunk(clonedProject));
    // reset the form
    reset();

    // Close accordion via useContext
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit(onNewNeedSubmit)}
      autoComplete="on"
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
          ></Form.Control>
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
          ></Form.Control>
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
