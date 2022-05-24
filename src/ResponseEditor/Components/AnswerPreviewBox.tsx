import Card from '@mui/material/Card';
import React from 'react';
import Utils from '../../common/Utils';

import AnswerPreview from './AnswerPreview';
import { QuestionVariant } from '../../enums/QuestionVariant';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelist } from '../../Nexus/entities/ICodelist';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  answerList: IRequirementAnswer[];
}

export default function AnswerPreviewBox({
  answerList
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const GenerateCodelist = (
    codes: string | string[],
    configCodelist: string
  ) => {
    const codelistIndex = response.spesification.bank.codelist.findIndex(
      (list: ICodelist) => list.id === configCodelist
    );

    const codelist = response.spesification.bank.codelist[codelistIndex];
    const usedCodes: string[] = [];
    if (Array.isArray(codes)) {
      codes.forEach((selectedCode: string) => {
        const codeIndex = codelist.codes.findIndex(
          (element: ICode) => element.id === selectedCode
        );
        const code = codelist.codes[codeIndex];
        usedCodes.push(code.title);
      });
    }
    return usedCodes;
  };

  const CodelistToString = (codes: string | string[], codelist: string) => {
    const generatedTitles = GenerateCodelist(codes, codelist);
    return generatedTitles.join();
  };

  const findDisplayValue = (answer: IRequirementAnswer) => {
    let textToBeDisplayed;
    let question;
    switch (answer.question.type) {
      case QuestionVariant.Q_SLIDER:
        question = answer.question;
        textToBeDisplayed = `${question.answer?.value} `;
        break;
      case QuestionVariant.Q_CODELIST:
        question = answer.question;
        if (question.answer?.codes) {
          textToBeDisplayed = `${CodelistToString(
            question.answer?.codes,
            question.config.codelist
          )} `;
        } else {
          textToBeDisplayed = '';
        }
        break;
      case QuestionVariant.Q_TEXT:
        question = answer.question;
        textToBeDisplayed = `${question.answer?.text} `;
        break;
      case QuestionVariant.Q_PERIOD_DATE:
        question = answer.question;
        textToBeDisplayed = `${question.answer?.fromDate} `;
        break;
      case QuestionVariant.Q_CHECKBOX:
        question = answer.question;
        textToBeDisplayed = `${question.answer?.value} `;
        break;
      default:
        textToBeDisplayed = ' ';
    }
    return textToBeDisplayed;
  };
  const AnswerPreviews = () => {
    return answerList.map((answer: IRequirementAnswer) => {
      const text = Utils.findRequirementText(
        answer.variantId,
        answer.requirement.variants
      );
      return (
        <AnswerPreview
          key={answer.id}
          displayText={text}
          displayValue={findDisplayValue(answer)}
        />
      );
    });
  };
  return <Card>{AnswerPreviews()}</Card>;
}
