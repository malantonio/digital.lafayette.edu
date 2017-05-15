import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'

import ResultGalleryItem from '../../components/ResultGalleryItem'

const propTypes = {

}

const defaultProps = {

}

class ResultGallery extends React.PureComponent {
  getThumbnailPath (path) {
    return `${process.env.API_BASE_URL}${path}`
  }

  render () {
    return (
      <div className="ResultGallery">
        {this.props.docs.map((doc, index) => (
          <Link to={`/works/${doc.id}`} key={`${doc.id}-${index}`}>
            <ResultGalleryItem
              {...doc}
              thumbnail_path={this.getThumbnailPath(doc.thumbnail_path)}
            />
          </Link>
        ))}
      </div>
    )
  }
}

ResultGallery.propTypes = propTypes
ResultGallery.defaultProps = defaultProps

export default ResultGallery
