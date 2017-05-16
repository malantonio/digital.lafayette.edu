import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const propTypes = {
  visible: PropTypes.bool.isRequired,
}

const LoadingModal = props => {
  return (
    <Modal
      contentLabel="Loading modal"
      isOpen={props.visible}
      className="Modal-container LoadingModal"
      overlayClassName="Modal-overlay LoadingModal"
    >
      Loading...
    </Modal>
  )
}

LoadingModal.propTypes = propTypes

export default LoadingModal
