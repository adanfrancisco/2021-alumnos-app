import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducerGoogle from  '../redux/userDuck'


const reducers = combineReducers({
  authGoogle: userReducerGoogle,
  //authSistem:userAuth
 
});

const middlewares = [thunk];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
