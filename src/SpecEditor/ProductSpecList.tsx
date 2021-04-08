import React, { ReactElement, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import { useForm } from 'react-hook-form';
import { BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../common/Utils';
import { Bank } from '../models/Bank';
import { Product } from '../models/Product';
import { SpecificationProduct } from '../models/SpecificationProduct';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { addProduct } from '../store/reducers/spesification-reducer';
import { RootState } from '../store/store';
import styles from './ProductSpecEditor.module.scss';
import MODELTYPE from '../models/ModelType';
import { selectSpecProduct } from '../store/reducers/selectedSpecProduct-reducer';

type FormInput = {
  product: string;
};

interface RouteParams {
  bankId: string;
}

export default function ProductSpecList(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/speceditor/:bankId');
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { products } = useSelector((state: RootState) => state.specification);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }

  const bankSelected = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  const childrenHierarchy = (listofProducts: any[], level: number) => {
    let n = level;
    let children: any;
    const cssClass = `level${n}`;
    return listofProducts.map((element: any) => {
      if (element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      return (
        <>
          <option
            key={element.id}
            value={element.id}
            className={` ${styles[cssClass]}`}
          >
            {element.title}
          </option>
          {children}
        </>
      );
    });
  };
  const productHierarchy = (productList: Product[]) => {
    const newList = Utils.unflatten(productList)[0];
    let children: any;
    const result = newList.map((element: any) => {
      if (element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }

      return (
        <>
          <option key={element.id} value={element.id}>
            {element.title}
          </option>
          {children}
        </>
      );
    });
    return result;
  };

  const addProductToSpecification = (post: FormInput) => {
    const selectedProduct = Utils.ensure(
      bankSelected.products.find(
        (product: Product) => product.id === post.product
      )
    );
    const newProduct: SpecificationProduct = {
      id: uuidv4(),
      originProduct: selectedProduct,
      title: '',
      description: '',
      amount: 0,
      type: MODELTYPE.specificationProduct
    };
    dispatch(addProduct({ product: newProduct }));
  };

  const productList = (productArray: SpecificationProduct[]) => {
    const items = productArray.map((product: SpecificationProduct) => {
      return (
        <ListGroup.Item key={product.id + 1}>
          <Row className="d-flex justify-content-end">
            <p className="ml-2 mr-4  mt-1">
              {Utils.capitalizeFirstLetter(product.originProduct.title)}
            </p>
            <Link
              onClick={() => dispatch(selectSpecProduct(product.id))}
              to={`/speceditor/${id}/product/${product.id}`}
            >
              <BsPencil className="ml-2  mt-1" />
            </Link>
          </Row>
        </ListGroup.Item>
      );
    });
    return <ListGroup>{items}</ListGroup>;
  };
  return (
    <Container fluid>
      <Form
        onSubmit={handleSubmit(addProductToSpecification)}
        autoComplete="off"
      >
        <Row>
          <h2 className="m-4">Product selection</h2>
        </Row>
        <Row className="ml-2 mt-4">
          <Col>
            <Form.Control as="select" name="product" ref={register}>
              {productHierarchy(bankSelected.products)}
            </Form.Control>
          </Col>
          <Col>
            <Button type="submit">Add</Button>
          </Col>
        </Row>
        <Row className="m-4">
          <h4>Products</h4>
        </Row>
        <Row className=" ml-4">{productList(products)}</Row>
      </Form>
    </Container>
  );
}
