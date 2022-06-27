import React from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import QuestionAnswerCodelist from './QuestionAnswerCodelist';
import QuestionAnswerPeriodDate from './QuestionAnswerPeriodDate';
import QuestionAnswerSlider from './QuestionAnswerSlider';
import QuestionAnswerText from './QuestionAnswerText';
import QuestionAnswerTime from './QuestionAnswerTime';
import { ICheckboxQuestion } from '../../../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';
import { QuestionVariant } from '../../../../enums';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ProductQuestionAnswer({
  requirementAnswer,
  existingAnswer
}: IProps): React.ReactElement {
  if (
    existingAnswer &&
    existingAnswer.question.type === requirementAnswer.question.type
  ) {
    switch (requirementAnswer.question.type) {
      case QuestionVariant.Q_CHECKBOX:
        return (
          <QuestionAnswerCheckbox
            item={requirementAnswer.question}
            parent={requirementAnswer}
            existingAnswer={existingAnswer.question as ICheckboxQuestion}
          />
        );
      case QuestionVariant.Q_SLIDER:
        return (
          <QuestionAnswerSlider
            item={requirementAnswer.question}
            parent={requirementAnswer}
            existingAnswer={existingAnswer.question as ISliderQuestion}
          />
        );
      case QuestionVariant.Q_TEXT:
        return (
          <QuestionAnswerText
            item={requirementAnswer.question}
            parent={requirementAnswer}
            existingAnswer={existingAnswer.question as ITextQuestion}
          />
        );
      case QuestionVariant.Q_CODELIST:
        return (
          <QuestionAnswerCodelist
            item={requirementAnswer.question}
            parent={requirementAnswer}
            existingAnswer={existingAnswer.question as ICodelistQuestion}
          />
        );
      case QuestionVariant.Q_PERIOD_DATE:
        return (
          <QuestionAnswerPeriodDate
            item={requirementAnswer.question}
            parent={requirementAnswer}
            existingAnswer={existingAnswer.question as IPeriodDateQuestion}
          />
        );
      case QuestionVariant.Q_TIME:
        return (
          <QuestionAnswerTime
            item={requirementAnswer.question}
            parent={requirementAnswer}
            existingAnswer={existingAnswer.question as ITimeQuestion}
          />
        );
      case QuestionVariant.Q_FILEUPLOAD:
    }
  }
  return <></>;
}
