import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { RootState } from '../../store/store';
import { editBankId, editTitle } from '../../store/reducers/response-reducer';

type FormInput = {
  title: string;
};

const titleSchema = Joi.object().keys({
  title: Joi.string().required()
});

export default function ResponseEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { response } = useSelector((state: RootState) => state.response);
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(titleSchema)
  });
  const dispatch = useDispatch();

  if (!id) {
    return <p>No selected bank</p>;
  }

  dispatch(editBankId(id));

  const saveTitle = (post: FormInput) => {
    dispatch(editTitle(post.title));
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <Row className="mt-4">
            <h3>Response </h3>
          </Row>
          <Row className="mt-4 mb-4">
            <h5>Specification {response.spesification.title}</h5>
          </Row>
          <Form onSubmit={handleSubmit(saveTitle)}>
            <Form.Group as={Row}>
              <Form.Label>Title</Form.Label>
              <Col sm={8}>
                <FormControl
                  name="title"
                  ref={register}
                  defaultValue={response.title}
                  isInvalid={!!errors.title}
                />
                {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col sm={2}>
                <Button type="submit">Save</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
