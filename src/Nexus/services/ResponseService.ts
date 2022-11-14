import { IResponse } from '../entities/IResponse';
import { ISpecification } from '../entities/ISpecification';
import BaseService from './BaseService';
import ResponseStoreService from './ResponseStoreService';
import UuidService from './UuidService';

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

  async getResponse(id: string): Promise<IResponse> {
    return this.store.getResponse(id);
  }
}
