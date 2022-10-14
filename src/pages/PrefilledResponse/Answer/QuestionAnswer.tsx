import React from 'react';

import QuestionAnswerCheckbox from '../../../components/QuestionAnswer/QuestionAnswerCheckbox';
import QuestionAnswerCodelist from '../../../components/QuestionAnswer/QuestionAnswerCodelist';
import QuestionAnswerConfirmation from '../../../components/QuestionAnswer/QuestionAnswerConfirmation';
import QuestionAnswerPeriodDate from '../../../components/QuestionAnswer/QuestionAnswerPeriodDate';
import QuestionAnswerSlider from '../../../components/QuestionAnswer/QuestionAnswerSlider';
import QuestionAnswerText from '../../../components/QuestionAnswer/QuestionAnswerText';
import QuestionAnswerTime from '../../../components/QuestionAnswer/QuestionAnswerTime';
import {
  addAnswer,
  addProductAnswer
} from '../../../store/reducers/prefilled-response-reducer';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { QuestionType } from '../../../Nexus/entities/QuestionType';
import { QuestionVariant } from '../../../Nexus/enums';
import { useAccordionState } from '../../../components/DFOAccordion/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function QuestionAnswer({
  requirementAnswer,
  existingAnswer
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();
  const { setActiveKey } = useAccordionState();

  const onSubmit = (post: QuestionType): void => {
    const newAnswer = {
      ...requirementAnswer,
      question: post
    };
    if (productIndex === -1) {
      dispatch(addAnswer(newAnswer));
    } else {
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: prefilledResponse.products[productIndex].id
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
    case QuestionVariant.Q_CODELIST:
      const codelistId = requirementAnswer.question.config.codelist;
      const codelist = prefilledResponse.bank.codelist.find(
        (cl) => cl.id === codelistId
      );
      const codesId = requirementAnswer.question.config.codes.map(
        (c) => c.code
      );
      const codesList = codelist?.codes.filter(function (cl) {
        return codesId.indexOf(cl.id) > -1;
      });
      return (
        <QuestionAnswerCodelist
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
          codesList={codesList}
          codeList={codelist}
        />
      );
    case QuestionVariant.Q_CONFIRMATION:
      return (
        <QuestionAnswerConfirmation
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
        />
      );
    case QuestionVariant.Q_PERIOD_DATE:
      return (
        <QuestionAnswerPeriodDate
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
        />
      );
    case QuestionVariant.Q_SLIDER:
      return (
        <QuestionAnswerSlider
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
        />
      );
    case QuestionVariant.Q_TEXT:
      return (
        <QuestionAnswerText
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
        />
      );
    case QuestionVariant.Q_TIME:
      return (
        <QuestionAnswerTime
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
        />
      );
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
}
