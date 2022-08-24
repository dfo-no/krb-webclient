import UuidService from './UuidService';
import { IBank } from '../entities/IBank';
import { IPrefilledResponse } from '../../models/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../../models/IPrefilledResponseProduct';
import { ModelType } from '../../enums';

export default class PrefilledResponseService {
  UuidService = new UuidService();

  public createPrefilledResponseFromBank(bank: IBank): IPrefilledResponse {
    return {
      bank: bank,
      supplier: '',
      products: [],
      answeredVariants: [],
      requirementAnswers: []
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
        deletedDate: null
      },
      answeredVariants: [],
      requirementAnswers: [],
      relatedProducts: []
    };
  }

  createPrefilledResponseProductWithId = (
    item: IPrefilledResponseProduct
  ): IPrefilledResponseProduct => {
    const prefResProd = { ...item };
    prefResProd.id = this.UuidService.generateId();
    return prefResProd;
  };
}
