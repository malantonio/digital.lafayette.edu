import React from 'react'
import WorkHeader from '../../components/WorkHeader'
import MetadataTable from '../../containers/MetadataTable'
import OpenSeadragonViewer from '../../components/OpenSeadragonViewer'

import { schema } from './utils'

class Work extends React.PureComponent {
  componentDidMount () {
    const { fetchWork, match, work } = this.props

    if (work.data === undefined || work.meta.isFetching === false) {
      return this.props.getWork(match.params)
    }
  }

  renderMetadata (data) {
    if (data === undefined) {
      return null
    }

    return (
      <MetadataTable
        data={data}
        schema={schema}
      />
    )
  }

  renderViewer (data) {
    if (data === undefined) {
      return null
    }

    const sources = data.iiif_images

    // if there aren't any sources, don't render the
    // container, which will just fill the screen with
    // empty space
    if (sources.length === 0) {
      return null
    }

    return (
      <div className="Work-viewer">
        <OpenSeadragonViewer
          sources={sources}
        />
      </div>
    )
  }

  render () {
    const { match, work } = this.props
    const { isFetching } = work.meta
    const { data } = work

    const id = data !== undefined
      ? data.id
      : this.props.match.params.id

    return (
      <div className="Work">
        <WorkHeader
          id={id}
          isFetching={isFetching}
          title={data ? data.title : null}
        />

        { this.renderViewer(data) }

        { this.renderMetadata(data) }
      </div>
    )
  }
}

export default Work
