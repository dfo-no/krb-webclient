import BaseService from './BaseService';
import { IBaseModel } from '../entities/IBaseModel';
import { ModelType } from '../enums';

describe('BaseService', () => {
  it('withId returns object with id', async () => {
    const baseService = new BaseService();
    const obj: IBaseModel = {
      id: '',
      type: ModelType.bank,
      sourceRel: null,
      sourceOriginal: null,
    };
    const result = baseService.withId(obj);
    expect(result.id).not.toEqual('');
  });
});
