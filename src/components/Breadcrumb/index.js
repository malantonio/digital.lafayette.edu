import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  facet: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
  }),

  item: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.object,
    ])
  }).isRequired
}

class Breadcrumb extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      buttonHover: false,
    }
  }

  render () {
    const isButtonHovered = this.state.buttonHover
    const { onRemove, facet, item } = this.props

    return (
      <div
        className={`Breadcrumb${isButtonHovered ? ' is-hovered' : ''}`}
      >
        {
          facet && facet.label
          ? <span className="Breadcrumb-facet">{`${facet.label} > `}</span>
          : ''
        }

        <span className="Breadcrumb-item">
          { item.label }
        </span>

        <button
          className="Breadcrumb-remove-btn"
          onClick={() => { onRemove(facet, item) }}
          onMouseOut={() => this.setState({buttonHover: false})}
          onMouseOver={() => this.setState({buttonHover: true})}
        >
          X
        </button>
      </div>
    )
  }
}

Breadcrumb.propTypes = propTypes

export default Breadcrumb
