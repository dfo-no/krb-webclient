import localforage from 'localforage';

import { BANK_CUSTOMIZATION } from '../entities/IBank';
import { IResponse, RESPONSE_CUSTOMIZATION } from '../entities/IResponse';
import { SPECIFICATION_CUSTOMIZATION } from '../entities/ISpecification';
import { ModelType } from '../enums';

const initialState: IResponse = {
  id: '',
  customization: RESPONSE_CUSTOMIZATION,
  specification: {
    id: '',
    customization: SPECIFICATION_CUSTOMIZATION,
    bank: {
      id: '',
      customization: BANK_CUSTOMIZATION,
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
