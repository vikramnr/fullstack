import React from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  // console.log(props)

  const anecdotes = props.filter
    ? props.anecdotes.filter((anecdote) =>
        anecdote.content.includes(props.filter)
      )
    : props.anecdotes
  // console.log(anecdotes)

  const vote = (anecdote) => {
    props.updateVotes(anecdote.id)
    props.setNotification(`you have voted ${anecdote.content}`, 1000)
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

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    filter: state.filter,
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
    updateVotes,
    setNotification
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
