import React from 'react'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

// components/containers for the main app
import SiteHeader from '../../components/SiteHeader'

// screens (aka pages)
import Home from '../Home'
import SearchBase from '../SearchBase'

const App = props => (
  <Router>
    <main>
      <SiteHeader />

      <Route exact path="/" component={Home} />
      <Route exact path="/search" render={props => {
        if (props.location.search === '') {
          return <SearchBase {...props} />
        }

        return <SearchResults {...props} />
      }} />
    </main>
  </Router>
)


export default App
