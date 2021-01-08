import { Action, ActionType } from '../actions';
import data from '../../data/katalog1.json';
import { Katalog } from '../../models/Katalog';
import { Kravbank } from '../../models/Kravbank';

export interface State {
  loading: boolean;
  kravbanker: Katalog<Kravbank>;
  selectedKravbank: number;
  selectedBehov: number;
  selectedKrav: number;
}

const initialState: State = {
  loading: false,
  kravbanker: data,
  selectedKravbank: 0,
  selectedBehov: 1234,
  selectedKrav: 0
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
        selectedKravbank: action.payload,
        loading: false
      };
      break;

    case ActionType.BEHOV_EDIT:
      state = {
        ...state,
        selectedBehov: action.payload,
        loading: false
      };
      break;

    case ActionType.BEHOV_NEW:
      const id: number = state.selectedKravbank;
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
      const behovid: number = state.selectedBehov;
      const kravbankid: number = state.selectedKravbank;
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
                  ...state.kravbanker[kravbankid].behov[behovid].underbehov,
                  [action.payload.id]: action.payload
                }
              }
            }
          }
        },
        loading: false
      };
      console.log(state.kravbanker[kravbankid].behov[behovid]);
      break;

    case ActionType.KRAV_NEW:
      const kravbank_id: number = state.selectedKravbank;
      const behov_id: number = state.selectedBehov;

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
        selectedKrav: action.payload,
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
