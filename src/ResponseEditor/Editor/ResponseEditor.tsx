import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { Bank } from '../../models/Bank';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editSupplier, setBank } from '../../store/reducers/response-reducer';

interface IResponseInfoForm {
  supplier: string;
}

const supplierSchema = Joi.object().keys({
  supplier: Joi.string().required()
});

export default function ResponseEditor(): ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { list } = useAppSelector((state) => state.bank);
  const { response } = useAppSelector((state) => state.response);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(supplierSchema)
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (!id) {
    return <p>No selected bank</p>;
  }

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  dispatch(setBank(selectedBank));

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
                  {...register('supplier')}
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
                <Button type="submit">{t('save')}</Button>
              </Col>
            </Form.Group>
            <ErrorSummary errors={errors} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
