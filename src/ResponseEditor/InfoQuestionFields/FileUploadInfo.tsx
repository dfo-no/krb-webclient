import Alert from '@mui/lab/Alert/Alert';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IFileUploadQuestion } from '../../Nexus/entities/IFileUploadQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function FileUploadInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const alternative = answer.question as IFileUploadQuestion;
  const variant = parent_requirement.variants[0];

  const renderFiles = (files: string[]) => {
    return files.map((file) => file);
  };

  return (
    <Container fluid className="mt-4">
      <Alert severity="error">Not implemented yet!</Alert>
      <h5>Info: {`${variant.requirementText} `}</h5>
      <p>{renderFiles(alternative.answer?.files)} </p>
    </Container>
  );
}
