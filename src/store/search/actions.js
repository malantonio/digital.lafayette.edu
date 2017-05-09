import { createAction } from 'redux-actions'
import { search } from './endpoints'
import { parseQs } from '../api'

const searchCallback = dispatch => (err, response) => {
  if (err) {
    return dispatch(receivedSearchError(err))
  }

  return dispatch(receivedSearchResults(response))
}

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
export const searchWithQuery = query => dispatch => {
  dispatch(setSearch({query}))

  return search({
    query,
    callback: searchCallback(dispatch)
  })
}

export const searchWithQueryString = qs => dispatch => {
  const { q, f, range, ...opts } = parseQs(qs)
  const searchObj = {
    ...opts,
    query: q,
    facets: f,
    range,
  }

  dispatch(setSearch(searchObj))

  return search({
    ...searchObj,
    callback: searchCallback(dispatch)
  })
}
