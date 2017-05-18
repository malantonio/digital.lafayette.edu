import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  blacklist: PropTypes.array,

  data: PropTypes.object.isRequired,

  schema: PropTypes.shape({
    label: PropTypes.string,
    renderer: PropTypes.func,
  }),

  whitelist: PropTypes.array,
}

const defaultProps = {
  blacklist: [],
  schema: null,
  whitelist: [],
}

class MetadataContainer extends React.PureComponent {
  constructor (props) {
    super(props)

    this.renderMetadataFields = this.renderMetadataFields.bind(this)
  }

  renderFieldsBySchema(schema, data) {
    const schemaKeys = Object.keys(schema)

    return schemaKeys.reduce((out, key) => {
      const { label, renderer, ignoreEmpty } = schema[key]
      const dataValues = (
        Array.isArray(data[key])
          ? data[key]
          : [data[key]]
      ).filter(Boolean)

      if (data.length === 0 && ignoreEmpty === true) {
        return out
      }

      const k = <dt key={`${key}-label`}>{label}</dt>
      const values = dataValues.map((d, i) => (
        <dd key={`${key}-value-${i}`}>
          { renderer(d, data) }
        </dd>
      ))

      return out.concat(k, values)
    }, [])
  }

  renderMetadataFields () {
    const { blacklist, whitelist, schema, data } = this.props

    if (schema !== null) {
      return this.renderFieldsBySchema(schema, data)
    }
  }

  render () {
    return (
      <dl className="MetadataContainer">
        {this.renderMetadataFields()}
      </dl>
    )
  }
}

MetadataContainer.propTypes = propTypes
MetadataContainer.defaultProps = defaultProps

export default MetadataContainer
