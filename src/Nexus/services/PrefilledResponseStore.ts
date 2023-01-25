import localforage from 'localforage';

import { IPrefilledResponse } from '../entities/IPrefilledResponse';
import { ModelType } from '../enums';

const initialState: IPrefilledResponse = {
  id: '',
  bank: {
    id: '',
    title: '',
    description: '',
    needs: [],
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
  supplier: '',
  products: [],
  answeredVariants: [],
  requirementAnswers: [],
};

export class PrefilledResponseStoreService {
  private db: LocalForage;

  constructor() {
    this.db = localforage.createInstance({
      name: 'prefilled_responses',
    });
  }

  public setPrefilledResponse(
    response: IPrefilledResponse
  ): Promise<IPrefilledResponse> {
    return this.db.setItem(response.id, response);
  }

  public async getPrefilledResponse(id: string): Promise<IPrefilledResponse> {
    return this.db.getItem<IPrefilledResponse | null>(id).then((response) => {
      if (response) return response;
      else return Promise.reject();
    });
  }

  public static defaultPrefilledResponse = (): IPrefilledResponse => {
    return { ...initialState };
  };
}
