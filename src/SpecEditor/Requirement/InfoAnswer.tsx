import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirement } from '../../models/IRequirement';
import QuestionEnum from '../../models/QuestionEnum';
import CodelistInfoAnswer from '../InfoForms/CodelistInfoAnswer';
import TextInfoAnswer from '../InfoForms/ITextInfoAnswer';
import SliderInfoAnswer from '../InfoForms/SliderInfoAnswer';

interface IProps {
  requirement: IRequirement;
}

export default function InfoAnswer({
  requirement
}: IProps): React.ReactElement {
  const question = requirement.variants[0].questions[0];
  return (
    <Container fluid className="mt-4">
      {question.type === QuestionEnum.Q_SLIDER && (
        <SliderInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
      {question.type === QuestionEnum.Q_CODELIST && (
        <CodelistInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
      {question.type === QuestionEnum.Q_TEXT && (
        <TextInfoAnswer
          question={requirement.variants[0].questions[0]}
          type="requirement"
          requirement={requirement}
          reqTextId={requirement.variants[0].id}
        />
      )}
    </Container>
  );
}
