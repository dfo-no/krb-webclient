/* eslint-disable class-methods-use-this */
import Adapter from './Adapter';
import Utils from '../../common/Utils';
import { IBank } from '../entities/IBank';
import { ModelType } from '../enums';

export default class LocalStorageAdapter extends Adapter {
  save(bank: IBank): void {
    localStorage.setItem('bank', JSON.stringify(bank));
  }

  load(): IBank {
    if (localStorage.getItem('bank') !== null)
      return JSON.parse(Utils.ensure(localStorage.getItem('bank'))) as IBank;
    const defaultValues: IBank = {
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
      projectId: null,
      deletedDate: null
    };

    // find better solution to this problem not knowing wheter it is null, but not being able to return null as Promise
    this.save(defaultValues);
    return defaultValues;
  }
}

//
