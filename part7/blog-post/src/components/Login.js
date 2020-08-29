import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, loginUser } from '../reducers/UserReducer'

const Login = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(loginUser(username,password))
      console.log(username)
      console.log('calling login')
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const onLogout = () => {
    dispatch(logoutUser())
  }

  if (user && user.token) {
    return (
      <div>
        Logged in as {user.username}
        <button onClick={onLogout}>Logout</button>
      </div>
    )
  }
  return (
    <>
      <h1>Login Here</h1>
      <form onSubmit={onLogin}>
        <div>
          Username
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value || '')}
          ></input>
        </div>
        <button id="loginform">submit</button>
      </form>
    </>
  )
}

export default Login
