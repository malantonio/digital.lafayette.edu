import { handleActions } from 'redux-actions'
import * as search from './actions'

export const initialState = {
  meta: {
    isFetching: false,
  },
}

export default handleActions({
  [search.clearSearch]: () => ({...initialState}),

  [search.receivedSearchError]: state => ({
    ...state,
    meta: {
      ...state.meta,
      isFetching: false,
    },
  }),

  [search.receivedSearchResults]: (state, action) => {
    const { pages } = action.payload

    const {
      current_page,
      offset_value,
      total_count,
      total_pages,
    } = pages

    return {
      ...state,
      meta: {
        atEnd: pages && pages['last_page?'],
        currentPage: current_page,
        isFetching: false,
        offset: offset_value,
      },
    }
  },

  [search.setSearch]: (state, action) => {
    const { query, facets, range, ...opts } = action.payload

    return {
      facets,
      meta: {
        isFetching: true,
        offset: 0,
        page: opts.page || 1,
      },
      query,
      range,
    }
  },
}, initialState)
