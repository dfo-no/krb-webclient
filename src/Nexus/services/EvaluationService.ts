import { IEvaluatedResponse } from '../entities/IEvaluatedResponse';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { IResponse } from '../entities/IResponse';
import { IResponseProduct } from '../entities/IResponseProduct';

export default class EvaluationService {
  private static calculateDiscount(
    requirementAnswer: IRequirementAnswer
  ): number {
    const discount = requirementAnswer.question.answer.discount;
    return !!discount ? discount : 0;
  }

  evaluateAll(responses: IResponse[]): IEvaluatedResponse[] {
    const evaluations: IEvaluatedResponse[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  calculateProductDiscount(product: IResponseProduct): number {
    let total = 0;

    product.requirementAnswers.forEach((requirementAnswer) => {
      const discount = EvaluationService.calculateDiscount(requirementAnswer);
      total += discount;
    });
    return total;
  }

  calculateGeneralDiscount(response: IResponse): number {
    let total = 0;

    response.requirementAnswers.forEach((requirementAnswer) => {
      const discount = EvaluationService.calculateDiscount(requirementAnswer);
      total += discount;
    });
    return total;
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const evaluation: IEvaluatedResponse = {
      supplier: response.supplier,
      discount: 0,
    };
    let totDiscount = 0;

    const calc = this.calculateGeneralDiscount(response);
    totDiscount += calc;

    response.products.forEach((product) => {
      const productCalc = this.calculateProductDiscount(product);
      totDiscount += productCalc;
    });

    evaluation.discount = totDiscount;
    return evaluation;
  }
}
