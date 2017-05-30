import { get } from '../api'

export const SEARCH_PATH = '/concern/generic_works'
export const EXTENSION = '.json'
export const getPath = id => (
  `${SEARCH_PATH}/${id}${EXTENSION}`
)

export function getWorkById (id) {
  const path = getPath(id)
  return get(path)
}
