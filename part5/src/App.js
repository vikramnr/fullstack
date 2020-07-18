import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import DisplayBlogs from './components/DisplayBlogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const checkToken = () => {
    const userJSON = window.localStorage.getItem('blog-user')
    if (userJSON) {
      const loggedUser = JSON.parse(userJSON)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }

  const getPosts = () => {
    blogService.getAll().then((blogs) => {
      blogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    checkToken()
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.loginUser({ username, password })
      setUser(userResponse)
      setUsername('')
      setPassword('')
      blogService.setToken(userResponse.token)
      window.localStorage.setItem('blog-user', JSON.stringify(userResponse))
    } catch (error) {
      setErrorMessage('Incorrect Username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }
  const onLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blog-user')
  }

  const handlePostCreation = async (newPost) => {
    try {
      await blogService.create(newPost)
      getPosts()
      setErrorMessage('Blog is added now')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    } catch (error) {
      setErrorMessage('An error occured. Please try after sometime')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
  }

  const handlePostUpdation = async (updatedPost) => {
    try {
      await blogService.update(updatedPost)
      getPosts()
    } catch (error) {
      console.log(error)
      setErrorMessage('An error occured. Please try after sometime')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
  }

  const handlePostDeletion = async (post) => {
    try {
      await blogService.remove(post)
      getPosts()
      setErrorMessage('Blog is removed now')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    } catch (error) {
      setErrorMessage('Only post creator can remove the post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <Login
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          onLogin={onLogin}
        />
      ) : (
        <>
          <div>
            Logged in as {user.username}
            <button onClick={onLogout}>Logout</button>
          </div>
          <Togglable buttonLabel={'Create a new post'}>
            <CreateBlog handlePostCreation={handlePostCreation} />
          </Togglable>
          <DisplayBlogs
            blogs={blogs}
            handlePostDeletion={handlePostDeletion}
            handlePostUpdation={handlePostUpdation}
            user={user}
            setBlogs={setBlogs}
          />
        </>
      )}
    </div>
  )
}

export default App
