import { get } from '../api'

const SEARCH_PATH = '/concern/generic_works'
const EXTENSION = '.json'

const getPath = id => (
  `${SEARCH_PATH}/${id}${EXTENSION}`
)

export function getWorkById (id, callback) {
  const path = getPath(id)

  return get(path, callback)
}
