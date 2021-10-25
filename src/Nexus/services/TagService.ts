import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { Tag } from '../../models/Tag';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class TagService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultTaglistValues = (projectId: string): Parentable<Tag> => {
    const defaultValues: Parentable<Tag> = {
      id: '',
      title: '',
      type: ModelType.tag,
      parent: '',
      sourceOriginal: projectId,
      sourceRel: null
    };
    return defaultValues;
  };

  generateTag = (item: Parentable<Tag>): Parentable<Tag> => {
    const tag = { ...item };
    tag.id = this.UuidService.generateId();
    return tag;
  };

  async add(item: Parentable<Tag>): Promise<void> {
    return this.storeService.addTag(item);
  }

  async edit(item: Parentable<Tag>): Promise<void> {
    return this.storeService.editTag(item);
  }

  async delete(item: Parentable<Tag>): Promise<void> {
    return this.storeService.deleteTag(item);
  }
}
