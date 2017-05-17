// session tools
import { session } from '../../utils'

export const STORE_VIEW_KEY = 'results-view'

export function getResultsView (fallback) {
  const view = session.get(STORE_VIEW_KEY)

  if (view === null) {
    session.set(STORE_VIEW_KEY, fallback)
  }

  return view || fallback
}

export function setResultsView (which) {
  session.set(STORE_VIEW_KEY, which)
}
