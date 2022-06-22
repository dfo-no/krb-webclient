import { isEqual } from 'lodash';

import ResponseStoreService from './ResponseStoreService';
import UuidService from './UuidService';
import { IPrefilledResponse } from '../../models/IPrefilledResponse';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IResponse } from '../../models/IResponse';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecification } from '../entities/ISpecification';

export default class ResponseService {
  UuidService = new UuidService();

  private store: ResponseStoreService;

  public constructor(store: ResponseStoreService) {
    this.store = store;
  }

  public createResponseFromSpecification(
    specification: ISpecification
  ): IResponse {
    return {
      specification: specification,
      supplier: '',
      products: specification.products.map((specProduct) => {
        return {
          id: this.UuidService.generateId(),
          title: specProduct.title,
          description: specProduct.description,
          originProduct: specProduct,
          price: 0,
          requirementAnswers: []
        };
      }),
      requirementAnswers: []
    };
  }

  async setResponse(response: IResponse): Promise<void> {
    return this.store.setResponse(response);
  }

  async getSpecification(): Promise<IResponse> {
    return this.store.getResponse();
  }

  async editSupplier(supplier: string): Promise<void> {
    return this.store.editSupplier(supplier);
  }

  async createSpecificationFromBank(
    specification: ISpecification
  ): Promise<void> {
    return this.store.createResponseFromSpecification(specification);
  }

  async addResponseProduct(product: IResponseProduct): Promise<void> {
    return this.store.addResponseProduct(product);
  }

  async editResponseProduct(product: IResponseProduct): Promise<void> {
    return this.store.editResponseProduct(product);
  }

  async deleteResponseProduct(product: IResponseProduct): Promise<void> {
    return this.store.deleteResponseProduct(product);
  }

  async addProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<void> {
    return this.store.addProductAnswer(answer, productId);
  }

  async editProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<void> {
    return this.store.editProductAnswer(answer, productId);
  }

  async deleteProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<void> {
    return this.store.deleteProductAnswer(answer, productId);
  }

  async addAnswer(answer: IRequirementAnswer): Promise<void> {
    return this.store.addAnswer(answer);
  }

  async editAnswer(answer: IRequirementAnswer): Promise<void> {
    return this.store.editAnswer(answer);
  }

  async deleteAnswer(answer: IRequirementAnswer): Promise<void> {
    return this.store.deleteAnswer(answer);
  }

  matchPreAnsweredQuestions(
    specifiationRequirements: IRequirementAnswer[],
    answeredRequirements: IRequirementAnswer[]
  ): [IRequirementAnswer[], string[]] {
    const matchedRequirements: IRequirementAnswer[] = [];
    const changedRequirements: string[] = [];
    answeredRequirements.forEach((answer) => {
      const index = specifiationRequirements.findIndex(
        (element) => element.questionId === answer.questionId
      );
      if (index !== -1) {
        const specAnswer = specifiationRequirements[index];
        if (isEqual(specAnswer.question.config, answer.question.config)) {
          matchedRequirements.push(answer);
        } else {
          changedRequirements.push(answer.questionId);
        }
      }
    });
    const newAnswers = [...specifiationRequirements];
    specifiationRequirements.forEach((element, index) => {
      const matchedIndex = matchedRequirements.findIndex(
        (answer) => answer.questionId === element.questionId
      );
      if (matchedIndex !== -1) {
        newAnswers[index] = matchedRequirements[matchedIndex];
      }
    });
    return [newAnswers, changedRequirements];
  }

  // TODO add productAnswers and changed productQuestions when finished with functionality
  async matchPrefilledReponseWithSpecification(
    prefilledResponse: IPrefilledResponse,
    specification: ISpecification
  ): Promise<[IRequirementAnswer[], string[]]> {
    return this.matchPreAnsweredQuestions(
      specification.requirementAnswers,
      prefilledResponse.requirementAnswers
    );
  }
}
