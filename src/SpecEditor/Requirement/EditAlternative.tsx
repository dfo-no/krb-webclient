import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import QuestionEnum from '../../models/QuestionEnum';
import { useAppSelector } from '../../store/hooks';
import FileInputForm from './AlternativeForms/FileInputForm';
import CodelistForm from './AlternativeForms/ICodeListForm';
import ValueForm from './AlternativeForms/ISliderForm';
import NoProperties from './AlternativeForms/NoProperties';
import PeriodDateForm from './AlternativeForms/PeriodTimeForm';
import TextAlternativeForm from './AlternativeForms/TextAlternativeForm';

export default function EditAlternative(): ReactElement {
  const { alternativeId } = useAppSelector(
    (state) => state.selectedAlternative
  );
  const { spec } = useAppSelector((state) => state.specification);

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
      {item.alternative.type === QuestionEnum.Q_PERIOD_DATE && (
        <PeriodDateForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_CHECKBOX && <NoProperties />}
    </Container>
  );
}
