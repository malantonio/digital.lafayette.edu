import { get, stringifyQs } from '../api'
import history from '../../history'

const SEARCH_PATH = '/catalog'
const PER_PAGE_LIMIT = 50

export function search ({query, facets, range, callback, ...opts}) {
  // set some defaults
  opts = {
    page: 1,
    per_page: PER_PAGE_LIMIT,
    ...opts,
  }

  const obj = {
    q: query || '',
  }

  if (facets) {
    obj.f = facets
  }

  if (range) {
    obj.range = range
  }

  const baseQs = stringifyQs(obj)
  const optsQs = stringifyQs(opts)

  history.push({
    pathname: '/search',
    search: baseQs,
    state: {
      ...obj,
      ...opts,
    }
  })

  const url = `${SEARCH_PATH}?${baseQs}&${optsQs}`
  return get(url, callback)
}
