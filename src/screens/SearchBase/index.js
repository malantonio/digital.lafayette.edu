import React from 'react'
import SearchBaseForm from '../../components/SearchBaseForm'

class SearchBase extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchSubmit (query) {
    this.props.searchWithQuery(query)
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
