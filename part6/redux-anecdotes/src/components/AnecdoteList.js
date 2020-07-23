import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(updateVotes(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
