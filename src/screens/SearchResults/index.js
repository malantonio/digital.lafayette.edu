import React from 'react'
import FacetGroup from '../../containers/FacetGroup'
import {
  FacetList,
  FacetRangeLimitDate,
} from '@lafayette-college-libraries/react-blacklight-facet'

import LoadingModal from '../../components/LoadingModal'

import BreadcrumbContainer from '../../containers/BreadcrumbContainer'
import ResultsContainer from '../../containers/ResultsContainer'
import ResultsGallery from '../../containers/ResultsGallery'

import * as utils from '../../utils'

class SearchResults extends React.PureComponent {
  constructor (props) {
    super(props)

    this.maybeBuildFacetDictionary = this.maybeBuildFacetDictionary.bind(this)
    this.renderFacetSidebar = this.renderFacetSidebar.bind(this)

    this.state = {

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

    const { docs, facets } = this.props.searchResults

    if (docs === undefined && facets === undefined) {
      return
    }

    const nextResults = nextProps.searchResults

    if (nextResults.facets === undefined) {
      return
    }

    this.facetDictionary = utils.createFacetDictionary(nextResults.facets)
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

        <section key="facets" style={{width:'33%'}}>
          {this.renderFacetSidebar()}
        </section>

        <section key="results" style={{width:'66%'}}>
          <BreadcrumbContainer
            dictionary={this.facetDictionary}
            onRemoveBreadcrumb={(facet, item) => {
              if (facet.type === 'query') {
                this.props.searchWithQuery('')
              }

              else {
                this.props.toggleFacetItem(facet, item, false)
              }
            }}
            query={search.query}
            facets={search.facets}
            range={search.range}
          />

          <ResultsContainer
            component={ResultsGallery}
            search={search}
            searchAtPage={this.props.searchAtPage}
            searchResults={searchResults}
          />
        </section>

      </div>
    )
  }
}

export default SearchResults
