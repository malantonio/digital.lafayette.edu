// it's a button that looks like text!
import React from 'react'

export default function TextButton (props) {
  return (
    <button
      {...props}
      type="button"
      className="Button TextButton"
    >
      {props.children}
    </button>
  )
}
