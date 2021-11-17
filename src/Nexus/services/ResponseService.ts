import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IResponse } from '../../models/IResponse';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecification } from '../../models/ISpecification';
import ResponseStoreService from './ResponseStoreService';
import UuidService from './UuidService';

export default class ResponseService {
  UuidService = new UuidService();

  private store: ResponseStoreService;

  public constructor(store: ResponseStoreService) {
    this.store = store;
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
}
