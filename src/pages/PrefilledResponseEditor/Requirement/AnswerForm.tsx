import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import CheckBoxForm from './AnswerForms/CheckBoxForm';
import CodelistForm from './AnswerForms/CodelistForm';
import DateForm from './AnswerForms/DateForm';
import FileUploadForm from './AnswerForms/FileUploadForm';
import SliderForm from './AnswerForms/SliderForm';
import TextForm from './AnswerForms/TextForm';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { Levelable } from '../../../models/Levelable';
import { ModelType, QuestionVariant } from '../../../Nexus/enums';
import { useAppSelector } from '../../../store/hooks';

interface IProps {
  element: Levelable<INeed>;
}

export default function AnswerForm({ element }: IProps): React.ReactElement {
  const answers: IRequirementAnswer[] = [];
  const { requirementAnswers } = useAppSelector(
    (state) => state.prefilledResponse.prefilledResponse
  );

  element.requirements.forEach((requirement) => {
    requirement.variants.forEach((v) => {
      if (v.useSpesification) {
        v.questions.forEach((question) => {
          const newAnswer: IRequirementAnswer = {
            id: question.id,
            questionId: question.id,
            weight: 0,
            variantId: v.id,
            question,
            type: ModelType.prefilledResponse,
            requirement
          };
          answers.push(newAnswer);
        });
      }
    });
  });

  const renderQuestions = (elem: IRequirementAnswer) => {
    /** the user can start a blank form, or fill in some fields and switch pages. This logic makes sure that
     * already filled fields still preserves state
     */
    const foundIndex = requirementAnswers.findIndex((e) => e.id === elem.id);
    let existingAnswer: IRequirementAnswer | null = null;
    if (foundIndex !== -1) {
      existingAnswer = requirementAnswers[foundIndex];
    }

    switch (elem.question.type) {
      case QuestionVariant.Q_SLIDER: {
        return (
          <SliderForm
            answer={elem}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_PERIOD_DATE: {
        return (
          <DateForm
            answer={elem}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_FILEUPLOAD: {
        return (
          <FileUploadForm
            answer={elem}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_TEXT: {
        return (
          <TextForm
            answer={elem}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_CODELIST: {
        return (
          <CodelistForm
            answer={elem}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_TIME: {
        return <p key={elem.question.id}>Not Implemented</p>;
      }
      case QuestionVariant.Q_CHECKBOX: {
        return (
          <CheckBoxForm
            answer={elem}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      default: {
        return <div key={uuidv4()}>Error, not question type matches</div>;
      }
    }
  };

  const renderQuestionWrapper = (wrap: IRequirementAnswer[]) => {
    return wrap.map((w) => {
      return renderQuestions(w);
    });
  };

  return <div>{answers && renderQuestionWrapper(answers)}</div>;
}
