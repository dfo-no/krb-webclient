import React from 'react';
import Container from 'react-bootstrap/Container';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { IRequirement } from '../../models/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';

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
