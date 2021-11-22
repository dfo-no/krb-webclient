import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { ICode } from '../entities/ICode';
import { ICodelist } from '../entities/ICodelist';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class CodelistService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultCodelistValues = (projectId: string): ICodelist => {
    const defaultValues: ICodelist = {
      id: '',
      title: '',
      description: '',
      codes: [],
      type: ModelType.codelist,
      sourceOriginal: projectId,
      sourceRel: null
    };
    return defaultValues;
  };

  generateDefaultCodeValues = (projectId: string): Parentable<ICode> => {
    const defaultValues: Parentable<ICode> = {
      id: '',
      title: '',
      description: '',
      type: ModelType.code,
      sourceOriginal: projectId,
      sourceRel: null,
      parent: ''
    };
    return defaultValues;
  };

  createCodelistWithId = (item: ICodelist): ICodelist => {
    const codelist = { ...item };
    codelist.id = this.UuidService.generateId();
    return codelist;
  };

  createCodeWithId = (item: Parentable<ICode>): Parentable<ICode> => {
    const code = { ...item };
    code.id = this.UuidService.generateId();
    return code;
  };

  async addCodelist(item: ICodelist): Promise<void> {
    return this.storeService.addCodelist(item);
  }

  async editCodelist(item: ICodelist): Promise<void> {
    return this.storeService.editCodelist(item);
  }

  async deleteCodelist(item: ICodelist): Promise<void> {
    return this.storeService.deleteCodelist(item);
  }

  async addCode(item: Parentable<ICode>, codelistId: string): Promise<void> {
    return this.storeService.addCode(item, codelistId);
  }

  async editCode(item: Parentable<ICode>, codelistId: string): Promise<void> {
    return this.storeService.editCode(item, codelistId);
  }

  async deleteCode(item: Parentable<ICode>, codelistId: string): Promise<void> {
    return this.storeService.deleteCode(item, codelistId);
  }
}
