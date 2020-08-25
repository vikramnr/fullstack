import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useDispatch } from "react-redux";
import { creatPost } from "../reducers/BlogReducer";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const CreateBlog = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  const onCreatePost = async (e) => {
    e.preventDefault()
    const newPost = {
      title,
      author,
      url,
      likes: 0
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(creatPost(newPost))
  }
  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onCreatePost}
      >
        <div>
          <TextField
            required
            label="Enter title"
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            required
            label="Enter URL"
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <TextField
            required
            label="Author"
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Button size="small" type="submit" color="primary"> Create New
          </Button>
        </div>
      </form>
      {/* <form onSubmit={onCreatePost}>
        <h4>Create a new Blog post</h4>
        <div>
          Title{' '}
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Url{' '}
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <input id="createblog" type="submit" value="Create post" />
      </form> */}
    </>
  )
}

export default CreateBlog
