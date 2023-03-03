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

  calculateTotalProductsDiscount(response: IResponse): number {
    let totalDiscount = 0;
    response.products.forEach((product) => {
      totalDiscount += this.calculateProductDiscount(product);
    });
    return totalDiscount;
  }

  calculateTotalProductsPrice(response: IResponse): number {
    let productPrice = 0;
    response.products.forEach((product) => {
      productPrice += Number(product.price);
    });
    return productPrice;
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const totalProductsPrice = this.calculateTotalProductsPrice(response);
    const generalDiscount = this.calculateGeneralDiscount(response);
    const totalProductsDiscount = this.calculateTotalProductsDiscount(response);
    const offer = totalProductsPrice - totalProductsDiscount - generalDiscount;

    return {
      supplier: response.supplier,
      offer: offer,
    };
  }
}
