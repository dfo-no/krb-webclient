import { IEvaluatedResponse } from '../entities/IEvaluatedResponse';
import { IResponse } from '../../models/IResponse';

export default class EvaluationService {
  async evaluateAll(responses: IResponse[]): Promise<IEvaluatedResponse[]> {
    const evaluations: IEvaluatedResponse[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const evaluation: IEvaluatedResponse = {
      supplier: response.supplier,
      points: 0
    };
    let maxPoints = 0;
    let totPoints = 0;

    response.requirementAnswers.forEach((requirementAnswer) => {
      const weight = requirementAnswer.weight / 100;
      const points = requirementAnswer.question.answer.point;
      if (points) {
        totPoints += points * weight;
      }
      maxPoints += 100 * weight;
    });

    response.products.forEach((product) => {
      product.requirementAnswers.forEach((requirementAnswer) => {
        const weight = requirementAnswer.weight / 100;
        const points = requirementAnswer.question.answer.point;
        if (points) {
          totPoints += points * weight;
        }
        maxPoints += 100 * weight;
      });
    });

    evaluation.points = totPoints / maxPoints;
    return evaluation;
  }
}
