import { createAction } from 'redux-actions'
import { searchWithQuery as _searchWithQuery } from './endpoints'

const buildSearch = (query, facets, range) => ({
  q: query || '',
  f: facets || {},
  range: range || {},
})

export const clearFacet = createAction('clear search.facet')
export const clearIsFetching = createAction('clear search.isFetching')
export const clearSearch = createAction('clear search')
export const receivedSearchError = createAction('[error] search')
export const receivedSearchResults = createAction('received search results')
export const setFacet = createAction('set search.facet')
export const setIsFetching = createAction('set search.isFetching')
export const setSearch = createAction('set search')

// this makes the assumption that a query search does not
// inherit facets / page positions
export const searchWithQuery = query => {
  return (dispatch, getState, api) => {
    dispatch(setSearch({query}))

    return _searchWithQuery(query, (err, response) => {
      if (err) {
        return dispatch(receivedSearchError(err))
      }

      dispatch(receivedSearchResults(response))
    })
  }
}
