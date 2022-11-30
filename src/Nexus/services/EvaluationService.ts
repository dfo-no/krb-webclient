import { IEvaluatedResponse } from '../entities/IEvaluatedResponse';
import { IDiscountCalculation } from '../entities/IDiscountCalculation';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { IResponse } from '../entities/IResponse';
import { IResponseProduct } from '../entities/IResponseProduct';

export default class EvaluationService {
  private static calculateDiscount(
    requirementAnswer: IRequirementAnswer
  ): IDiscountCalculation {
    const discount = requirementAnswer.question.answer.discount;
    return !!discount ? { total: discount, max: 100 } : { total: 0, max: 100 };
  }

  async evaluateAll(responses: IResponse[]): Promise<IEvaluatedResponse[]> {
    const evaluations: IEvaluatedResponse[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  calculateProductDiscount(product: IResponseProduct): IDiscountCalculation {
    let total = 0;
    let max = 0;
    product.requirementAnswers.forEach((requirementAnswer) => {
      const calc = EvaluationService.calculateDiscount(requirementAnswer);
      total += calc.total;
      max += calc.max;
    });
    return max === 0 ? { total: 0, max: 0 } : { total, max };
  }

  calculateGeneralDiscount(response: IResponse): IDiscountCalculation {
    let total = 0;
    let max = 0;
    response.requirementAnswers.forEach((requirementAnswer) => {
      const calc = EvaluationService.calculateDiscount(requirementAnswer);
      total += calc.total;
      max += calc.max;
    });
    return max === 0 ? { total: 0, max: 0 } : { total, max };
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const evaluation: IEvaluatedResponse = {
      supplier: response.supplier,
      discount: 0,
    };
    let maxDiscount = 0;
    let totDiscount = 0;

    const calc = this.calculateGeneralDiscount(response);
    totDiscount += calc.total;
    maxDiscount += calc.max;

    response.products.forEach((product) => {
      const productCalc = this.calculateProductDiscount(product);
      totDiscount += productCalc.total;
      maxDiscount += productCalc.max;
    });

    evaluation.discount = totDiscount / maxDiscount;
    return evaluation;
  }
}
