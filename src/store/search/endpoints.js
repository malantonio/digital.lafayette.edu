import { get, stringifyQs } from '../api'
import history from '../../history'

const SEARCH_PATH = '/catalog'
const PER_PAGE_LIMIT = 50

const flattenValues = obj => {
  return Object.keys(obj).reduce((out, key) => {
    if (Array.isArray(obj[key])) {
      out[key] = obj[key].map(v => typeof v === 'object' ? v.value : v)
    }

    else {
      out[key] = obj[key].value
    }

    return out
  }, {})
}

export function search ({query, facets, range, meta, callback}) {
  // set some defaults
  const opts = {
    page: meta.page || 1,
    per_page: PER_PAGE_LIMIT,
  }

  const obj = {
    q: query || '',
  }

  if (facets) {
    obj.f = flattenValues(facets)
  }

  if (range) {
    obj.range = flattenValues(range)
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
