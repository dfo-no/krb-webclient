import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import ModelType from '../../models/ModelType';
import {
  ResponseProduct,
  responseProductSchema
} from '../../models/ResponseProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct, editProduct } from '../../store/reducers/response-reducer';
import { selectResponseProduct } from '../../store/reducers/selectedResponseProduct-reducer';
import ResponseProductRequirementSelector from './ResponseProductRequirementSelector';

export default function ResponseProductEditor(): ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );

  const productIndex = response.products.findIndex(
    (responseProduct) =>
      responseProduct.originProduct.id === selectedSpecificationProduct.id
  );

  const newProduct: ResponseProduct = {
    id: uuidv4(),
    title: '',
    description: '',
    originProduct: selectedSpecificationProduct,
    price: 0,
    requirementAnswers: [],
    type: ModelType.responseProduct
  };

  const product =
    productIndex === -1 ? newProduct : response.products[productIndex];

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResponseProduct>({
    resolver: joiResolver(responseProductSchema),
    defaultValues: product
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  dispatch(selectResponseProduct(product));
  if (productIndex === -1) {
    dispatch(addProduct(newProduct));
  }
  const addProductToResponse = (post: ResponseProduct) => {
    const newResponseProduct: ResponseProduct = {
      ...post
    };

    if (productIndex === -1) {
      dispatch(addProduct(newResponseProduct));
    } else {
      dispatch(editProduct({ product: newResponseProduct, productIndex }));
    }
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <h4>{selectedSpecificationProduct.title}</h4>
      </Row>
      <Card className="m-4">
        <Card.Body>
          <Row className="mb-3">
            <Col sm="2"> Amount:</Col>
            <Col sm="10">
              <p className="ml-3">{selectedSpecificationProduct.amount} </p>
            </Col>
          </Row>
          <Form
            onSubmit={handleSubmit(addProductToResponse)}
            autoComplete="off"
          >
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  {...register('price')}
                  isInvalid={!!errors.price}
                />
                {errors.price && (
                  <Form.Control.Feedback type="invalid">
                    {errors.price?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                {t('Title')}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  {...register('title')}
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
                {t('Description')}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  {...register('description')}
                  isInvalid={!!errors.description}
                />
                {errors.description && (
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
          </Form>
        </Card.Body>
      </Card>

      <ResponseProductRequirementSelector
        product={selectedSpecificationProduct}
      />
    </Container>
  );
}
