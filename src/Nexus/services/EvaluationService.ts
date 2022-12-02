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
    return responses.map((response) => this.evaluate(response));
  }

  calculateProductDiscount(product: IResponseProduct): number {
    return product.requirementAnswers
      .map((requirementAnswer) => {
        return EvaluationService.calculateDiscount(requirementAnswer);
      })
      .reduce((totalDiscount, discount) => {
        return totalDiscount + discount;
      }, 0);
  }

  calculateGeneralDiscount(response: IResponse): number {
    return response.requirementAnswers
      .map((requirementAnswer) => {
        return EvaluationService.calculateDiscount(requirementAnswer);
      })
      .reduce((totalDiscount, discount) => {
        return totalDiscount + discount;
      }, 0);
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    let discount = this.calculateGeneralDiscount(response);

    response.products.forEach((product) => {
      discount += this.calculateProductDiscount(product);
    });

    return {
      supplier: response.supplier,
      discount: discount,
    };
  }
}
