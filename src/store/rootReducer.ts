import { combineReducers } from '@reduxjs/toolkit';

import { bankApi } from './api/bankApi';
import alertReducer from './reducers/alert-reducer';
import PrefilledResponseReducer from './reducers/prefilled-response-reducer';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
  alert: alertReducer,
  prefilledResponse: PrefilledResponseReducer,
});

export default rootReducer;
