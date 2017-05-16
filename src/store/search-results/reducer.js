import { handleActions } from 'redux-actions'
import * as search from '../search/actions'

export const initialState = {
  meta: {},
}

export default handleActions({
  [search.clearSearch]: () => ({...initialState}),

  [search.receivedSearchResults]: (state, action) => {
    const { facets, pages } = action.payload
    const { current_page } = pages

    const docs = current_page <= 1
      ? action.payload.docs
      : [].concat(state.docs, action.payload.docs)

    return {
      ...state,
      docs,
      facets,
    }
  }
}, initialState)
