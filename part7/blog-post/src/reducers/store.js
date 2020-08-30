import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './BlogReducer'
import NotificationReducer from './NotificationReducer'
import loginReducer from './LoginReducer'
import userReducer from './UserReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  message: NotificationReducer,
  user: loginReducer,
  userStats: userReducer
})
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
// console.log(store.getState())

export default store