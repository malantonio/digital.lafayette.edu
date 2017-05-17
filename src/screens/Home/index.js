import React from 'react'
import SplashImage from '../../components/SplashImage'
import SearchBaseForm from '../../components/SearchBaseForm'

class Home extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchSubmit (query) {
    this.props.searchWithQuery(query)
  }

  render () {
    return (
      <div className="Home">
        <SplashImage>
          <span className="digital-collections">
            Digital Collections
          </span>
          <span className="at">
            @
          </span>
          <span className="lafayette">
            Lafayette College
          </span>
        </SplashImage>

        <SearchBaseForm onSubmit={this.handleSearchSubmit} />
      </div>
    )
  }
}

export default Home
