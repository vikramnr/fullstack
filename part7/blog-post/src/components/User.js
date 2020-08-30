import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ match }) => {
  const userData = useSelector((state) => state.userStats)
  const user = match
    ? userData.find((user) => user.id === match.params.id)
    : null
  
  if (!user) {
    return <>Please refresh your browser by pressing F5 or hitting refresh button </>
  }

  return (
    <>
      <h2>{user.username}</h2>
      <h4>Added Blogs so far</h4>
      {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </>
  )
}

export default User
