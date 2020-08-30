const message = null
let timerId = null

const notificationReducer = (state = message, action) => {
  
  switch (action.type) {
    case 'SEND_MESSAGE':
      return action.data
    case 'REMOVE_MESSAGE':
      return null
    default:
      return state
  }
}

export const removeMessage = (time) => {
  if (timerId) {
    clearTimeout(timerId)
  }
  return async (dispatch) => {
    timerId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE',
        data: null,
      })
    }, time)
  }
}

export const sendMessage = (message) => {
  return {
    type: 'SEND_MESSAGE',
    data: message,
  }
}

export default notificationReducer
