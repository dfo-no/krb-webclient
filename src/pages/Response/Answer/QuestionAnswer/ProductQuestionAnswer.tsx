import React from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import QuestionAnswerCodelist from './QuestionAnswerCodelist';
import QuestionAnswerPeriodDate from './QuestionAnswerPeriodDate';
import QuestionAnswerSlider from './QuestionAnswerSlider';
import QuestionAnswerText from './QuestionAnswerText';
import QuestionAnswerTime from './QuestionAnswerTime';
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
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_SLIDER:
      return (
        <QuestionAnswerSlider
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_TEXT:
      return (
        <QuestionAnswerText
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_CODELIST:
      return (
        <QuestionAnswerCodelist
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_PERIOD_DATE:
      return (
        <QuestionAnswerPeriodDate
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_TIME:
      return (
        <QuestionAnswerTime
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
}
