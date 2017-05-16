import PropTypes from 'prop-types'
import FacetItem from './BlacklightFacetItem'

export default PropTypes.shape({
  items: PropTypes.arrayOf(FacetItem),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
})
