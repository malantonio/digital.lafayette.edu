import { expect } from 'chai'
import reducer, { initialState } from './reducer'
import * as work from './actions'

describe('store/work/reducer', function () {
  describe('work#clearWork', function () {
    it('resets the store to its initial form', function () {
      const nonEmptyState = {
        data: {
          title: ['cool work'],
          author: ['famous author']
        },
        meta: {
          isFetching: false
        }
      }

      const result = reducer(nonEmptyState, work.clearWork())
      expect(result).to.deep.equal(initialState)
    })
  })

  describe('work#fetchingWork', function () {
    it('sets `work.meta.isFetching` to true', function () {
      const result = reducer(initialState, work.fetchingWork())
      expect(result.meta.isFetching).to.be.true
    })
  })

  describe('work#receviedWork', function () {
    const results = {
      title: ['cool title'],
      author: ['author name'],
      publication_date: ['2017-05-30T00:00:00.000Z'],
    }

    const result = reducer(initialState, work.receivedWork(results))

    it('adds the data to the state', function () {
      expect(result.data).to.deep.equal(results)
    })

    it('sets `work.meta.isFetching` to false', function () {
      expect(result.meta.isFetching).to.be.false
    })
  })

  describe('work#receivedWorkError', function () {
    it('sets `work.meta.isFetching` to false', function () {
      const err = new Error('something went wrong!')
      const result = reducer(initialState, work.receivedWorkError(err))
      expect(result.meta.isFetching).to.be.false
    })
  })
})
