import { combineReducers } from '@reduxjs/toolkit';
import { bankApi } from './api/bankApi';
import alertReducer from './reducers/alert-reducer';
import PrefilledResponseReducer from './reducers/prefilled-response-reducer';
import responseReducer from './reducers/response-reducer';
import selectedBankReducer from './reducers/selectedBank-reducer';
import specificationReducer from './reducers/specification-reducer';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
  selectedBank: selectedBankReducer,
  specification: specificationReducer,
  response: responseReducer,
  alert: alertReducer,
  prefilledResponse: PrefilledResponseReducer
});

export default rootReducer;
