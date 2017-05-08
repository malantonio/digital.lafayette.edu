import React from 'react'

import SearchBaseForm from '../../components/SearchBaseForm'

class SearchBase extends React.PureComponent {
  handleSearchSubmit (query) {
    console.log(query)
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
