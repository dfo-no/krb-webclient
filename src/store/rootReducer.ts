import { combineReducers } from '@reduxjs/toolkit';
import bankReducer from './reducers/bank-reducer';
import counterReducer from './reducers/counter-reducer';
import kravbankReducer from './reducers/kravbank-reducer';
import loaderReducer from './reducers/loader-reducer';
import projectReducer from './reducers/project-reducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  loader: loaderReducer,
  kravbank: kravbankReducer,
  user: userReducer,
  bank: bankReducer,
  project: projectReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
