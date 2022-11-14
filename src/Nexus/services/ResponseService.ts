import { IResponse } from '../entities/IResponse';
import { ISpecification } from '../entities/ISpecification';
import ResponseStoreService from './ResponseStoreService';
import UuidService from './UuidService';

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
          requirementAnswers: [],
        };
      }),
      requirementAnswers: [],
    };
  }

  async setResponse(response: IResponse): Promise<void> {
    return this.store.setResponse(response);
  }
}
