import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function DateInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const alternative = answer.question as IPeriodDateQuestion;
  const variant = parent_requirement.variants[0];
  return (
    <Container fluid className="mt-4">
      {`${variant.requirementText}: ${alternative.answer?.date} `}
    </Container>
  );
}
