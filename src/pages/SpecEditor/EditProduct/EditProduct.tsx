import React from 'react';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

export default function EditProduct(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { productIndex } = useProductIndexState();

  const renderNeeds = () => {
    if (productIndex === -1) {
      const needs = Utils.findVariantsUsedBySpecification(spec.bank);
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    } else {
      const needs = Utils.findVariantsUsedByProduct(
        spec.products[productIndex].originProduct,
        spec.bank
      );
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    }
  };

  return (
    <div>
      <ProductHeader />
      {renderNeeds()}
    </div>
  );
}
