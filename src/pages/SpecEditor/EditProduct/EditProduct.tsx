import React from 'react';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import {
  SelectProvider,
  useSelectState
} from '../../Workbench/Create/SelectContext';
import DeleteSpecProduct from './DeleteSpecProduct';

export default function EditProduct(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { productIndex } = useProductIndexState();
  const { setDeleteMode } = useSelectState();

  const onDelete = (): void => {
    setDeleteMode('');
  };

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
    <SelectProvider>
      <DeleteSpecProduct
        product={spec.products[productIndex]}
        handleClose={onDelete}
      >
        <>
          <ProductHeader />
          {renderNeeds()}
        </>
      </DeleteSpecProduct>
    </SelectProvider>
  );
}
