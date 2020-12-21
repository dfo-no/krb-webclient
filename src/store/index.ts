import { createStore } from 'redux';
import { globalReducers } from './reducers/global-reducers';
//TODO: prevent prod import
import { devToolsEnhancer } from 'redux-devtools-extension';

export * from './actions';
export * from './reducers/global-reducers';

// TODO: thunk/development/log etc mode not set.
export const store = createStore(globalReducers, devToolsEnhancer({}));
