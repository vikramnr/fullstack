import React from 'react'
import Blog from './Blog'

const DisplayBlogs = ({
  blogs,
  handlePostDeletion,
  handlePostUpdation,
  user,
}) => {
  return (
    <>
      <h2>blogs</h2>
      <div id="displayBlogs">
        {blogs.map((blog) => (
          <Blog
            id="blog"
            key={blog.id}
            blog={blog}
            handlePostUpdation={handlePostUpdation}
            handlePostDeletion={handlePostDeletion}
            user={user}
          />
        ))}
      </div>
    </>
  )
}

export default DisplayBlogs
