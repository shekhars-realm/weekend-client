import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import forumReducer from './reducers/forumReducer';
import momentReducer from './reducers/momentReducer';
const initialState={

}

const middleware = [thunk];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    forum: forumReducer,
    moment: momentReducer,
    UI: uiReducer
});

const store = createStore(
    reducers,
    initialState,
    enhancer
);

export default store;
