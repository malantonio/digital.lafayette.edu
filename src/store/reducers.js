import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import search from './search/reducer'
import searchResults from './search-results/reducer'
import work from './work/reducer'

export default combineReducers({
  search,
  searchResults,
  work,

  routing: routerReducer,
})
