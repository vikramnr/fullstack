import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

const Notification = ({ message }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  if (message) {
    return ( <Alert severity="error">{message}</Alert>)
  }
  return <></>
}


export default Notification