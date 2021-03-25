import { combineReducers } from '@reduxjs/toolkit';
import bankReducer from './reducers/bank-reducer';
import loaderReducer from './reducers/loader-reducer';
// eslint-disable-next-line import/no-cycle
import projectReducer from './reducers/project-reducer';
import selectedProjectReducer from './reducers/selectedProject-reducer';
import selectedCodeListReducer from './reducers/selectedCodelist-reducer';
import userReducer from './reducers/userReducer';
import selectedBankReducer from './reducers/selectedBank-reducer';
import selectedNeedReducer from './reducers/selectedNeed-reducer';
import selectedRequirementReducer from './reducers/selectedRequirement-reducer';
import selectedProductReducer from './reducers/selectedProduct-reducer';

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  bank: bankReducer,
  project: projectReducer,
  selectedProject: selectedProjectReducer,
  selectedCodeList: selectedCodeListReducer,
  selectedBank: selectedBankReducer,
  selectNeed: selectedNeedReducer,
  selectedRequirement: selectedRequirementReducer,
  selectedProduct: selectedProductReducer
});

export default rootReducer;
