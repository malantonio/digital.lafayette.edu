import React from 'react'

import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

// components/containers for the main app
import SiteHeader from '../../components/SiteHeader'

// screens (aka pages)
import Home from '../Home'
import SearchBase from '../SearchBase'
import SearchResults from '../SearchResults'
import Work from '../Work'

import history from '../../history'

class App extends React.PureComponent {
  render () {
    return (
      <ConnectedRouter history={history}>
        <main>
          <SiteHeader />

          <Route exact path="/" render={() => <Home {...this.props} /> } />
          <Route path="/search" render={props => {
            const merged = {
              ...props,
              ...this.props,
            }

            const Component = props.location.search === ''
              ? SearchBase
              : SearchResults

            return <Component {...merged} />
          }} />

          <Route path="/works/:id" render={props => (
            <Work {...props} {...this.props} />
          )} />
        </main>
      </ConnectedRouter>

    )
  }
}

export default App
