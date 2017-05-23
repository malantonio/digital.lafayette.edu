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
      autoHideControls: false,
      tileSources: sources,
      sequenceMode: sources.length > 1,
      showReferenceStrip: sources.length > 1,
      referenceStripScroll: 'vertical',
      showNavigator: true,

      toolbar: 'toolbar',

      zoomInButton: Buttons.Plus.id,
      zoomOutButton: Buttons.Minus.id,
      homeButton: Buttons.Reset.id,
      fullPageButton: Buttons.FullScreen.id,

      ...viewerProps,
    })

    this.viewer.addHandler('resize', this.resizeContainer)
  }

  resizeContainer () {
    if (this.viewer.isFullPage()) {
      this.setState({
        height: '100%',
      })

      return
    }

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
    const buttonSize = 25

    return (
      <div className="OpenSeadragonViewer">
        <div id="toolbar" className="OpenSeadragonViewer-toolbar">
          <Buttons.Plus size={buttonSize} />
          <Buttons.Minus size={buttonSize} />
          <Buttons.Reset size={buttonSize} />
          <Buttons.FullScreen size={buttonSize} />
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
