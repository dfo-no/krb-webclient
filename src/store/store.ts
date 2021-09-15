import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  }
});

// Hot Module Replacement (HMR)
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
