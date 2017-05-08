import React from 'react'
import { get } from '../../store/api'

import SearchBaseForm from '../../components/SearchBaseForm'

class SearchBase extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchSubmit (query) {
    this.props.searchWithQuery(query, (err, res) => {
      if (err)
        throw err
    })
  }

  render () {
    return (
      <div className="SearchBase">
        <SearchBaseForm onSubmit={this.handleSearchSubmit} />
      </div>
    )
  }
}

export default SearchBase
