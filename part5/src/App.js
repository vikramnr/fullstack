import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])
  useEffect(() => {
    const userJSON = window.localStorage.getItem('blog-user')
    if (userJSON) {
      const loggedUser = JSON.parse(userJSON)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  const LoginForm = () => (
    <>
      <form onSubmit={onLogin}>
        <div>
          Username<input type="text" value={username} name='username'
            onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          Password<input type="password" value={password}
            onChange={({ target }) => setPassword(target.value || '')}></input>
        </div>
        <button>submit</button>
      </form>
    </>
  )

  const DispalyBlogs = () => (
    <>
      <h2>blogs</h2>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handlePostUpdation={handlePostUpdation} handlePostDeletion={handlePostDeletion}  user={user}/>
        )}
      </div>
    </>
  )

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
      }, 1000);
    }



  }
  const onLogout = (e) => {
    setUser(null)
    window.localStorage.removeItem('blog-user')
  }

  const handlePostCreation = async (newPost) => {
    try {
      const blogResponse = await blogService.create(newPost)
      setBlogs(blogs.concat(blogResponse))
      setErrorMessage('Blog is added now')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000);
    } catch (error) {
      setErrorMessage('An error occured. Please try after sometime')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000);
    }

  }

  const handlePostUpdation = async (updatedPost) => {

    try {
      await blogService.update(updatedPost)
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occured. Please try after sometime')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000);
    }
  }

  const handlePostDeletion =  async (post) => {
    try {
      await blogService.remove(post)
      setBlogs(blogs.filter(blog => blog.id!==post.id))
      setErrorMessage('Blog is removed now')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000);
    } catch (error) {
      setErrorMessage('Only post creator can remove the post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000);
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? LoginForm() :
        <>
          <div>Logged in as {user.username}
            <button onClick={onLogout}>Logout</button>
          </div>
          <Togglable buttonLabel={'Create a new post'}>
            <CreateBlog handlePostCreation={handlePostCreation} />
          </Togglable>
          {DispalyBlogs()}
        </>
      }

    </div>
  )
}

export default App