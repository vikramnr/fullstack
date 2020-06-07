import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )

  const createBlog = () => (
    <form onSubmit={handlePostCreation}>
      <h4>Create a new Blog post</h4>
      <div>
        Title <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} ></input>
      </div>
      <div>
        Url <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input>
      </div>
      <div>
        Author
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
      </div>
      <input type="submit" value="Create post" />
    </form>
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

  const handlePostCreation = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      author,
      url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
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

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? LoginForm() :
        <>
          <button onClick={onLogout}>Logout</button>
          {DispalyBlogs()}
          {createBlog()}
        </>
      }

    </div>
  )
}

export default App