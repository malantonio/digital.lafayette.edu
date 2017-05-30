import Debug from 'debug'

const noop = () => {}

export function createFacetDictionary (facets) {
  return facets.reduce((out, facet) => {
    const { name, label } = facet
    out[name] = { name, label }

    return out
  }, {})
}

export function getApiPath (path) {
  if (path[0] !== '/') {
    path = `/${path}`
  }

  return `${process.env.API_BASE_URL}${path}`
}

export class Store {
  constructor (opts) {
    if (typeof opts === 'string') {
      const key = opts
      opts = {key}
    }

    if (!opts) {
      opts = {}
    }

    this.store = opts.store || window.sessionStorage
    this.key = opts.key || 'store'
    this.log = opts.log || noop

    // set an empty object if this is our first time w/ the store
    if (this.store.getItem(this.key) === null) {
      this.store.setItem(this.key, '{}')
    }
  }

  clear () {
    this.log('clearing storage')
    this.store.removeItem(this.key)
    return null
  }

  get (key) {
    this.log('getting "%s"', key)

    try {
      const res = this.store.getItem(this.key)
      const parsed = JSON.parse(res)

      if (key === undefined) {
        this.log('no key present, returning store')
        return parsed
      }

      return parsed[key]
    }

    catch (e) {
      this.log('JSON parse error %s', e.message)
      return null
    }
  }

  set (key, val) {
    try {
      this.log('setting "%s" to %s', key, JSON.stringify(val))
      const res = this.store.getItem(this.key)
      const parsed = JSON.parse(res)

      parsed[key] = val

      const strung = JSON.stringify(parsed)
      this.store.setItem(this.key, strung)
    }

    catch (e) {
      this.log('JSON.parse error: %s', e.message)
    }
  }
}

export const session = new Store({key: 'dig@laf', log: Debug('digital:session')})
