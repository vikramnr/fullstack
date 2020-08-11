import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const onAddAnecdotes = async (e) => {
    e.preventDefault()
    let content = e.target.content.value
    e.target.content.value = ''
    props.createAnecdote(content)
    props.setNotification(`you have created ${content}`, 1000)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
