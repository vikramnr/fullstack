import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, loginUser } from '../reducers/LoginReducer'
import { removeMessage, sendMessage } from '../reducers/NotificationReducer'

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
      dispatch(sendMessage('Logged In sucessfully'))
      dispatch(removeMessage(1000))
    } catch (error) {
      console.log(error)
      dispatch(sendMessage(error.message))
      dispatch(removeMessage(1000))
    }
  }

  const onLogout = () => {
    dispatch(logoutUser())
    dispatch(sendMessage('Logged out sucessfully'))
    dispatch(removeMessage(1000))
  }

  if (user && user.token) {
    return (
      <div>
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
