import UuidService from './UuidService';
import { IBank } from '../entities/IBank';
import { IPrefilledResponse } from '../../models/IPrefilledResponse';

export default class PrefilledResponseService {
  UuidService = new UuidService();

  public createPrefilledResponseFromBank(bank: IBank): IPrefilledResponse {
    return {
      bank: bank,
      supplier: '',
      products: bank.products.map((product) => {
        return {
          id: this.UuidService.generateId(),
          title: product.title,
          description: product.description,
          originProduct: product,
          answeredVariants: [],
          requirementAnswers: [],
          relatedProducts: []
        };
      }),
      answeredVariants: [],
      requirementAnswers: []
    };
  }
}
