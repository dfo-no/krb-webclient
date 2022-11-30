import localforage from 'localforage';

import { IResponse } from '../entities/IResponse';
import { ModelType } from '../enums';

const initialState: IResponse = {
  id: '',
  customization: 'kravbank:response:v1.0',
  specification: {
    id: '',
    customization: 'kravbank:specification:v1.0',
    bank: {
      id: '',
      customization: 'kravbank:bank:v1.0',
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
