import UuidService from './UuidService';
import { IBank } from '../entities/IBank';
import { IPrefilledResponse } from '../entities/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../entities/IPrefilledResponseProduct';
import { ModelType } from '../enums';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { PrefilledResponseStoreService } from './PrefilledResponseStore';
import BaseService from './BaseService';

export default class PrefilledResponseService extends BaseService {
  UuidService = new UuidService();

  store: PrefilledResponseStoreService;

  public constructor() {
    super();
    this.store = new PrefilledResponseStoreService();
  }

  async setPrefilledResponse(
    prefilledResponse: IPrefilledResponse
  ): Promise<IPrefilledResponse> {
    return this.store.setPrefilledResponse(prefilledResponse);
  }

  public async getPrefilledResponse(id: string): Promise<IPrefilledResponse> {
    return this.store.getPrefilledResponse(id);
  }

  public createPrefilledResponseFromBank(bank: IBank): IPrefilledResponse {
    return {
      id: '',
      bank: bank,
      supplier: '',
      products: [],
      answeredVariants: [],
      requirementAnswers: [],
    };
  }

  public generateDefaultPrefilledResponseProductValues(): IPrefilledResponseProduct {
    return {
      id: '',
      title: '',
      description: '',
      originProduct: {
        id: '',
        title: '',
        description: '',
        type: ModelType.product,
        parent: '',
        sourceOriginal: '',
        sourceRel: null,
        deletedDate: null,
        unit: 'stk',
      },
      answeredVariants: [],
      requirementAnswers: [],
      relatedProducts: [],
    };
  }

  createPrefilledResponseProductWithId = (
    item: IPrefilledResponseProduct
  ): IPrefilledResponseProduct => {
    const prefResProd = { ...item };
    prefResProd.id = this.UuidService.generateId();
    return prefResProd;
  };

  createRequirementAnswerWithId = (
    requirementAnswer: IRequirementAnswer
  ): IRequirementAnswer => {
    const reqAnswer = { ...requirementAnswer };
    reqAnswer.id = this.UuidService.generateId();
    return reqAnswer;
  };
}
