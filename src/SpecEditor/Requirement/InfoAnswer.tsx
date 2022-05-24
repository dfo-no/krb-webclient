import React from 'react';
import Container from 'react-bootstrap/Container';

import CodelistInfoAnswer from '../InfoForms/CodelistInfoAnswer';
import DateInfoAnswer from '../InfoForms/DateInfoAnswer';
import SliderInfoAnswer from '../InfoForms/SliderInfoAnswer';
import TextInfoAnswer from '../InfoForms/ITextInfoAnswer';
import TimeInfoAnswer from '../InfoForms/TimeInfoAnswer';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { QuestionVariant } from '../../enums';

interface IProps {
  requirement: IRequirement;
}

export default function InfoAnswer({
  requirement
}: IProps): React.ReactElement {
  const question = requirement.variants[0].questions[0];
  return (
    <Container fluid className="mt-4">
      {question.type === QuestionVariant.Q_SLIDER && (
        <SliderInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
      {question.type === QuestionVariant.Q_CODELIST && (
        <CodelistInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
      {question.type === QuestionVariant.Q_TEXT && (
        <TextInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
      {question.type === QuestionVariant.Q_TIME && (
        <TimeInfoAnswer
          q={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
      {question.type === QuestionVariant.Q_PERIOD_DATE && (
        <DateInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
    </Container>
  );
}
