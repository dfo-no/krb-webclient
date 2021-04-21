import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ValueForm from './AlternativeForms/IValueAlternativeForm';

export default function EditAlternative(): ReactElement {
  const { alternativeId } = useSelector(
    (state: RootState) => state.selectedAlternative
  );
  const { spec } = useSelector((state: RootState) => state.specification);

  if (!alternativeId) {
    return <p>No alternative selected</p>;
  }

  const itemIndex = spec.requirementAnswers.findIndex(
    (alt) => alt.id === alternativeId
  );

  const item = spec.requirementAnswers[itemIndex];

  return (
    <Container fluid className="mt-4">
      <h4>Edit Alternative</h4>
      {item.alternative.type === 'value' && <ValueForm parentAnswer={item} />}
    </Container>
  );
}
