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

  add(item: Parentable<Tag>): void {
    this.storeService.addTag(item);
  }

  edit(item: Parentable<Tag>): void {
    this.storeService.editTag(item);
  }

  delete(item: Parentable<Tag>): void {
    this.storeService.deleteTag(item);
  }
}
