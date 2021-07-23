import { string } from 'joi';
import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Code } from '../../models/Code';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Requirement } from '../../models/Requirement';
import { RootState } from '../../store/store';

interface IProps {
  answer: IRequirementAnswer;
  parent_requirement: Requirement;
}

export default function CodelistInfo({
  answer,
  parent_requirement
}: IProps): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const alternative = answer.alternative as ICodelistQuestion;
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
        return <li>{code.title}</li>;
      });
      return <ul>{list}</ul>;
    }
    return <p>{alternative.answer?.codes}</p>;
  };
  return (
    <Container fluid className="mt-4">
      <h5>Info</h5>
      {`${variant.requirementText}`}
      {codes()}
    </Container>
  );
}
