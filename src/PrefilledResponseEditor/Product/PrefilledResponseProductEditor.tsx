import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import {
  PrefilledResponseProduct,
  PrefilledResponseProductSchema
} from '../../models/PrefilledResponseProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editProduct } from '../../store/reducers/PrefilledResponseReducer';

export default function PrefilledResponseProductEditor(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { t } = useTranslation();
  const { selectedProduct, prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PrefilledResponseProduct>({
    resolver: joiResolver(PrefilledResponseProductSchema),
    defaultValues: selectedProduct
  });

  if (!id) return <p>No selected bank</p>;

  const addProductToSpecification = (post: PrefilledResponseProduct) => {
    const newProduct = {
      ...post
    };
    const productIndex = prefilledResponse.products.findIndex(
      (product) => product.id === selectedProduct.id
    );
    dispatch(editProduct({ product: newProduct, productIndex }));
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <h4>Nytt produkt</h4>
      </Row>
      <Card className="m-4">
        <Card.Body>
          <Form
            onSubmit={handleSubmit(addProductToSpecification)}
            autoComplete="off"
          >
            <InputRow
              control={control}
              errors={errors}
              name="title"
              label={t('Title')}
            />
            <InputRow
              control={control}
              errors={errors}
              name="description"
              label={t('Description')}
            />
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
          </Form>
        </Card.Body>
      </Card>
      <Row className="m-4" />
    </Container>
  );
}
