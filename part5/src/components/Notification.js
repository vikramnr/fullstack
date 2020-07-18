import React from 'react'

const Notification = ({ message }) => {
  const errorStyle = {
    backgroundColor: 'red',
    color:'grey',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (message) {
    return ( <div className='error' style={errorStyle}> {message} </div>)
  }
  return <></>
}


export default Notification