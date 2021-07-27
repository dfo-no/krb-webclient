import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Requirement } from '../../models/Requirement';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: Requirement;
}

export default function CheckBoxInfo({
  answer,
  parent_requirement
}: IProps): ReactElement {
  const alternative = answer.alternative as ICheckboxQuestion;
  const variant = parent_requirement.variants[0];

  const writtenValue = alternative.answer?.value === true ? 'Yes' : 'No';
  return (
    <Container fluid className="mt-4">
      {`${variant.requirementText}: ${writtenValue} `}
    </Container>
  );
}
