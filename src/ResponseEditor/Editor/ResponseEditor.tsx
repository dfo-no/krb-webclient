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
import {
  editBankId,
  editSupplier
} from '../../store/reducers/response-reducer';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';

interface IResponseInfoForm {
  supplier: string;
}

const titleSchema = Joi.object().keys({
  title: Joi.string().required()
});

export default function ResponseEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { response } = useSelector((state: RootState) => state.response);
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(titleSchema)
  });
  const dispatch = useDispatch();

  if (!id) {
    return <p>No selected bank</p>;
  }

  dispatch(editBankId(id));
  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  const saveSupplier = (post: IResponseInfoForm) => {
    dispatch(editSupplier(post.supplier));
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
          <Row>
            <h6>Kravbank {selectedBank.title}</h6>
          </Row>
          <Form onSubmit={handleSubmit(saveSupplier)}>
            <Form.Group as={Row}>
              <Form.Label>Supplier</Form.Label>
              <Col sm={8}>
                <FormControl
                  name="supplier"
                  ref={register}
                  defaultValue={response.supplier}
                  isInvalid={!!errors.supplier}
                />
                {errors.supplier && (
                  <Form.Control.Feedback type="invalid">
                    {errors.supplier?.message}
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
