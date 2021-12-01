import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import launches from './modules/launches';

const store = createStore(
  combineReducers({ launches }),
  applyMiddleware(thunk),
);

export default store;
