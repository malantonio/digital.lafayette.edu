import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import search from './search/reducer'
import searchResults from './search-results/reducer'


export default combineReducers({
  search,
  searchResults,

  routing: routerReducer,
})
