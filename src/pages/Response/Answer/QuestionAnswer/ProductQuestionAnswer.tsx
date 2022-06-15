import React from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
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
    case QuestionVariant.Q_TEXT:
    case QuestionVariant.Q_SLIDER:
    case QuestionVariant.Q_CODELIST:
    case QuestionVariant.Q_PERIOD_DATE:
    case QuestionVariant.Q_TIME:
  }
  return <></>;
}
