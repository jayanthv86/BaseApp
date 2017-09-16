import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducer.jsx';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  yourReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;