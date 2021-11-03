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
import { Need } from '../../models/Need';
import { Parentable } from '../../models/Parentable';
import {
  PrefilledResponseProduct,
  PrefilledResponseProductSchema
} from '../../models/PrefilledResponseProduct';
import NestableHierarcy from '../../NestableHierarchy/NestableHierarcy';
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

  const newNeedList = (_projectId: string, _needs: Parentable<Need>[]) => {
    // Should not be able to rearrange the needs on this page
    // console.log('save');
    // dispatch(setNeeds(needs));
    // dispatch(putSelectedProjectThunk('dummy'));
  };

  const needIds = findNeedIdsForProduct(
    selectedProduct.originProduct.id,
    prefilledResponse.bank.needs
  );

  const needs = getPaths(needIds, prefilledResponse.bank.needs);

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
          <NestableHierarcy
            dispatchfunc={(projectId: string, items: Parentable<Need>[]) =>
              newNeedList(projectId, items)
            }
            inputlist={needs}
            projectId=""
            component={
              <AnswerForm element={needs[0]} product={selectedProduct} />
            }
            depth={10}
          />
        </Card.Body>
      </Card>
      <Row className="m-4" />
    </Container>
  );
}
