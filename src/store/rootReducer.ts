import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './reducers/alert-reducer';
import bankReducer from './reducers/bank-reducer';
import loaderReducer from './reducers/loader-reducer';
import PrefilledResponseReducer from './reducers/PrefilledResponseReducer';
// eslint-disable-next-line import/no-cycle
import projectReducer from './reducers/project-reducer';
import responseReducer from './reducers/response-reducer';
import selectedAlternativeReducer from './reducers/selectedAlternative-reducer';
import selectedBankReducer from './reducers/selectedBank-reducer';
import selectedCodeListReducer from './reducers/selectedCodelist-reducer';
import selectedNeedReducer from './reducers/selectedNeed-reducer';
import selectedProductReducer from './reducers/selectedProduct-reducer';
import selectedProjectReducer from './reducers/selectedProject-reducer';
import selectedRequirementReducer from './reducers/selectedRequirement-reducer';
import selectedResponseProductReducer from './reducers/selectedResponseProduct-reducer';
import selectedSpecProductReducer from './reducers/selectedSpecProduct-reducer';
import specificationReducer from './reducers/spesification-reducer';
import userReducer from './reducers/userReducer';

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
  selectedProduct: selectedProductReducer,
  specification: specificationReducer,
  selectedSpecProduct: selectedSpecProductReducer,
  selectedAlternative: selectedAlternativeReducer,
  response: responseReducer,
  selectedResponseProduct: selectedResponseProductReducer,
  alert: alertReducer,
  prefilledResponse: PrefilledResponseReducer
});

export default rootReducer;
