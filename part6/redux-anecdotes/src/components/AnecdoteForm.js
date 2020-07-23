import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const onAddAnecdotes = (e) => {
    e.preventDefault()
    let content = e.target.content.value
    e.target.content.value = ''
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onAddAnecdotes}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
