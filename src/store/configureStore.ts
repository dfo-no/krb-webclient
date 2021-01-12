import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter-reducer';
import kravbankReducer from './reducers/kravbank-reducer';
import loaderReducer from './reducers/loader-reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    loader: loaderReducer,
    kravbank: kravbankReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// No idea what this is, but seems clever
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
