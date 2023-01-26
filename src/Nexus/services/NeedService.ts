/* eslint-disable class-methods-use-this */
import StoreService from './StoreService';
import UuidService from './UuidService';
import { Need } from '../../api/openapi-fetch';
// import { ModelType } from '../enums';

export default class NeedService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultNeedValues = (projectId: string): Need => {
    return {
      ref: '',
      title: '',
      description: '',
      // requirements: [],
      // type: ModelType.need,
      parent: '',
      sourceOriginal: projectId,
      sourceRel: null,
    };
  };

  createNeedWithId = (item: Need): Need => {
    const need = { ...item };
    need.ref = this.UuidService.generateId();
    return need;
  };

  async add(item: Need): Promise<void> {
    return this.storeService.addNeed(item);
  }

  async edit(item: Need): Promise<void> {
    return this.storeService.editNeed(item);
  }

  async delete(item: Need): Promise<void> {
    return this.storeService.deleteNeed(item);
  }
}
