import { IProduct } from '../../models/IProduct';
import ModelType from '../../models/ModelType';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class ProductService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultProductValues = (projectId: string): IProduct => {
    const defaultValues: IProduct = {
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

  createProductWithId = (item: IProduct): IProduct => {
    const tag = { ...item };
    tag.id = this.UuidService.generateId();
    return tag;
  };

  async add(item: IProduct): Promise<void> {
    return this.storeService.addProduct(item);
  }

  async edit(item: IProduct): Promise<void> {
    return this.storeService.editProduct(item);
  }

  async delete(item: IProduct): Promise<void> {
    return this.storeService.deleteProduct(item);
  }
}
