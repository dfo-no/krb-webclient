// TODO: find a design pattern for these strings, and link to that in the docs.
export enum ActionType {
  LOADING = '[GLOBAL] Loading'
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
}
