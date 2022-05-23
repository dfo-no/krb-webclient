import Container from 'react-bootstrap/Container';
import React from 'react';

import CheckBoxForm from '../QuestionForms/CheckBoxForm';
import CodelistForm from '../QuestionForms/ICodeListForm';
import DateForm from '../QuestionForms/DateForm';
import FileUploadForm from '../QuestionForms/FileUploadForm';
import QuestionVariant from '../../models/QuestionVariant';
import TextAlternativeForm from '../QuestionForms/TextAlternativeForm';
import TimeForm from '../QuestionForms/TimeForm';
import ValueForm from '../QuestionForms/ISliderForm';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';

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
      {item.question.type === QuestionVariant.Q_SLIDER && (
        <ValueForm parentAnswer={item} />
      )}
      {item.question.type === QuestionVariant.Q_FILEUPLOAD && (
        <FileUploadForm parentAnswer={item} />
      )}
      {item.question.type === QuestionVariant.Q_TEXT && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.question.type === QuestionVariant.Q_CODELIST && (
        <CodelistForm parentAnswer={item} />
      )}
      {item.question.type === QuestionVariant.Q_PERIOD_DATE && (
        <DateForm parentAnswer={item} />
      )}
      {item.question.type === QuestionVariant.Q_CHECKBOX && (
        <CheckBoxForm parentAnswer={item} />
      )}
      {item.question.type === QuestionVariant.Q_TIME && (
        <TimeForm parentAnswer={item} />
      )}
    </Container>
  );
}
