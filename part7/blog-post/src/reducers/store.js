import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './BlogReducer'
import NotificationReducer from './NotificationReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  message: NotificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store