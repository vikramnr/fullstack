import React, { useState } from 'react'
import { useField } from '../hooks/index'

const AnecdoteForm = ({ addNew, history, displayNotification }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const onReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    displayNotification(`add new ${content}`)
    history.push('/anectodes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            {...content}
          />
        </div>
        <div>
          author
          <input
            {...author}
          />
        </div>
        <div>
          url for more info
          <input
            {...info}
          />
        </div>
        <button type="button" onClick={onReset}>reset</button>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
