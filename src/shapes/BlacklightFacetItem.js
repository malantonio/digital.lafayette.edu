import PropTypes from 'prop-types'

export default PropTypes.shape({
  hits: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
})
