import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import { useSelector } from 'react-redux';
import { IValueAlternative } from '../../models/IValueAlternative';
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
      {item.alternative.type === 'value' && (
        <ValueForm item={item.alternative as IValueAlternative} />
      )}
    </Container>
  );
}
