import { Card } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Utils from '../../../common/Utils';
import { Code } from '../../../models/Code';
import { Codelist } from '../../../models/Codelist';
import { ICheckboxQuestion } from '../../../models/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../models/ICodelistQuestion';
import { IPeriodDateQuestion } from '../../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../../models/ISliderQuestion';
import { ITextQuestion } from '../../../models/ITextQuestion';
import QuestionEnum from '../../../models/QuestionEnum';
import { useAppSelector } from '../../../store/hooks';
import AnswerPreview from './AnswerPreview';

interface IProps {
  answerList: IRequirementAnswer[];
}

export default function AnswerPreviewBox({ answerList }: IProps): ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const GenerateCodelist = (
    codes: string | string[],
    configCodelist: string
  ) => {
    const codelistIndex = response.spesification.bank.codelist.findIndex(
      (list: Codelist) => list.id === configCodelist
    );

    const codelist = response.spesification.bank.codelist[codelistIndex];
    const usedCodes: string[] = [];
    if (Array.isArray(codes)) {
      codes.forEach((selectedCode: string) => {
        const codeIndex = codelist.codes.findIndex(
          (element: Code) => element.id === selectedCode
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
      case QuestionEnum.Q_SLIDER:
        question = answer.question as ISliderQuestion;
        textToBeDisplayed = `${question.answer?.value} `;
        break;
      case QuestionEnum.Q_CODELIST:
        question = answer.question as ICodelistQuestion;
        if (question.answer?.codes) {
          textToBeDisplayed = `${CodelistToString(
            question.answer?.codes,
            question.config.codelist
          )} `;
        } else {
          textToBeDisplayed = '';
        }
        break;
      case QuestionEnum.Q_TEXT:
        question = answer.question as ITextQuestion;
        textToBeDisplayed = `${question.answer?.text} `;
        break;
      case QuestionEnum.Q_PERIOD_DATE:
        question = answer.question as IPeriodDateQuestion;
        textToBeDisplayed = `${question.answer?.date} `;
        break;
      case QuestionEnum.Q_CHECKBOX:
        question = answer.question as ICheckboxQuestion;
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
