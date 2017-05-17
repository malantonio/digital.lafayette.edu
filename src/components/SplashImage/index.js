import React from 'react'

class SplashImage extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="SplashImage" ref={el => { this.container = el }}>
        <span className="SplashImage-text">
          <span className="digital">Digital</span>
          <span className="collections">Collections</span>
          <span className="at">at</span>
          <span className="lafayette">Lafayette</span>
          <span className="college">College</span>
        </span>
      </div>
    )
  }
}

export default SplashImage
