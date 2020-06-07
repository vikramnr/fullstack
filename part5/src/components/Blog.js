import React from 'react'
const Blog = ({ blog }) => (
  <div key={blog.id}>
    {blog.title} {blog.author}
  </div>
)

export default Blog
