import { handleActions } from 'redux-actions'
import * as search from '../search/actions'

export const initialState = {
  meta: {},
}

export default handleActions({
  [search.clearSearch]: () => ({...initialState}),

  [search.receivedSearchResults]: (state, action) => ({
    ...state,
    docs: action.payload.docs,
    facets: action.payload.facets,
    meta: {

    },
  })
}, initialState)
