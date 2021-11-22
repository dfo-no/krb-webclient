/* eslint-disable class-methods-use-this */
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Response } from '../../models/Response';
import { ResponseProduct } from '../../models/ResponseProduct';
import { Specification } from '../../models/Specification';
import ResponseStoreService from './ResponseStoreService';
import UuidService from './UuidService';

export default class ResponseService {
  UuidService = new UuidService();

  private store: ResponseStoreService;

  public constructor(store: ResponseStoreService) {
    this.store = store;
  }

  async setResponse(response: Response): Promise<void> {
    return this.store.setResponse(response);
  }

  async getSpecification(): Promise<Response> {
    return this.store.getResponse();
  }

  async editSupplier(supplier: string): Promise<void> {
    return this.store.editSupplier(supplier);
  }

  async createSpecificationFromBank(
    specification: Specification
  ): Promise<void> {
    return this.store.createResponseFromSpecification(specification);
  }

  async addResponseProduct(product: ResponseProduct): Promise<void> {
    return this.store.addResponseProduct(product);
  }

  async editResponseProduct(product: ResponseProduct): Promise<void> {
    return this.store.editResponseProduct(product);
  }

  async deleteResponseProduct(product: ResponseProduct): Promise<void> {
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
        if (specAnswer.question.config !== answer.question.config) {
          changedRequirements.push(answer.questionId);
        } else {
          matchedRequirements.push(answer);
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
}
