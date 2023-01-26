import { RequirementVariant } from '../../api/openapi-fetch';
import StoreService from './StoreService';
import UuidService from './UuidService';
import { VariantType } from '../enums';

export default class VariantService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultVariantValues = (): RequirementVariant => {
    return {
      ref: '',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [],
      type: VariantType.requirement,
      description: '',
    };
  };

  createVariantWithId = (item: RequirementVariant): RequirementVariant => {
    const variant = { ...item };
    variant.ref = this.UuidService.generateId();
    return variant;
  };
}
