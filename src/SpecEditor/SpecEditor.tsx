/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import { RootState } from '../store/store';
import { Bank } from '../models/Bank';
import Utils from '../common/Utils';
import { editBankId, editTitle } from '../store/reducers/spesification-reducer';

type FormInput = {
  title: string;
};

export default function SpecEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  if (!id) {
    return <p>No selected bank</p>;
  }

  dispatch(editBankId(id));

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  const saveTitle = (post: FormInput) => {
    dispatch(editTitle(post.title));
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <Form onSubmit={handleSubmit(saveTitle)}>
            <Form.Group as={Row}>
              <Form.Label>Title</Form.Label>
              <Col sm={8}>
                <FormControl name="title" ref={register} />
              </Col>
              <Col sm={2}>
                <Button type="submit">Save</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="m-4">
        <h4>Bank {selectedBank.title}</h4>
      </Row>
      <Row className=" m-4 d-flex justify-content-md-end">
        <Button>Update</Button>
      </Row>
    </Container>
  );
}
