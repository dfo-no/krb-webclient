import { Behov } from '../models/Behov';
import { Kravbank } from '../models/Kravbank';

// TODO: find a design pattern for these strings, and link to that in the docs.
export enum ActionType {
  LOADING = '[GLOBAL] Loading',
  KRAVBANK_NEW = '[KRAVBANK] NEW',
  KRAVBANK_EDIT = '[KRAVBANK] EDIT',
  BEHOV_NEW = '[BEHOV] NEW',
  BEHOV_EDIT = '[BEHOV] EDIT',
  UNDERBEHOV_NEW = '[UNDERBEHOV] NEW'
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
      type: ActionType.KRAVBANK_NEW,
      payload: kravbank
    };
  }
  static editKravbank(kravbankid: number): Action {
    return {
      type: ActionType.KRAVBANK_EDIT,
      payload: kravbankid
    };
  }
  static addBehov(behov: Behov): Action {
    return {
      type: ActionType.BEHOV_NEW,
      payload: behov
    };
  }
  static editBehov(behovid: number): Action {
    return {
      type: ActionType.KRAVBANK_EDIT,
      payload: behovid
    };
  }
  static addUnderBehov(behov: Behov): Action {
    return {
      type: ActionType.UNDERBEHOV_NEW,
      payload: behov
    };
  }
}
