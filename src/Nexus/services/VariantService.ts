import { IVariant } from '../entities/IVariant';
import StoreService from './StoreService';
import UuidService from './UuidService';
import { VariantType } from '../enums';

export default class VariantService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultVariantValues = (): IVariant => {
    return {
      id: '',
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

  createVariantWithId = (item: IVariant): IVariant => {
    const variant = { ...item };
    variant.id = this.UuidService.generateId();
    return variant;
  };
}
