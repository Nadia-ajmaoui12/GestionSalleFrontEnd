import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import reducers, { INITIAL_MAIN_STATE } from './reducers.ts';
import { rootEpic } from './epics.ts';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer,
} = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const initStore = (initialState: any) => {
  const epicMiddleware = createEpicMiddleware();
  const logger = createLogger({ collapsed: true }); // log every action to see what's happening behind the scenes.

  const reduxMiddleware = composeWithDevTools(
    applyMiddleware(routerMiddleware, epicMiddleware, logger),
  ); // ignore logger logger
  // const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(
    combineReducers({
      router: routerReducer,
      main: reducers.main,
    }),
    initialState,
    reduxMiddleware,
  );

  epicMiddleware.run(rootEpic);

  return store;
};

const store = initStore({
  INITIAL_MAIN_STATE,
});

export const history = createReduxHistory(store);

export default store;
