import { Bank } from '../../models/Bank';
import ModelType from '../../models/ModelType';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class ProjectService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

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

  editTitle = (title: string): void => {
    this.storeService.editProjectTitle(title);
  };

  editDescription = (description: string): void => {
    this.storeService.editProjectTitle(description);
  };
}
