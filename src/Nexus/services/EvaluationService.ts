import { IResponse } from '../../models/IResponse';
import QuestionEnum from '../../models/QuestionEnum';
import { IEvaluation } from '../entities/IEvaluation';

export default class EvaluationService {
  /**
   * We assume the specification has already been met
   */
  public static evaluateAll(responses: IResponse[]): IEvaluation[] {
    const evaluations: IEvaluation[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  private static evaluate(response: IResponse): IEvaluation {
    const evaluation: IEvaluation = {
      supplier: response.supplier,
      points: 0
    };

    response.requirementAnswers.forEach((requirementAnswer) => {
      // check if answer also exist in specification
      const ix = response.spesification.requirementAnswers.findIndex(
        (elem) => elem.id === requirementAnswer.id
      );
      if (ix === -1) {
        throw Error('Answer does not exist in specification');
      }

      if (requirementAnswer.question.type !== QuestionEnum.Q_CHECKBOX) {
        evaluation.points += 1;
      }
    });

    return evaluation;
  }
}
