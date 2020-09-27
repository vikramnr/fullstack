import { useMutation, useQuery } from '@apollo/client'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { LOGIN } from '../queries'

const Login = ({show,setToken, setPage}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data) {
            const token = result.data.loginUser.value
            setToken(token)
            setPage('authors')
            localStorage.setItem('token-app',token)
        }
    },[result.data])

    const onLogin = (e) => {
        e.preventDefault()
        login({variables: {username: username, password: password}})
    }
    if(show) {
        return (
            <form onSubmit={onLogin}>
            <div>
               username <input type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
            </form>
            
        )
    }
    return(<></>)
}

export default Login
