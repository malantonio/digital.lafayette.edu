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
    const emptyState = () => ({
      search: {
        q: '',
        facets: {},
        range: {},
      },
    })

    describe('when adding a facet', function () {
      const emptyStore = () => {
        return mockStore(emptyState())
      }

      const addAFacet = (store, facet, item) => (
        store.dispatch(actions.toggleFacetItem(facet,item, true))
      )

      afterEach(cleanup)

      it('creates a key in search.facets when one is not present', function () {
        const facet = { name: 'cool-facet', label: 'Cool Facet' }
        const item = { value: 'cool-facet-item', label: 'Cool Facet Item' }
        const store = emptyStore()

        expect(store.getState().search.facets).to.be.empty

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

        const state = {
          search: {
            ...emptyState().search,
            facets: {
              'cool-facet': [item1]
            }
          }
        }

        const store = mockStore(state)

        return addAFacet(store, facet, item2).then(() => {
          const first = store.getActions()[0]
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

        return addAFacet(emptyStore(), facet, item).then(() => {
          const url = decodeURIComponent(fetchMock.lastUrl())
          const str = `f[${facet.name}][]=${item.value}`

          expect(url).to.contain(str)
        })
      })

      it('skips dispatching when an item already exists in facets', function () {
        const state = emptyState()
        const facet = { name: 'cool-facet' }
        const item = { value: 'cool-item' }
        state.search.facets = {[facet.name]: [item]}

        const store = mockStore(state)
        return addAFacet(store, facet, item).then(() => {
          const axns = store.getActions()
          expect(axns).to.be.empty
        })
      })

      describe('when adding a range', function () {
        it('adds the item to `search.facets` when `item.type === "range"', function () {
          const store = emptyStore()
          const facet = { name: 'cool-facet' }
          const item = {
            type: 'range',
            value: {
              begin: '1990',
              end: '1999'
            },
          }

          return addAFacet(store, facet, item).then(() => {
            const search = store.getActions()[0].payload
            expect(search.facets).to.be.empty
            expect(search.range).to.not.be.empty
            expect(search.range).to.have.property(facet.name)

            // save some typing
            const target = search.range[facet.name]
            expect(target).to.be.an('array')
            expect(target).to.have.lengthOf(1)
            expect(target[0]).to.deep.equal(item)
          })
        })

        it('only allows one range per facet', function () {
          const facet = { name: 'cool-range' }
          const item1 = {
            type: 'range',
            value: {
              begin: '1990',
              end: '1999',
            }
          }
          const item2 = {
            type: 'range',
            value: {
              begin: '2000',
              end: '2009',
            }
          }

          const state = {
            ...emptyState(),
            range: {
              [facet.name]: [item1]
            }
          }
          const store = mockStore(state)

          return addAFacet(store, facet, item2).then(() => {
            const search = store.getActions()[0].payload
            const target = search.range[facet.name]
            expect(target).to.not.be.empty
            expect(target).to.have.lengthOf(1)
            expect(target).to.not.contain(item1)
            expect(target).to.contain(item2)
          })
        })

        it('only displays the range value in the query string', function () {
          const facet = { name: 'cool-facet' }
          const item = {
            type: 'range',
            value: {begin: '1990', end: '1999'}
          }

          const state = {
            ...emptyState(),
            range: {
              [facet.name]: [item]
            }
          }

          const store = mockStore(state)

          return addAFacet(store, facet, item).then(() => {
            const url = decodeURIComponent(fetchMock.lastUrl())
            const str = ''
              + `range[${facet.name}][begin]=${item.value.begin}`
              + `&range[${facet.name}][end]=${item.value.end}`

            expect(url).to.contain(str)
          })
        })
      })
    })

    describe('when removing a facet', function () {
      const removeAFacet = (store, facet, item) => (
        store.dispatch(actions.toggleFacetItem(facet, item, false))
      )

      const facet = {name: 'cool-facet'}
      const item1 = {value: 'cool-facet-item-1'}
      const item2 = {value: 'cool-facet-item-2'}

      it('removes a value from search.facets', function () {
        const state = emptyState()
        const facets = state.search.facets = {[facet.name]: [item1, item2]}
        const store = mockStore(state)

        return removeAFacet(store, facet, item1).then(() => {
          const axn = store.getActions()[0]
          expect(axn.type).to.equal(actions.setSearch.toString())

          const updated = axn.payload.facets
          expect(updated[facet.name].length).to.be.lessThan(facets[facet.name].length)
          expect(updated[facet.name]).to.contain(item2)
          expect(updated[facet.name]).to.not.contain(item1)
        })
      })

      it('removes the key when empty', function () {
        const state = emptyState()
        state.search.facets = {[facet.name]: [item1]}
        const store = mockStore(state)

        return removeAFacet(store, facet, item1).then(() => {
          const axn = store.getActions()[0]
          expect(axn.type).to.equal(actions.setSearch.toString())

          const updated = axn.payload.facets
          expect(updated).to.not.have.property(facet.name)
        })
      })

      it('removes the `f[name][]=value` from queryString', function () {
        const state = emptyState()
        state.search.facets = {[facet.name]: [item1]}
        const store = mockStore(state)

        return removeAFacet(store, facet, item1).then(() => {
          const url = fetchMock.lastUrl()
          const str = `f[${facet.name}][]=${item1.value}`

          expect(decodeURIComponent(url)).to.not.contain(str)
        })
      })

      it('skips dispatching when an item already does not exist in facets', function () {
        const store = mockStore(emptyState())

        return removeAFacet(store, facet, item1).then(() => {
          expect(store.getActions()).to.be.empty
        })
      })

      describe('when removing a range', function () {
        it('removes the field from the state', function () {
          const facet = { name: 'cool-range' }
          const item = {
            type: 'range',
            value: {
              begin: '1990',
              end: '1999',
            }
          }

          const state = {
            ...emptyState(),
            range: {[facet.name]: [item]}
          }

          const store = mockStore(state)
          return removeAFacet(store, facet, item).then(() => {
            const search = store.getActions()[0].payload
            expect(search.range).to.not.have.property(facet.name)
          })
        })
      })
    })
  })
})
