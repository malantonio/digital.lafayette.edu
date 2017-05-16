import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import ResultsGalleryItem from '../../components/ResultsGalleryItem'
import { getApiPath } from '../../utils'

const propTypes = {
  docs: PropTypes.arrayOf(PropTypes.shape({
    // TODO: create a `src/shape/Doc` PropType template
    id: PropTypes.string,
    thumbnail_path: PropTypes.string,
  }))
}

const ResultsGallery = props => {
  return (
    <div className="ResultsGallery">
      {props.docs.map((doc, index) => (
        <Link to={`/works/${doc.id}`} key={`${doc.id}-${index}`}>
          <ResultsGalleryItem
            {...doc}
            thumbnail_path={getApiPath(doc.thumbnail_path)}
          />
        </Link>
      ))}
    </div>
  )
}

export default ResultsGallery
