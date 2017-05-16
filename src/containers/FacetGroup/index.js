import React from 'react'
import PropTypes from 'prop-types'
import BlacklightFacetShape from '../../shapes/BlacklightFacet'

const propTypes = {
  // an array of facet-names to ignore when iterating through facets
  // (used _before_ checking `whitelist`)
  blacklist: PropTypes.arrayOf(PropTypes.string),

  // a map of facet-names => components used to render. this supercedes
  // the `defaultComponent` prop, allowing some facets to use different
  // components for rendering
  components: PropTypes.object,

  // the fallback component to use for rendering a facet.
  defaultComponent: PropTypes.func,

  // data provided from a Blacklight API response
  facets: PropTypes.arrayOf(BlacklightFacetShape).isRequired,

  // handler called when a selected facet is removed.
  // `function (facet = {label, name}, item = {label, value})`
  onRemoveSelectedItem: PropTypes.func.isRequired,

  // handler called when a facet is selected
  // `function (facet = {label, name}, item = {label, value})`
  onSelectItem: PropTypes.func.isRequired,

  // a map of selected facets
  selected: PropTypes.object,

  // should a facet be rendered if no items are included
  // (default: false)
  showEmpty: PropTypes.bool,

  // an array of facet-names to explicitly allow when iterating
  // through facets (used _after_ checking `blacklist`)
  whitelist: PropTypes.arrayOf(PropTypes.string),
}

const defaultProps = {
  blacklist: [],
  components: {},
  selected: {},
  showEmpty: false,
  whitelist: [],
}

class FacetGroup extends React.PureComponent {
  constructor (props) {
    super(props)

    this.renderFacet = this.renderFacet.bind(this)
  }

  renderFacet (facet, index) {
    if (facet.items === undefined) {
      return null
    }

    if (facet.items.length === 0 && this.props.showEmpty === false) {
      return null
    }

    const {
      blacklist,
      components,
      defaultComponent,
      onRemoveSelectedItem,
      onSelectItem,
      whitelist,
    } = this.props

    if (blacklist.length > 0 && blacklist.indexOf(facet.name) > -1) {
      return null
    }

    if (whitelist.length > 0 && whitelist.indexOf(facet.name) === -1) {
      return null
    }

    const selected = this.props.selected[facet.name] || []
    const hasSelectedItems = selected.length > 0
    let items = [].concat(facet.items)

    if (hasSelectedItems === true) {
      const selectedVals = selected.map(s => s.value)
      items = items.filter(i => selectedVals.indexOf(i.value) === -1)
    }

    const props = {
      items,
      key: `${index}-${facet.name}`,
      onRemoveSelectedItem,
      onSelectItem,
      open: hasSelectedItems,
      selectedItems: selected,
    }

    const Component = components[facet.name] || defaultComponent

    return (
      <Component
        {...facet}
        {...props}
      />
    )
  }

  render () {
    if (this.props.facets.length === 0) {
      return null
    }

    return (
      <div className="FacetGroup">
        {this.props.facets.map(this.renderFacet)}
      </div>
    )
  }
}

FacetGroup.propTypes = propTypes
FacetGroup.defaultProps = defaultProps

export default FacetGroup
