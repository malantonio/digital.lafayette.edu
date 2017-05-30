import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

const defaultProps = {
  isFetching: false,
  title: null,
}

const WorkHeader = props => {
  let title, message

  if (props.title) {
    if (Array.isArray(props.title)) {
      title = props.title[0]
    }

    else {
      title = props.title
    }
  }

  else {
    title = props.id
  }

  if (props.isFetching) {
    message = `fetching ${title}`
  }

  else {
    message = title
  }

  return (
    <header className="WorkHeader">
      { message }
    </header>
  )
}

WorkHeader.propTypes = propTypes
WorkHeader.defaultProps = defaultProps

export default WorkHeader
