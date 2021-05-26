import React, { ReactElement } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import InputRow from '../../Form/InputRow';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { editSpecProduct } from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import ProductRequirementSelectorList from './ProductRequirementSelectorList';
import ErrorSummary from '../../Form/ErrorSummary';

type FormInput = {
  title: string;
  description: string;
  amount: number;
};

const productSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  amount: Joi.number().integer().min(1).required()
});

export default function ProductSpecEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { spec } = useSelector((state: RootState) => state.specification);
  const { t } = useTranslation();
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const dispatch = useDispatch();
  const specProduct = Utils.ensure(
    spec.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
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

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: joiResolver(productSchema),
    defaultValues: {
      amount: specProduct.amount,
      title: specProduct.title,
      description: specProduct.description
    }
  });

  /* TODO: wont' work due to defaultValues and form hook above */
  /* if (!id) {
    return <p>No selected bank</p>;
  }

  if (!productId) {
    return <p>No selected product</p>;
  } */

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
            <InputRow
              control={control}
              errors={errors}
              name="amount"
              type="number"
              label="Amount"
            />
            <InputRow
              control={control}
              errors={errors}
              name="title"
              label={t('Title')}
            />
            <InputRow
              control={control}
              errors={errors}
              name="description"
              label={t('Description')}
            />
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
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
