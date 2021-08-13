import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import QuestionEnum from '../../models/QuestionEnum';
import { RootState } from '../../store/store';
import FileInputForm from './QuestionForms/FileInputForm';
import CodelistForm from './QuestionForms/ICodeListForm';
import ValueForm from './QuestionForms/ISliderForm';
import NoProperties from './QuestionForms/NoProperties';
import PeriodDateForm from './QuestionForms/PeriodTimeForm';
import TextAlternativeForm from './QuestionForms/TextAlternativeForm';

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
      {item.question.type === QuestionEnum.Q_SLIDER && (
        <ValueForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_FILEUPLOAD && (
        <FileInputForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_TEXT && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_CODELIST && (
        <CodelistForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_PERIOD_DATE && (
        <PeriodDateForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_CHECKBOX && <NoProperties />}
    </Container>
  );
}
