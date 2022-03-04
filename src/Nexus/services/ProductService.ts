import ModelType from '../../models/ModelType';
import { IProduct } from '../entities/IProduct';
import StoreService from './StoreService';
import UuidService from './UuidService';
import { Parentable } from '../../models/Parentable';

export default class ProductService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultProductValues = (projectId: string): Parentable<IProduct> => {
    const defaultValues: Parentable<IProduct> = {
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

  createProductWithId = (item: Parentable<IProduct>): Parentable<IProduct> => {
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
