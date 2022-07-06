import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import authReduser from './auth/auth-slice';

const persistAuthConfig = {
  key: 'local-token',
  storage,
  whitelist: ['token'],
};

// const persistRootConfig = {
//   key: 'root',
//   storage,
//   whitelist: [],
// };

const rootReducer = combineReducers({
  auth: persistReducer(persistAuthConfig, authReduser),
  // ... other reducers
});

const logger = createLogger({
  timestamp: false,
  collapsed: (getState, action, logEntry) => !logEntry?.error,
  predicate: () => process.env.NODE_ENV !== 'production',
});

const store = configureStore({
  // reducer: persistReducer(persistRootConfig, rootReducer),
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => [
  //   ...getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  //   logger,
  // ],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  // otherMiddlewares,

  devTools: process.env.NODE_ENV !== 'production',
});

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
