import React from 'react'
import FacetGroup from '../../containers/FacetGroup'
import {
  FacetList,
  FacetRangeLimitDate,
} from '@lafayette-college-libraries/react-blacklight-facet'

import ResultGallery from '../../containers/ResultGallery'

class SearchResults extends React.PureComponent {
  componentDidMount () {
    const { isFetching } = this.props.search.meta
    const { search } = this.props.location

    if (isFetching === false && search !== '') {
      // location.search includes question mark, so we'll strip it out here
      this.props.searchWithQueryString(search.substr(1))
    }
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
          <ResultGallery docs={docs} />
        </section>
      </div>
    )
  }
}

export default SearchResults
