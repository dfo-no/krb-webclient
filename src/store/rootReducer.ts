import { combineReducers } from '@reduxjs/toolkit';

import { bankApi } from './api/bankApi';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
});

export default rootReducer;
