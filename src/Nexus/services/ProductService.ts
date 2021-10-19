import ModelType from '../../models/ModelType';
import { Product } from '../../models/Product';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class ProductService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultProductValues = (projectId: string): Product => {
    const defaultValues: Product = {
      id: '',
      title: '',
      description: '',
      type: ModelType.product,
      parent: '',
      sourceOriginal: projectId,
      sourceRel: null
    };
    return defaultValues;
  };

  createProductWithId = (item: Product): Product => {
    const tag = { ...item };
    tag.id = this.UuidService.generateId();
    return tag;
  };

  async addProduct(item: Product): Promise<void> {
    return this.storeService.addProduct(item);
  }

  async editProduct(item: Product): Promise<void> {
    return this.storeService.editProduct(item);
  }

  async deleteProduct(item: Product): Promise<void> {
    return this.storeService.deleteProduct(item);
  }
}
