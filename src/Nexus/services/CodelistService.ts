import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import ModelType from '../../models/ModelType';
import UuidService from './UuidService';

export default class CodelistService {
  UuidService = new UuidService();

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
}
