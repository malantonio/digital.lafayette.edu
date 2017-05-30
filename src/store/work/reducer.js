import { handleActions } from 'redux-actions'
import * as work from './actions'

export const initialState = {
  meta: {
    isFetching: false,
  }
}

export default handleActions({
  [work.clearWork]: () => ({ ...initialState }),
  [work.fetchingWork]: () => ({
    meta: {
      isFetching: true,
    }
  }),

  [work.receivedWork]: (state, action) => ({
    ...state,
    data: action.payload,
    meta: {
      ...state.meta,
      isFetching: false,
    }
  }),

  // if we get an error, turn off isFetching
  [work.receivedWorkError]: () => ({
    meta: {
      isFetching: false,
    }
  })
}, initialState)
