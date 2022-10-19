import { combineReducers } from '@reduxjs/toolkit';
import { bankApi } from './api/bankApi';
import alertReducer from './reducers/alert-reducer';
import PrefilledResponseReducer from './reducers/prefilled-response-reducer';
import responseReducer from './reducers/response-reducer';
import selectedBankReducer from './reducers/selectedBank-reducer';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
  selectedBank: selectedBankReducer,
  response: responseReducer,
  alert: alertReducer,
  prefilledResponse: PrefilledResponseReducer,
});

export default rootReducer;
