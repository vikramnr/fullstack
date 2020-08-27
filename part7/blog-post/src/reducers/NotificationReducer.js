const NotificationReducer = (state = '', action) => {
  console.log(action.data, 'from reducer')
  console.log(state, 'from state')
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
    case 'REMOVE_MESSAGE':
      return action.data
    default:
      return state
  }
}

export const createNotification = (message, timer) => {
  return async (dispatch) => {
    await setTimeout(() => {
        dispatch({
            type: 'REMOVE_MESSAGE',
            data:''
        })
    }, timer);
    dispatch({ type: 'SET_MESSAGE', data: message })
  }
  //return {}
}

// export const removeNotification = () => {
//     console.log('called removed')
//     return async (dispatch) =>{
//         const timerId = await setTimeout(() => {}, 5000)
//         dispatch({
//             type: 'REMOVE_MESSAGE',
//             data: ''
//         })
//     }
// }

export default NotificationReducer
