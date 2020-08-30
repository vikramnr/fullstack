import React, { useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import Togglable from './components/Togglable'

import Login from './components/Login'
import Blog from './components/Blog'
import User from './components/User'
import UsersStat from './components/UsersStat'
import DisplayBlogs from './components/DisplayBlogs'
import CreateBlog from './components/CreateBlog'

import { initNotes } from './reducers/BlogReducer'
import { checkUser } from './reducers/LoginReducer'
import { userData } from './reducers/UserReducer'
import {
  Container,
  Button,
  Toolbar,
  AppBar
} from '@material-ui/core'

const App = () => {
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.message)
  const dispatch = useDispatch()
  
  const match = useRouteMatch('/users/:id')
  const blogId = useRouteMatch('/blogs/:id')

  useEffect(() => {
    dispatch(checkUser())
    dispatch(initNotes())
    dispatch(userData())
  }, [dispatch])

  return (
    <Container>
      <Notification message={message} />
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user.token ? (
          <>
            Welcome {user.username}
            <div><Login /></div>
          </>
        ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/users/:id">
          <User match={match} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blogId={blogId} user={user} />
        </Route>
        <Route path="/users">
          <UsersStat />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          {user.token && (
            <>
              <DisplayBlogs />{' '}
              <Togglable buttonLabel={'Create a new post'}>
                <CreateBlog />
              </Togglable>
            </>
          )}
        </Route>
      </Switch>
    </Container>
  )
}

export default App
