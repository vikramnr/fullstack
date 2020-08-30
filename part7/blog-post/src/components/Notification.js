import React from 'react'
import { Alert } from '@material-ui/lab'


const Notification = ({ message }) => {
  
if (message && message.length > 0) {
    return <Alert severity="success">{message}</Alert>
  }
  return <></>
}

export default Notification
