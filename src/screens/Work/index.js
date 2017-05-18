import React from 'react'
import WorkHeader from '../../components/WorkHeader'
import MetadataContainer from '../../containers/MetadataContainer'

import { schema } from './utils'

class Work extends React.PureComponent {
  componentDidMount () {
    const { fetchWork, match, work } = this.props

    if (work.data === undefined || work.meta.isFetching === false) {
      return this.props.getWork(match.params)
    }
  }

  render () {
    const { match, work } = this.props
    const { isFetching } = work.meta

    const id = work.data !== undefined
      ? work.data.id
      : this.props.match.params.id

    return (
      <div>
        <WorkHeader
          id={id}
          isFetching={isFetching}
          title={work.data ? work.data.title : null}
        />

        {
          work.data ? <MetadataContainer data={work.data} schema={schema} /> : ''
        }
      </div>
    )
  }
}

export default Work
