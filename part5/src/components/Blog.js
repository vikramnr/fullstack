import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, handlePostUpdation, handlePostDeletion,user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  Blog.PropType = {
    blog: PropTypes.object.isRequired,
    handlePostDeletion: PropTypes.func.isRequired,
    handlePostUpdation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    let updatedBlog = {
      likes: blog.likes += 1,
      ...blog
    }
    handlePostUpdation(updatedBlog)
  }

  const removePost = () => {
    if (window.confirm(`remove ${blog.title}`)) {
      handlePostDeletion(blog)
    }
  }

  return (
    <div style={blogStyle} key={blog.id} >
      <div style={hideWhenVisible} className="divBlog">
        <strong>
          {blog.title}
        </strong>
        <div>{blog.author}</div>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="hiddenBlog">
        {blog.title}
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={increaseLike}>like</button></div>
        <button onClick={toggleVisibility}>hide</button>
        { blog.user.user === user.user ?<button onClick={removePost} >remove</button> : <></>}
      </div>
    </div>
  )
}
export default Blog