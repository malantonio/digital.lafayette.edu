import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'

import { initialState as search } from './search/reducer'
import { initialState as searchResults } from './search-results/reducer'
import history from '../history'

const rmiddleware = routerMiddleware(history)

const initialState = {
  search,
  searchResults,
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware.apply(null, [thunk, rmiddleware]),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
