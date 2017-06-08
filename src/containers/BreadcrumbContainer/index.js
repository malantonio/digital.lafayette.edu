import React from 'react'
import PropTypes from 'prop-types'
import Debug from 'debug'
import Breadcrumb from '../../components/Breadcrumb'

const debug = Debug('digital:containers/BreadcrumbContainer')

const propTypes = {
  // key/val store of facet names => facet values
  //  (either Label string or label/name objects)
  dictionary: PropTypes.object,

  // the search-state object of selected facets
  facets: PropTypes.object,

  // the string query
  query: PropTypes.string,

  // the search-state object of selected ranges
  range: PropTypes.object,
}

const defaultProps = {
  dictionary: {},
  facets: {},
  query: '',
  range: {},
}

class BreadcrumbContainer extends React.PureComponent {
  constructor (props) {
    super(props)

    if (props.dictionary === defaultProps.dictionary) {
      debug('No facet dictionary provided')
    }

    this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this)
  }

  renderBreadcrumbs (keys, pool) {
    const { dictionary, onRemoveBreadcrumb } = this.props

    return keys.reduce((out, key) => {
      const label = dictionary[key] && dictionary[key].label
        ? dictionary[key].label
        : dictionary[key]
          ? dictionary[key]
          : key

      const facet = {label, name: key}

      let next

      if (!Array.isArray(pool[key])) {
        next = (
          <Breadcrumb
            facet={facet}
            item={pool[key]}
            key={`bc-${key}-0`}
            onRemove={onRemoveBreadcrumb}
          />
        )
      }

      else {
        next = pool[key].map((item, idx) => (
          <Breadcrumb
            facet={facet}
            item={item}
            key={`bc-${key}-${idx}`}
            onRemove={onRemoveBreadcrumb}
          />
        ))
      }

      return out.concat(next)
    }, [])
  }

  render () {
    const { facets, query, range } = this.props
    const fkeys = Object.keys(facets)
    const rkeys = Object.keys(range)

    return (
      <div className="BreadcrumbContainer">
        {
          query === '' || query === null
          ? null
          : <Breadcrumb key="bc-query" item={{value: query}} />
        }

        {
          fkeys.length === 0
          ? null
          : this.renderBreadcrumbs(fkeys, facets)
        }

        {
          rkeys.length === 0
          ? null
          : this.renderBreadcrumbs(rkeys, range)
        }
      </div>
    )
  }
}

BreadcrumbContainer.propTypes = propTypes
BreadcrumbContainer.defaultProps = defaultProps

export default BreadcrumbContainer
