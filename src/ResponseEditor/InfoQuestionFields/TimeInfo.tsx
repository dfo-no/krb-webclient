import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function TimeInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const alternative = answer.question as ITimeQuestion;
  const variant = parent_requirement.variants[0];
  return (
    <Container fluid className="mt-4">
      {`${variant.requirementText}: ${alternative.answer?.fromTime} `}
      {alternative.config.isPeriod && ` -> ${alternative.answer.toTime}`}
    </Container>
  );
}
