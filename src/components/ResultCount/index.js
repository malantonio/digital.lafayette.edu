import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  count: PropTypes.number.isRequired,

  // formatter function, called as:
  // `function (stringifiedWithCommas, rawCount)`
  message: PropTypes.func,
}

const defaultProps = {
  message: n => n,
}

const stringifyNumber = num => {
  const str = String(num)
  const len = str.length
  let out = ''

  for (let i = 0; i < len; i++) {
    const current = str[len - (i + 1)]
    const comma = i !== 0 && (i % 3 === 0) ? ',' : ''

    out = current + comma + out
  }

  return out
}

const ResultCount = props => {
  const strung = stringifyNumber(props.count)
  const msg = typeof props.message === 'function'
    ? props.message(strung, props.count)
    : strung

  return <div className="ResultCount">{msg}</div>
}

ResultCount.propTypes = propTypes
ResultCount.defaultProps = defaultProps

export default ResultCount
