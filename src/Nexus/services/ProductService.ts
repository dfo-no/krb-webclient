import ModelType from '../../models/ModelType';
import { Product } from '../../models/Product';
import UuidService from './UuidService';

export default class NeedService {
  UuidService = new UuidService();

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
}
