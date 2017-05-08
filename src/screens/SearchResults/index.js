import React from 'react'

class SearchResults extends React.PureComponent {
  render () {
    const { isFetching } = this.props.search.meta

    if (isFetching) {
      return <div>f e t c h i n g . . .</div>
    }

    const docs = this.props.searchResults.docs

    if (!docs || docs.length === 0) {
      return <div>no docs found</div>
    }

    return (
      <ul>
        {docs.map(d => (
          <li key={d.id}>
            {d.id} -
            <em>{d.title}</em>
          </li>
        ))}
      </ul>
    )
  }
}

export default SearchResults
