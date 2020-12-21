import { Kravbank } from '../../models/Kravbank';
import { Action, ActionType } from '../actions';
import data1 from '../../data/katalog2.json';
import data2 from '../../data/katalog1.json';

export interface State {
  loading: boolean;
  kravbanker: Kravbank[];
  selectedkravbank?: Kravbank;
}

const initialState: State = {
  loading: false,
  kravbanker: [...data1, ...data2]
};

// TODO: prevent switch-hell
export function globalReducers(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case ActionType.LOADING:
      state = {
        ...state,
        loading: action.payload
      };
      break;
    default:
      // TODO: do this with type-safety
      /*if (
        !action.type.startsWith('@@INIT') &&
        !action.type.startsWith('@@redux/INIT') &&
        process.env.NODE_ENV === 'development'
      ) {
        console.error('No handler defined for', action.type);
      }*/
      return state;
  }
  return state;
}
