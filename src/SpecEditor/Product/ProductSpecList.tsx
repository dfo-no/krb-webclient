import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../common/LoaderSpinner';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { Nestable } from '../../models/Nestable';
import { IProduct } from '../../Nexus/entities/IProduct';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { selectSpecificationProduct } from '../../store/reducers/selectedSpecProduct-reducer';
import {
  addProduct,
  setBank
} from '../../store/reducers/spesification-reducer';
import styles from './ProductSpecEditor.module.scss';
import Nexus from '../../Nexus/Nexus';

type FormInput = {
  product: string;
};

interface IRouteParams {
  id: string;
}

interface IOption {
  id: string;
  title: string;
  level: number;
}

export default function ProductSpecList(): React.ReactElement {
  const { id } = useParams<IRouteParams>();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  // const projectMatch = useRouteMatch<IRouteParams>('/specification/:bankId');
  // const { id } = useAppSelector((state) => state.selectedBank);
  // const { normalizedList } = useAppSelector((state) => state.bank);
  const { spec } = useAppSelector((state) => state.specification);
  const { data: bankSelected, isLoading } = useGetBankQuery(id ?? '');

  useEffect(() => {
    if (id) {
      dispatch(selectBank(id));
    }
    if (bankSelected) {
      dispatch(setBank(bankSelected));
    }
  }, [dispatch, id, bankSelected]);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>();

  /* if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  } */

  if (!id || !bankSelected) {
    return <p>No selected bank</p>;
  }

  // const bankSelected = normalizedList[id];

  const levelOptions = (products: Nestable<IProduct>[]) => {
    const newList = Utils.unflatten(products)[0];
    const options: IOption[] = [];

    const getAllItemsPerChildren = (item: Nestable<IProduct>, level = 0) => {
      options.push({
        id: item.id,
        title: item.title,
        level
      });
      if (item.children) {
        const iteration = level + 1;
        item.children.forEach((i: Nestable<IProduct>) =>
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
        (product: IProduct) => product.id === post.product
      )
    );
    const newProduct: ISpecificationProduct =
      nexus.specificationService.generateDefaultSpecificationProductValues();
    dispatch(addProduct({ product: newProduct }));
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const productList = (productArray: ISpecificationProduct[]) => {
    const items = productArray.map((product: ISpecificationProduct) => {
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
              <EditIcon className="ml-2  mt-1" />
            </Link>
          </Row>
        </ListGroup.Item>
      );
    });
    return <ListGroup>{items}</ListGroup>;
  };

  return (
    <Container fluid>
      <form
        onSubmit={handleSubmit(addProductToSpecification)}
        autoComplete="off"
      >
        <Row>
          <h2 className="m-4">{t('Product selection')}</h2>
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
            <Button variant="primary" type="submit">
              {t('Add')}
            </Button>
          </Col>
        </Row>
        <Row className="m-4">
          <h4>{t('Products')}</h4>
        </Row>
        <Row className=" ml-4">{productList(spec.products)}</Row>
        <ErrorSummary errors={errors} />
      </form>
    </Container>
  );
}
