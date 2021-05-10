import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import { ResponseProduct } from '../../models/ResponseProduct';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RootState } from '../../store/store';
import ModelType from '../../models/ModelType';
import { addProduct, editProduct } from '../../store/reducers/response-reducer';
import ProductRequirementView from './ProductRequirementView';
import { Bank } from '../../models/Bank';
import ErrorSummary from '../../Form/ErrorSummary';

interface IResponseProductForm {
  title: string;
  description: string;
  price: number;
}

const productSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number().integer().min(1).required()
});

export default function ResponseProductEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { response } = useSelector((state: RootState) => state.response);
  const { productId } = useSelector(
    (state: RootState) => state.selectedResponseProduct
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productSchema)
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!id) {
    return <p>No selected bank</p>;
  }

  if (!productId) {
    return <p>No selected product</p>;
  }

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  const specProduct: SpecificationProduct = Utils.ensure(
    response.spesification.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
  );

  const productIndex = response.products.findIndex(
    (product) => product.originProduct.id === specProduct.id
  );

  const newProduct: ResponseProduct = {
    id: uuidv4(),
    title: '',
    description: '',
    originProduct: specProduct,
    price: 0,
    requirementAnswers: [],
    type: ModelType.responseProduct
  };

  const product =
    productIndex === -1 ? newProduct : response.products[productIndex];

  const addProductToResponse = (post: IResponseProductForm) => {
    const newResponseProduct: ResponseProduct = {
      ...product
    };
    newResponseProduct.title = post.title;
    newResponseProduct.description = post.description;
    newResponseProduct.price = post.price;

    if (productIndex === -1) {
      dispatch(addProduct(newResponseProduct));
    } else {
      dispatch(editProduct({ product: newResponseProduct, productIndex }));
    }
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <h4>{specProduct.title}</h4>
      </Row>
      <Card className="m-4">
        <Card.Body>
          <Row className="mb-3">
            <Col sm="2"> Amount:</Col>
            <Col sm="10">
              <p className="ml-3">{specProduct.amount} </p>
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
                  defaultValue={product.price}
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
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  {...register('title')}
                  defaultValue={product.title}
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
                  {...register('description')}
                  defaultValue={product.description}
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

      <ProductRequirementView
        product={specProduct}
        selectedBank={selectedBank}
      />
    </Container>
  );
}
