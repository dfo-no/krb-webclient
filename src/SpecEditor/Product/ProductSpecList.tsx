import React, { ReactElement } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencil } from 'react-icons/bs';
import { Link, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import ModelType from '../../models/ModelType';
import { Nestable } from '../../models/Nestable';
import { Product } from '../../models/Product';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { selectSpecificationProduct } from '../../store/reducers/selectedSpecProduct-reducer';
import { addProduct } from '../../store/reducers/spesification-reducer';
import styles from './ProductSpecEditor.module.scss';

type FormInput = {
  product: string;
};

interface RouteParams {
  bankId: string;
}

interface IOption {
  id: string;
  title: string;
  level: number;
}

export default function ProductSpecList(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/specification/:bankId');
  const { id } = useAppSelector((state) => state.selectedBank);
  const { normalizedList } = useAppSelector((state) => state.bank);
  const { spec } = useAppSelector((state) => state.specification);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const dispatch = useAppDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }

  const bankSelected = normalizedList[id];

  const levelOptions = (products: Nestable<Product>[]) => {
    const newList = Utils.unflatten(products)[0];
    const options: IOption[] = [];

    const getAllItemsPerChildren = (item: Nestable<Product>, level = 0) => {
      options.push({
        id: item.id,
        title: item.title,
        level
      });
      if (item.children) {
        const iteration = level + 1;
        item.children.forEach((i: Nestable<Product>) =>
          getAllItemsPerChildren(i, iteration)
        );
      }
    };

    newList.forEach((element) => {
      return getAllItemsPerChildren(element);
    });
    return options;
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
      title: selectedProduct.title,
      description: selectedProduct.description,
      amount: 0,
      weight: 10,
      requirements: [],
      requirementAnswers: []
    };
    dispatch(addProduct({ product: newProduct }));
  };

  const productList = (productArray: SpecificationProduct[]) => {
    const items = productArray.map((product: SpecificationProduct) => {
      return (
        <ListGroup.Item key={product.id}>
          <Row className="d-flex justify-content-end">
            <p className="ml-2 mr-4  mt-1">
              {Utils.capitalizeFirstLetter(product.originProduct.title)}
            </p>
            <Link
              onClick={() => dispatch(selectSpecificationProduct(product))}
              to={`/specification/${id}/product/${product.id}`}
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
          <h2 className="m-4">{t('product selection')}</h2>
        </Row>
        <Row className="ml-2 mt-4">
          <Col>
            <Form.Control as="select" {...register('product')}>
              {levelOptions(bankSelected.products).map((element) => (
                <option
                  key={element.id}
                  value={element.id}
                  className={` ${styles[`level${element.level}`]}`}
                >
                  {element.title}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Button type="submit">{t('add')}</Button>
          </Col>
        </Row>
        <Row className="m-4">
          <h4>{t('Products')}</h4>
        </Row>
        <Row className=" ml-4">{productList(spec.products)}</Row>
        <ErrorSummary errors={errors} />
      </Form>
    </Container>
  );
}
