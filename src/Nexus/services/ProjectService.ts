import StoreService from './StoreService';
import UuidService from './UuidService';
import { IBank } from '../entities/IBank';
import { ModelType } from '../enums';

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

  public static defaultProject = (): IBank => {
    return {
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
      projectId: null,
      deletedDate: null,
    };
  };

  editTitle = (title: string): void => {
    this.storeService.editProjectTitle(title);
  };

  editDescription = (description: string): void => {
    this.storeService.editProjectTitle(description);
  };
}
