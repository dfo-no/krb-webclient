import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { ResponseProduct } from '../../models/ResponseProduct';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RootState } from '../../store/store';
import NeedHierarchy from '../Components/NeedHierarchy';

interface InputProps {
  product: SpecificationProduct;
}

export default function ResponseProductRequirementSelector({
  product
}: InputProps): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const { list } = useSelector((state: RootState) => state.bank);
  const { id } = useSelector((state: RootState) => state.selectedBank);

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));
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
