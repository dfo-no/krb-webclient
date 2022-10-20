import { ModelType } from '../enums';
import { BasePublicationSchema, IPublication } from './IPublication';

describe('BasePublicationSchema works', () => {
  test('BasePublicationSchema validates', () => {
    const basePublication: IPublication = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      comment: 'A comment',
      date: new Date().toISOString(),
      version: 1,
      bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: ModelType.publication,
      deletedDate: null,
      sourceOriginal: null,
      sourceRel: null,
    };

    const report = BasePublicationSchema.validate(basePublication, {
      abortEarly: false,
    });

    expect(report.error).toBeUndefined();
  });

  test('BasePublicationSchema invalidates', () => {
    const basePublication: IPublication = {
      id: '',
      comment: '',
      date: '',
      version: -1,
      bankId: '',
      type: ModelType.bank,
      deletedDate: null,
      sourceOriginal: null,
      sourceRel: null,
    };

    const report = BasePublicationSchema.validate(basePublication, {
      abortEarly: false,
    });
    expect(report.error?.details.length).toEqual(6);
  });
});
