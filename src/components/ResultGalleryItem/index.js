// props for this component come directly from an entry in the
// `results.response.doc` array of objects
import React from 'react'

export default function ResultGalleryItem (props) {
  const { thumbnail_path, title, id } = props

  return (
    <div className="ResultGalleryItem">
      <img src={thumbnail_path} />
      <p className="ResultGalleryItem-title">
        {
          // default way to store a title is as an array
          // so we'll just use the first one
          title && Array.isArray(title)
          ? title[0]

          // otherwise, if it's a string, use the property
          : typeof title === 'string'
            ? title

            // and fall back to the id
            : id
        }
      </p>
    </div>
  )
}
