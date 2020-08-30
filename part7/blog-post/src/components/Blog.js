import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import {
  updatePost,
  deletePost,
  updatePostComments,
} from '../reducers/BlogReducer'

import { removeMessage, sendMessage } from '../reducers/NotificationReducer'

import {
  Button,
  IconButton,
  TextField,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
} from '@material-ui/core'

import { Delete, Favorite }from '@material-ui/icons'

import { useLabelIconStyles } from '@mui-treasury/styles/icon/label'



const Blog = ({ user, blogId }) => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === blogId.params.id)

  const iconLabelStyles = useLabelIconStyles({ linked: true })
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Blog.PropType = {
    blog: PropTypes.object.isRequired,
    handlePostDeletion: PropTypes.func.isRequired,
    handlePostUpdation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    let updatedBlog = {
      likes: (blog.likes += 1),
      ...blog,
    }
    dispatch(updatePost(updatedBlog))
    dispatch(sendMessage(`you liked the ${blog.title}`))
    dispatch(removeMessage(1000))
  }

  const onAddComment = () => {
    setComment('')
    let comments = [...blog.comments, comment]
    let updatedBlogComments = {
      ...blog,
    }
    updatedBlogComments.comments = comments
    dispatch(updatePostComments(updatedBlogComments))
    dispatch(sendMessage('you comment has been added now'))
    dispatch(removeMessage(1000))
  }

  const removePost = () => {
    if (window.confirm(`remove ${blog.title}`)) {
      dispatch(deletePost(blog))
      dispatch(sendMessage(`deleting ${blog.title}...`))
      dispatch(removeMessage(1000))
    }
  }

  if (!user || !blog) {
    return (
      <>Please refresh your browser by pressing F5 or hitting refresh button </>
    )
  }

  return (
    <Container>
      <Card style={hideWhenVisible}>
        <CardContent key={blog.id} id={blog.title}>
          <Typography variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography  color="textSecondary">
            <i>By {blog.author}</i>
          </Typography>
          <Typography variant="body2" component="p">
            <a href={blog.url}>View Original Post</a>
            <br />
          </Typography>
          <CardActions>
            <Button size="small" onClick={toggleVisibility} color="primary">
              More Options
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Card  style={showWhenVisible}>
        <CardContent key={blog.id} id={blog.title}>
          <Typography variant="h5" component="h2">
            {blog.title}
          </Typography>
          <Typography  color="textSecondary">
            <i>By {blog.author}</i>
          </Typography>
          <Typography variant="body2" component="p">
            <a href={blog.url}>{blog.url} </a>
            <br />
          </Typography>
          <CardActions id="like">
            <button
              type={'button'}
              tabIndex={0}
              className={iconLabelStyles.link}
              id="likeBtn"
              onClick={increaseLike}
            >
              <Favorite className={iconLabelStyles.icon} /> {blog.likes}
            </button>
            <Button size="small" onClick={toggleVisibility} color="primary">
              Hide
            </Button>
            {blog.user.user === user.user ? (
              <IconButton aria-label="delete" onClick={removePost}>
                <Delete />
              </IconButton>
            ) : (
              <Button size="small" onClick={toggleVisibility} color="primary">
                Report Issue
              </Button>
            )}
          </CardActions>
          <Typography variant="h5" component="h2">
            Comments
          </Typography>
          <Typography component={'span'} variant={'body2'}>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
            <CardActions id="comments">
              <Button size="small" onClick={toggleVisibility} color="primary">
                Yet to Read
              </Button>

              <TextField
                required
                label="Add your comment"
                id="title"
                type="text"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
              <Button size="small" onClick={onAddComment} color="primary">
                Add Comment
              </Button>
            </CardActions>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
export default Blog
