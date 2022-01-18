import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React from 'react';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import ErrorSummary from '../../Form/ErrorSummary';
import { IPrefilledResponseProduct } from '../../models/IPrefilledResponseProduct';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProductRequirementAnswers } from '../../store/reducers/response-reducer';
import { selectResponseProduct } from '../../store/reducers/selectedResponseProduct-reducer';
import { setMarkedProductRequirements } from '../../store/reducers/uploadedPrefilledResponseReducer';

const AutofilledProductSchema = Joi.object().keys({
  productId: Joi.string().required()
});
interface IProps {
  productId: string;
}

export default function ProductAutoFillSelector(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.response);
  const { selectedResponseSpecificationProduct, selectedResponseProduct } =
    useAppSelector((state) => state.selectedResponseProduct);
  const { prefilledResponse } = useAppSelector(
    (state) => state.uploadedResponse
  );

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<{ productId: string }>({
    resolver: joiResolver(AutofilledProductSchema),
    defaultValues: {}
  });
  const nexus = Nexus.getInstance();
  const connectProduct = (post: IProps) => {
    const index = prefilledResponse.products.findIndex(
      (product) => product.id === post.productId
    );

    const product = prefilledResponse.products[index];

    const [requirementAnswers, markedQuestions] =
      nexus.responseService.matchPreAnsweredQuestions(
        selectedResponseSpecificationProduct.requirementAnswers,
        product.requirementAnswers
      );

    const responseProductIndex = response.products.findIndex(
      (p) => p.id === selectedResponseProduct.id
    );

    const newResponseProduct = { ...selectedResponseProduct };
    newResponseProduct.requirementAnswers = requirementAnswers;
    dispatch(
      setProductRequirementAnswers({
        answers: requirementAnswers,
        productIndex: responseProductIndex
      })
    );
    dispatch(setMarkedProductRequirements(markedQuestions));
    dispatch(selectResponseProduct(newResponseProduct));
  };

  const findMatchingPrefilledProducts = () => {
    const products: IPrefilledResponseProduct[] = [];
    prefilledResponse.products.forEach((product: IPrefilledResponseProduct) => {
      if (
        product.originProduct.id ===
        selectedResponseSpecificationProduct.originProduct.id
      ) {
        products.push(product);
      } else if (
        product.relatedProducts.includes(
          selectedResponseSpecificationProduct.originProduct.id
        )
      ) {
        products.push(product);
      }
    });

    return products;
  };
  return (
    <Form onSubmit={handleSubmit(connectProduct)} autoComplete="off">
      <Col sm={10}>
        <Form.Control as="select" {...register('productId')}>
          {findMatchingPrefilledProducts().map(
            (element: IPrefilledResponseProduct) => (
              <option key={element.id} value={element.id}>
                {element.title}
              </option>
            )
          )}
        </Form.Control>
      </Col>
      <Col className="p-0 d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Autofyll
        </Button>
      </Col>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
