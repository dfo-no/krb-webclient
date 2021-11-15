import React from 'react';
import Utils from '../../common/Utils';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { useAppSelector } from '../../store/hooks';
import NeedHierarchy from '../Components/NeedHierarchy';

interface InputProps {
  product: ISpecificationProduct;
}

export default function ResponseProductRequirementSelector({
  product
}: InputProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const selectedBank = response.spesification.bank;
  const productIndex = Utils.ensure(
    response.spesification.products.findIndex(
      (specProduct: ISpecificationProduct) => specProduct.id === product.id
    )
  );

  const responseProductIndex = response.products.findIndex(
    (responseProduct: IResponseProduct) =>
      responseProduct.originProduct.id === product.id
  );

  return (
    <NeedHierarchy
      needs={selectedBank.needs}
      searchList={response.spesification.products[productIndex].requirements}
      specificationSearchList={
        response.spesification.products[productIndex].requirementAnswers
      }
      responseSearchList={
        response.products[responseProductIndex].requirementAnswers
      }
    />
  );
}
