import React from 'react'
import Debug from 'debug'

import FacetGroup from '../../containers/FacetGroup'
import {
  FacetList,
  FacetRangeLimitDate,
} from '@lafayette-college-libraries/react-blacklight-facet'

import LoadingModal from '../../components/LoadingModal'

import ResultsHeader from '../../containers/ResultsHeader'
import ResultsContainer from '../../containers/ResultsContainer'
import ResultsGallery from '../../containers/ResultsGallery'
import ResultsTable from '../../containers/ResultsTable'

import * as utils from './utils'
import { createFacetDictionary } from '../../utils'

const debug = Debug('digital:screens/SearchResults')

class SearchResults extends React.PureComponent {
  constructor (props) {
    super(props)

    this.getResultContainerComponent = this.getResultContainerComponent.bind(this)
    this.handleRemoveBreadcrumb = this.handleRemoveBreadcrumb.bind(this)
    this.handleToggleResultsContainer = this.handleToggleResultsContainer.bind(this)
    this.maybeBuildFacetDictionary = this.maybeBuildFacetDictionary.bind(this)
    this.renderFacetSidebar = this.renderFacetSidebar.bind(this)
    this.renderResultsHeader = this.renderResultsHeader.bind(this)
    this.renderResults = this.renderResults.bind(this)

    this.resultsContainers = {
      'gallery': ResultsGallery,
      'table': ResultsTable,
    }

    this.state = {
      resultsContainer: utils.getResultsView('list'),
    }
  }

  componentDidMount () {
    const { isFetching } = this.props.search.meta
    const { search } = this.props.location
    const { docs, facets } = this.props.searchResults

    if (
      isFetching === false
      && docs === undefined
      && facets == undefined
      && search !== ''
      ) {
      // location.search includes question mark, so we'll strip it out here
      this.props.searchWithQueryString(search.substr(1))
    }
  }

  componentWillReceiveProps (nextProps) {
    this.maybeBuildFacetDictionary(nextProps)
  }

  getResultContainerComponent () {
    return this.resultsContainers[this.state.resultsContainer]
  }

  handleRemoveBreadcrumb (facet, item) {
    if (facet.type === 'query') {
      this.props.searchWithQuery('')
    }

    else {
      this.props.toggleFacetItem(facet, item, false)
    }
  }

  handleToggleResultsContainer (which) {
    debug(`setting ResultsContainer to ${which}`)

    utils.setResultsView(which)

    this.setState({
      resultsContainer: which,
    })
  }

  // constructs a key/val store of facet info. this is primarily used in
  // generating breadcrumbs with nice labels. will build if:
  //
  //   a) one doesn't already exist
  //   b) there are facets in the searchResults
  //
  // (a) provides us an out if we want to store this in sessionStorage
  // and only do the work when deemed absolutely necessary
  maybeBuildFacetDictionary (nextProps) {
    if (this.facetDictionary !== undefined) {
      return
    }

    const { facets } = nextProps.searchResults

    if (facets === undefined) {
      return
    }

    debug('building FacetDictionary')

    this.facetDictionary = createFacetDictionary(facets)
  }

  renderFacetSidebar () {
    const { search, searchResults, toggleFacetItem } = this.props
    const { facets } = searchResults

    if (facets === undefined || facets.length === 0) {
      return null
    }

    const dateRanges = [
      'date_original_dtsi',
      'date_artifact_upper_dtsi',
      'date_artifact_lower_dtsi',
      'date_image_upper_dtsi',
      'date_image_lower_dtsi',
    ].reduce((o, n) => ((o[n] = FacetRangeLimitDate) && o), {})

    const selected = { ...search.facets, ...search.range }

    return (
      <FacetGroup
        components={dateRanges}
        defaultComponent={FacetList}
        facets={facets}
        onRemoveSelectedItem={(facet, item) => {
          this.props.toggleFacetItem(facet, item, false)
        }}
        onSelectItem={(facet, item) => {
          this.props.toggleFacetItem(facet, item, true)
        }}
        selected={selected}
      />
    )
  }

  renderResultsHeader () {
    const { search } = this.props

    if (search.facets === undefined || search.meta.needsHydration === true) {
      return null
    }

    const toggleOptions = {
      onChange: this.handleToggleResultsContainer,
      values: Object.keys(this.resultsContainers),
      value: this.state.resultsContainer,
    }

    return (
      <ResultsHeader
        {...search}
        dictionary={this.facetDictionary}
        onRemoveBreadcrumb={this.handleRemoveBreadcrumb}
        viewToggleOptions={toggleOptions}
      />
    )
  }

  renderResults () {
    const { search, searchResults, searchAtPage } = this.props

    if (searchResults.docs === undefined) {
      return null
    }

    return (
      <ResultsContainer
        component={this.getResultContainerComponent()}
        search={search}
        searchAtPage={searchAtPage}
        searchResults={searchResults}
      />
    )
  }

  render () {
    const { searchResults, search } = this.props
    const { isFetching } = search.meta
    const { docs, facets } = searchResults

    // TODO: 'redirect' to no-docs-found screen
    if (docs !== undefined && docs.length === 0) {
      return <div>no docs found</div>
    }

    return (
      <div style={{display: 'flex'}}>
        <LoadingModal visible={isFetching} />

        <section key="facets" style={{width:'25%'}}>
          {this.renderFacetSidebar()}
        </section>

        <section key="results" style={{width:'75%'}}>
          {this.renderResultsHeader()}
          {this.renderResults()}
        </section>

      </div>
    )
  }
}

export default SearchResults
