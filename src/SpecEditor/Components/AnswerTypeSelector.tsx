import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import QuestionEnum from '../../models/QuestionEnum';
import CheckBoxForm from '../QuestionForms/CheckBoxForm';
import FileInputForm from '../QuestionForms/FileInputForm';
import CodelistForm from '../QuestionForms/ICodeListForm';
import ValueForm from '../QuestionForms/ISliderForm';
import PeriodDateForm from '../QuestionForms/PeriodTimeForm';
import TextAlternativeForm from '../QuestionForms/TextAlternativeForm';

interface IProps {
  answer: IRequirementAnswer;
}

export default function AnswerTypeSelector({
  answer
}: IProps): React.ReactElement {
  const item = answer;
  return (
    <Container fluid className="mt-4">
      <h4>Configure Question</h4>
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
      {item.question.type === QuestionEnum.Q_CHECKBOX && (
        <CheckBoxForm parentAnswer={item} />
      )}
    </Container>
  );
}
