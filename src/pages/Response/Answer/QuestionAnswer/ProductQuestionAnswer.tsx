import React from 'react';

import QuestionAnswerCodelist from './QuestionAnswerCodelist';
import QuestionAnswerPeriodDate from './QuestionAnswerPeriodDate';
import QuestionAnswerSlider from './QuestionAnswerSlider';
import QuestionAnswerText from './QuestionAnswerText';
import QuestionAnswerTime from './QuestionAnswerTime';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { QuestionVariant } from '../../../../enums';
import { QuestionType } from '../../../../models/QuestionType';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useProductIndexState } from '../../../../components/ProductIndexContext/ProductIndexContext';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';
import QuestionAnswerCheckbox from '../../../../components/QuestionAnswer/QuestionAnswerCheckbox';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ProductQuestionAnswer({
  requirementAnswer,
  existingAnswer
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();
  const { setActiveKey } = useAccordionState();

  const onSubmit = (post: QuestionType): void => {
    const newAnswer = {
      ...requirementAnswer,
      question: post
    };
    if (productIndex === -1) {
      dispatch(addRequirementAnswer(newAnswer));
    } else {
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: response.products[productIndex].id
        })
      );
    }
    setActiveKey('');
  };

  switch (requirementAnswer.question.type) {
    case QuestionVariant.Q_CHECKBOX:
      return (
        <QuestionAnswerCheckbox
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
        />
      );
    case QuestionVariant.Q_SLIDER:
      return (
        <QuestionAnswerSlider
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_TEXT:
      return (
        <QuestionAnswerText
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_CODELIST:
      return (
        <QuestionAnswerCodelist
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_PERIOD_DATE:
      return (
        <QuestionAnswerPeriodDate
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_TIME:
      return (
        <QuestionAnswerTime
          item={requirementAnswer.question}
          parent={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
}
