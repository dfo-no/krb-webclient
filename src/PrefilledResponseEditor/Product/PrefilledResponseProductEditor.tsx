/* eslint-disable no-plusplus */
import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React from 'react';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import {
  editProduct,
  selectProduct
} from '../../store/reducers/PrefilledResponseReducer';
import NeedsList from './NeedsList';

export default function PrefilledResponseProductEditor(): React.ReactElement {
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

  const addProductToSpecification = (post: IPrefilledResponseProduct) => {
    const newProduct = {
      ...post
    };
    const productIndex = prefilledResponse.products.findIndex(
      (product: IPrefilledResponseProduct) => product.id === selectedProduct.id
    );
    dispatch(selectProduct(newProduct));
    dispatch(editProduct({ product: newProduct, productIndex }));
  };

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
      <NeedsList
        prefilledResponse={prefilledResponse}
        selectedProduct={selectedProduct}
        // eslint-disable-next-line react/jsx-no-bind
        checkNeeds={checkIfNeedHasRenderedAnswerInRelatedProduct}
      />
    </Container>
  );
}
