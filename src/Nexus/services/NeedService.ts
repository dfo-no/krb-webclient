import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import { Parentable } from '../../models/Parentable';
import UuidService from './UuidService';

export default class NeedService {
  UuidService = new UuidService();

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
}
