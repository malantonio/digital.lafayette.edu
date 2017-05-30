import { createAction } from 'redux-actions'
import { getWorkById } from './endpoints'

export const clearWork = createAction('clear work')
export const fetchingWork = createAction('fetching work')
export const receivedWork = createAction('received work')
export const receivedWorkError = createAction('[error] receiving work')

export const getWork = params => dispatch => {
  if (params && params.id !== undefined) {
    dispatch(fetchingWork(params))

    return getWorkById(params.id)
      .then(results => dispatch(receivedWork(results)))
      .catch(err => dispatch(receivedWorkError(err)))
  }

  else {
    return Promise.reject(new Error('no parameters passed'))
  }
}
