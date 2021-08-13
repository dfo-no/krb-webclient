import { Card } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Utils from '../../../common/Utils';
import { ICodelistQuestion } from '../../../models/ICodelistQuestion';
import { IPeriodDateQuestion } from '../../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../../models/ISliderQuestion';
import { ITextQuestion } from '../../../models/ITextQuestion';
import QuestionEnum from '../../../models/QuestionEnum';
import AnswerPreview from './AnswerPreview';
import GenerateCodelist from './GenerateCodelist';

interface IProps {
  answerList: IRequirementAnswer[];
}

const CodelistToString = (codes: string | string[], codelist: string) => {
  const generatedTitles = GenerateCodelist({ codes, configCodelist: codelist });
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
    default:
      textToBeDisplayed = ' ';
  }
  return textToBeDisplayed;
};
export default function AnswerPreviewBox({ answerList }: IProps): ReactElement {
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
