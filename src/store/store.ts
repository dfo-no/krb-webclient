import { configureStore } from '@reduxjs/toolkit';

import { bankApi } from './api/bankApi';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bankApi.middleware),
});

// Hot Module Replacement (HMR)
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
