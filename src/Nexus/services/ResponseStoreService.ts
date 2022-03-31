/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IResponse } from '../../models/IResponse';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecification } from '../entities/ISpecification';

export default class ResponseStoreService {
  private static response: IResponse;

  public setResponse(response: IResponse): void {
    ResponseStoreService.response = response;
  }

  // eslint-disable-next-line class-methods-use-this
  public getResponse(): IResponse {
    return ResponseStoreService.response;
  }

  public createResponseFromSpecification(specification: ISpecification): void {
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

  public addResponseProduct(product: IResponseProduct): void {
    ResponseStoreService.response = produce(
      ResponseStoreService.response,
      (draft) => {
        draft.products.push(product);
      }
    );
  }

  public editResponseProduct(product: IResponseProduct): void {
    const index = ResponseStoreService.response.products.findIndex(
      (responseProduct: IResponseProduct) => responseProduct.id === product.id
    );
    ResponseStoreService.response = produce(
      ResponseStoreService.response,
      (draft) => {
        draft.products[index] = product;
      }
    );
  }

  public deleteResponseProduct(product: IResponseProduct): void {
    const index = ResponseStoreService.response.products.findIndex(
      (responseProduct: IResponseProduct) => responseProduct.id === product.id
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
