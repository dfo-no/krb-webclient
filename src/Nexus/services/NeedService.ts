/* eslint-disable class-methods-use-this */
import StoreService from './StoreService';
import UuidService from './UuidService';
import { INeed } from '../entities/INeed';
import { ModelType } from '../../enums';
import { Parentable } from '../../models/Parentable';

export default class NeedService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultNeedValues = (projectId: string): Parentable<INeed> => {
    const defaultValues: Parentable<INeed> = {
      id: '',
      title: '',
      description: '',
      requirements: [],
      type: ModelType.need,
      parent: '',
      sourceOriginal: projectId,
      sourceRel: null
    };
    return defaultValues;
  };

  createNeedWithId = (item: Parentable<INeed>): Parentable<INeed> => {
    const tag = { ...item };
    tag.id = this.UuidService.generateId();
    return tag;
  };

  async add(item: Parentable<INeed>): Promise<void> {
    return this.storeService.addNeed(item);
  }

  async edit(item: Parentable<INeed>): Promise<void> {
    return this.storeService.editNeed(item);
  }

  async delete(item: Parentable<INeed>): Promise<void> {
    return this.storeService.deleteNeed(item);
  }
}
