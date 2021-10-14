/* eslint-disable class-methods-use-this */
import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import { Parentable } from '../../models/Parentable';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class NeedService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultNeedValues = (projectId: string): Parentable<Need> => {
    const defaultValues: Parentable<Need> = {
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

  createNeedWithId = (item: Parentable<Need>): Parentable<Need> => {
    const tag = { ...item };
    tag.id = this.UuidService.generateId();
    return tag;
  };

  addNeed(item: Parentable<Need>): void {
    this.storeService.addNeed(item);
  }

  editNeed(item: Parentable<Need>): void {
    this.storeService.editNeed(item);
  }

  deleteNeed(item: Parentable<Need>): void {
    this.storeService.deleteNeed(item);
  }
}
