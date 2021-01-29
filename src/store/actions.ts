import { Need } from '../models/Need';
import { Codelist } from '../models/Codelist';
import { Requirement } from '../models/Requirement';
import { Bank } from '../models/Bank';

// TODO: find a design pattern for these strings, and link to that in the docs.
export enum ActionType {
  LOADING = '[GLOBAL] Loading',
  KRAVBANK_NEW = '[KRAVBANK] NEW',
  KRAVBANK_EDIT = '[KRAVBANK] EDIT',
  NEED_NEW = '[NEED] NEW',
  NEED_EDIT = '[NEED] EDIT',
  SUB_NEED_NEW = '[SUB_NEED] NEW',
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
  static addNeed(need: Need): Action {
    return {
      type: ActionType.NEED_NEW,
      payload: need
    };
  }
  static editNeed(needId: number): Action {
    return {
      type: ActionType.KRAVBANK_EDIT,
      payload: needId
    };
  }
  static addSubNeed(need: Need): Action {
    return {
      type: ActionType.SUB_NEED_NEW,
      payload: need
    };
  }
  static addKrav(requirement: Requirement): Action {
    return {
      type: ActionType.KRAV_NEW,
      payload: requirement
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
