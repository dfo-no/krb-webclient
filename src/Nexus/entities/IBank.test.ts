import { format } from 'date-fns';
import { DATETIME_ISO8601UTC } from '../../common/Constants';
import ModelType from '../../models/ModelType';
import { BaseBankSchema, IBank } from './IBank';

describe('BankSchema should validate', () => {
  test('basebankSchema works', () => {
    const bank: IBank = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      title: 'Test',
      description: '',
      codelist: [],
      publications: [],
      type: ModelType.bank,
      version: 1,
      tags: [],
      needs: [],
      products: [],
      publishedDate: new Date().toJSON(),
      inheritedBanks: [],
      sourceOriginal: null,
      sourceRel: null,
      projectId: null,
      deletedDate: null
    };

    const report = BaseBankSchema.validate(bank);
    expect(report.error).toBeUndefined();

    bank.publishedDate = null;

    const report2 = BaseBankSchema.validate(bank);
    expect(report2.error).toBeUndefined();

    bank.publishedDate = new Date().toISOString();
    const report3 = BaseBankSchema.validate(bank);
    expect(report3.error).toBeUndefined();

    bank.publishedDate = format(new Date(), DATETIME_ISO8601UTC);
    const report4 = BaseBankSchema.validate(bank);
    expect(report4.error).toBeUndefined();
  });
});
