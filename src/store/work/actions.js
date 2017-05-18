import { createAction } from 'redux-actions'
import { getWorkById } from './endpoints'

export const clearWork = createAction('clear work')
export const fetchingWork = createAction('fetching work')
export const receivedWork = createAction('received work')
export const receivedWorkError = createAction('[error] receiving work')

const hasOwnProperty = Object.prototype.hasOwnProperty

export const getWork = params => dispatch => {
  dispatch(fetchingWork(params))

  if (params && params.id !== undefined) {
    return getWorkById(params.id, (err, results) => {
      if (err) {
        return dispatch(receivedWorkError(err))
      }

      return dispatch(receivedWork(results))
    })
  }
}
