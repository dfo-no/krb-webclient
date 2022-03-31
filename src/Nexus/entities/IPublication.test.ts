import ModelType from '../../models/ModelType';
import {
  BasePublicationSchema,
  IPublication,
  PostPublicationSchema
} from './IPublication';

describe('BasePublicationSchema works', () => {
  test('BasePublicationSchema validates', () => {
    const basePublication: IPublication = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      comment: 'A comment',
      date: new Date().toISOString(),
      version: 1,
      bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: ModelType.publication,
      sourceOriginal: null,
      sourceRel: null
    };

    const report = BasePublicationSchema.validate(basePublication, {
      abortEarly: false
    });

    expect(report.error).toBeUndefined();
  });

  test('BasePublicationSchema invalidates', () => {
    const basePublication: IPublication = {
      id: '',
      comment: '',
      date: '',
      version: 0,
      bankId: '',
      type: ModelType.bank,
      sourceOriginal: null,
      sourceRel: null
    };

    const report = BasePublicationSchema.validate(basePublication, {
      abortEarly: false
    });
    expect(report.error?.details.length).toEqual(6);
  });

  test('PostPublicationSchema validates', () => {
    const postPublication: IPublication = {
      id: '',
      comment: 'A comment',
      date: null,
      version: 1,
      bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: ModelType.publication,
      sourceOriginal: null,
      sourceRel: null
    };

    const report = PostPublicationSchema.validate(postPublication, {
      abortEarly: false
    });
    expect(report.error).toBeUndefined();
  });

  test('PostPublicationSchema invalidates', () => {
    const postPublication: IPublication = {
      id: 'aaa', // error
      comment: '', // error
      date: '', // error
      version: 0, // error
      bankId: '', // error
      type: ModelType.bank, // error
      sourceOriginal: null,
      sourceRel: null
    };

    const report = PostPublicationSchema.validate(postPublication, {
      abortEarly: false
    });

    expect(report.error?.details.length).toEqual(6);
  });
});
