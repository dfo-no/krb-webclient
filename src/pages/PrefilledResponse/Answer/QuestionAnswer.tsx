import React from 'react';

import QuestionAnswerCheckbox from '../../../components/QuestionAnswer/QuestionAnswerCheckbox';
import {
  addProductAnswer,
  addAnswer
} from '../../../store/reducers/prefilled-response-reducer';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { QuestionType } from '../../../models/QuestionType';
import { QuestionVariant } from '../../../Nexus/enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useAccordionState } from '../../../components/DFOAccordion/AccordionContext';

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
    case QuestionVariant.Q_SLIDER:
    case QuestionVariant.Q_TEXT:
    case QuestionVariant.Q_CODELIST:
    case QuestionVariant.Q_PERIOD_DATE:
    case QuestionVariant.Q_TIME:
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
}
