import React, { ReactElement } from 'react';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Requirement } from '../../models/Requirement';
import QuestionFormSelector from './QuestionFormSelector';

interface IProps {
  requirementArray: Requirement[];
  requirementSearchList: string[];
  specificationSearchList: IRequirementAnswer[];
  responseSearchList: IRequirementAnswer[];
}

export default function RequirementAnswers({
  requirementArray,
  requirementSearchList,
  specificationSearchList,
  responseSearchList
}: IProps): ReactElement {
  const answers = () => {
    return requirementArray.map((req) => {
      const selected = !!requirementSearchList.includes(req.id);
      if (selected) {
        let requirementText = '';
        let selectedAnswer: IRequirementAnswer = specificationSearchList[0];
        req.variants.forEach((variant) => {
          if (
            responseSearchList.find((answer) => answer.variantId === variant.id)
          ) {
            const index = responseSearchList.findIndex(
              (answer) => answer.variantId === variant.id
            );
            selectedAnswer = responseSearchList[index];
            requirementText = variant.requirementText;
          } else {
            if (
              specificationSearchList.find(
                (answer) => answer.variantId === variant.id
              )
            )
              requirementText = variant.requirementText;
            const index = specificationSearchList.findIndex(
              (answer) => answer.variantId === variant.id
            );
            selectedAnswer = specificationSearchList[index];
          }
        });
        if (selectedAnswer !== undefined) {
          return (
            <QuestionFormSelector
              selectedAnswer={selectedAnswer}
              requirementText={requirementText}
              req={req}
              key={req.id}
            />
          );
        }
        return <></>;
      }
      return <></>;
    });
  };
  return <>{answers()}</>;
}
