import StoreService from './StoreService';
import UuidService from './UuidService';
import { Product } from '../../api/openapi-fetch';
import { ModelType } from '../enums';

export default class ProductService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  public static defaultProduct = (projectId?: string): Product => {
    return {
      ref: '',
      title: '',
      description: '',
      type: ModelType.product,
      parent: '',
      sourceOriginal: projectId ?? null,
      sourceRel: null,
      deletedDate: null,
      unit: 'stk',
    };
  };

  createProductWithId = (item: Product): Product => {
    const product = { ...item };
    product.ref = this.UuidService.generateId();
    return product;
  };

  async add(item: Product): Promise<void> {
    return this.storeService.addProduct(item);
  }

  async edit(item: Product): Promise<void> {
    return this.storeService.editProduct(item);
  }

  async delete(item: Product): Promise<void> {
    return this.storeService.deleteProduct(item);
  }
}
