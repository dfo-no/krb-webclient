import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import QuestionType from '../../models/QuestionType';
import { RootState } from '../../store/store';
import FileInputForm from './AlternativeForms/FileInputForm';
import ValueForm from './AlternativeForms/ISliderForm';
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
      {item.alternative.type === QuestionType.Q_SLIDER && (
        <ValueForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionType.Q_FILEUPLOAD && (
        <FileInputForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionType.Q_TEXT && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionType.Q_CODELIST && <NoProperties />}
      {item.alternative.type === QuestionType.Q_CHECKBOX && <NoProperties />}
    </Container>
  );
}
