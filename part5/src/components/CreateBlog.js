import React, { useState } from 'react'

const CreateBlog = ({ handlePostCreation }) => {
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  const onCreatePost = async (e) => {
    e.preventDefault()
    const newPost = {
      title,
      author,
      url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    handlePostCreation(newPost)
  }
  return (
    <form onSubmit={onCreatePost}>
      <h4>Create a new Blog post</h4>
      <div>
          Title <input id="title" type='text' value={title} onChange={({ target }) => setTitle(target.value)} ></input>
      </div>
      <div>
          Url <input id="url" type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input>
      </div>
      <div>
         Author
        <input id="author" type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
      </div>
      <input id='createblog' type="submit" value="Create post" />
    </form>
  )
}

export default CreateBlog
