import React from 'react'
import WorkHeader from '../../components/WorkHeader'
import MetadataTable from '../../containers/MetadataTable'

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

  render () {
    const { match, work } = this.props
    const { isFetching } = work.meta
    const { data } = work

    const id = data !== undefined
      ? data.id
      : this.props.match.params.id

    return (
      <div>
        <WorkHeader
          id={id}
          isFetching={isFetching}
          title={data ? data.title : null}
        />

        { this.renderMetadata(data) }
      </div>
    )
  }
}

export default Work
