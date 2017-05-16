import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.any,
}

class Toggle extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleToggleChange = this.handleToggleChange.bind(this)
    this.renderToggleOption = this.renderToggleOption.bind(this)
  }

  handleToggleChange (val) {
    if (val === this.props.value) {
      return
    }

    this.props.onChange(val)
  }

  renderToggleOption (value, index) {
    const selected = value === this.props.value
    const className = `Toggle-option${selected ? ' is-selected' : ''}`

    return (
      <label className={className} key={`toggle-${value}`}>
        {value}

        <input
          checked={selected}
          name={this.props.name}
          onChange={() => this.handleToggleChange(value)}
          style={{display: 'none'}}
          type="radio"
          value={value}
        />
      </label>
    )
  }

  render () {
    return (
      <div className="Toggle">
        {this.props.values.map(this.renderToggleOption)}
      </div>
    )
  }
}

Toggle.propTypes = propTypes

export default Toggle
