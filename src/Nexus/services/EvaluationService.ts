/* eslint-disable class-methods-use-this */
import { IResponse } from '../../models/IResponse';
import QuestionEnum from '../../models/QuestionEnum';
import { IEvaluation } from '../entities/IEvaluation';

export default class EvaluationService {
  /**
   * We assume the specification has already been met
   */
  async evaluateAll(responses: IResponse[]): Promise<IEvaluation[]> {
    const evaluations: IEvaluation[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  evaluate(response: IResponse): IEvaluation {
    const evaluation: IEvaluation = {
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
