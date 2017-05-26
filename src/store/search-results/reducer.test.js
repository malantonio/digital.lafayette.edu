import { expect } from 'chai'
import reducer, { initialState } from './reducer'
import * as search from '../search/actions'

describe('store/search-results/reducer', function () {
  describe('search#clearSearch', function () {
    it('restores the state to its initial form', function () {
      const state = {
        ...initialState,
        docs: [],
        facets: []
      }

      const result = reducer(state, search.clearSearch())
      expect(result).to.deep.equal(initialState)
    })
  })

  describe('search#receivedSearchResults', function () {
    const state = {
      docs: [
        {title: 'cool title'},
        {title: 'another work'},
        {title: 'and a third'}
      ],
    }

    const res = {
      docs: [
        {title: 'oh wow more'},
        {title: 'yet another'},
      ],
      pages: {
        current_page: 2,
        total_count: 2,
      }
    }

    it('appends results when `pages.current_page` > 1', function () {
      const total = state.docs.length + res.docs.length
      const results = reducer(state, search.receivedSearchResults(res))

      expect(results.docs).to.have.lengthOf(total)
    })

    it('replaces results when `pages.current_page <= 1', function () {
      const updated = {
        ...res,
        pages: {
          current_page: 1,
        }
      }

      const results = reducer(state, search.receivedSearchResults(updated))
      expect(results.docs).to.have.length(updated.docs.length)
    })

    it('adds the total to `searchResults.meta`', function () {
      const result = reducer(initialState, search.receivedSearchResults(res))
      expect(result.meta.total).to.equal(res.pages.total_count)
    })
  })
})
