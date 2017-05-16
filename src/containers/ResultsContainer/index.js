import React from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'

const propTypes = {
  component: PropTypes.func.isRequired,

  searchAtPage: PropTypes.func.isRequired,

  search: PropTypes.shape({
    meta: PropTypes.shape({
      atEnd: PropTypes.boolean,
      isFetching: PropTypes.boolean,
    })
  }).isRequired,

  searchResults: PropTypes.shape({
    docs: PropTypes.array,
    meta: PropTypes.object,
  }).isRequired,
}

const ResultsContainer = props => {
  const { searchResults, search } = props
  const { docs } = searchResults

  if (docs === undefined || searchResults.meta === undefined) {
    return null
  }

  const { atEnd, isFetching } = search.meta
  const hasMore = !(atEnd || isFetching)

  const scrollProps = {
    hasMore,
    loadMore: props.searchAtPage,
    pageStart: 1,
    threshold: 50,
  }

  const Component = props.component

  return (
    <InfiniteScroll {...scrollProps}>
      <Component docs={docs} />
    </InfiniteScroll>
  )
}

ResultsContainer.propTypes = propTypes

export default ResultsContainer
