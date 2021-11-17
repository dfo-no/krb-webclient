import React from 'react';
import Utils from '../../common/Utils';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { useAppSelector } from '../../store/hooks';
import AnswerTypeSelector from '../Components/AnswerTypeSelector';

export default function ConfigureProductQuestion(): React.ReactElement {
  const { questionId } = useAppSelector((state) => state.selectedQuestion);
  const { spec } = useAppSelector((state) => state.specification);
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );

  const productIndex = Utils.ensure(
    spec.products.findIndex(
      (product: ISpecificationProduct) =>
        product.id === selectedSpecificationProduct.id
    )
  );
  if (!questionId) {
    return <p>No question selected</p>;
  }

  const itemIndex = spec.products[productIndex].requirementAnswers.findIndex(
    (alt) => alt.id === questionId
  );
  const item = spec.products[productIndex].requirementAnswers[itemIndex];
  return <AnswerTypeSelector answer={item} />;
}
