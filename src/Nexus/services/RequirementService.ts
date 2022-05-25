import StoreService from './StoreService';
import UuidService from './UuidService';
import { IRequirement } from '../entities/IRequirement';
import { IVariant } from '../entities/IVariant';
import { ModelType } from '../../enums';

export default class RequirementService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultRequirementValues = (
    projectId: string,
    needId: string
  ): IRequirement => {
    return {
      id: '',
      title: '',
      description: '',
      needId: needId,
      type: ModelType.requirement,
      variants: [],
      tags: [],
      sourceOriginal: projectId,
      sourceRel: null
    };
  };

  createRequirementWithId = (item: IRequirement): IRequirement => {
    const requirement = { ...item };
    requirement.id = this.UuidService.generateId();
    return requirement;
  };

  async add(item: IRequirement): Promise<void> {
    return this.storeService.addRequirement(item.needId, item);
  }

  async edit(item: IRequirement): Promise<void> {
    return this.storeService.editRequirement(item.needId, item);
  }

  async delete(item: IRequirement): Promise<void> {
    return this.storeService.deleteRequirement(item.needId, item);
  }

  async addVariant(
    item: IVariant,
    requirementId: string,
    needId: string
  ): Promise<void> {
    return this.storeService.addVariant(needId, requirementId, item);
  }

  async editVariant(
    item: IVariant,
    requirementId: string,
    needId: string
  ): Promise<void> {
    return this.storeService.editVariant(needId, requirementId, item);
  }

  async deleteVariant(
    item: IVariant,
    requirementId: string,
    needId: string
  ): Promise<void> {
    return this.storeService.deleteVariant(needId, requirementId, item);
  }

  async addQuesion(
    item: IVariant,
    requirementId: string,
    needId: string
  ): Promise<void> {
    return this.storeService.addVariant(needId, requirementId, item);
  }

  async editQuesion(
    item: IVariant,
    requirementId: string,
    needId: string
  ): Promise<void> {
    return this.storeService.editVariant(needId, requirementId, item);
  }

  async deleteQuesion(
    item: IVariant,
    requirementId: string,
    needId: string
  ): Promise<void> {
    return this.storeService.deleteVariant(needId, requirementId, item);
  }
}
