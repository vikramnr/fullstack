import React from 'react'

const Notification = ({message}) => {
    if (message) {
        return ( <div> {message} </div>)
    }
    return <></>
}


export default Notification