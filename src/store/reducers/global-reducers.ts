import { Action, ActionType } from '../actions';
import data from '../../data/katalog1.json';
import { Katalog } from '../../models/Katalog';
import { Kravbank } from '../../models/Kravbank';

export interface State {
  loading: boolean;
  kravbanker: Katalog<Kravbank>;
  selectedkravbank: number;
  selectedbehov: number;
  selectedkrav: number;
}

const initialState: State = {
  loading: false,
  kravbanker: data,
  selectedkravbank: 0,
  selectedbehov: 1234,
  selectedkrav: 0
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

    case ActionType.BEHOV_EDIT:
      state = {
        ...state,
        selectedbehov: action.payload,
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
            behov: {
              ...state.kravbanker[id].behov,
              [action.payload.id]: action.payload
            }
          }
        },
        loading: false
      };
      break;
    case ActionType.UNDERBEHOV_NEW:
      const behovid: number = state.selectedbehov;
      const kravbankid: number = state.selectedkravbank;
      state = {
        ...state,

        kravbanker: {
          ...state.kravbanker,
          [kravbankid]: {
            ...state.kravbanker[kravbankid],
            behov: {
              ...state.kravbanker[kravbankid].behov,
              [behovid]: {
                ...state.kravbanker[kravbankid].behov[behovid],
                underbehov: {
                  [action.payload.id]: action.payload
                }
              }
            }
          }
        },
        loading: false
      };
      break;

    case ActionType.KRAV_NEW:
      const kravbank_id: number = state.selectedkravbank;
      const behov_id: number = state.selectedbehov;

      state = {
        ...state,

        kravbanker: {
          ...state.kravbanker,
          [kravbank_id]: {
            ...state.kravbanker[kravbank_id],
            behov: {
              ...state.kravbanker[kravbank_id].behov,
              [behov_id]: {
                ...state.kravbanker[kravbank_id].behov[behov_id],
                krav: {
                  ...state.kravbanker[kravbank_id].behov[behov_id].krav,
                  [action.payload.id]: action.payload
                }
              }
            }
          }
        },
        loading: false
      };
      break;

    case ActionType.KRAV_EDIT:
      state = {
        ...state,
        selectedkrav: action.payload,
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
