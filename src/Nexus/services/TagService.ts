import StoreService from './StoreService';
import UuidService from './UuidService';
import { ITag } from '../entities/ITag';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';

export default class TagService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultTaglistValues = (projectId: string): Parentable<ITag> => {
    return {
      id: '',
      title: '',
      description: '',
      type: ModelType.tag,
      parent: '',
      sourceOriginal: projectId,
      sourceRel: null
    };
  };

  generateTag = (item: Parentable<ITag>): Parentable<ITag> => {
    const tag = { ...item };
    tag.id = this.UuidService.generateId();
    return tag;
  };

  async add(item: Parentable<ITag>): Promise<void> {
    return this.storeService.addTag(item);
  }

  async edit(item: Parentable<ITag>): Promise<void> {
    return this.storeService.editTag(item);
  }

  async delete(item: Parentable<ITag>): Promise<void> {
    return this.storeService.deleteTag(item);
  }
}
