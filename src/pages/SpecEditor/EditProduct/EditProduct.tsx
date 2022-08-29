import React from 'react';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { useAppSelector } from '../../../store/hooks';
import { useSpecificationState } from '../SpecificationContext';

export default function EditProduct(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { specificationProductIndex } = useSpecificationState();

  const renderNeeds = () => {
    if (specificationProductIndex === -1) {
      const needs = Utils.findVariantsUsedBySpecification(spec.bank);
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    } else {
      const needs = Utils.findVariantsUsedByProduct(
        spec.products[specificationProductIndex].originProduct,
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
