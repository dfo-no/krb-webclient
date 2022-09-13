import { IEvaluatedResponse } from '../entities/IEvaluatedResponse';
import { IPointsCalculation } from '../entities/IPointsCalculation';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { IResponse } from '../entities/IResponse';
import { IResponseProduct } from '../entities/IResponseProduct';

export default class EvaluationService {
  private static calculatePoints(
    requirementAnswer: IRequirementAnswer
  ): IPointsCalculation {
    const weight = requirementAnswer.weight / 100;
    const points = requirementAnswer.question.answer.point;
    return !!points
      ? { total: points * weight, max: 100 * weight }
      : { total: 0, max: 100 * weight };
  }

  async evaluateAll(responses: IResponse[]): Promise<IEvaluatedResponse[]> {
    const evaluations: IEvaluatedResponse[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  calculateProductPoints(product: IResponseProduct): IPointsCalculation {
    let total = 0;
    let max = 0;
    product.requirementAnswers.forEach((requirementAnswer) => {
      const calc = EvaluationService.calculatePoints(requirementAnswer);
      total += (product.originProduct.weight / 100) * calc.total;
      max += (product.originProduct.weight / 100) * calc.max;
    });
    return max === 0 ? { total: 0, max: 0 } : { total, max };
  }

  calculateGeneralPoints(response: IResponse): IPointsCalculation {
    let total = 0;
    let max = 0;
    response.requirementAnswers.forEach((requirementAnswer) => {
      const calc = EvaluationService.calculatePoints(requirementAnswer);
      total += (response.specification.weight / 100) * calc.total;
      max += (response.specification.weight / 100) * calc.max;
    });
    return max === 0 ? { total: 0, max: 0 } : { total, max };
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const evaluation: IEvaluatedResponse = {
      supplier: response.supplier,
      points: 0
    };
    let maxPoints = 0;
    let totPoints = 0;

    const calc = this.calculateGeneralPoints(response);
    totPoints += calc.total;
    maxPoints += calc.max;

    response.products.forEach((product) => {
      const productCalc = this.calculateProductPoints(product);
      totPoints += productCalc.total;
      maxPoints += productCalc.max;
    });

    evaluation.points = totPoints / maxPoints;
    return evaluation;
  }
}
