import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Container from '@material-ui/core/Container'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import DisplayBlogs from './components/DisplayBlogs'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initNotes } from './reducers/BlogReducer'
import { checkUser, logoutUser, loginUser } from './reducers/UserReducer'

const App = () => {
  const message = useSelector(state => state.message)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log(user)
  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])


  return (
    <Container>
      <Notification message={message} />
          <Login/>       
          {user.token && <><DisplayBlogs user={user} /> <Togglable buttonLabel={'Create a new post'}>
            <CreateBlog />
          </Togglable></>}
    </Container>
  )
}

export default App
