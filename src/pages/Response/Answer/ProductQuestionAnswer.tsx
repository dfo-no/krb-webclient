import React from 'react';

import Nexus from '../../../Nexus/Nexus';
import QuestionAnswerCheckbox from '../../../components/QuestionAnswer/QuestionAnswerCheckbox';
import QuestionAnswerCodelist from '../../../components/QuestionAnswer/QuestionAnswerCodelist';
import QuestionAnswerConfirmation from '../../../components/QuestionAnswer/QuestionAnswerConfirmation';
import QuestionAnswerPeriodDate from '../../../components/QuestionAnswer/QuestionAnswerPeriodDate';
import QuestionAnswerSlider from '../../../components/QuestionAnswer/QuestionAnswerSlider';
import QuestionAnswerText from '../../../components/QuestionAnswer/QuestionAnswerText';
import QuestionAnswerTime from '../../../components/QuestionAnswer/QuestionAnswerTime';
import { useResponseState } from '../ResponseContext';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { QuestionType } from '../../../Nexus/entities/QuestionType';
import { QuestionVariant } from '../../../Nexus/enums';
import { useAccordionState } from '../../../components/DFOAccordion/AccordionContext';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ProductQuestionAnswer({
  requirementAnswer,
  existingAnswer,
}: IProps): React.ReactElement {
  const { response, addProductAnswer, addRequirementAnswer } =
    useResponseState();
  const nexus = Nexus.getInstance();
  const { productIndex } = useProductIndexState();
  const { setActiveKey } = useAccordionState();

  const onSubmit = (post: QuestionType): void => {
    const calculatedPoints = {
      ...post,
      answer: {
        ...post.answer,
        point: nexus.questionService.calculatePoints(post),
      },
    } as QuestionType;
    const newAnswer = {
      ...requirementAnswer,
      question: calculatedPoints,
    };
    if (productIndex === -1) {
      addRequirementAnswer(newAnswer);
    } else {
      addProductAnswer({
        answer: newAnswer,
        productId: response.products[productIndex].id,
      });
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
      const codelist = response.specification.bank.codelist.find(
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
