/* eslint-disable no-param-reassign */

import { IResponse } from '../entities/IResponse';

export default class ResponseStoreService {
  private static response: IResponse;

  public setResponse(response: IResponse): void {
    ResponseStoreService.response = response;
  }

  // eslint-disable-next-line class-methods-use-this
  public getResponse(): IResponse {
    return ResponseStoreService.response;
  }
}
