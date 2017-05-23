import React from 'react'

const VIEWBOX = '0 0 100 100'

const arrow = {
  head: {
    stroke: 'none',
  },

  stem : {
    fill: 'none',
  }
}

function buttonFactory(name, contents) {
  const fn = props => {
    const size = props.size
    const p = {
      button: {
        className: `${name} osd-button`,
        id: `osd-${name.toLowerCase()}-button`,
        style: {
          height: size,
          position: 'relative',
          width: size,
        }
      },
      svg: {
        height: size,
        width: size,
        viewBox: VIEWBOX,
        style: {
          left: 0,
          position: 'absolute',
          strokeWidth: 10,
          top: 0,
        }
      }
    }

    return (
      <button {...p.button}>
        <svg {...p.svg}>
          {
            typeof contents === 'function'
            ? contents(props)
            : contents
          }
        </svg>
      </button>
    )
  }

  fn.displayName = name
  fn.id = id

  return fn
}

export const Plus = buttonFactory('Plus', (
  <g>
    <path d="M50,10l0,80" {...arrow.stem} />
    <path d="M10,50l80,0" {...arrow.stem} />
  </g>
))

export const Minus = buttonFactory('Minus', (
  <g>
    <path d="M10,50l80,0" {...arrow.stem} />
  </g>
))

export const FullScreen = buttonFactory('FullScreen', (
  <g>
    <g key="top-left">
      <path d="M10,10L40,10L10,40" {...arrow.head} />
      <path d="M25,25l15,15" {...arrow.stem} />
    </g>

    <g key="top-right">
      <path d="M90,10L60,10L90,40" {...arrow.head} />
      <path d="M75,25l-15,15" {...arrow.stem} />
    </g>

    <g key="bottom-left">
      <path d="M10,90L40,90L10,60" {...arrow.head} />
      <path d="M25,75l15,-15" {...arrow.stem} />
    </g>

    <g key="bottom-right">
      <path d="M90,90L60,90L90,60" {...arrow.head} />
      <path d="M75,75l-15,-15" {...arrow.stem} />
    </g>
  </g>
))

export const Reset = buttonFactory('Reset', (
  <g>
    {/* <rect x="20" y="10" width="60" height="80" fill="none" /> */}
    <path d="M50,10l15,25l-30,0" {...arrow.head} />
    <path d="M50,35l0,30" {...arrow.stem} />
    <path d="M50,90l-15,-25l30,0" {...arrow.head} />
  </g>
))
