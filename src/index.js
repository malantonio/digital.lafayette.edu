// polyfills
import es6p from 'es6-promise'
import 'whatwg-fetch'

// app code
import React from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'

import * as actions from './store/actions'
import store from './store'
import App from './screens/App'

import './scss/main.scss'

// kick-off polyfill after imports
es6p.polyfill()

if (!process.env.API_BASE_URL) {
  throw Error('No `API_BASE_URL` variable set')
}

const mapStateToProps = state => ({
  search: state.search,
  searchResults: state.searchResults,
  work: state.work,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const Connected = connect(mapStateToProps, mapDispatchToProps)(App)

const wrapped = (
  <Provider store={store}>
    <Connected />
  </Provider>
)

const selector = '#digital-collections-at-lafayette'

ReactDOM.render(wrapped, document.querySelector(selector))
