/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Action, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});

// Hot Module Replacement (HMR)
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = typeof useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
