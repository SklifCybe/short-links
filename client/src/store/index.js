import { combineReducers, createStore } from 'redux';

import { authReducer as auth } from './reducers/auth';

const rootReducer = combineReducers({
  auth,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
