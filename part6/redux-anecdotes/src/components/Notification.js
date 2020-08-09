import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.message)
  const dispatch = useDispatch()

  dispatch(setNotification(null, 1000))
  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (notification) {
    return <div style={style}>{notification}</div>
  } else {
    return <></>
  }
}

export default Notification
