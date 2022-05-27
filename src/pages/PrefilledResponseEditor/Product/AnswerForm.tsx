import React, { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ProductCheckBoxForm from './AnswerForms/ProductCheckBoxForm';
import ProductCodelistForm from './AnswerForms/ProductCodelistForm';
import ProductDateForm from './AnswerForms/ProductDateForm';
import ProductSliderForm from './AnswerForms/ProductSliderForm';
import ProductTextForm from './AnswerForms/ProductTextForm';
import { INeed } from '../../../Nexus/entities/INeed';
import { IPrefilledResponseProduct } from '../../../models/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { Levelable } from '../../../models/Levelable';
import { ModelType, QuestionVariant } from '../../../enums';

interface IProps {
  element: Levelable<INeed>;
  product: IPrefilledResponseProduct;
  searchProductId: string;
}

export default function AnswerForm({
  element,
  product,
  searchProductId
}: IProps): ReactElement {
  const answers: IRequirementAnswer[] = [];

  const requirementAnswers = product.requirementAnswers;
  element.requirements.forEach((requirement) => {
    requirement.variants.forEach((v) => {
      if (v.products.includes(searchProductId)) {
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

  const renderQuestions = (elem: IRequirementAnswer): ReactElement => {
    const foundIndex = requirementAnswers.findIndex((e) => e.id === elem.id);
    let existingAnswer: IRequirementAnswer | null = null;
    if (foundIndex !== -1) {
      existingAnswer = requirementAnswers[foundIndex];
    }
    switch (elem.question.type) {
      case QuestionVariant.Q_SLIDER: {
        return (
          <ProductSliderForm
            existingAnswer={existingAnswer}
            elem={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_PERIOD_DATE: {
        return (
          <ProductDateForm
            existingAnswer={existingAnswer}
            answer={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_FILEUPLOAD: {
        return <div key={elem.question.id}>Q_FILEUPLOAD</div>;
      }
      case QuestionVariant.Q_CHECKBOX: {
        return (
          <ProductCheckBoxForm
            answer={elem}
            product={product}
            existingAnswer={existingAnswer}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_TEXT: {
        return (
          <ProductTextForm
            existingAnswer={existingAnswer}
            answer={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      case QuestionVariant.Q_CODELIST: {
        return (
          <ProductCodelistForm
            existingAnswer={existingAnswer}
            answer={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      default: {
        return (
          <div key={uuidv4()}>
            Error, not question type matches: {elem.question.type}
          </div>
        );
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
