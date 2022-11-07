import { isEqual } from 'lodash';

import ResponseStoreService from './ResponseStoreService';
import UuidService from './UuidService';
import { IPrefilledResponse } from '../entities/IPrefilledResponse';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { IResponse } from '../entities/IResponse';
import { IResponseProduct } from '../entities/IResponseProduct';
import { ISpecification } from '../entities/ISpecification';
import BaseService from './BaseService';

export default class ResponseService extends BaseService {
  UuidService = new UuidService();

  private store: ResponseStoreService;

  public constructor(store: ResponseStoreService) {
    super();
    this.store = store;
  }

  public createResponseFromSpecification(
    specification: ISpecification
  ): IResponse {
    return {
      id: '',
      specification: specification,
      supplier: '',
      products: specification.products.map((specProduct) => {
        return {
          id: this.UuidService.generateId(),
          title: specProduct.title,
          description: specProduct.description,
          originProduct: specProduct,
          price: 0,
          requirementAnswers: [],
        };
      }),
      requirementAnswers: [],
    };
  }

  async setResponse(response: IResponse): Promise<IResponse> {
    return this.store.setResponse(response);
  }

  async getResponse(id: string): Promise<IResponse | null> {
    return this.store.getResponse(id);
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
