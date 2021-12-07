/* eslint-disable class-methods-use-this */
import { IResponse } from '../../models/IResponse';
import QuestionEnum from '../../models/QuestionEnum';
import { ICheckboxQuestion } from '../entities/ICheckboxQuestion';
import { IEvaluatedResponse } from '../entities/IEvaluatedResponse';

export default class EvaluationService {
  /**
   * We assume the specification has already been met
   */
  async evaluateAll(responses: IResponse[]): Promise<IEvaluatedResponse[]> {
    const evaluations: IEvaluatedResponse[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  evaluateCheckBox(question: ICheckboxQuestion): number {
    if (question.answer?.value === true) {
      return question.config.weightTrue / 100;
    }

    if (question.answer?.value === false) {
      return question.config.weightFalse / 100;
    }

    return 0;
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const evaluation: IEvaluatedResponse = {
      supplier: response.supplier,
      points: 0
    };

    response.requirementAnswers.forEach((requirementAnswer) => {
      // check if answer also exist in specification
      const ix = response.spesification.requirementAnswers.findIndex(
        (elem) => elem.questionId === requirementAnswer.questionId
      );
      if (ix === -1) {
        throw Error('Answer does not exist in specification');
      }

      if (requirementAnswer.question.type !== QuestionEnum.Q_CHECKBOX) {
        evaluation.points += 1;
      }
      if (requirementAnswer.question.type === QuestionEnum.Q_CHECKBOX) {
        evaluation.points += this.evaluateCheckBox(requirementAnswer.question);
      }
    });

    // TODO, if check of answer exisiting in corresponding product is necessary, add this
    response.products.forEach((product) => {
      product.requirementAnswers.forEach((answer) => {
        if (answer.question.type !== QuestionEnum.Q_CHECKBOX) {
          evaluation.points += 1;
        }
      });
    });

    // TODO, if check of answer exisiting in corresponding product is necessary, add this
    response.products.forEach((product) => {
      product.requirementAnswers.forEach((answer) => {
        if (answer.question.type !== QuestionEnum.Q_CHECKBOX) {
          evaluation.points += 1;
        }
      });
    });

    return evaluation;
  }
}
