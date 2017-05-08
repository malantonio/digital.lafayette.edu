// to h*ck with promises
import xhr from 'xhr'
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

  const requestOpts = {
    body,
    json: true,
    method,
    uri: `${baseUrl}${path}`,
  }

  return xhr(requestOpts, (err, response, body) => {
    if (err) {
      return callback(err)
    }

    if (response.statusCode < 200 || response.statusCode > 299) {
      const err = new Error(body)
      return callback(err)
    }

    return callback(null, (body.response ? body.response : body))
  })
}

export const get = (...args) => request('GET', ...args)
