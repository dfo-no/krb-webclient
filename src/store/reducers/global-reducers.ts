import { Action, ActionType } from '../actions';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false
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
