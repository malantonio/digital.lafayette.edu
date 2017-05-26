import { expect } from 'chai'
import * as actions from './actions'
import reducer, { initialState } from './reducer'
import { createRangeFacetItem } from './utils'

describe('store/search/reducer', function () {
  describe('actions#clearSearch', function () {
    it('resets the state to its initial form', function () {
      const state = {
        query: 'some query',
        facets: {},
        range: {},
        meta: {
          isFetching: false,
          needsHydration: false,
        }
      }

      expect(state).to.not.deep.equal(initialState)

      const result = reducer(state, actions.clearSearch())

      expect(result).to.deep.equal(initialState)
    })
  })

  describe('actions#receivedSearchError', function () {
    it('leaves the state intact, but toggles `meta.isFetching` to false', function () {
      const state = {
        query: 'fine felines',
        facets: {subject: [{value: 'cats'}]},
        range: {},
        meta: {
          isFetching: true,
          needsHydration: false,
        }
      }

      const err = new Error('something went wrong')
      const result = reducer(state, actions.receivedSearchError(err))

      expect(result.query).to.equal(state.query)
      expect(result.facets).to.deep.equal(state.facets)
      expect(result.range).to.deep.equal(state.range)
      expect(result.meta.needsHydration).to.equal(state.meta.needsHydration)
      expect(result.meta.isFetching).to.be.false
    })
  })

  describe('actions#receivedSearchResults', function () {
    const RESULTS = {
      docs: [],
      facets: [
        {
          name: 'cool-facet-1',
          items: [
            { value: 'val1-1' },
            { value: 'val1-2' },
            { value: 'val1-3' },
          ]
        },
        {
          name: 'cool-facet-2',
          items: [
            { value: 'val2-1' },
            { value: 'val2-2' },
          ]
        }
      ],
      pages: {
        current_page: 1,
        next_page: null,
        prev_page: null,
        total_pages: 0,
        limit_value: 50,
        offset_value: 0,
        total_count: 0,
        'first_page?': true,
        'last_page?': true,
      }
    }

    const reduce = state => (
      reducer(state, actions.receivedSearchResults(RESULTS))
    )

    it('sets the meta properties', function () {
      const state = {
        ...initialState,
        query: null,
        facets: {},
        range: {},
      }

      const { meta } = reduce(state)

      expect(meta.atEnd).to.be.true,
      expect(meta.currentPage).to.equal(RESULTS.pages.current_page)
      expect(meta.isFetching).to.be.false,
      expect(meta.needsHydration).to.be.false,
      expect(meta.offset).to.equal(RESULTS.pages.offset_value)
    })

    describe('rehydrating facets', function () {
      const dryState = {
        query: '',
        facets: {
          'cool-facet-1': ['val1-1', 'val1-3'],
        },
        range: {},
      }

      const hydrated = {
        'cool-facet-1': [
          { value: 'val1-1' },
          { value: 'val1-3' },
        ]
      }

      it('rehydrates when `meta.needsHydration` is true', function () {
        const state = {
          ...dryState,
          meta: {
            needsHyrdation: true,
          }
        }
        const result = reduce(state)
        expect(result.facets).to.deep.equal(hydrated)
      })

      it('rehydrates when first facet value is a string', function () {
        expect(reduce(dryState).facets).to.deep.equal(hydrated)
      })
    })

    describe('rehydrating ranges', function () {
      const range = { date: { begin: '1990', end: '2000' }}

      const dryState = {
        query: '',
        facets: {},
        range,
      }

      const hydrated = {
        date: [createRangeFacetItem('date', range.date.begin, range.date.end)]
      }

      it('rehydrates when `meta.needsHydration` is true', function () {
        const state = {
          ...dryState,
          meta: {
            needsHydration: true,
          }
        }

        const result = reduce(state)
        expect(result.range).to.deep.equal(hydrated)
      })

      it('rehydrates when first range does not have a label', function () {
        expect(reduce(dryState).range).to.deep.equal(hydrated)
      })
    })

  })

  describe('actions#setSearch', function () {
    const reduceEmpty = state => reducer(state, actions.setSearch({}))

    it('toggles `meta.isFetching` to true', function () {
      const result = reduceEmpty(initialState)
      expect(result.meta.isFetching).to.be.true
    })

    it('sets the page to 1 by default', function () {
      const result = reduceEmpty(initialState)
      expect(result.meta.page).to.equal(1)
    })

    it('sets default fields when not present', function () {
      const result = reduceEmpty(initialState)
      expect(result.facets).to.deep.equal({})
      expect(result.range).to.deep.equal({})
      expect(result.query).to.be.null
    })

    it('passes the search object to the state', function () {
      const search = {
        query: 'cool cats',
        facets: {
          subject: [
            {value: 'comics'}, {value: 'felines'}
          ]
        },
        range: {
          date: {
            begin: '1978',
            end: '2017',
          }
        }
      }

      const result = reducer(initialState, actions.setSearch(search))
      expect(result.query).to.equal(search.query)
      expect(result.facets).to.deep.equal(search.facets)
      expect(result.range).to.deep.equal(search.range)
    })
  })
})
