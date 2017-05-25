import qs from 'qs'

export const parseQs = str => qs.parse(str)
export const stringifyQs = obj => qs.stringify(obj, { arrayFormat: 'brackets' })
const baseUrl = process.env.API_BASE_URL

const request = (method, path, body, opts, callback) => {
  // request(method, path, callback)
  if (typeof body === 'function') {
    callback = body
    body = undefined
    opts = {}
  }

  // request(method, path, body, callback)
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  }

  if (body !== undefined && typeof body !== 'string') {
    try {
      body = JSON.stringify(body)
    } catch (e) {
      body = '' + body
    }
  }

  if (callback === undefined) {
    callback = () => {}
  }

  const requestOpts = {
    body,
    json: true,
    method,
  }

  return fetch(`${baseUrl}${path}`, requestOpts)
    .then(res => res.json())
    .then(handleErrors)
    .then(res => res.response)

}

function handleErrors (res) {
  if (res.status < 200 || res.status > 299) {
    const err = new Error(res.statusText)
    err.status = res.status

    throw err
  }

  return res
}

export const get = (...args) => request('GET', ...args)
