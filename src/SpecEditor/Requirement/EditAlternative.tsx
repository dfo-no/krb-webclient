import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FileInputForm from './AlternativeForms/FileInputForm';
import ValueForm from './AlternativeForms/IValueAlternativeForm';
import NoProperties from './AlternativeForms/NoProperties';
import TextAlternativeForm from './AlternativeForms/TextAlternativeForm';

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
      {item.alternative.type === 'fileUpload' && <FileInputForm />}
      {item.alternative.type === 'text' && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.alternative.type === 'codelist' && <NoProperties />}
      {item.alternative.type === 'yesNo' && <NoProperties />}
    </Container>
  );
}
