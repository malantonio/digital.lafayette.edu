import React from 'react'

// simple wrapper for uniform svg lines
const Bar = ({x, y}) => {
  return (
    <rect
      width="250"
      height="40"
      fill="#1e1e1e"
      {...{x,y}}
    />
  )
}

export default function HamburgerButton (props) {
  let className = 'HamburgerButton'

  if (props.active) {
    className += ' active'
  }

  if (props.className) {
    className += ` ${props.className}`
  }

  return (
    <button
      className={className}
      onClick={props.onClick}
      type="button"
    >
      <svg
        version="1.1"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Bar x="25" y="80" />
        <Bar x="25" y="170" />
        <Bar x="25" y="260" />
      </svg>
    </button>
  )
}
