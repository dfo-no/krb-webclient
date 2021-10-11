import { Bank } from '../../models/Bank';
import ModelType from '../../models/ModelType';
import UuidService from './UuidService';

export default class NeedService {
  UuidService = new UuidService();

  generateDefaultProjectValues = (): Bank => {
    const defaultValues: Bank = {
      id: '',
      title: '',
      description: '',
      needs: [],
      codelist: [],
      products: [],
      publications: [],
      tags: [],
      version: 0,
      publishedDate: null,
      type: ModelType.bank,
      inheritedBanks: [],
      sourceOriginal: null,
      sourceRel: null,
      projectId: null
    };
    return defaultValues;
  };
}
