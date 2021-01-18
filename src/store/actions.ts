import { Behov } from '../models/Behov';
import { Codelist } from '../models/Codelist';
import { Krav } from '../models/Krav';
import { Bank } from '../models/Bank';

// TODO: find a design pattern for these strings, and link to that in the docs.
export enum ActionType {
  LOADING = '[GLOBAL] Loading',
  KRAVBANK_NEW = '[KRAVBANK] NEW',
  KRAVBANK_EDIT = '[KRAVBANK] EDIT',
  BEHOV_NEW = '[BEHOV] NEW',
  BEHOV_EDIT = '[BEHOV] EDIT',
  UNDERBEHOV_NEW = '[UNDERBEHOV] NEW',
  KRAV_NEW = '[KRAV] NEW',
  KRAV_EDIT = '[KRAV] EDIT',
  KODELISTE_NEW = '[KODELISTE] NEW'
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
  static registerNew(kravbank: Bank): Action {
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
  static addKrav(krav: Krav): Action {
    return {
      type: ActionType.KRAV_NEW,
      payload: krav
    };
  }
  static editKrav(kravid: number): Action {
    return {
      type: ActionType.KRAV_EDIT,
      payload: kravid
    };
  }
  static addKodeliste(kodeliste: Codelist): Action {
    return {
      type: ActionType.KODELISTE_NEW,
      payload: kodeliste
    };
  }
}
