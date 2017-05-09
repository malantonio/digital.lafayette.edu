import React from 'react'
import FacetGroup from '../../containers/FacetGroup'

class SearchResults extends React.PureComponent {
  componentDidMount () {
    const { isFetching } = this.props.search.meta
    const { search } = this.props.location

    if (isFetching === false && search !== '') {
      // location.search includes question mark, so we'll strip it out here
      this.props.searchWithQueryString(search.substr(1))
    }
  }

  render () {
    const { isFetching } = this.props.search.meta

    // TODO: create 'Fetching' modal
    if (isFetching) {
      return <div>f e t c h i n g . . .</div>
    }

    const { docs, facets } = this.props.searchResults

    // TODO: 'redirect' to no-docs-found screen
    if (!docs || docs.length === 0) {
      return <div>no docs found</div>
    }

    return (
      <div style={{display: 'flex'}}>
        <section key="facets" style={{width:'33%'}}>
          <FacetGroup
            facets={facets}
            onRemoveSelectedItem={console.log.bind(console, 'remove')}
            onSelectItem={console.log.bind(console, 'select')}
          />
        </section>

        <section key="results" style={{width:'66%'}}>
          <ul>
            {docs.map((d, i) => (
              <li key={`${d}-${d.id}`}>
                <span style={{color: 'pink'}}>{d.id}</span>
                {d.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
}

export default SearchResults
