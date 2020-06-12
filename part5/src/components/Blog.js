import React, { useState } from 'react'
const Blog = ({ blog, handlePostUpdation, handlePostDeletion,user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = (e) => {
    let updatedBlog = {
      likes: blog.likes += 1,
      ...blog
    }
    handlePostUpdation(updatedBlog)
  }

  const removePost = (e) => {
    if (window.confirm(`remove ${blog.title}`)) {
      handlePostDeletion(blog)
    }
  }

  return (
    <div style={blogStyle} key={blog.id}>
      <strong style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </strong>
      <div style={showWhenVisible}>
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
