import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div id="togglable">
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          size="small"
          type="submit"
          color="primary"
        >
          {' '}
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          size="small"
          type="submit"
          color="primary"
          onClick={toggleVisibility}
        >
          {' '}
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
