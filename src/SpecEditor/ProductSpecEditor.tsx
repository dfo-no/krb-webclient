import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../common/Utils';
import { SpecificationProduct } from '../models/SpecificationProduct';
import { editSpecProduct } from '../store/reducers/spesification-reducer';
import { RootState } from '../store/store';
import ProductRequirementSelectorList from './ProductRequirementSelectorList';

type FormInput = {
  title: string;
  description: string;
  amount: number;
};

export default function ProductSpecEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { products } = useSelector((state: RootState) => state.specification);
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  if (!id) {
    return <p>No selected bank</p>;
  }

  if (!productId) {
    return <p>No selected product</p>;
  }

  const specProduct = Utils.ensure(
    products.find((product: SpecificationProduct) => product.id === productId)
  );
  const bankSelected = Utils.ensure(list.find((bank) => bank.id === id));
  const addProductToSpecification = (post: FormInput) => {
    const newProduct: SpecificationProduct = {
      ...specProduct
    };
    newProduct.title = post.title;
    newProduct.description = post.description;
    newProduct.amount = post.amount;
    dispatch(editSpecProduct({ product: newProduct }));
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
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Amount
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="amount"
                  type="number"
                  defaultValue={specProduct.amount}
                  ref={register}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="title"
                  defaultValue={specProduct.title}
                  ref={register}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="description"
                  defaultValue={specProduct.description}
                  ref={register}
                />
              </Col>
            </Form.Group>
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">Save</Button>
            </Col>
          </Form>
        </Card.Body>
      </Card>
      <Row className="m-4">
        <ProductRequirementSelectorList
          product={specProduct}
          selectedBank={bankSelected}
        />
      </Row>
    </Container>
  );
}
