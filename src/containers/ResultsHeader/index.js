import React from 'react'
import PropTypes from 'prop-types'
import Toggle from '../../components/Toggle'
import ResultCount from '../../components/ResultCount'
import BreadcrumbContainer from '../BreadcrumbContainer'

const propTypes = {
  ...BreadcrumbContainer.propTypes,
  count: PropTypes.number,
}

const countFormatter = (str, num) => {
  const res = `result${num === 1 ? '' : 's'}`
  return `Found ${str} ${res}`
}

const ResultsHeader = props => {
  return (
    <div className="ResultsHeader">
      <div className="ResultsHeader-row-upper">
        <Toggle
          {...props.viewToggleOptions}
        />
        <ResultCount
          count={props.count}
          message={countFormatter}
        />
      </div>

      <BreadcrumbContainer
        {...props}
      />

      <hr className="ResultsHeader-divider" />
    </div>
  )
}

ResultsHeader.propTypes = propTypes

export default ResultsHeader
