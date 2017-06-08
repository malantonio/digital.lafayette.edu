import { handleActions } from 'redux-actions'
import Debug from 'debug'
import * as search from './actions'

import { createRangeFacetItem } from './utils'
import { session } from '../../utils'

const SESSION_KEY = 'search'

const debug = Debug('digital:store/search/reducer')

const createFacetDictionary = facets => facets.reduce((out, facet, index) => {
  out[facet.name] = index
  return out
}, {})

export const initialState = {
  meta: {
    isFetching: false,
    needsHydration: true,
  },
}

export default handleActions({
  [search.clearSearch]: () => {
    session.remove(SESSION_KEY)

    return {...initialState}
  },

  [search.receivedSearchError]: state => ({
    ...state,
    meta: {
      ...state.meta,
      isFetching: false,
    },
  }),

  [search.receivedSearchResults]: (state, action) => {
    const { pages } = action.payload
    const { current_page, offset_value } = pages

    let { facets, range, meta } = {...state}

    if (!meta) {
      meta = {}
    }

    const fkeys = Object.keys(facets)
    const rkeys = Object.keys(range)

    // if there are facets, let's check to see if they need
    // to be hydrated (eg. we came here from a query string
    // and need the full details of the facets to be added
    // to the state)
    if (fkeys.length !== 0) {
      const needsHydration = (
        meta.needsHydration || typeof facets[fkeys[0]][0] === 'string'
      )

      if (needsHydration) {
        debug('rehydrating facets')

        const resultFacets = action.payload.facets
        const dict = createFacetDictionary(resultFacets)

        const update = fkeys.reduce((out, key) => {
          const idx = dict[key]
          out[key] = resultFacets[idx].items.filter(i => (
            facets[key].indexOf(i.value) > -1
          ))

          return out
        }, {})

        facets = update
      }
    }

    if (rkeys.length !== 0) {
      const needsHydration = (
        meta.needsHydration || range[rkeys[0]].label === undefined
      )

      if (needsHydration) {
        debug('rehydrating range')

        const update = rkeys.reduce((out, key) => {
          const orig = range[key]
          out[key] = [createRangeFacetItem(key, orig.begin, orig.end)]
          return out
        }, {})

        range = update
      }
    }

    return {
      ...state,
      facets,
      range,
      meta: {
        atEnd: pages && pages['last_page?'],
        currentPage: current_page,
        isFetching: false,
        needsHydration: false,
        offset: offset_value,
      },
    }
  },

  [search.setSearch]: (state, action) => {
    const { query, facets, range, ...opts } = action.payload

    const search = {
      facets: facets || {},
      query: query || null,
      range: range || {},
    }

    session.set(SESSION_KEY, search)

    return {
      ...search,
      meta: {
        ...state.meta,
        isFetching: true,
        offset: 0,
        page: opts.page || 1,
      },
    }
  },
}, initialState)
