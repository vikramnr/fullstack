import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Favorite from '@material-ui/icons/Favorite'
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux'
import { updatePost, deletePost } from '../reducers/BlogReducer'

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
})

const Blog = ({ blog, user }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	Blog.PropType = {
		blog: PropTypes.object.isRequired,
		handlePostDeletion: PropTypes.func.isRequired,
		handlePostUpdation: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
	}
	const iconLabelStyles = useLabelIconStyles({ linked: true })

	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const increaseLike = () => {
		let updatedBlog = {
			likes: (blog.likes += 1),
			...blog,
		}
		dispatch(updatePost(updatedBlog))
	}

	const removePost = () => {
		if (window.confirm(`remove ${blog.title}`)) {
			dispatch(deletePost(blog))
		}
	}

	return (
		<>
			<Card className={classes.root} style={hideWhenVisible}>
				<CardContent key={blog.id} id={blog.title}>
					<Typography variant="h5" component="h2">
						{blog.title}
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
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
			<Card className={classes.root} style={showWhenVisible}>
				<CardContent key={blog.id} id={blog.title}>
					<Typography variant="h5" component="h2">
						{blog.title}
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
						<i>By {blog.author}</i>
					</Typography>
					<Typography variant="body2" component="p">
						<a href={blog.ur}>{blog.url} </a>
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
								<DeleteIcon />
							</IconButton>
						) : (
							<Button size="small" onClick={toggleVisibility} color="primary">
								Report Issue
							</Button>
						)}
					</CardActions>
				</CardContent>
			</Card>
		</>
	)
}
export default Blog
