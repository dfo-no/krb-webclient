import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RootState } from '../../store/store';
import ValueForm from '../Requirement/AlternativeForms/IValueAlternativeForm';

export default function EditAlternative(): ReactElement {
  const { alternativeId } = useSelector(
    (state: RootState) => state.selectedAlternative
  );
  const { spec } = useSelector((state: RootState) => state.specification);
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );

  if (!productId) {
    return <p>No selected product</p>;
  }

  const productIndex = Utils.ensure(
    spec.products.findIndex(
      (product: SpecificationProduct) => product.id === productId
    )
  );
  if (!alternativeId) {
    return <p>No alternative selected</p>;
  }

  const itemIndex = spec.products[productIndex].requirementAnswers.findIndex(
    (alt) => alt.id === alternativeId
  );
  const item = spec.products[productIndex].requirementAnswers[itemIndex];
  return (
    <Container fluid className="mt-4">
      <h4>Edit Alternative</h4>
      {item.alternative.type === 'value' && <ValueForm parentAnswer={item} />}
    </Container>
  );
}
