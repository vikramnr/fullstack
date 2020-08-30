import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  // console.log(action.data, 'data')
  // console.log(state, 'blogs')
  switch (action.type) {
    case 'NEW_POSTS':
      return [...state, action.data]
    case 'ALL_POSTS':
      return action.data
    case 'UPDATE_POST':
      let id = action.data.id
      let updatePost = state.find((post) => post.id === id)
      let allPosts = state.filter((post) => post.id !== id)
      return [...allPosts, updatePost]
    case 'DELETE_POST':
      let deleteId = action.data.id
      let updatedPosts = state.filter((post) => post.id !== deleteId)
      return [...updatedPosts]
    case 'UPDATE_POST_COMMENTS':
      let postId = action.data.id
      let updatePostComment = state.find((post) => post.id === postId)
      let allPostsComment = state.filter((post) => post.id !== postId)
      return [...allPostsComment, updatePostComment]
    default:
      return state
  }
}

export const creatPost = (content) => {
  return async (dispatch) => {
    const newNote = await blogService.create(content)
    dispatch({
      type: 'NEW_POST',
      data: newNote,
    })
  }
}

export const updatePost = (post) => {
  return async (dispatch) => {
    const updatedPost = await blogService.update(post)
    dispatch({
      type: 'UPDATE_POST',
      data: updatedPost,
    })
  }
}

export const updatePostComments = (post) => {
  return async (dispatch) => {
    console.log(post)
    const updatedPost = await blogService.updateComments(post)
    dispatch({
      type: 'UPDATE_POST_COMMENTS',
      data: updatedPost,
    })
  }
}

export const deletePost = (post) => {
  return async (dispatch) => {
    await blogService.update(post)
    dispatch({
      type: 'DELETE_POST',
      data: post,
    })
  }
}

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await blogService.getAll()
    dispatch({
      type: 'ALL_POSTS',
      data: notes,
    })
  }
}

export default blogReducer
