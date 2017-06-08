import session from './session'

export default function hasStoredSearch () {
  return !!session.get(session.keys.SEARCH)
}
