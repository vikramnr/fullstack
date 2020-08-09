import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.includes(state.filter)
        )
      : state.anecdotes
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVotes(anecdote.id))
    dispatch(setNotification(`you have voted ${anecdote.content}`, 1000))
  }
  return (
    <div>
      <h4>Lists</h4>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
