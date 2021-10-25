import React from 'react';
import Utils from '../../common/Utils';
import { ResponseProduct } from '../../models/ResponseProduct';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { useAppSelector } from '../../store/hooks';
import NeedHierarchy from '../Components/NeedHierarchy';

interface InputProps {
  product: SpecificationProduct;
}

export default function ResponseProductRequirementSelector({
  product
}: InputProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const selectedBank = response.spesification.bank;
  const productIndex = Utils.ensure(
    response.spesification.products.findIndex(
      (specProduct: SpecificationProduct) => specProduct.id === product.id
    )
  );

  const responseProductIndex = response.products.findIndex(
    (responseProduct: ResponseProduct) =>
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
