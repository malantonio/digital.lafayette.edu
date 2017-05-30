import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  blacklist: PropTypes.array,

  data: PropTypes.object.isRequired,

  ignoreEmptyFields: PropTypes.bool,

  schema: PropTypes.shape({
    label: PropTypes.string,
    renderer: PropTypes.func,
  }),

  whitelist: PropTypes.array,
}

const defaultProps = {
  blacklist: [],
  ignoreEmptyFields: false,
  schema: null,
  whitelist: [],
}

class MetadataTable extends React.PureComponent {
  constructor (props) {
    super(props)

    this.renderMetadataFields = this.renderMetadataFields.bind(this)
  }

  renderFieldsBySchema(schema, data) {
    const schemaKeys = Object.keys(schema)

    return schemaKeys.reduce((out, key) => {
      const { label, renderer } = schema[key]

      // ignore empty fields if explicityly defined in the schema _or_
      // if the global instruction is passed to the table
      const ignoreEmpty = (
        schema[key].ignoreEmpty || this.props.ignoreEmptyFields
      )

      const dataValues = (
        Array.isArray(data[key])
          ? data[key]
          : [data[key]]
      ).filter(Boolean)

      const dvlen = dataValues.length

      if (dvlen === 0 && ignoreEmpty === true) {
        return out
      }

      const rows = [(
        <tr key={`${key}`}>
          <td
            className="MetadataTable-key"
            rowSpan={dataValues.length}
            key="label"
          >
            {label}
          </td>
          <td key="value">
            {renderer(dataValues[0], data)}
          </td>
        </tr>
      )]

      if (dvlen > 1) {
        dataValues.slice(1).forEach((v, i) => {
          rows.push(
            <tr key={`${key}-value-${i + 1}`}>
              <td>
                {renderer(dataValues[i + 1], data)}
              </td>
            </tr>
          )
        })
      }

      return out.concat(rows)
    }, [])
  }

  renderMetadataFields () {
    const { schema, data } = this.props

    if (schema !== null) {
      return this.renderFieldsBySchema(schema, data)
    }
  }

  render () {
    return (
      <table className="MetadataTable">
        <tbody>
          {this.renderMetadataFields()}
        </tbody>
      </table>
    )
  }
}

MetadataTable.propTypes = propTypes
MetadataTable.defaultProps = defaultProps

export default MetadataTable
