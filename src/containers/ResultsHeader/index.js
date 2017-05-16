import React from 'react'
import PropTypes from 'prop-types'
import BreadcrumbContainer from '../BreadcrumbContainer'
import Toggle from '../../components/Toggle'

const propTypes = {
  ...BreadcrumbContainer.propTypes,
}

const ResultsHeader = props => {
  return (
    <div className="ResultsHeader">
      <Toggle {...props.viewToggleOptions} />

      <BreadcrumbContainer
        {...props}
      />

      <hr className="ResultsHeader-divider" />
    </div>
  )
}

ResultsHeader.propTypes = propTypes

export default ResultsHeader
