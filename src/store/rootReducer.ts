import { combineReducers } from '@reduxjs/toolkit';

import { bankApi } from './api/bankApi';
import PrefilledResponseReducer from './reducers/prefilled-response-reducer';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
  prefilledResponse: PrefilledResponseReducer,
});

export default rootReducer;
