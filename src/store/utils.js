// utils for working w/ session storage
const store = window.sessionStorage
const TIMESTAMP_KEY = '__timestamp__'
const DEFAULT_STALE_TIME = 1000 * 60 * 5

export function setupStorage (key, staleTime) {
  if (!key) {
    throw Error ('sessionStorage requires a key')
  }

  if (staleTime === undefined) {
    staleTime = DEFAULT_STALE_TIME
  }

  return {
    clear: function clearStorage () {
      store.removeItem(key)
    },

    get: function getStorage () {
      try {
        const res = store.getItem(key)
        const parsed = JSON.parse(res)
        const now = Date.now()

        if (parsed[TIMESTAMP_KEY] + staleTime < now) {
          return this.clear()
        }

        delete parsed[TIMESTAMP_KEY]
        return parsed
      }

      catch (e) {
        return this.clear()
      }
    },

    set: function set (obj) {
      const results = {
        ...obj,
        [TIMESTAMP_KEY]: Date.now()
      }

      const strung = JSON.stringify(results)
      store.setItem(key, strung)
    }
  }
}
