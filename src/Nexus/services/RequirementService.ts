import ModelType from '../../models/ModelType';
import { Requirement } from '../../models/Requirement';
import RequirementType from '../../models/RequirementType';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class RequirementService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultRequirementValues = (projectId: string): Requirement => {
    const defaultValues: Requirement = {
      id: '',
      title: '',
      description: '',
      needId: '',
      requirement_Type: RequirementType.requirement,
      type: ModelType.requirement,
      variants: [],
      tags: [],
      sourceOriginal: projectId,
      sourceRel: null
    };
    return defaultValues;
  };

  createRequirementWithId = (item: Requirement): Requirement => {
    const requirement = { ...item };
    requirement.id = this.UuidService.generateId();
    return requirement;
  };

  async add(item: Requirement): Promise<void> {
    return this.storeService.addRequirement(item.needId, item);
  }

  async edit(item: Requirement): Promise<void> {
    return this.storeService.editRequirement(item.needId, item);
  }

  async delete(item: Requirement): Promise<void> {
    return this.storeService.deleteRequirement(item.needId, item);
  }
}
