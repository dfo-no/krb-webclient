import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { Tag } from '../../models/Tag';
import UuidService from './UuidService';

export default class TagService {
  UuidService = new UuidService();

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
}
