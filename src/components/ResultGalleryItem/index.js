// props for this component come directly from an entry in the
// `results.response.doc` array of objects
import React from 'react'

export default function ResultGalleryItem (props) {
  return (
    <div className="ResultGalleryItem">
      <img src={props.thumbnail_path} />
      <p className="ResultGalleryItem-title">
        {
          // default way to store a title is as an array
          // so we'll just use the first one
          props.title && Array.isArray(props.title)
          ? props.title[0]

          // otherwise, if it's _not_ an array, use the property
          : props.title
            ? props.title

            // and fall back to the id
            : props.id
        }
      </p>
    </div>
  )
}
