import React from 'react';
import { Typography } from '@mui/material';
import { QuestionVariant } from '../../../../enums';
import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ProductQuestionAnswer({
  requirementAnswer,
  existingAnswer
}: IProps): React.ReactElement {
  const noAnswer = (): React.ReactElement => {
    return (
      <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
        {'Answer not implemented'}
      </Typography>
    );
  };

  switch (requirementAnswer.question.type) {
    case QuestionVariant.Q_TEXT:
      return noAnswer();
    case QuestionVariant.Q_CHECKBOX:
      return (
        <QuestionAnswerCheckbox
          parent={requirementAnswer}
          item={
            existingAnswer &&
            existingAnswer.question.type === QuestionVariant.Q_CHECKBOX
              ? existingAnswer.question
              : requirementAnswer.question
          }
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_SLIDER:
      return noAnswer();
    case QuestionVariant.Q_CODELIST:
      return noAnswer();
    case QuestionVariant.Q_PERIOD_DATE:
      return noAnswer();
    case QuestionVariant.Q_TIME:
      return noAnswer();
  }
  return <></>;
}
