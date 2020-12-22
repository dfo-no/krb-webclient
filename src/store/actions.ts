import { Kravbank } from '../models/Kravbank';

// TODO: find a design pattern for these strings, and link to that in the docs.
export enum ActionType {
  LOADING = '[GLOBAL] Loading',
  KRAVBANKER_NY = '[KRAVBANKER] NY'
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export class KRB {
  // TODO: prevent this namespace from growing large in a single file, possibly selctor-pattern from Ngrx
  static loading(value: boolean): Action {
    return {
      type: ActionType.LOADING,
      payload: value
    };
  }
  static registerNew(kravbank: Kravbank): Action {
    return {
      type: ActionType.KRAVBANKER_NY,
      payload: kravbank
    };
  }
}
