import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import ErrorSummary from '../../../Form/ErrorSummary';
import Utils from '../../../common/Utils';
import {
  addProduct,
  removeProduct,
  selectProduct
} from '../../../store/reducers/PrefilledResponseReducer';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useGetBankQuery } from '../../../store/api/bankApi';

interface IFormInput {
  product: string;
}

interface IOption {
  id: string;
  title: string;
  level: number;
}

export default function ProductSpecList(): ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(id ?? '');
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();
  const dispatch = useAppDispatch();

  if (!id || !bankSelected) {
    return <p>No selected bank</p>;
  }

  const levelOptions = (products: Parentable<IProduct>[]): IOption[] => {
    const newList = Utils.parentable2Levelable(products);
    const options: IOption[] = [];

    newList.forEach((item) => {
      options.push({
        id: item.id,
        title: item.title,
        level: item.level
      });
    });
    return options;
  };

  const addProductToPrefilledResponse = (post: IFormInput): void => {
    const selectedProduct = Utils.ensure(
      bankSelected.products.find(
        (product: IProduct) => product.id === post.product
      )
    );
    const newProduct: IPrefilledResponseProduct = {
      id: uuidv4(),
      originProduct: selectedProduct,
      title: selectedProduct.title,
      description: selectedProduct.description,
      answeredVariants: [],
      requirementAnswers: [],
      relatedProducts: []
    };
    dispatch(addProduct(newProduct));
  };

  const removeProductFromPrefilledResponse = (productId: string): void => {
    dispatch(removeProduct(productId));
  };

  const productList = (
    productArray: IPrefilledResponseProduct[]
  ): ReactElement => {
    const items = productArray.map((product: IPrefilledResponseProduct) => {
      return (
        <ListGroup.Item key={product.id} className="d-flex align-items-center">
          <div className="">
            {Utils.capitalizeFirstLetter(product.originProduct.title)}
          </div>

          <div className="flex-grow-1">&nbsp;</div>
          <Link
            onClick={() => dispatch(selectProduct(product))}
            to={`/prefilledresponse/${id}/product/${product.id}`}
          >
            <Button>
              <EditIcon />
            </Button>
          </Link>
          <Button
            variant="warning"
            onClick={() => removeProductFromPrefilledResponse(product.id)}
          >
            <DeleteIcon />
          </Button>
        </ListGroup.Item>
      );
    });
    return <ListGroup>{items}</ListGroup>;
  };

  return (
    <Container fluid>
      {bankSelected && (
        <form
          onSubmit={handleSubmit(addProductToPrefilledResponse)}
          autoComplete="off"
        >
          <Row>
            <h2 className="m-4">{t('Product selection')}</h2>
          </Row>
          <Row className="ml-2 mt-4">
            <Col>
              <Form.Control as="select" {...register('product')}>
                {levelOptions(bankSelected.products).map((element) => (
                  <option key={element.id} value={element.id}>
                    {Utils.generatePaddingChars(element.level)}
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
          <Row className=" ml-4">{productList(prefilledResponse.products)}</Row>
          <ErrorSummary errors={errors} />
        </form>
      )}
    </Container>
  );
}
