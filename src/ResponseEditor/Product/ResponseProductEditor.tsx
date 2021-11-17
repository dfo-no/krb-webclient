import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import {
  IResponseProduct,
  ResponseProductSchema
} from '../../models/IResponseProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editProduct } from '../../store/reducers/response-reducer';
import ResponseProductRequirementSelector from './ResponseProductRequirementSelector';

export default function ResponseProductEditor(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { response } = useAppSelector((state) => state.response);
  const { selectedResponseSpecificationProduct, selectedResponseProduct } =
    useAppSelector((state) => state.selectedResponseProduct);

  const productIndex = response.products.findIndex(
    (responseProduct) => responseProduct.id === selectedResponseProduct.id
  );

  // TODO:remove any in useForm.
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    resolver: joiResolver(ResponseProductSchema),
    defaultValues: selectedResponseProduct
  });

  const addProductToResponse = (post: IResponseProduct) => {
    const newResponseProduct: IResponseProduct = {
      ...post
    };

    dispatch(editProduct({ product: newResponseProduct, productIndex }));
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <h4>{selectedResponseSpecificationProduct.title}</h4>
      </Row>
      <Card className="m-4">
        <Card.Body>
          <Row className="mb-3">
            <Col sm="2"> Amount:</Col>
            <Col sm="10">
              <p className="ml-3">
                {selectedResponseSpecificationProduct.amount}{' '}
              </p>
            </Col>
          </Row>
          <Form
            onSubmit={handleSubmit(addProductToResponse)}
            autoComplete="off"
          >
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  {...register('price')}
                  isInvalid={!!errors.price}
                />
                {errors.price && (
                  <Form.Control.Feedback type="invalid">
                    {errors.price?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                {t('Title')}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  {...register('title')}
                  isInvalid={!!errors.title}
                />
                {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                {t('Description')}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  {...register('description')}
                  isInvalid={!!errors.description}
                />
                {errors.description && (
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
          </Form>
        </Card.Body>
      </Card>

      <ResponseProductRequirementSelector
        product={selectedResponseSpecificationProduct}
      />
    </Container>
  );
}
