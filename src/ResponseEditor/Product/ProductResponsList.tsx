import React, { ReactElement } from 'react';
import { ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BsPencil } from 'react-icons/bs';
import { Link, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ModelType from '../../models/ModelType';
import { ResponseProduct } from '../../models/ResponseProduct';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct } from '../../store/reducers/response-reducer';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import {
  selectResponseProduct,
  selectResponseSpecificationProduct
} from '../../store/reducers/selectedResponseProduct-reducer';

interface RouteParams {
  bankId: string;
}

export default function ProductResponseList(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/response/:bankId');
  const { id } = useAppSelector((state) => state.selectedBank);
  const { response } = useAppSelector((state) => state.response);

  const dispatch = useAppDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }
  const generateResponseProduct = (
    specificationProduct: SpecificationProduct
  ) => {
    dispatch(selectResponseSpecificationProduct(specificationProduct));
    const productIndex = response.products.findIndex(
      (responseProduct) =>
        responseProduct.originProduct.id === specificationProduct.id
    );

    const newProduct: ResponseProduct = {
      id: uuidv4(),
      title: '',
      description: '',
      originProduct: specificationProduct,
      price: 0,
      requirementAnswers: []
    };
    const product: ResponseProduct =
      productIndex !== -1 ? response.products[productIndex] : newProduct;
    if (productIndex === -1) {
      dispatch(addProduct(newProduct));
    }

    dispatch(selectResponseProduct(product));
  };

  const productList = (productArray: SpecificationProduct[]) => {
    const items = productArray.map((product: SpecificationProduct) => {
      return (
        <ListGroup.Item key={product.id + 1}>
          <Row>
            <p className="ml-2 mr-4  mt-1">
              {Utils.capitalizeFirstLetter(product.title)}, {product.amount} stk
            </p>
            <Link
              onClick={() => generateResponseProduct(product)}
              to={`/response/${id}/product/${product.id}`}
            >
              <BsPencil className="ml-4  mt-1" />
            </Link>
          </Row>
          <Row>
            <p className="ml-2 mr-4  mt-1">
              {Utils.capitalizeFirstLetter(product.originProduct.description)}
            </p>
          </Row>
        </ListGroup.Item>
      );
    });
    return <ListGroup className="w-100">{items}</ListGroup>;
  };
  return (
    <Container fluid>
      <Row className="m-4">
        <h4>Products</h4>
      </Row>
      <Row className=" ml-4">
        {productList(response.spesification.products)}
      </Row>
    </Container>
  );
}
