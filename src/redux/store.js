import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import  user from './reducers/user';
import  topics from './reducers/topics';

const userIdentity = combineReducers({user, topics});
const store = createStore(userIdentity, applyMiddleware(thunk));

export default store;