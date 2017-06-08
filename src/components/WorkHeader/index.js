import React from 'react'
import PropTypes from 'prop-types'
import TextButton from '../TextButton'

const defaultFetchingMessage = id => `fetching ${id}`
const isFunction = thing => thing && typeof thing === 'function'

const propTypes = {
  id: PropTypes.string.isRequired,

  fetchingMessage: PropTypes.func,
  isFetching: PropTypes.bool,
  onReturnToSearchResults: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

const defaultProps = {
  fetchingMessage: defaultFetchingMessage,
  isFetching: false,
  onReturnToSearchResults: null,
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
    if (isFunction(props.fetchingMessage)) {
      message = props.fetchingMessage(title)
    }

    else {
      message = defaultFetchingMessage(title)
    }
  }

  else {
    message = title
  }

  if (isFunction(props.onReturnToSearchResults)) {
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
