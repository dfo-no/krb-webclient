import React, { ReactElement } from 'react';
import Utils from '../../common/Utils';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { useAppSelector } from '../../store/hooks';
import AnswerTypeSelector from '../Components/AnswerTypeSelector';

export default function ConfigureProductQuestion(): ReactElement {
  const { alternativeId } = useAppSelector(
    (state) => state.selectedAlternative
  );
  const { spec } = useAppSelector((state) => state.specification);
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );

  const productIndex = Utils.ensure(
    spec.products.findIndex(
      (product: SpecificationProduct) =>
        product.id === selectedSpecificationProduct.id
    )
  );
  if (!alternativeId) {
    return <p>No question selected</p>;
  }

  const itemIndex = spec.products[productIndex].requirementAnswers.findIndex(
    (alt) => alt.id === alternativeId
  );
  const item = spec.products[productIndex].requirementAnswers[itemIndex];
  return <AnswerTypeSelector answer={item} />;
}
