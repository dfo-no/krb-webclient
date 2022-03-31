import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import QuestionEnum from '../../models/QuestionEnum';
import CheckBoxForm from '../QuestionForms/CheckBoxForm';
import DateForm from '../QuestionForms/DateForm';
import FileUploadForm from '../QuestionForms/FileUploadForm';
import CodelistForm from '../QuestionForms/ICodeListForm';
import ValueForm from '../QuestionForms/ISliderForm';
import TextAlternativeForm from '../QuestionForms/TextAlternativeForm';
import TimeForm from '../QuestionForms/TimeForm';

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
        <FileUploadForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_TEXT && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_CODELIST && (
        <CodelistForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_PERIOD_DATE && (
        <DateForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_CHECKBOX && (
        <CheckBoxForm parentAnswer={item} />
      )}
      {item.question.type === QuestionEnum.Q_TIME && (
        <TimeForm parentAnswer={item} />
      )}
    </Container>
  );
}
