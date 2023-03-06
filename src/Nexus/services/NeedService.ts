/* eslint-disable class-methods-use-this */
import StoreService from './StoreService';
import UuidService from './UuidService';
import { INeed } from '../entities/INeed';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';
import { NeedForm } from '../../api/nexus2';

export default class NeedService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultNeedValues = (projectId: string): Parentable<INeed> => {
    return {
      id: '',
      title: '',
      description: '',
      requirements: [],
      type: ModelType.need,
      parent: '',
      sourceOriginal: projectId,
      sourceRel: null,
    };
  };

  createNeedWithId = (item: NeedForm): NeedForm => {
    return { ...item, ref: this.UuidService.generateId() };
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
