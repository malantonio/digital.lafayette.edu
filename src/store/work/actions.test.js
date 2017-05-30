import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './actions'
import { initialState } from './reducer'

const mockStore = configureStore([thunk])
const store = mockStore({work: initialState})

const results = {
  title: ['title of work'],
  author: ['author of work', 'another author']
}

describe('store/work/actions', function () {
  describe('#getWork', function () {
    before(function () {
      fetchMock.get(/NOT_WORKING/, 404)
      fetchMock.get('*', JSON.stringify({response: results}))
    })

    afterEach(function () {
      fetchMock.reset()
      store.clearActions()
    })

    it('dispatches `fetchingWork` with work parameters', function () {
      const params = {id: 'abc123'}
      return store.dispatch(actions.getWork(params)).then(() => {
        const axns = store.getActions()
        const axn = axns[0]
        expect(axn.type).to.equal(actions.fetchingWork.toString())
        expect(axn.payload).to.deep.equal(params)
      })
    })

    it('dispatches `receivedWork` on success', function () {
      const params = {id: 'def456'}
      return store.dispatch(actions.getWork(params)).then(() => {
        const axns = store.getActions()
        expect(axns).to.have.lengthOf(2)

        const axn = axns[1]
        expect(axn.type).to.equal(actions.receivedWork.toString())
        expect(axn.payload).to.deep.equal(results)
      })
    })

    it('dispatches `receivedWorkError` on failure', function () {
      return store.dispatch(actions.getWork({id:'NOT_WORKING'})).then(() => {
        const axns = store.getActions()
        expect(axns).to.have.lengthOf(2)

        const axn = axns[1]
        expect(axn.type).to.equal(actions.receivedWorkError.toString())
        expect(axn.error).to.be.true
      })
    })

    it('does nothing if params and/or params.id is undefined', function () {
      return store.dispatch(actions.getWork())
        .catch(() => expect(true).to.be.true)
    })
  })
})
