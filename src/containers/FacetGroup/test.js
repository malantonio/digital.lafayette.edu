import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import FacetGroup from './'
import facets from './data/facets.json'

/* istanbul ignore next */
const noop = () => {}

/* istanbul ignore next */
const MockFacet = () => {}
const FACET_COMPONENT = MockFacet.displayName = 'MockFacet'

const defaultProps = {
  defaultComponent: MockFacet,
  facets,
  onRemoveSelectedItem: noop,
  onSelectItem: noop,
}

const wrapEl = xtend => shallow(<FacetGroup {...defaultProps} {...xtend} />)

const NON_EMPTY_COUNT = facets.reduce((i, f) => {
  if (f.items.length) {
    i += 1
  }

  return i
}, 0)

describe('<FacetGroup />', () => {
  it('will not render if facets is empty', () => {
    const $el = wrapEl({facets: []}).render()
    expect($el.html()).to.be.null
  })

  it('will not render a facet if `facet.items` is undefined', () => {
    const empty = { name: 'no-items', label: 'no items' }
    const $el = wrapEl({facets: [].concat(facets, empty)})

    expect($el.find(FACET_COMPONENT)).to.have.lengthOf(NON_EMPTY_COUNT)

  })

  describe('`props.blacklist`', () => {
    it('prevents some facets from rendering', () => {
      const blacklist = [facets[0].name, facets[facets.length - 1].name]
      const $el = wrapEl({blacklist})

      expect($el.find(FACET_COMPONENT))
        .to.have.lengthOf(NON_EMPTY_COUNT - blacklist.length)
    })
  })

  describe('`props.components`', () => {
    it('allows custom components to be added', () => {
      /* istanbul ignore next */
      const AnotherMockComponent = () => {}
      AnotherMockComponent.displayName = 'AnotherMockComponent'

      const components = {
        [facets[0].name]: AnotherMockComponent,
      }

      const $el = wrapEl({components})
      expect($el.find(AnotherMockComponent)).to.have.lengthOf(1)
      expect($el.find(FACET_COMPONENT)).to.have.lengthOf(NON_EMPTY_COUNT - 1)
    })
  })

  describe('`props.selected`', () => {
    it('filters out facet-items found in props.selected', () => {
      const facets = [
        {
          name: 'has-selected',
          label: 'Has Selected',
          items: [
            {value: 'cool1', label: 'cool1', hits:1},
            {value: 'cool2', label: 'cool2', hits:1},
            {value: 'cool3', label: 'cool3', hits:1},
          ]
        }
      ]

      const selected = {
        'has-selected': [
          {value: 'cool3', label: 'cool3', hits:1},
          {value: 'cool1', label: 'cool1', hits:1},
        ]
      }

      const selectedLength = selected['has-selected'].length
      const remainingFacets = facets[0].items.length - selectedLength

      const $el = wrapEl({facets, selected})
      const $facet = $el.find(FACET_COMPONENT).first()
      expect($facet.prop('selectedItems')).to.have.lengthOf(selectedLength)
      expect($facet.prop('items')).to.have.lengthOf(remainingFacets)
    })
  })

  describe('`props.showEmpty`', () => {
    it('renders a component for each facet with items by default', () => {
      const $el = wrapEl()
      const total = NON_EMPTY_COUNT

      expect($el.find(FACET_COMPONENT)).to.have.lengthOf(total)
    })

    it('renders empty components when `showEmpty` is true', () => {
      const $el = wrapEl({showEmpty: true})
      expect($el.find(FACET_COMPONENT)).to.have.lengthOf(facets.length)
    })
  })

  describe('`props.whitelist`', () => {
    it('prevents some facets from rendering', () => {
      const i = facets.length - 1
      const whitelist = [facets[i].name]
      const $el = wrapEl({whitelist})

      expect($el.find(FACET_COMPONENT)).to.have.lengthOf(whitelist.length)
    })
  })

})
