// ~*~ wooof ~*~ //
// ( doing my best to keep this readable )
export {
  default as createRangeFacetItem
} from
  '@lafayette-college-libraries/react-blacklight-facet/lib/FacetRangeLimitDate/create-range-facet-item'


export const flattenValues = (obj, isRange) => {
  return Object.keys(obj).reduce((out, key) => {
    if (Array.isArray(obj[key])) {

      if (isRange) {
        out[key] = obj[key][0].value
      }

      else {
        out[key] = obj[key].map(v => typeof v === 'object' ? v.value : v)
      }
    }

    else {
      out[key] = obj[key].value || obj[key]
    }

    return out
  }, {})
}
