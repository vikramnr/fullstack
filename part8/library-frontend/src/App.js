
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recomended from './components/Recomended'

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState('')
  const client = useApolloClient()
  
  useEffect(() =>{
      const checkToken = localStorage.getItem('token-app')
      if(checkToken) {
        setToken(checkToken)
        setPage('authors')
      }
  },[])

  const logout = () => {
    localStorage.clear()
    setPage('authors')
    setToken(null)
    client.resetStore()
  }

  if(!token) {
    return (
      <div>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />
      
      <Login show={page === 'login'} setToken={setToken} setPage={setPage}/>
      </div>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recomended')}>recomended books</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      <Recomended
        show={page==='recomended'}
      />
    </div>
  )
}

export default App