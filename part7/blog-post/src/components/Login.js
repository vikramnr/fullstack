import React from 'react'

const Login = ({ onLogin, username, setUsername, setPassword, password }) => {
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
