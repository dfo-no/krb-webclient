import { Action, ActionType } from '../actions';
import data1 from '../../data/katalog1.json';
import { Katalog } from '../../models/Katalog';

export interface State {
  loading: boolean;
  kravbanker: Katalog;
  selectedkravbank: number;
}

const initialState: State = {
  loading: false,
  kravbanker: data1,
  selectedkravbank: 0
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

    case ActionType.KRAVBANK_NEW:
      state = {
        ...state,
        kravbanker: {
          ...state.kravbanker,
          [action.payload.id]: action.payload
        },
        loading: false
      };
      break;

    case ActionType.KRAVBANK_EDIT:
      state = {
        ...state,
        selectedkravbank: action.payload,
        loading: false
      };
      break;

    case ActionType.BEHOV_NEW:
      const id: number = state.selectedkravbank;
      state = {
        ...state,

        kravbanker: {
          ...state.kravbanker,
          [id]: {
            ...state.kravbanker[id],
            behov: [...state.kravbanker[id].behov, action.payload]
          }
        },

        loading: false
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
