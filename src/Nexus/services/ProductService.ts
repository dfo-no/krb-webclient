import StoreService from './StoreService';
import UuidService from './UuidService';
import { IProduct } from '../entities/IProduct';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';

export default class ProductService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  public static defaultProduct = (projectId?: string): Parentable<IProduct> => {
    return {
      id: '',
      title: '',
      description: '',
      type: ModelType.product,
      parent: '',
      sourceOriginal: projectId ?? null,
      sourceRel: null,
      deletedDate: null
    };
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
