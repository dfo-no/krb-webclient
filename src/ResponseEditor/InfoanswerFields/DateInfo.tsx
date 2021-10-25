import React from 'react';
import Container from 'react-bootstrap/Container';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Requirement } from '../../models/Requirement';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: Requirement;
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
