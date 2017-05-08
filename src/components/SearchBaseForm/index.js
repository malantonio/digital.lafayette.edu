import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

class SearchBaseForm extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (ev) {
    ev && ev.preventDefault && ev.preventDefault()
    this.props.onSubmit && this.props.onSubmit(this.input.value)
  }

  render () {
    return (
      <form className="SearchBaseForm" onSubmit={this.handleSubmit}>
        <fieldset>
          <input type="text" ref={el => { this.input = el }} />
          <button type="button" onClick={this.handleSubmit}>
            Search
          </button>
        </fieldset>
      </form>
    )
  }
}

SearchBaseForm.propTypes = propTypes

export default SearchBaseForm
