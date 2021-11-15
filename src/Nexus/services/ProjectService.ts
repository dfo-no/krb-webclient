import { IBank } from '../../models/IBank';
import ModelType from '../../models/ModelType';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class ProjectService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  public setProject(bank: IBank): void {
    this.storeService.setBank(bank);
  }

  public getProject(): IBank {
    return this.storeService.getBank();
  }

  generateDefaultProjectValues = (): IBank => {
    const defaultValues: IBank = {
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
