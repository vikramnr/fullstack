import { createStore,combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

const reducer  = combineReducers({
    'anecdotes': anecdoteReducer,
    'filter': filterReducer,
    'message':notificationReducer
})
export default createStore(reducer, applyMiddleware(thunk),composeWithDevTools())