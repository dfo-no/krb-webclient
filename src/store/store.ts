import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { bankApi } from './api/bankApi';

export const store = configureStore({
  reducer: {
    [bankApi.reducerPath]: bankApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bankApi.middleware),
});

// Hot Module Replacement (HMR)
// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
// }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
