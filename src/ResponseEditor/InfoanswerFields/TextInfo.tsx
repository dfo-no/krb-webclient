import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ITextQuestion } from '../../models/ITextQuestion';
import { Requirement } from '../../models/Requirement';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: Requirement;
}

export default function TextInfo({
  answer,
  parent_requirement
}: IProps): ReactElement {
  const alternative = answer.alternative as ITextQuestion;
  const variant = parent_requirement.variants[0];
  return (
    <Container fluid className="mt-4">
      <h5>Info: {`${variant.requirementText} `}</h5>
      <p>{alternative.answer?.text} </p>
    </Container>
  );
}
