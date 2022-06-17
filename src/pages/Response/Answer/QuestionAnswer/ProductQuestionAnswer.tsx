import React from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import QuestionAnswerCodelist from './QuestionAnswerCodelist';
import QuestionAnswerSlider from './QuestionAnswerSlider';
import QuestionAnswerText from './QuestionAnswerText';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { QuestionVariant } from '../../../../enums';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ProductQuestionAnswer({
  requirementAnswer,
  existingAnswer
}: IProps): React.ReactElement {
  switch (requirementAnswer.question.type) {
    case QuestionVariant.Q_CHECKBOX:
      return (
        <QuestionAnswerCheckbox
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={
            existingAnswer &&
            existingAnswer.question.type === QuestionVariant.Q_CHECKBOX
              ? existingAnswer.question
              : undefined
          }
        />
      );
    case QuestionVariant.Q_SLIDER:
      return (
        <QuestionAnswerSlider
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={
            existingAnswer &&
            existingAnswer.question.type === QuestionVariant.Q_SLIDER
              ? existingAnswer.question
              : undefined
          }
        />
      );
    case QuestionVariant.Q_TEXT:
      return (
        <QuestionAnswerText
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={
            existingAnswer &&
            existingAnswer.question.type === QuestionVariant.Q_TEXT
              ? existingAnswer.question
              : undefined
          }
        />
      );
    case QuestionVariant.Q_CODELIST:
      return (
        <QuestionAnswerCodelist
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={
            existingAnswer &&
            existingAnswer.question.type === QuestionVariant.Q_CODELIST
              ? existingAnswer.question
              : undefined
          }
        />
      );
    case QuestionVariant.Q_PERIOD_DATE:
    case QuestionVariant.Q_TIME:
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
}
