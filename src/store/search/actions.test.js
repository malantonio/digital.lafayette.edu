import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './actions'

const mockStore = configureStore([thunk])
const store = mockStore({})

const cleanup = () => {
  fetchMock.reset()
  store.clearActions()
}

describe('store/search/actions', function () {
  beforeEach(function () {
    fetchMock.get(/catalog\.json/, { response: [] })
  })

  afterEach(cleanup)

  describe('#searchWithQuery', function () {
    it('passes `q={query}` to queryString', function () {
      const query = 'cats'
      return store.dispatch(actions.searchWithQuery(query))
        .then(() => {
          const url = fetchMock.lastUrl()
          expect(url).to.contain(`q=${query}`)
        })
    })
  })

  describe('#searchWithQueryString', function () {
    afterEach(cleanup)

    const qs = 'q=&f[name][]=facet+value&range[date][begin]=1986'
    const getSearchPayload = () => store.dispatch(actions.searchWithQueryString(qs))
      .then(() => {
        const axns = store.getActions()
        const first = axns[0]
        const { payload } = first

        return payload
      })

    it('converts `f[name][]` prop to `facets` object', function () {
      return getSearchPayload().then(search => {
        expect(search.facets).to.deep.equal({name: ['facet value']})
      })
    })

    it('converts `range[name]` into a range object', function () {
      return getSearchPayload().then(search => {
        expect(search.range).to.deep.equal({date: {begin: '1986'}})
      })
    })

    it('uses the queryString to call the api', function () {
      return getSearchPayload().then(() => {
        const url = fetchMock.lastUrl()
        expect(decodeURIComponent(url)).to.contain(qs.replace('+', ' '))
      })
    })
  })

  describe('#toggleFacetItem', function () {
    describe('when adding a facet', function () {
      const originalState = {
        search: {
          q: '',
          facets: {},
          range: {},
        },
      }

      const mainStore = mockStore(originalState)

      const addAFacet = (s, facet, item) => (
        s.dispatch(actions.toggleFacetItem(facet,item, true))
      )

      afterEach(cleanup)

      it('creates a key in search.facets when one is not present', function () {
        const facet = { name: 'cool-facet', label: 'Cool Facet' }
        const item = { value: 'cool-facet-item', label: 'Cool Facet Item' }

        expect(originalState.search.facets).to.not.have.property(facet.name)

        return addAFacet(store, facet, item).then(() => {
          const first = store.getActions()[0]
          expect(first.type).to.equal(actions.setSearch.toString())

          const facets = first.payload.facets
          expect(facets).to.have.property(facet.name)
          expect(facets[facet.name]).to.be.an('array')
          expect(facets[facet.name]).to.have.lengthOf(1)
          expect(facets[facet.name]).to.contain(item)
        })
      })

      it('appends value to search.facets[name] when present', function () {
        const facet = { name: 'cool-facet' }
        const item1 = { value: 'cool-facet-item-1' }
        const item2 = { value: 'cool-facet-item-2' }
        const oldState = {
          search: {
            ...originalState.search,
            facets: {
              'cool-facet': [item1]
            }
          }
        }

        const oldStore = mockStore(oldState)

        return addAFacet(oldStore, facet, item2).then(() => {
          const first = oldStore.getActions()[0]
          expect(first.type).to.equal(actions.setSearch.toString())

          const facets = first.payload.facets
          expect(facets).to.have.property(facet.name)
          expect(facets[facet.name]).to.be.an('array')
          expect(facets[facet.name]).to.have.lengthOf(2)
          expect(facets[facet.name]).to.deep.equal([item1, item2])
        })
      })

      it('adds `f[name][]=value` to the requesting queryString', function () {
        const facet = { name: 'cool-facet' }
        const item = { value: 'cool-facet-item' }

        return addAFacet(store, facet, item).then(() => {
          const url = decodeURIComponent(fetchMock.lastUrl())
          const str = `f[${facet.name}][]=${item.value}`

          expect(url).to.contain(str)
        })
      })

      it('skips dispatching when an item already exists in facets')
    })

    describe('when removing a facet', function () {
      const removeAFacet = (store, facet, item) => (
        store.dispatch(actions.toggleFacetItem(facet, item, false))
      )

      const facet = {name: 'cool-facet'}
      const item1 = {value: 'cool-facet-item-1'}
      const item2 = {value: 'cool-facet-item-2'}

      const preexistingFacets = {
        facets: { [facet.name]: [item1] }
      }

      it('removes a value from search.facets')

      it('removes the key when empty')

      it('removes the `f[name][]=value` from queryString')

      it('skips dispatching when an item already does not exist in facets')
    })
  })
})
