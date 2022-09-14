import React from 'react';

import DeleteSpecProduct from './DeleteSpecProduct';
import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';

export default function EditProduct(): React.ReactElement {
  const { specification } = useSpecificationState();
  const { productIndex } = useProductIndexState();
  const { setDeleteMode } = useSelectState();

  const onDelete = (): void => {
    setDeleteMode('');
  };

  const renderNeeds = () => {
    if (productIndex === -1) {
      const needs = Utils.findVariantsUsedBySpecification(specification.bank);
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    } else {
      const needs = Utils.findVariantsUsedByProduct(
        specification.products[productIndex].originProduct,
        specification.bank
      );
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    }
  };

  return (
    <DeleteSpecProduct
      product={specification.products[productIndex]}
      handleClose={onDelete}
    >
      <div>
        <ProductHeader />
        {renderNeeds()}
      </div>
    </DeleteSpecProduct>
  );
}
