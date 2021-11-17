import { config } from 'process';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IPrefilledResponseProduct } from '../../models/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Levelable } from '../../models/Levelable';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import {
  ICheckboxAnswer,
  ICheckboxQuestion
} from '../../Nexus/entities/ICheckboxQuestion';
import {
  ICodelistAnswer,
  ICodelistQuestion
} from '../../Nexus/entities/ICodelistQuestion';
import {
  IFileUploadAnswer,
  IFileUploadQuestion
} from '../../Nexus/entities/IFileUploadQuestion';
import { INeed } from '../../Nexus/entities/INeed';
import {
  IPeriodDateAnswer,
  IPeriodDateQuestion
} from '../../Nexus/entities/IPeriodDateQuestion';
import {
  ISliderAnswer,
  ISliderQuestion
} from '../../Nexus/entities/ISliderQuestion';
import { ITextAnswer, ITextQuestion } from '../../Nexus/entities/ITextQuestion';
import { ITimeAnswer, ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';
import ProductCodelistForm from './AnswerForms/ProductCodelistForm';
import ProductDateForm from './AnswerForms/ProductDateForm';
import ProductSliderForm from './AnswerForms/ProductSliderForm';
import ProductTextForm from './AnswerForms/ProductTextForm';

interface IProps {
  element: Levelable<INeed>;
  product: IPrefilledResponseProduct;
}

export default function AnswerForm({
  element,
  product
}: IProps): React.ReactElement {
  const answers: IRequirementAnswer[] = [];

  element.requirements.forEach((requirement) => {
    requirement.variants.forEach((v) => {
      if (v.products.includes(product.originProduct.id)) {
        v.questions.forEach((question) => {
          let questionResult: QuestionType = { ...question };

          if (question.type === QuestionEnum.Q_CHECKBOX) {
            const answer = {
              value: false,
              point: 0
            } as ICheckboxAnswer;
            questionResult = { ...question, answer } as ICheckboxQuestion;
          }
          if (question.type === QuestionEnum.Q_CODELIST) {
            const answer: ICodelistAnswer = { codes: [], point: 0 };
            questionResult = { ...question, answer } as ICodelistQuestion;
          }
          if (question.type === QuestionEnum.Q_PERIOD_DATE) {
            const answer: IPeriodDateAnswer = {
              date: question.config.fromDate,
              point: 0
            };
            questionResult = { ...question, answer } as IPeriodDateQuestion;
          }
          if (question.type === QuestionEnum.Q_SLIDER) {
            const answer: ISliderAnswer = {
              value: question.config.min,
              point: 0
            };
            questionResult = { ...question, answer } as ISliderQuestion;
          }
          if (question.type === QuestionEnum.Q_TEXT) {
            const answer: ITextAnswer = {
              text: '',
              point: 0
            };
            questionResult = { ...question, answer } as ITextQuestion;
          }
          if (question.type === QuestionEnum.Q_FILEUPLOAD) {
            const answer: IFileUploadAnswer = {
              file: '',
              point: 0
            };
            questionResult = { ...question, answer } as IFileUploadQuestion;
          }

          const newAnswer: IRequirementAnswer = {
            id: question.id,
            questionId: question.id,
            weight: 0,
            variantId: v.id,
            question: questionResult,
            type: ModelType.prefilledResponse,
            requirement
          };
          answers.push(newAnswer);
        });
      }
    });
  });

  const renderQuestions = (elem: IRequirementAnswer) => {
    switch (elem.question.type) {
      case QuestionEnum.Q_SLIDER: {
        return (
          <ProductSliderForm
            elem={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      case QuestionEnum.Q_PERIOD_DATE: {
        return (
          <ProductDateForm
            answer={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      case QuestionEnum.Q_FILEUPLOAD: {
        return <div key={elem.question.id}>Q_FILEUPLOAD</div>;
      }
      case QuestionEnum.Q_TEXT: {
        return (
          <ProductTextForm
            answer={elem}
            product={product}
            key={elem.question.id}
          />
        );
      }
      case QuestionEnum.Q_CODELIST: {
        return (
          <ProductCodelistForm
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
