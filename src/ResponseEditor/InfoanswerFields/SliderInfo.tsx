import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirement } from '../../models/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../models/ISliderQuestion';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function SliderInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const alternative = answer.question as ISliderQuestion;
  const variant = parent_requirement.variants[0];
  return (
    <Container fluid className="mt-4">
      {`${variant.requirementText}: ${alternative.answer?.value}  ${alternative.config.unit}`}
    </Container>
  );
}
