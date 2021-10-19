/* eslint-disable class-methods-use-this */
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import ModelType from '../../models/ModelType';
import Adapter from './Adapter';

export default class LocalStorageAdapter extends Adapter {
  save(bank: Bank): void {
    localStorage.setItem('bank', JSON.stringify(bank));
  }

  load(): Bank {
    if (localStorage.getItem('bank') !== null)
      return JSON.parse(Utils.ensure(localStorage.getItem('bank'))) as Bank;
    const defaultValues: Bank = {
      id: '',
      title: '',
      description: '',
      needs: [],
      codelist: [],
      products: [],
      publications: [],
      tags: [],
      version: 0,
      publishedDate: null,
      type: ModelType.bank,
      inheritedBanks: [],
      sourceOriginal: null,
      sourceRel: null,
      projectId: null
    };

    // find better solution to this problem not knowing wheter it is null, but not being able to return null as Promise
    this.save(defaultValues);
    return defaultValues;
  }
}

//
