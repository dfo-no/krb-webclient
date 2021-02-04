import { combineReducers } from '@reduxjs/toolkit';
import bankReducer from './reducers/bank-reducer';
import counterReducer from './reducers/counter-reducer';
import kravbankReducer from './reducers/kravbank-reducer';
import loaderReducer from './reducers/loader-reducer';
import projectReducer from './reducers/project-reducer';
import selectedProjectReducer from './reducers/selectedProject-reducer';
import selectedCodeListReducer from './reducers/selectedCodelist-reducer';
import userReducer from './reducers/userReducer';
import selectedBankReducer from './reducers/selectedBank-reducer';
import selectedNeedReducer from './reducers/selectedNeed-reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  loader: loaderReducer,
  kravbank: kravbankReducer,
  user: userReducer,
  bank: bankReducer,
  project: projectReducer,
  selectedProject: selectedProjectReducer,
  selectedCodeList: selectedCodeListReducer,
  selectedBank: selectedBankReducer,
  selectNeed: selectedNeedReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
