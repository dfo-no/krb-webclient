import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import { Requirement } from '../../models/Requirement';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: Requirement;
}

export default function SliderInfo({
  answer,
  parent_requirement
}: IProps): ReactElement {
  const alternative = answer.alternative as ISliderQuestion;
  const variant = parent_requirement.variants[0];
  return (
    <Container fluid className="mt-4">
      <h5>Info</h5>
      {`${variant.requirementText}: ${alternative.answer?.value} `}
    </Container>
  );
}
