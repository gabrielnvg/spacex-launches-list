import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import launches from './modules/launches';
import filtersDrawer from './modules/filtersDrawer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ launches, filtersDrawer }),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
