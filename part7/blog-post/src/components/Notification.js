import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import { removeNotification } from '../reducers/NotificationReducer'

const Notification = () => {
  const message = useSelector(state => state.message)
  console.log(message,'from the component')

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  if (message && message.length> 0) {
    return <Alert severity="error">{message}</Alert>
  }
  return <></>
}

export default Notification
