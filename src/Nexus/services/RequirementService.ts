import StoreService from './StoreService';
import UuidService from './UuidService';
import { IVariant } from '../entities/IVariant';
import { ModelType } from '../enums';
import { Requirement } from '../../api/openapi-fetch';

export default class RequirementService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  public static defaultRequirement = (
    projectId?: string,
    needRef?: string
  ): Requirement => {
    return {
      ref: '',
      title: '',
      description: '',
      needRef: needRef ?? '',
      // type: ModelType.requirement,
      variants: [],
      tags: [],
      sourceOriginal: projectId ?? null,
      sourceRel: null,
    };
  };

  createRequirementWithId = (item: Requirement): Requirement => {
    const requirement = { ...item };
    requirement.ref = this.UuidService.generateId();
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
