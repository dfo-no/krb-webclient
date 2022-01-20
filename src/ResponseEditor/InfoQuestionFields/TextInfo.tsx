import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function TextInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const alternative = answer.question as ITextQuestion;
  const variant = parent_requirement.variants[0];
  return (
    <Container fluid className="mt-4">
      <h5>Info: {`${variant.requirementText} `}</h5>
      <p>{alternative.answer?.text} </p>
    </Container>
  );
}
