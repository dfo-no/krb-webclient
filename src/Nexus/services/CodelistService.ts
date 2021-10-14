import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import ModelType from '../../models/ModelType';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class CodelistService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateDefaultCodelistValues = (projectId: string): Codelist => {
    const defaultValues: Codelist = {
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

  generateDefaultCodeValues = (projectId: string): Code => {
    const defaultValues: Code = {
      id: '',
      title: '',
      description: '',
      type: ModelType.code,
      sourceOriginal: projectId,
      sourceRel: null
    };
    return defaultValues;
  };

  createCodelistWithId = (item: Codelist): Codelist => {
    const codelist = { ...item };
    codelist.id = this.UuidService.generateId();
    return codelist;
  };

  createCodeWithId = (item: Code): Code => {
    const code = { ...item };
    code.id = this.UuidService.generateId();
    return code;
  };

  addCodelist(item: Codelist): void {
    this.storeService.addCodelist(item);
  }

  editCodelist(item: Codelist): void {
    this.storeService.editCodelist(item);
  }

  deleteCodelist(item: Codelist): void {
    this.storeService.deleteCodelist(item);
  }

  addCode(item: Code, codelistId: string): void {
    this.storeService.addCode(item, codelistId);
  }

  editCode(item: Code, codelistId: string): void {
    this.storeService.editCode(item, codelistId);
  }

  deleteCode(item: Code, codelistId: string): void {
    this.storeService.deleteCode(item, codelistId);
  }
}
