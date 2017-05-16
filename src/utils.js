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

export class Storage {
  constructor (opts) {
    if (typeof opts === 'string') {
      this.key = opts
      opts = {}
    }

    this.store = opts.store || window.sessionStorage
    this.staleTime = opts.staleTime || (1000 * 60 * 5)
    this.timestampkey = opts.timestampKey || '__timestamp__'
  }

  clear () {
    this.store.removeItem(this.key)
    return null
  }

  get () {
    try {
      const res = this.store.getItem(this.key)
      const parsed = JSON.parse(res)
      const now = Date.now()

      if (parsed[this.timestampKey] + staleTime < now) {
        return this.clear()
      }

      delete parsed[this.timestampKey]
      return parsed
    }

    catch (e) {
      // return this.clear()
      return null
    }
  }

  set (obj) {
    const results = {
      ...obj,
      [this.timestampKey]: Date.now()
    }

    const strung = JSON.stringify(results)
    this.store.setItem(key, strung)
  }
}
