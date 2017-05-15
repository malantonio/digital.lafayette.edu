import React from 'react'
import FacetGroup from '../../containers/FacetGroup'
import {
  FacetList,
  FacetRangeLimitDate,
} from '@lafayette-college-libraries/react-blacklight-facet'

import BreadcrumbContainer from '../../containers/BreadcrumbContainer'
import ResultGallery from '../../containers/ResultGallery'

class SearchResults extends React.PureComponent {
  constructor (props) {
    super(props)

    this.maybeBuildFacetDictionary = this.maybeBuildFacetDictionary.bind(this)

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

    this.facetDictionary = nextResults.facets.reduce((out, facet) => {
      const { name, label } = facet
      out[name] = { name, label }

      return out
    }, {})
  }

  render () {
    const { isFetching } = this.props.search.meta

    // TODO: create 'Fetching' modal
    if (isFetching) {
      return <div>f e t c h i n g . . .</div>
    }

    const { docs, facets } = this.props.searchResults

    // TODO: 'redirect' to no-docs-found screen
    if (!docs || docs.length === 0) {
      return <div>no docs found</div>
    }

    const dateRanges = [
      'date_original_dtsi',
      'date_artifact_upper_dtsi',
      'date_artifact_lower_dtsi',
      'date_image_upper_dtsi',
      'date_image_lower_dtsi',
    ].reduce((o, n) => ((o[n] = FacetRangeLimitDate) && o), {})

    const selected = {
      ...this.props.search.facets,
      ...this.props.search.range,
    }

    return (
      <div style={{display: 'flex'}}>
        <section key="facets" style={{width:'33%'}}>
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
            query={this.props.search.query}
            facets={this.props.search.facets}
            range={this.props.search.range}
          />
          <ResultGallery docs={docs} />
        </section>
      </div>
    )
  }
}

export default SearchResults
