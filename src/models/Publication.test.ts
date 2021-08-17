import ModelType from './ModelType';
import {
  BasePublicationSchema,
  PostPublicationSchema,
  Publication
} from './Publication';

describe('BasePublicationSchema should validate', () => {
  test('BasePublicationSchema validates', () => {
    const basePublication: Publication = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      comment: 'A comment',
      date: new Date().toISOString(),
      version: 1,
      bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: ModelType.publication
    };

    const report = BasePublicationSchema.validate(basePublication, {
      abortEarly: false
    });

    expect(report.error).toBeUndefined();
  });

  test('BasePublicationSchema invalidates', () => {
    const basePublication: Publication = {
      id: '',
      comment: '',
      date: '',
      version: 0,
      bankId: '',
      type: ModelType.bank
    };

    const report = BasePublicationSchema.validate(basePublication, {
      abortEarly: false
    });
    expect(report.error?.details.length).toEqual(6);
  });

  test('PostPublicationSchema validates', () => {
    const postPublication: Publication = {
      id: '',
      comment: 'A comment',
      date: '',
      version: 1,
      bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: ModelType.publication
    };

    const report = PostPublicationSchema.validate(postPublication, {
      abortEarly: false
    });
    expect(report.error).toBeUndefined();
  });

  test('PostPublicationSchema invalidates', () => {
    const postPublication: Publication = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      comment: '',
      date: new Date().toISOString(),
      version: 0,
      bankId: '',
      type: ModelType.bank
    };

    const report = PostPublicationSchema.validate(postPublication, {
      abortEarly: false
    });
    expect(report.error?.details.length).toEqual(6);
  });
});
