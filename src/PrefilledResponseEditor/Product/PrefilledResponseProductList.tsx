import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { Parentable } from '../../models/Parentable';
import { PrefilledResponseProduct } from '../../models/PrefilledResponseProduct';
import { Product } from '../../models/Product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProduct,
  removeProduct,
  selectProduct
} from '../../store/reducers/PrefilledResponseReducer';

interface IFormInput {
  product: string;
}

interface IOption {
  id: string;
  title: string;
  level: number;
}

export default function ProductSpecList(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { normalizedList } = useAppSelector((state) => state.bank);
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

  if (!id) {
    return <p>No selected bank</p>;
  }

  const bankSelected = normalizedList[id];

  const levelOptions = (products: Parentable<Product>[]) => {
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

  const addProductToPrefilledResponse = (post: IFormInput) => {
    const selectedProduct = Utils.ensure(
      bankSelected.products.find(
        (product: Product) => product.id === post.product
      )
    );
    const newProduct: PrefilledResponseProduct = {
      id: uuidv4(),
      originProduct: selectedProduct,
      title: selectedProduct.title,
      description: selectedProduct.description,
      answeredVariants: [],
      requirementAnswers: []
    };
    dispatch(addProduct(newProduct));
  };

  const removeProductFromPrefilledResponse = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  const productList = (productArray: PrefilledResponseProduct[]) => {
    const items = productArray.map((product: PrefilledResponseProduct) => {
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
              <BsPencil />
            </Button>
          </Link>
          <Button
            variant="warning"
            className="ms-1"
            onClick={() => removeProductFromPrefilledResponse(product.id)}
          >
            <BsTrashFill />
          </Button>
        </ListGroup.Item>
      );
    });
    return <ListGroup>{items}</ListGroup>;
  };

  return (
    <Container fluid>
      <Form
        onSubmit={handleSubmit(addProductToPrefilledResponse)}
        autoComplete="off"
      >
        <Row>
          <h2 className="m-4">{t('product selection')}</h2>
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
      </Form>
    </Container>
  );
}
