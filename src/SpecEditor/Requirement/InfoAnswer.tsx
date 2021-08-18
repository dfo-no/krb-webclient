import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import QuestionEnum from '../../models/QuestionEnum';
import { Requirement } from '../../models/Requirement';
import CodelistInfoAnswer from '../InfoForms/CodelistInfoAnswer';
import TextInfoAnswer from '../InfoForms/ITextInfoAnswer';
import SliderInfoAnswer from '../InfoForms/SliderInfoAnswer';

interface IProps {
  requirement: Requirement;
}

export default function InfoAnswer({ requirement }: IProps): ReactElement {
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
