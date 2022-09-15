import React from 'react';
import { useParams } from 'react-router-dom';

import DeleteSpecProduct from '../DeleteSpecProduct';
import ProductHeader from './ProductHeader';
import ProductNeed from './Elements/Needs/ProductNeed';
import Utils from '../../../../common/Utils';
import { useSelectState } from '../../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../../SpecificationContext';
import { IRouteSpecificationParams } from '../../../../models/IRouteSpecificationParams';

export default function EditProduct(): React.ReactElement {
  const { productId } = useParams<IRouteSpecificationParams>();
  const { specification } = useSpecificationState();
  const { setDeleteMode } = useSelectState();

  const product = specification.products.find((prod) => prod.id === productId);

  const onDelete = (): void => {
    setDeleteMode('');
  };

  const renderNeeds = () => {
    const needs = product
      ? Utils.findVariantsUsedByProduct(
          product.originProduct,
          specification.bank
        )
      : Utils.findVariantsUsedBySpecification(specification.bank);
    return needs.map((need) => {
      return <ProductNeed key={need.id} need={need} product={product} />;
    });
  };

  return (
    <DeleteSpecProduct product={product} handleClose={onDelete}>
      <div>
        <ProductHeader product={product} />
        {renderNeeds()}
      </div>
    </DeleteSpecProduct>
  );
}
