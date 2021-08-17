import { formatISO } from 'date-fns';
import { Bank } from './Bank';
import ModelType from './ModelType';
import { PostProjectSchema, PutProjectSchema } from './Project';

describe('ProjectSchemas works', () => {
  test('PostProjectSchema should validate', () => {
    const bank: Bank = {
      id: '',
      title: 'Test',
      description: '',
      codelist: [],
      publications: [],
      type: ModelType.bank,
      version: 1,
      needs: [],
      products: [],
      publishedDate: ''
    };
    const report = PostProjectSchema.validate(bank);

    expect(report.error).toBeUndefined();
  });

  test('PutProjectSchema should validate both iso date and empty string', () => {
    const bank: Bank = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      title: 'Test',
      description: '',
      codelist: [],
      publications: [],
      type: ModelType.bank,
      version: 1,
      needs: [],
      products: [],
      publishedDate: ''
    };
    const report = PutProjectSchema.validate(bank);

    expect(report.error).toBeUndefined();
  });

  test('PutProjectSchema with publications should validate', () => {
    const bank: Bank = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      title: 'Test',
      description: '',
      codelist: [],
      publications: [
        {
          id: '',
          comment: 'A comment',
          date: '',
          version: 1,
          bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
          type: ModelType.publication
        },
        {
          id: 'e56367af-d48d-422d-a4f6-ba52ee17af24',
          comment: 'A comment',
          date: formatISO(new Date(2020, 8, 18, 19, 0, 52)),
          version: 2,
          bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
          type: ModelType.publication
        }
      ],
      type: ModelType.bank,
      version: 1,
      needs: [],
      products: [],
      publishedDate: ''
    };

    const report = PutProjectSchema.validate(bank, { abortEarly: false });
    expect(report.error).toBeUndefined();
  });

  test('PutProjectSchema invalidates on duplicate publications', () => {
    const bank: Bank = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      title: 'Test',
      description: '',
      codelist: [],
      type: ModelType.bank,
      version: 1,
      needs: [],
      products: [],
      publishedDate: '',
      publications: [
        {
          id: '',
          comment: 'A comment',
          date: '',
          version: 1,
          bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
          type: ModelType.publication
        },
        {
          id: 'e56367af-d48d-422d-a4f6-ba52ee17af24',
          comment: 'A comment',
          date: formatISO(new Date(2020, 8, 18, 19, 0, 52)),
          version: 2,
          bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
          type: ModelType.publication
        },
        {
          id: 'e56367af-d48d-422d-a4f6-ba52ee17af24', // duplicate
          comment: 'A comment',
          date: formatISO(new Date(2020, 8, 18, 19, 0, 52)), // duplicate
          version: 2, // duplicate
          bankId: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
          type: ModelType.publication
        }
      ]
    };
    const report = PutProjectSchema.validate(bank, {
      abortEarly: false
    });
    expect(report.error?.details.length).toEqual(3);
  });
});
