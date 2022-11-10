/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import localforage from 'localforage';

import { IResponse } from '../entities/IResponse';
import { ModelType } from '../enums';

const initialState: IResponse = {
  id: '',
  specification: {
    id: '',
    bank: {
      id: '',
      title: '',
      description: '',
      needs: [],
      tags: [],
      products: [],
      codelist: [],
      version: 0,
      type: ModelType.bank,
      publications: [],
      inheritedBanks: [],
      publishedDate: null,
      sourceOriginal: null,
      sourceRel: null,
      projectId: null,
      deletedDate: null,
    },
    title: '',
    organization: '',
    organizationNumber: '',
    products: [],
    requirements: [],
    requirementAnswers: [],
    currencyUnit: 'NOK',
  },
  supplier: '',
  products: [],
  requirementAnswers: [],
};

export default class ResponseStoreService {
  private db: LocalForage;

  constructor() {
    this.db = localforage.createInstance({
      name: 'responses',
    });
  }

  public setResponse(response: IResponse): Promise<IResponse> {
    return this.db.setItem(response.id, response);
  }

  public async getResponse(id: string): Promise<IResponse> {
    return this.db.getItem<IResponse | null>(id).then((response) => {
      if (response) return response;
      else return ResponseStoreService.defaultResponse();
    });
  }

  public static defaultResponse = (): IResponse => {
    return { ...initialState };
  };
}
