import React from 'react';
import Container from 'react-bootstrap/Container';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { IRequirement } from '../../models/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function CheckBoxInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const alternative = answer.question as ICheckboxQuestion;
  const variant = parent_requirement.variants[0];

  const writtenValue = alternative.answer?.value === true ? 'Yes' : 'No';
  return (
    <Container fluid className="mt-4">
      {`${variant.requirementText}: ${writtenValue} `}
    </Container>
  );
}
