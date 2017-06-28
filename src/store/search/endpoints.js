import { get, stringifyQs } from '../api'
import history from '../../history'
import { flattenValues } from './utils'
import { session } from '../../utils'

export const SEARCH_PATH = process.env.SEARCH_PATH || '/catalog.json'
export const PER_PAGE_LIMIT = 50

export function search ({query, facets, range, meta}) {
  if (!meta) {
    meta = {}
  }

  // set some defaults
  const opts = {
    page: meta.page || 1,
    per_page: PER_PAGE_LIMIT,
  }

  const obj = {
    q: query || '',
  }

  if (facets) {
    obj.f = flattenValues(facets, false)
  }

  if (range) {
    obj.range = flattenValues(range, true)
  }

  const baseQs = stringifyQs(obj)
  const optsQs = stringifyQs(opts)

  session.set(session.keys.SEARCH, baseQs)

  history.push({
    pathname: '/search',
    search: baseQs,
    state: {
      ...obj,
      ...opts,
    }
  })

  const url = `${SEARCH_PATH}?${baseQs}&${optsQs}`
  return get(url)
}
