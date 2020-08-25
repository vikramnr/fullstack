import React from 'react'
import Blog from './Blog'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const DisplayBlogs = ({
  user,
}) => {
  const blogs = useSelector(state => state.blogs)
  
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid key={blog.id} item xs={3}>
            <Blog
              id="blog"
              key={blog.id}
              blog={blog}
              user={user}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default DisplayBlogs
