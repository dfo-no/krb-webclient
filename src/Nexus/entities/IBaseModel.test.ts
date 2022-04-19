import { v1 as uuidv1 } from 'uuid';
import ModelType from '../../models/ModelType';
import UuidService from '../services/UuidService';
import { BaseModelSchema, IBaseModel } from './IBaseModel';

describe('IBaseModel', () => {
  test('Should validate on v4', () => {
    const uuidService = new UuidService();

    const model: IBaseModel = {
      id: uuidService.generateId(),
      type: ModelType.bank,
      sourceRel: uuidService.generateId(),
      sourceOriginal: uuidService.generateId()
    };

    const report = BaseModelSchema.validate(model);
    expect(report.error).toBeUndefined();
  });

  test('Should invalidate on v1', () => {
    const model: IBaseModel = {
      id: uuidv1(),
      type: ModelType.bank,
      sourceRel: uuidv1(),
      sourceOriginal: uuidv1()
    };

    const report = BaseModelSchema.validate(model, { abortEarly: false });

    expect(report.error?.details.length).toEqual(3);

    expect(report.error?.details[0].message).toEqual(
      '"id" must be a valid GUID'
    );
    expect(report.error?.details[1].message).toEqual(
      '"sourceRel" must be a valid GUID'
    );
    expect(report.error?.details[2].message).toEqual(
      '"sourceOriginal" must be a valid GUID'
    );

    expect(report.error?.details[0].type).toEqual('string.guid');
    expect(report.error?.details[1].type).toEqual('string.guid');
    expect(report.error?.details[1].type).toEqual('string.guid');
  });

  test('Should validate on null as sourceRel and sourceOriginal', () => {
    const uuidService = new UuidService();
    const model: IBaseModel = {
      id: uuidService.generateId(),
      type: ModelType.bank,
      sourceRel: null,
      sourceOriginal: null
    };

    const report = BaseModelSchema.validate(model, { abortEarly: false });
    expect(report.error).toBeUndefined();
  });
});
