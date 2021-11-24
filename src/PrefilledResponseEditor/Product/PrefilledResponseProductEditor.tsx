/* eslint-disable no-plusplus */
import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React from 'react';
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
import {
  IPrefilledResponseProduct,
  PrefilledResponseProductSchema
} from '../../models/IPrefilledResponseProduct';
import { Levelable } from '../../models/Levelable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
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
    register,
    formState: { errors }
  } = useForm<IPrefilledResponseProduct>({
    resolver: joiResolver(PrefilledResponseProductSchema),
    defaultValues: selectedProduct
  });

  if (!id) return <p>No selected bank</p>;

  const addProductToSpecification = (post: IPrefilledResponseProduct) => {
    const newProduct = {
      ...post
    };
    const productIndex = prefilledResponse.products.findIndex(
      (product: IPrefilledResponseProduct) => product.id === selectedProduct.id
    );
    dispatch(editProduct({ product: newProduct, productIndex }));
  };

  const findNeedIdsForProduct = (productId: string, needArray: INeed[]) => {
    const result: string[] = [];
    needArray.forEach((need) => {
      need.requirements.forEach((req) => {
        req.variants.forEach((variant) => {
          if (variant.products.includes(productId)) {
            result.push(need.id);
          } else {
            for (let i = 0; i < selectedProduct.relatedProducts.length; i++) {
              if (
                variant.products.includes(selectedProduct.relatedProducts[i])
              ) {
                result.push(need.id);
              }
            }
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

  const needs = getPaths(
    needIds,
    prefilledResponse.bank.needs
  ) as Levelable<INeed>[];

  const checkIfNeedHasRenderedAnswer = (
    need: Levelable<INeed>,
    productId: string
  ) => {
    let used = false;
    need.requirements.forEach((req) => {
      req.variants.forEach((variant) => {
        if (
          variant.products.includes(productId) &&
          variant.questions.length > 0
        ) {
          used = true;
        }
      });
    });
    return used;
  };

  function checkIfNeedHasRenderedAnswerInRelatedProduct(
    relatedProducts: string[],
    need: Levelable<INeed>,
    selectedOriginProductId: string
  ): [boolean, string] {
    let productIsUsed: boolean = checkIfNeedHasRenderedAnswer(
      need,
      selectedOriginProductId
    );

    let matchedProductId: string = selectedOriginProductId;

    if (productIsUsed) {
      return [productIsUsed, matchedProductId];
    }

    for (let i = 0; i < relatedProducts.length; i++) {
      productIsUsed = checkIfNeedHasRenderedAnswer(need, relatedProducts[i]);

      if (productIsUsed) {
        matchedProductId = relatedProducts[i];
        break;
      }
    }
    return [productIsUsed, matchedProductId];
  }

  const renderNeedsList = (list: Levelable<INeed>[]) => {
    return list.map((need) => {
      const margin = need.level === 1 ? '0rem' : `${need.level - 1}rem`;
      const [used, productId] = checkIfNeedHasRenderedAnswerInRelatedProduct(
        selectedProduct.relatedProducts,
        need,
        selectedProduct.originProduct.id
      );
      return (
        <Card style={{ marginLeft: margin }} key={need.id}>
          <Card.Header>{need.title}</Card.Header>
          {used && (
            <Card.Body>
              <AnswerForm
                element={need}
                product={selectedProduct}
                searchProductId={productId}
              />
            </Card.Body>
          )}
        </Card>
      );
    });
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

            {prefilledResponse.bank.products.length > 1 && (
              <>
                <Form.Label>Tilsvarende produkter</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  {...register(`relatedProducts` as const)}
                >
                  {prefilledResponse.bank.products.map((element: IProduct) => (
                    <option key={element.id} value={element.id}>
                      {element.title}
                    </option>
                  ))}
                </Form.Control>
              </>
            )}
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
          </Form>
        </Card.Body>
      </Card>
      <Row className="m-4" />
      {renderNeedsList(needs)}
    </Container>
  );
}
