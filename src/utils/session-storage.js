export default class SessionStorage {
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
    this.log = opts.log || function () {}

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

  remove (key) {
    this.log('removing "%s"', key)

    try {
      const res = this.store.getItem(this.key)
      const parsed = JSON.parse(res)

      delete parsed[key]

      const strung = JSON.stringify(parsed)
      this.store.setItem(this.key, strung)
    } catch (e) {
      this.log('JSON.parse error: %s', e.message)
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
