import { combineReducers } from '@reduxjs/toolkit';
import { bankApi } from './api/bankApi';
import alertReducer from './reducers/alert-reducer';
import evaluationReducer from './reducers/evaluation-reducer';
import PrefilledResponseReducer from './reducers/PrefilledResponseReducer';
import projectReducer from './reducers/project-reducer';
import responseReducer from './reducers/response-reducer';
import selectedBankReducer from './reducers/selectedBank-reducer';
import selectedCodeListReducer from './reducers/selectedCodelist-reducer';
import selectedNeedReducer from './reducers/selectedNeed-reducer';
import selectedProductReducer from './reducers/selectedProduct-reducer';
import selectedProjectReducer from './reducers/selectedProject-reducer';
import selectedQuestionReducer from './reducers/selectedQuestion-reducer';
import selectedRequirementReducer from './reducers/selectedRequirement-reducer';
import selectedResponseProductReducer from './reducers/selectedResponseProduct-reducer';
import selectedSpecProductReducer from './reducers/selectedSpecProduct-reducer';
import specificationReducer from './reducers/spesification-reducer';
import uploadedPrefilledResponseReducer from './reducers/uploadedPrefilledResponseReducer';

const rootReducer = combineReducers({
  [bankApi.reducerPath]: bankApi.reducer,
  project: projectReducer,
  selectedProject: selectedProjectReducer,
  selectedCodeList: selectedCodeListReducer,
  selectedBank: selectedBankReducer,
  selectNeed: selectedNeedReducer,
  selectedRequirement: selectedRequirementReducer,
  selectedProduct: selectedProductReducer,
  specification: specificationReducer,
  selectedSpecProduct: selectedSpecProductReducer,
  selectedQuestion: selectedQuestionReducer,
  response: responseReducer,
  selectedResponseProduct: selectedResponseProductReducer,
  alert: alertReducer,
  prefilledResponse: PrefilledResponseReducer,
  uploadedResponse: uploadedPrefilledResponseReducer,
  evaluation: evaluationReducer
});

export default rootReducer;
