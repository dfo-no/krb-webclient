import React from 'react';
import Container from 'react-bootstrap/Container';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: IRequirement;
}

export default function CodelistInfo({
  answer,
  parent_requirement
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const alternative = answer.question as ICodelistQuestion;
  const variant = parent_requirement.variants[0];

  const codelistIndex = response.spesification.bank.codelist.findIndex(
    (list) => list.id === alternative.config.codelist
  );

  const codelist = response.spesification.bank.codelist[codelistIndex];

  const codes = () => {
    if (Array.isArray(alternative.answer?.codes)) {
      const list = alternative.answer?.codes.map((selectedCode: string) => {
        const codeIndex = codelist.codes.findIndex(
          (element: ICode) => element.id === selectedCode
        );
        const code = codelist.codes[codeIndex];
        return <li key={code.id}>{code.title}</li>;
      });
      return <ul>{list}</ul>;
    }
    return <p>{alternative.answer?.codes}</p>;
  };
  return (
    <Container fluid className="mt-4">
      {`${variant.requirementText}`}
      {codes()}
    </Container>
  );
}
