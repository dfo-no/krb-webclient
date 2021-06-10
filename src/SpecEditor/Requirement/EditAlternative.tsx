import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import QuestionEnum from '../../models/QuestionEnum';
import { RootState } from '../../store/store';
import FileInputForm from './AlternativeForms/FileInputForm';
import CodelistForm from './AlternativeForms/ICodeListForm';
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
  console.log(item);

  return (
    <Container fluid className="mt-4">
      <h4>Edit Alternative</h4>
      {item.alternative.type === QuestionEnum.Q_SLIDER && (
        <ValueForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_FILEUPLOAD && (
        <FileInputForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_TEXT && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_CODELIST && (
        <CodelistForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_CHECKBOX && <NoProperties />}
    </Container>
  );
}
