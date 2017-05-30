import React from 'react'
import PropTypes from 'prop-types'

// cut down on the bundle size + skip PhantomJS error
// by requiring just the components that we need from
// `react-taco-table`
//
// for reference, this is the PhantomJS error that
// cropped up in metadb-ui:
//
// PhantomJS 2.1.1 (Mac OS X 0.0.0) ERROR
//  TypeError: undefined is not a constructor (evaluating 'Object.assign({}, d3Scale, d3ScaleChromatic)')
//  at webpack:///~/react-taco-table/lib/plugins/HeatmapPlugin.js:32:0 <- test.webpack.js:97422
//
// but luckily we're not using the HeatmapPlugin!
import TacoTable from 'react-taco-table/lib/TacoTable'
import DataType from 'react-taco-table/lib/DataType'

import Link from 'react-router-dom/Link'

import HamburgerButton from '../../components/HamburgerButton'
import FieldSelect from '../../components/FieldSelect'

import utils from './utils'
import { getApiPath } from '../../utils'

import Debug from 'debug'
const debug = Debug('digital:containers/ResultsTable')

const propTypes = {
  defaultFields: PropTypes.array,
  docs: PropTypes.array.isRequired,
}

const defaultProps = {
  defaultFields: ['title', 'creator'],
}

class ResultsTable extends React.PureComponent {
  constructor (props) {
    super(props)

    this.fieldToggleHeader = this.fieldToggleHeader.bind(this)
    this.getColumns = this.getColumns.bind(this)
    this.onSelectField = this.onSelectField.bind(this)
    this.setFields = this.setFields.bind(this)

    this.state = {
      fields: utils.getSessionFields() || props.defaultFields,
      fieldSelectOpen: false,
    }
  }

  fieldToggleHeader () {
    const open = this.state.fieldSelectOpen

    const btn = (
      <HamburgerButton
        active={open}
        key="toggle-field-select"
        onClick={ev => {
          ev && ev.preventDefault && ev.preventDefault()
          this.setState(prevState => ({
            fieldSelectOpen: !prevState.fieldSelectOpen
          }))
        }}
      />
    )

    if (open === false) {
      return btn
    }

    const onWillClose = () => {
      if (open) {
        this.setState({fieldSelectOpen: false})
      }
    }

    const onReset = () => {
      this.setFields(this.props.defaultFields)
    }

    const onSelectAll = () => {
      this.setFields(utils.keys)
    }

    const fieldSelect = (
      <FieldSelect
        onWillClose={onWillClose}
        onReset={onReset}
        onSelectAll={onSelectAll}
        fields={utils.fields}
        key="field-select"
        onSelectField={this.onSelectField}
        selected={this.state.fields}
      />
    )

    return [btn, fieldSelect]
  }

  getColumns () {
    const type = DataType.None

    // set default column first (thumbnail)
    const thumbnail = {
      className: 'ResultsTable-thumbnail',
      header: this.fieldToggleHeader(),
      id: 'thumbnail_path',

      // TODO: add a11y attributes
      renderer: (path, opts) => (
        <Link to={`/works/${opts.rowData.id}`}>
          <img
            src={getApiPath(path)}
          />
        </Link>
      ),

      thClassName: 'field-select',
      type,
    }

    // use the same renderer across the fields:
    // if the value is an array, join with a
    // semi-colon, otherwise return the value
    const defaultRenderer = data => {
      if (Array.isArray(data)) {
        return data.join('; ')
      }

      return data
    }

    const fields = this.state.fields.map(id => ({
      id,
      header: utils.fields[id],
      renderer: defaultRenderer,
      type,
    }))

    return [].concat(thumbnail, fields)
  }

  onSelectField (key, toggle, index) {
    debug('toggling field "%s" to "%s"', key, (toggle ? 'on' : 'off'))

    const fields = [].concat(this.state.fields)
    let update

    if (toggle === true) {
      update = fields.concat(key).sort(utils.sortByField)
    }

    else {
      update = [].concat(
        fields.slice(0, index),
        fields.slice(index + 1)
      )
    }

    this.setFields(update)
  }

  setFields (fields) {
    utils.setSessionFields(fields)
    this.setState({fields})
  }

  render () {
    return (
      <div className="ResultsTable">
        <TacoTable
          className="ResultsTable-table"
          columns={this.getColumns()}
          data={this.props.docs}
          sortable={false}
        />
      </div>
    )
  }
}

ResultsTable.propTypes = propTypes
ResultsTable.defaultProps = defaultProps

export default ResultsTable
