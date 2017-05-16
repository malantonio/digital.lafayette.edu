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
    if (!opts) {
      opts = {}
    }

    this.store = opts.store || window.sessionStorage
    this.__internal_key__ = 'dig@laf'

    // set an empty object if this is our first time w/ the store
    if (this.store.getItem(this.__internal_key__) === null) {
      this.store.setItem(this.__internal_key__, '{}')
    }
  }

  clear () {
    this.store.removeItem(this.__internal_key__)
    return null
  }

  get (key) {
    try {
      const res = this.store.getItem(this.__internal_key__)
      const parsed = JSON.parse(res)

      if (key === undefined) {
        return parsed
      }

      return parsed[key]
    }

    catch (e) {
      return {}
    }
  }

  set (key, val) {
    const dict = this.get()

    // probably not the best strategy?
    if (dict === null) {
      throw Error('Problem parsing storage')
    }

    if (Array.isArray(val)) {
      dict[key] = [].concat(dict[key], val).filter(Boolean)
    }

    else if (typeof val === 'object') {
      dict[key] = {...dict[key], ...val}
    }

    else {
      dict[key] = val
    }

    const strung = JSON.stringify(dict)
    this.store.setItem(this.__internal_key__, strung)
  }
}

export const session = new Store()
