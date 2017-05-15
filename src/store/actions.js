// these constitute the actions that are passed to the app as props.
// we're picking-and-choosing because we don't need the actionCreators
// (such as `setFacet` or `receivedSearchResults`) within the app itself
export {
  searchWithQuery,
  searchWithQueryString,
  toggleFacetItem,
} from './search/actions'
