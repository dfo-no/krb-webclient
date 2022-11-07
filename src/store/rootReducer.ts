import { combineReducers } from '@reduxjs/toolkit';

import { bankApi } from './api/bankApi';
import alertReducer from './reducers/alert-reducer';
import PrefilledResponseReducer from './reducers/prefilled-response-reducer';
import responseReducer from '../pages/Response/response-reducer';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
  response: responseReducer,
  alert: alertReducer,
  prefilledResponse: PrefilledResponseReducer,
});

export default rootReducer;
