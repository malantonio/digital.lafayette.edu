import React from 'react'
import PropTypes from 'prop-types'
import TextButton from '../TextButton'

const propTypes = {
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  onReturnToSearchResults: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

const defaultProps = {
  isFetching: false,
  title: null,
}

const WorkHeader = props => {
  let title, message, button

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

  if (props.onReturnToSearchResults) {
    button = (
      <div>
        <TextButton
          onClick={props.onReturnToSearchResults}
        >
          &lt; Return to Search Results
        </TextButton>
      </div>
    )
  }

  return (
    <header className="WorkHeader">
      { button ? button : null }
      { message }
    </header>
  )
}

WorkHeader.propTypes = propTypes
WorkHeader.defaultProps = defaultProps

export default WorkHeader
