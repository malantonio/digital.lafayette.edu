export default function createFacetDictionary (facets) {
  return facets.reduce((out, facet) => {
    const { name, label } = facet
    out[name] = { name, label }

    return out
  }, {})
}
