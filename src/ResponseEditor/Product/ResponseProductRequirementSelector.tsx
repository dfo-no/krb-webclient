import React from 'react';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { useAppSelector } from '../../store/hooks';
import NeedHierarchy from '../Components/NeedHierarchy';

interface IInputProps {
  product: ISpecificationProduct;
}

export default function ResponseProductRequirementSelector({
  product
}: IInputProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const selectedBank = response.specification.bank;

  const productIndex = response.specification.products.findIndex(
    (specProduct: ISpecificationProduct) => specProduct.id === product.id
  );

  const responseProductIndex = response.products.findIndex(
    (responseProduct: IResponseProduct) =>
      responseProduct.originProduct.id === product.id
  );

  return (
    <NeedHierarchy
      needs={selectedBank.needs}
      searchList={response.specification.products[productIndex].requirements}
      specificationSearchList={
        response.specification.products[productIndex].requirementAnswers
      }
      responseSearchList={
        response.products[responseProductIndex].requirementAnswers
      }
    />
  );
}
