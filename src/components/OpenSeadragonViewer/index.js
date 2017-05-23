import React from 'react'
import PropTypes from 'prop-types'

import * as Buttons from './buttons'

import 'openseadragon'

const propTypes = {
  sources: PropTypes.array,
  viewerProps: PropTypes.object,
}

const defaultProps = {
  sources: [],
  viewerProps: {},
}

class OpenSeadragonViewer extends React.PureComponent {
  constructor (props) {
    super(props)

    this.initOpenSeadragon = this.initOpenSeadragon.bind(this)
    this.resizeContainer = this.resizeContainer.bind(this)

    this.state = {
      height: this.getHeight(),
    }
  }

  componentWillMount () {
    window.addEventListener('resize', this.resizeContainer)
  }

  componentDidMount () {
    this.initOpenSeadragon()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeContainer)
  }

  getHeight () {
    return Math.floor(window.innerHeight * 0.5)
  }

  initOpenSeadragon () {
    const { viewerProps, sources } = this.props

    this.viewer = OpenSeadragon({
      element: this.osdElement,
      prefixUrl: 'http://openseadragon.github.io/openseadragon/images/',
      autoHideControls: false,
      tileSources: sources,
      sequenceMode: sources.length > 1,
      showReferenceStrip: sources.length > 1,
      referenceStripScroll: 'vertical',
      showNavigator: true,

      zoomInButton: Buttons.Plus.id,
      zoomOutButton: Buttons.Minus.id,
      homeButton: Buttons.Reset.id,
      fullPageButton: Buttons.FullScreen.id,

      ...viewerProps,
    })
  }

  resizeContainer () {
    // throttle
    let timeout

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        this.setState({
          height: this.getHeight(),
        })
      }, 50)
    }
  }

  render () {
    return (
      <div className="OpenSeadragonViewer">
        <div className="OpenSeadragonViewer-buttons">
          <Buttons.Plus size={20} />
          <Buttons.Minus size={20} />
          <Buttons.Reset size={20} />
          <Buttons.FullScreen size={20} />
        </div>

        <div
          className="OpenSeadragonViewer-viewer"
          ref={el => { this.osdElement = el }}
          style={{height: this.state.height}}
        />
      </div>
    )
  }
}

OpenSeadragonViewer.propTypes = propTypes

export default OpenSeadragonViewer
