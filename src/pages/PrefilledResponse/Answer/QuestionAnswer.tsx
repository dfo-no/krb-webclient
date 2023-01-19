import React from 'react';

import QuestionAnswerCheckbox from '../../../components/QuestionAnswer/QuestionAnswerCheckbox';
import QuestionAnswerCodelist from '../../../components/QuestionAnswer/QuestionAnswerCodelist';
import QuestionAnswerConfirmation from '../../../components/QuestionAnswer/QuestionAnswerConfirmation';
import QuestionAnswerPeriodDate from '../../../components/QuestionAnswer/QuestionAnswerPeriodDate';
import QuestionAnswerSlider from '../../../components/QuestionAnswer/QuestionAnswerSlider';
import QuestionAnswerText from '../../../components/QuestionAnswer/QuestionAnswerText';
import QuestionAnswerTime from '../../../components/QuestionAnswer/QuestionAnswerTime';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { QuestionType } from '../../../Nexus/entities/QuestionType';
import { QuestionVariant } from '../../../Nexus/enums';
import { useAccordionState } from '../../../components/DFOAccordion/AccordionContext';
import Nexus from '../../../Nexus/Nexus';

interface Props {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function QuestionAnswer({
  requirementAnswer,
  existingAnswer,
}: Props): React.ReactElement {
  const { prefilledResponse, addAnswer, addProductAnswer, product } =
    PrefilledResponseContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { setActiveKey } = useAccordionState();

  const onSubmit = (post: QuestionType): void => {
    const newAnswer = {
      ...nexus.prefilledResponseService.createRequirementAnswerWithId(
        requirementAnswer
      ),
      question: post,
      questionId: requirementAnswer.question.id,
    };
    if (product === undefined) {
      addAnswer(newAnswer);
    } else {
      addProductAnswer(newAnswer, product.id);
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

      return (
        <QuestionAnswerCodelist
          item={requirementAnswer.question}
          existingAnswer={existingAnswer}
          onSubmit={onSubmit}
          codesList={codelist?.codes}
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
