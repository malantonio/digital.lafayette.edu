import React from 'react'
import PropTypes from 'prop-types'

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
  }

  componentDidMount () {
    this.initOpenSeadragon()
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

      ...viewerProps,
    })
  }

  render () {
    return (
      <div
        className="OpenSeadragonViewer"
        ref={el => { this.osdElement = el }}
      />
    )
  }
}

OpenSeadragonViewer.propTypes = propTypes

export default OpenSeadragonViewer
