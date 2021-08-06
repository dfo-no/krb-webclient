import { Bank, BaseBankSchema, PostBankSchema, PutBankSchema } from './Bank';
import ModelType from './ModelType';

describe('BankSchema should validate', () => {
  test('basebankSchema works', () => {
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
      publishedDate: new Date().toJSON()
    };

    const report = BaseBankSchema.validate(bank);

    expect(report.error).toBeUndefined();

    bank.publishedDate = '';

    const report2 = BaseBankSchema.validate(bank);
    expect(report2.error).toBeUndefined();

    bank.publishedDate = new Date().toISOString();
    const report3 = BaseBankSchema.validate(bank);
    expect(report3.error).toBeUndefined();

    bank.publishedDate = new Date().toUTCString();
    const report4 = BaseBankSchema.validate(bank);
    expect(report4.error).toBeUndefined();
  });

  test('PostBankSchema should validate', () => {
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
    const report = PostBankSchema.validate(bank);

    expect(report.error).toBeUndefined();
  });

  test('PutBankSchema should validate both iso date and empty string', () => {
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
    const report = PutBankSchema.validate(bank);

    expect(report.error).toBeUndefined();
  });
});

/* const report = BaseBankSchema.validate(newBank, { abortEarly: false });
  console.log(report.error);
  expect(report.error?.details.length).toEqual(2); */
