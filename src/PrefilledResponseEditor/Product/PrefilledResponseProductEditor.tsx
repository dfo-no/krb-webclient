import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getPaths } from '../../common/Tree';
import ControlledTextInput from '../../Form/ControlledTextInput';
import ErrorSummary from '../../Form/ErrorSummary';
import { Levelable } from '../../models/Levelable';
import { Need } from '../../models/Need';
import {
  PrefilledResponseProduct,
  PrefilledResponseProductSchema
} from '../../models/PrefilledResponseProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editProduct } from '../../store/reducers/PrefilledResponseReducer';
import AnswerForm from './AnswerForm';

export default function PrefilledResponseProductEditor(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { t } = useTranslation();
  const { selectedProduct, prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PrefilledResponseProduct>({
    resolver: joiResolver(PrefilledResponseProductSchema),
    defaultValues: selectedProduct
  });

  if (!id) return <p>No selected bank</p>;

  const addProductToSpecification = (post: PrefilledResponseProduct) => {
    const newProduct = {
      ...post
    };
    const productIndex = prefilledResponse.products.findIndex(
      (product) => product.id === selectedProduct.id
    );
    dispatch(editProduct({ product: newProduct, productIndex }));
  };

  const findNeedIdsForProduct = (productId: string, needArray: Need[]) => {
    const result: string[] = [];
    needArray.forEach((need) => {
      need.requirements.forEach((req) => {
        req.variants.forEach((variant) => {
          if (variant.products.includes(productId)) {
            result.push(need.id);
          }
        });
      });
    });
    return result;
  };

  const needIds = findNeedIdsForProduct(
    selectedProduct.originProduct.id,
    prefilledResponse.bank.needs
  );

  const needs = getPaths(needIds, prefilledResponse.bank.needs);

  const renderNeedsList = (list: Levelable<Need>[]) => {
    return list.map((need) => {
      const margin = need.level === 1 ? '0rem' : `${need.level - 1}rem`;
      return (
        <Accordion style={{ marginLeft: margin }} key={need.id}>
          <Accordion.Item eventKey={need.id}>
            <Accordion.Header>{need.title}</Accordion.Header>
            <Accordion.Body>
              <AnswerForm element={need} product={selectedProduct} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    });
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <h4>Nytt produkt (PrefilledResponseProductEditor)</h4>
      </Row>
      <Card className="m-4">
        <Card.Body>
          <Form
            onSubmit={handleSubmit(addProductToSpecification)}
            autoComplete="off"
            className="mb-2"
          >
            <div>{t('Title')}</div>
            <ControlledTextInput
              control={control}
              name="title"
              error={get(errors, `title`) as FieldError}
            />
            <div>{t('Description')}</div>
            <ControlledTextInput
              control={control}
              name="description"
              error={get(errors, `description`) as FieldError}
            />
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
          </Form>
          {renderNeedsList(needs)}
        </Card.Body>
      </Card>
      <Row className="m-4" />
    </Container>
  );
}
