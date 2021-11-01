/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Response } from '../../models/Response';
import { ResponseProduct } from '../../models/ResponseProduct';
import { Specification } from '../../models/Specification';

export default class ResponseStoreService {
  private static response: Response;

  public setResponse(response: Response): void {
    ResponseStoreService.response = response;
  }

  // eslint-disable-next-line class-methods-use-this
  public getResponse(): Response {
    return ResponseStoreService.response;
  }

  public createResponseFromSpecification(specification: Specification): void {
    ResponseStoreService.response = {
      spesification: specification,
      supplier: '',
      products: [],
      requirementAnswers: []
    };
  }

  public editSupplier(supplier: string): void {
    ResponseStoreService.response = produce(
      ResponseStoreService.response,
      (draft) => {
        draft.supplier = supplier;
      }
    );
  }

  public addResponseProduct(product: ResponseProduct): void {
    ResponseStoreService.response = produce(
      ResponseStoreService.response,
      (draft) => {
        draft.products.push(product);
      }
    );
  }

  public editResponseProduct(product: ResponseProduct): void {
    const index = ResponseStoreService.response.products.findIndex(
      (responseProduct: ResponseProduct) => responseProduct.id === product.id
    );
    ResponseStoreService.response = produce(
      ResponseStoreService.response,
      (draft) => {
        draft.products[index] = product;
      }
    );
  }

  public deleteResponseProduct(product: ResponseProduct): void {
    const index = ResponseStoreService.response.products.findIndex(
      (responseProduct: ResponseProduct) => responseProduct.id === product.id
    );
    ResponseStoreService.response = produce(
      ResponseStoreService.response,
      (draft) => {
        draft.products.splice(index, 1);
      }
    );
  }

  addProductAnswer(answer: IRequirementAnswer, productId: string): void {
    const index = ResponseStoreService.response.products.findIndex(
      (product) => product.id === productId
    );
    ResponseStoreService.response.products[index].requirementAnswers.push(
      answer
    );
  }

  editProductAnswer(answer: IRequirementAnswer, productId: string): void {
    const index = ResponseStoreService.response.products.findIndex(
      (product) => product.id === productId
    );
    const answerIndex = ResponseStoreService.response.products[
      index
    ].requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    ResponseStoreService.response.products[index].requirementAnswers[
      answerIndex
    ] = answer;
  }

  deleteProductAnswer(answer: IRequirementAnswer, productId: string): void {
    const index = ResponseStoreService.response.products.findIndex(
      (product) => product.id === productId
    );
    const answerIndex = ResponseStoreService.response.products[
      index
    ].requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    ResponseStoreService.response.products[index].requirementAnswers.splice(
      answerIndex,
      1
    );
  }

  addAnswer(answer: IRequirementAnswer): void {
    ResponseStoreService.response.requirementAnswers.push(answer);
  }

  editAnswer(answer: IRequirementAnswer): void {
    const answerIndex =
      ResponseStoreService.response.requirementAnswers.findIndex(
        (element) => element.variantId === answer.variantId
      );
    ResponseStoreService.response.requirementAnswers[answerIndex] = answer;
  }

  deleteAnswer(answer: IRequirementAnswer): void {
    const answerIndex =
      ResponseStoreService.response.requirementAnswers.findIndex(
        (element) => element.variantId === answer.variantId
      );
    ResponseStoreService.response.requirementAnswers.splice(answerIndex, 1);
  }
}
