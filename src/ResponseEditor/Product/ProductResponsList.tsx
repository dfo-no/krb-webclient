import React, { ReactElement } from 'react';
import { ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import Utils from '../../common/Utils';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { RootState } from '../../store/store';
import { selectResponseProduct } from '../../store/reducers/selectedResponseProduct-reducer';

interface RouteParams {
  bankId: string;
}

export default function ProductResponseList(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/response/:bankId');
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { response } = useSelector((state: RootState) => state.response);

  const dispatch = useDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }

  const productList = (productArray: SpecificationProduct[]) => {
    const items = productArray.map((product: SpecificationProduct) => {
      return (
        <ListGroup.Item key={product.id + 1}>
          <Row>
            <p className="ml-2 mr-4  mt-1">
              {Utils.capitalizeFirstLetter(product.title)}, {product.amount} stk
            </p>
            <Link
              onClick={() => dispatch(selectResponseProduct(product.id))}
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
