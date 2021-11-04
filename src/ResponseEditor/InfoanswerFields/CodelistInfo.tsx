import React from 'react';
import Container from 'react-bootstrap/Container';
import { Code } from '../../models/Code';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Requirement } from '../../models/Requirement';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: Requirement;
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
          (element: Code) => element.id === selectedCode
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
