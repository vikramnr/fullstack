const message = 'Hello and Welcome to Anectodes'

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

export const sendMessage = (message) => {
  return {
    type: 'SEND_MESSAGE',
    data: message,
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE',
  }
}

export const setNotification = (message, time) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'SEND_MESSAGE',
        data: message,
      })
    }, time)
  }
}

export default notificationReducer
